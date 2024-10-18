<template>
    <div id="app">
      <h1>Book Counter</h1>
      <pre v-if="jsondata">{{ jsondata }}</pre>
      <p v-if="error">{{ error.message }}</p>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        jsondata: null,
        error: null,
      };
    },
    mounted() {
      this.getBookCountAPI();
    },
    methods: {
      async getBookCountAPI() {
        try {
          const response = await axios.get('https://countbooks-d5nktxzkjq-uc.a.run.app');
          this.jsondata = response.data;
          this.error = null;
        } catch (error) {
          console.error('Error fetching book count:', error);
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
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
    text-align: center;
  }
  
  h1 {
    color: #2c3e50;
    margin-bottom: 20px;
  }
  
  pre {
    background-color: #f3f3f3;
    padding: 10px;
    border-radius: 5px;
  }
  
  .error {
    color: #e74c3c;
  }
  </style>
  