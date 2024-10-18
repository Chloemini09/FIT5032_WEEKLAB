<template>
  <div>
    <h1>Books with ISBN > 1000 (Showing {{ books.length }} of {{ totalCount }})</h1>
    <ul>
      <li v-for="book in books" :key="book.id" :class="{ 'new-book': newBookIds.includes(book.id) }">
        <span v-if="editingBook !== book.id">
          {{ getDisplayName(book) }} - ISBN: {{ book.isbn }}
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
import { ref, onMounted, onUnmounted } from 'vue';
import { collection, query, where, doc, updateDoc, deleteDoc, orderBy, limit, onSnapshot, getCountFromServer } from 'firebase/firestore';
import db from '../firebase/init.js';

export default {
  setup() {
    const books = ref([]);
    const editingBook = ref(null);
    const editedName = ref('');
    const editedIsbn = ref('');
    const limitValue = ref(3);
    const hasMore = ref(true);
    const totalCount = ref(0);
    const newBookIds = ref([]);
    const recentlyAddedBooks = ref(new Set());

    let unsubscribe = null;

    const fetchBooks = () => {
      const q = query(
        collection(db, 'books'),
        where('isbn', '>', 1000),
        orderBy('isbn'),
        limit(limitValue.value)
      );

      unsubscribe = onSnapshot(q, (querySnapshot) => {
        const newBooks = querySnapshot.docs.map(doc => {
          const data = doc.data();
          return {
            id: doc.id,
            ...data,
            name: recentlyAddedBooks.value.has(doc.id) ? data.name.toUpperCase() : data.name
          };
        });
        
        // Find new books
        const addedBooks = newBooks.filter(newBook => !books.value.some(book => book.id === newBook.id));
        newBookIds.value = addedBooks.map(book => book.id);

        // Add new books to recentlyAddedBooks
        addedBooks.forEach(book => recentlyAddedBooks.value.add(book.id));

        books.value = newBooks;
        hasMore.value = querySnapshot.docs.length === limitValue.value;

        // Clear highlight and remove from recentlyAddedBooks after 5 seconds
        setTimeout(() => {
          newBookIds.value = [];
          addedBooks.forEach(book => recentlyAddedBooks.value.delete(book.id));
        }, 5000);
      }, (error) => {
        console.error("Error fetching books: ", error);
      });
    };

    const getDisplayName = (book) => {
      return recentlyAddedBooks.value.has(book.id) ? book.name.toUpperCase() : book.name;
    };

    const updateTotalCount = async () => {
      const countQuery = query(collection(db, 'books'), where('isbn', '>', 1000));
      const countSnapshot = await getCountFromServer(countQuery);
      totalCount.value = countSnapshot.data().count;
    };

    const loadMore = () => {
      limitValue.value += 3;
      fetchBooks();
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
      updateTotalCount();
      setInterval(updateTotalCount, 60000); // Update count every minute
    });

    onUnmounted(() => {
      if (unsubscribe) unsubscribe();
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
      totalCount,
      newBookIds,
      getDisplayName
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
  transition: background-color 0.5s ease;
}

button {
  margin-left: 5px;
}

input {
  margin-right: 5px;
}

@keyframes highlight {
  0% { background-color: transparent; }
  50% { background-color: #ffff99; }
  100% { background-color: transparent; }
}

.new-book {
  animation: highlight 2s ease;
}
</style>