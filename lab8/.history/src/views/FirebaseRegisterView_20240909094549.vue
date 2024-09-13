<template>
  <h1>Create an Account</h1>
  <p><input type="text" placeholder="Email" v-model = "email"/></p>
  <p><input type="password" placeholder="Password" v-model="password" /></p>
  <p><button @click="register">Save to Firebase</button></p>
</template>

<script setup>
import { ref } from "vue"
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth"
import { useRouter } from "vue-router"

const email = ref("")
const password = ref("")
const router = useRouter()
const auth = getAuth()

const register = () => {
    createUserWithEmailAndPassword(auth, email.value, password.value)
    .then((data) => {
        console.log("Firebase Register Successful!")
        router.push("/fireLogin")
    }).catch((error) => {
        console.log(error.code)
    })
}
</script>

<style scoped>
/* 容器样式 */
.register-container {
  max-width: 400px;
  margin: 100px auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
}

/* 标题样式 */
h1 {
  font-size: 24px;
  margin-bottom: 20px;
  color: #333;
}

/* 输入框样式 */
.form-input {
  width: 100%;
  padding: 12px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-sizing: border-box;
  font-size: 16px;
}

/* 按钮样式 */
.form-button {
  width: 100%;
  padding: 12px;
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
</style>
