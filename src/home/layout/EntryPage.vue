
<script setup>

import { RouterView } from 'vue-router';
import NavBar from '../shared/components/NavBar.vue';


const links = [
    {name: "home", title:"Home"},
   
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
   background-color: #6e5064;
   min-height: 100vh;
 
}

main{
   display: flex;
   flex-direction: column;
   justify-content: center;
   align-items: center;
   min-height: 100vh;
}
</style>