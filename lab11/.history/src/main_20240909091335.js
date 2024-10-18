import 'bootstrap/dist/css/bootstrap.min.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import PrimeVue from 'primevue/config'
import Aura from '@primevue/themes/aura'

import { initializeApp } from "firebase/app"; 

app.use(PrimeVue, { theme: { preset: Aura } })
app.use(router)

app.mount('#app')
const firebaseConfig = {
    apiKey: "AIzaSyBqfigvQ¡Jbcdu2h4yEhtTyAScu6E0qUg4",
    authDomain: "week7-jxy.firebaseapp.com",
    projectId: "week7-jxy",
    storageBucket: "week7-jxy.appspot.com",
    messagingSenderId: "337741615384",
    appId: "1:337741615384:web:435d22e80321f1c13ce6d",
    measurementId: "G-SZ90GZXZWS"
};
initializeApp(firebaseConfig);  // Correct function name

// Create Vue app instance
const app = createApp(App);