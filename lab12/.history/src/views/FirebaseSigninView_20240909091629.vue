<template>
    <div class="login-container">
      <h1>Sign in</h1>
      <p><input type="text" placeholder="Email" v-model="email" class="form-input" /></p>
      <p><input type="password" placeholder="Password" v-model="password" class="form-input" /></p>
      <p><button @click="signin" class="form-button">Sign in via Firebase</button></p>
      <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
    </div>
  </template>
  
  <script setup>
  import { ref } from "vue"
  import { getAuth, signInWithEmailAndPassword } from "firebase/auth"
  import { useRouter } from "vue-router"
  
  const email = ref("")
  const password = ref("")
  const errorMessage = ref("") // 用于显示错误信息
  const router = useRouter()
  const auth = getAuth()
  
  const signin = () => {
    errorMessage.value = "" // 每次登录前清空错误信息
    signInWithEmailAndPassword(getAuth(), email.value, password.value)
      .then((data) => {
        console.log("Firebase Register Successful!")
        router.push("/")
        console.log(auth.currentUser) // 打印当前用户信息
      })
      .catch((error) => {
        console.log(error.code)
        if (error.code === 'auth/wrong-password') {
          errorMessage.value = "Incorrect password. Please try again."
        } else if (error.code === 'auth/user-not-found') {
          errorMessage.value = "No user found with this email."
        } else {
          errorMessage.value = "Error: " + error.message
        }
      })
  }
  </script>
  
  <style scoped>
  .login-container {
    max-width: 400px;
    margin: 50px auto;
    padding: 20px;
    border: 1px solid #ddd;
    border-radius: 10px;
    background-color: #f9f9f9;
  }
  
  h1 {
    text-align: center;
    color: #333;
  }
  
  .form-input {
    width: 100%;
    padding: 10px;
    margin-bottom: 15px;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-sizing: border-box;
  }
  
  .form-button {
    width: 100%;
    padding: 10px;
    background-color: #28a745;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
  }
  
  .form-button:hover {
    background-color: #218838;
  }
  
  .error-message {
    color: red;
    text-align: center;
    margin-top: 10px;
  }
  </style>
  