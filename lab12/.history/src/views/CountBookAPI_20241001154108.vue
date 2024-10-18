<template>
    <div id="app">
      <h1>All Books</h1>
      <pre v-if="jsondata">{{ jsondata }}</pre>
      <p v-if="error" class="error">{{ error.message }}</p>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    name: 'GetAllBooksAPI',
    data() {
      return {
        jsondata: null,
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
          this.jsondata = JSON.stringify(response.data, null, 2); // 格式化 JSON 输出
          this.error = null;
        } catch (error) {
          console.error('Error fetching all books:', error);
          this.error = error;
          this.jsondata = null;
        }
      },
    },
  };
  </script>
  
  <style scoped>
  #app {
    font-family: Arial, sans-serif;
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
    text-align: left;
  }
  
  h1 {
    color: #2c3e50;
    margin-bottom: 20px;
    text-align: center;
  }
  
  pre {
    background-color: #f3f3f3;
    padding: 15px;
    border-radius: 5px;
    white-space: pre-wrap;
    word-wrap: break-word;
    overflow-x: auto;
  }
  
  .error {
    color: #e74c3c;
    text-align: center;
  }
  </style>