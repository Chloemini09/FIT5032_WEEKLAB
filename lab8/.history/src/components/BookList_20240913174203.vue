<template>
    <div>
      <h2>Book List</h2>
      <ul v-if="books.length">
        <li v-for="(book, index) in books" :key="index">
          {{ book.name }} (ISBN: {{ book.isbn }})
        </li>
      </ul>
      <p v-else>No books available.</p>
    </div>
  </template>
  
  <script>
  import { collection, getDocs } from 'firebase/firestore';
  import db from '../firebase/init.js';
  
  export default {
    data() {
      return {
        books: []
      };
    },
    async mounted() {
      // Fetch the books from Firestore when the component is mounted
      const querySnapshot = await getDocs(collection(db, 'books'));
      querySnapshot.forEach((doc) => {
        this.books.push(doc.data());
      });
    }
  };
  </script>
  
  <style scoped>
  /* Add some basic styles */
  ul {
    list-style-type: none;
    padding: 0;
  }
  
  li {
    padding: 5px;
    border-bottom: 1px solid #ccc;
  }
  
  p {
    color: #888;
  }
  </style>
  