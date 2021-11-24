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
        <router-link class="nav-link" to="/catalogopublic">Catalogo</router-link> 
        <router-link class="nav-link" to="/catalogoadmin">Carga de productos</router-link> 
        
        
      </div>
    </div>
  
  </div>
</nav>

<div class="container mt-3">
  <router-view/>
</div>

</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
