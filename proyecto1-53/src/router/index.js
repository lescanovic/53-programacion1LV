import { createRouter, createWebHashHistory, } from 'vue-router'
import Home from '../views/Home.vue'
import {getAuth} from 'firebase/auth'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: () => import( '../views/About.vue')
  }, 
  {
    path: '/taller',
    name: 'Taller',
    meta: {requiresAuth: true},
    component: () => import ('../views/Taller.vue')
    
  },
  {
    path: '/producto',
    nombre: '/Producto',
    meta: {requiresAuth: true},
    component: () => import ('../views/Producto.vue')

  },

  {
    path: '/alumnoscet30',
    name: 'Alumno',
    meta: {requiresAuth: true},
    component: () => import ('../views/Alumno.vue')
  },

  {
    path: '/notebook',
    name: 'Notebook',
    meta: {requiresAuth: true},
    component: () => import ('../views/Notebook.vue')
  }, 
  {
    path:'/autenticacion',
    name:'Autenticacion',
    component: () => import('../views/Autenticacion.vue') 
  }


  
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  if(to.matched.some(record => record.meta.requiresAuth)){
    const auth = getAuth();
    const usuario = auth.currentUser;
    console.log ('usuario desde router', usuario)
    if(!usuario){
      next({path: '/'})
    }else{
      next()
    }
  } else {
    next()
  }
})

export default router
