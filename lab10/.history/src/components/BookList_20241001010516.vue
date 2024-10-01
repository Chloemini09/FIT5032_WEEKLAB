<template>
  <div>
    <h1>Books with ISBN > 1000 (Showing {{ books.length }} of {{ totalCount }})</h1>
    <ul>
      <li v-for="book in books" :key="book.id">
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
import { ref, onMounted, onUnmounted, watch } from 'vue';
import { collection, query, where, getDocs, doc, updateDoc, deleteDoc, orderBy, limit as firestoreLimit, startAfter, onSnapshot } from 'firebase/firestore';
import db from '../firebase/init.js';

export default {
  setup() {
    const books = ref([]);
    const editingBook = ref(null);
    const editedName = ref('');
    const editedIsbn = ref('');
    const limitValue = ref(3);
    const lastVisible = ref(null);
    const hasMore = ref(true);
    const totalCount = ref(0);
    let unsubscribe = null;

    const fetchBooks = async (loadMore = false) => {
      try {
        let q = query(
          collection(db, 'books'),
          where('isbn', '>', 1000),
          orderBy('isbn'),
          firestoreLimit(limitValue.value)
        );

        if (loadMore && lastVisible.value) {
          q = query(q, startAfter(lastVisible.value));
        }

        unsubscribe = onSnapshot(q, (querySnapshot) => {
          const fetchedBooks = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          }));

          if (loadMore) {
            books.value = [...books.value, ...fetchedBooks];
          } else {
            books.value = fetchedBooks;
          }

          lastVisible.value = querySnapshot.docs[querySnapshot.docs.length - 1];
          hasMore.value = querySnapshot.docs.length === limitValue.value;
        });

        // Fetch total count
        const countQuery = query(collection(db, 'books'), where('isbn', '>', 1000));
        const countSnapshot = await getDocs(countQuery);
        totalCount.value = countSnapshot.size;
      } catch (error) {
        console.error('Error fetching books: ', error);
      }
    };

    const loadMore = () => {
      limitValue.value += 3;
      fetchBooks(true);
    };

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
      } catch (error) {
        console.error('Error deleting book: ', error);
      }
    };

    onMounted(() => {
      fetchBooks();
    });

    onUnmounted(() => {
      if (unsubscribe) unsubscribe();
    });

    // Watch for changes in books array to update total count
    watch(books, async () => {
      const countQuery = query(collection(db, 'books'), where('isbn', '>', 1000));
      const countSnapshot = await getDocs(countQuery);
      totalCount.value = countSnapshot.size;
    });

    return {
      books,
      editingBook,
      editedName,
      editedIsbn,
      startEdit,
      saveEdit,
      cancelEdit,
      deleteBook,
      loadMore,
      hasMore,
      totalCount
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