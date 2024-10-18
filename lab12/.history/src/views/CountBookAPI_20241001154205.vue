<template>
    <div id="app">
      <h1>Book Library</h1>
      <div v-if="books" class="book-list">
        <div v-for="book in books" :key="book.id" class="book-card">
          <h2>{{ book.name }}</h2>
          <p><strong>ISBN:</strong> {{ book.isbn }}</p>
          <p><strong>Author:</strong> {{ book.author || 'Unknown' }}</p>
          <p><strong>Published:</strong> {{ book.publishedDate || 'N/A' }}</p>
        </div>
      </div>
      <p v-if="error" class="error">{{ error.message }}</p>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    name: 'GetAllBooksAPI',
    data() {
      return {
        books: null,
        error: null,
      };
    },
    mounted() {
      this.getAllBooksAPI();
    },
    methods: {
      async getAllBooksAPI() {
        try {
          const response = await axios.get('https://getallbooks-d5nktxzkjq-uc.a.run.app');
          this.books = response.data;
          this.error = null;
        } catch (error) {
          console.error('Error fetching all books:', error);
          this.error = error;
          this.books = null;
        }
      },
    },
  };
  </script>
  
  <style scoped>
  #app {
    font-family: 'Arial', sans-serif;
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
    background-color: #f0f4f8;
  }
  
  h1 {
    color: #2c3e50;
    text-align: center;
    margin-bottom: 30px;
    font-size: 2.5em;
  }
  
  .book-list {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 20px;
  }
  
  .book-card {
    background-color: white;
    border-radius: 8px;
    padding: 20px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease;
  }
  
  .book-card:hover {
    transform: translateY(-5px);
  }
  
  .book-card h2 {
    color: #34495e;
    margin-top: 0;
    font-size: 1.2em;
    margin-bottom: 10px;
  }
  
  .book-card p {
    margin: 5px 0;
    color: #7f8c8d;
  }
  
  .book-card strong {
    color: #2c3e50;
  }
  
  .error {
    color: #e74c3c;
    text-align: center;
    font-weight: bold;
    background-color: #fadbd8;
    padding: 10px;
    border-radius: 4px;
    margin-top: 20px;
  }
  
  @media (max-width: 600px) {
    .book-list {
      grid-template-columns: 1fr;
    }
  }
  </style>