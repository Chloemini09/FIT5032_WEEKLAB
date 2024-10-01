<template>
    <div>
      <h1>Books with ISBN > 1000 (Limited to {{ limit }})</h1>
      <ul>
        <li v-for="book in sortedBooks" :key="book.id">
          <span v-if="editingBook !== book.id">
            {{ book.name }} - ISBN: {{ book.isbn }}
            <button @click="startEdit(book)">Edit</button>
            <button @click="deleteBook(book.id)">Delete</button>
          </span>
          <span v-else>
            <input v-model="editedName" placeholder="Name" />
            <input v-model="editedIsbn" placeholder="ISBN" type="number" />
            <button @click="saveEdit(book.id)">Save</button>
            <button @click="cancelEdit">Cancel</button>
          </span>
        </li>
      </ul>
      <button @click="loadMore" v-if="hasMore">Load More</button>
    </div>
  </template>
  
  <script>
  import { ref, computed } from 'vue';
  import { collection, query, where, getDocs, doc, updateDoc, deleteDoc, limit, startAfter, orderBy } from 'firebase/firestore';
  import db from '../firebase/init.js';
  
  export default {
    setup() {
      const books = ref([]);
      const editingBook = ref(null);
      const editedName = ref('');
      const editedIsbn = ref('');
      const limit = ref(3); // Initial limit
      const lastVisible = ref(null);
      const hasMore = ref(true);
  
      const fetchBooks = async (loadMore = false) => {
        try {
          let q = query(
            collection(db, 'books'),
            where('isbn', '>', 1000),
            orderBy('isbn'),
            limit(limit.value)
          );
  
          if (loadMore && lastVisible.value) {
            q = query(q, startAfter(lastVisible.value));
          }
  
          const querySnapshot = await getDocs(q);
          
          if (querySnapshot.empty) {
            hasMore.value = false;
            return;
          }
  
          const fetchedBooks = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          
          if (loadMore) {
            books.value = [...books.value, ...fetchedBooks];
          } else {
            books.value = fetchedBooks;
          }
  
          lastVisible.value = querySnapshot.docs[querySnapshot.docs.length - 1];
          hasMore.value = querySnapshot.docs.length === limit.value;
        } catch (error) {
          console.error('Error fetching books: ', error);
        }
      };
  
      const loadMore = () => {
        limit.value += 3;
        fetchBooks(true);
      };
  
      const sortedBooks = computed(() => {
        return [...books.value].sort((a, b) => a.isbn - b.isbn);
      });
  
      const startEdit = (book) => {
        editingBook.value = book.id;
        editedName.value = book.name;
        editedIsbn.value = book.isbn;
      };
  
      const saveEdit = async (id) => {
        try {
          const bookRef = doc(db, 'books', id);
          await updateDoc(bookRef, {
            name: editedName.value,
            isbn: Number(editedIsbn.value)
          });
          await fetchBooks();
          editingBook.value = null;
        } catch (error) {
          console.error('Error updating book: ', error);
        }
      };
  
      const cancelEdit = () => {
        editingBook.value = null;
      };
  
      const deleteBook = async (id) => {
        try {
          await deleteDoc(doc(db, 'books', id));
          await fetchBooks();
        } catch (error) {
          console.error('Error deleting book: ', error);
        }
      };
  
      fetchBooks();
  
      return {
        sortedBooks,
        editingBook,
        editedName,
        editedIsbn,
        startEdit,
        saveEdit,
        cancelEdit,
        deleteBook,
        loadMore,
        limit,
        hasMore,
        fetchBooks
      };
    }
  };
  </script>
  
  <style scoped>
  ul {
    list-style-type: none;
    padding: 0;
  }
  li {
    margin-bottom: 10px;
  }
  button {
    margin-left: 5px;
  }
  input {
    margin-right: 5px;
  }
  </style>