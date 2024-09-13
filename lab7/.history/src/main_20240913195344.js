import 'bootstrap/dist/css/bootstrap.min.css'
// Import the functions you need from the SDKs you need

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import PrimeVue from 'primevue/config'
import Aura from '@primevue/themes/aura'


const app = createApp(App)

const firebaseConfig = {
    apiKey: "AIzaSyBqfigvQiJbcdu2h4yEhtTyAScu6E0qUg4",
    authDomain: "week7-jxy.firebaseapp.com",
    projectId: "week7-jxy",
    storageBucket: "week7-jxy.appspot.com",
    messagingSenderId: "337741615384",
    appId: "1:337741615384:web:4e35d22e80321f1c13ce6d"
  };
initializeApp(firebaseConfig)
app.use(PrimeVue, { theme: { preset: Aura } })
app.use(router)

app.mount('#app')

