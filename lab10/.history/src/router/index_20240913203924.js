import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import FirebaseSigninView from '../views/FirebaseSigninView.vue'
import FirebaseRegisterView from '../views/FirebaseRegisterView.vue'
import AdminView from '../views/AdminView.vue'
import AddBookView from '../views/AddBookView.vue'
const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView
  },
  {
    path: '/admin',
    name: 'Admin',
    component: AdminView
  },
  {
    path: '/addBook',
    name: 'AddBook',
    component: AddBookView
  },
  {
    path: '/about',
    name: 'About',
    component: AboutView
  },
  {
    path: '/fireLogin',
    name: 'FireLogin',
    component: FirebaseSigninView
  },
  {
    path: '/fireRegister',
    name: 'FireRegister',
    component: FirebaseRegisterView
  }

]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router