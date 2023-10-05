
<script setup>

import { RouterView } from 'vue-router';
import NavBar from '../../shared/components/NavBar.vue';

const links = [
    {name: "home", title:"Home"},
    {name:"login", title: "Sign In"}, 
    {name:"register", title: "Sign Up"}
 ]
</script>


<template>
   <div class="container">
      <header>
        <NavBar :links="links"/>    
    </header>
    <main>
  
   <RouterView/>
</main>
      </div>
   
</template>


<style scoped>

.container{
   background-color: orangered;
   min-height: 100vh;

 
}

main{
   display: flex;
   flex-direction: column;
   justify-content: center;
   align-items: center;
}
</style>