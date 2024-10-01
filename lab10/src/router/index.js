import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import FirebaseSigninView from '../views/FirebaseSigninView.vue'
import FirebaseRegisterView from '../views/FirebaseRegisterView.vue'
import AdminView from '../views/AdminView.vue'
import AddBookView from '../views/AddBookView.vue'
import GetBookCountView from '../views/GetBookCountView.vue'
import WeatherView from '../views/WeatherView.vue'
import CountBookAPI from '../views/CountBookAPI.vue'
const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView
  },
  {
    path: '/countbook',
    name: 'Countbook',
    component: CountBookAPI
  },
  {
    path: '/weather',
    name: 'Weather',
    component: WeatherView
  },
  {
    path: '/getBookCount',
    name: 'GetBookCount',
    component: GetBookCountView
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