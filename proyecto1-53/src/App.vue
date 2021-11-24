<template> 

  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">

  <div class="container-fluid">
    <a class="navbar-brand" href="#">VUE proyecto 1</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
      <div class="navbar-nav">
      
        <router-link class="nav-link " to="/">Home</router-link> 
        <router-link class="nav-link" to="/about">About</router-link> 
        <router-link v-if="usuario?.email !=null" class="nav-link" to="/taller">Mi taller preferido</router-link>
        <router-link v-if="usuario?.email !=null" class="nav-link" to="/producto">Producto</router-link>
         <router-link v-if="usuario?.email !=null" class="nav-link" to="/alumnoscet30">Alumno</router-link>
         <router-link v-if="usuario?.email !=null" class="nav-link" to="/notebook">Notebook</router-link>



       
      </div>
    </div>

    <div class="navbar-nav"> 
     <h6 class="nav-link">{{usuario?.email}}</h6>
     <router-link v-if="usuario?.email ==null" class="nav-link" to="/Autenticacion">Inicio</router-link> 
<!-- cuando el usuario haya ingresado no se mostrara el "inicio de sesion" -->
  <button @click="cerrar_sesion()" v-if="usuario?.email !=null" class="btn btn-danger ">Cerrar sesion</button>
   </div>

  </div>
</nav>

<div class="container mt-3">
  <router-view/>
</div>
 

</template>

<script>
import{auth} from '@/utils/firebase.js'
import {onAuthStateChanged,signOut} from 'firebase/auth'
export default {
  data()
  {
    return{
      usuario:null
    }
  },
  methods:{

        usuario_logueado()
        {
          onAuthStateChanged (auth,(user) =>{
              this.usuario = user;
          })
        },
        cerrar_sesion(){
          try {
            signOut (auth)
            this.$router.push('/')
          } catch (error) {
            alert('algo sucedio!')
          }
        },
  },
      
  mounted() {
    this.usuario_logueado()
  }

}
</script>