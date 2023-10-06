<script setup>
import NavBar from '../../shared/components/NavBar.vue';


const links = [
    {name: "home", title:"Home"},
    {name:"login", title: "Sign In"}, 
    {name:"register", title: "Sign Up"}
 ]
</script>


<template>
<header>
    <NavBar :links="links"/>    
</header>
   
   <div class="container">
    <h1>Home</h1>

    
    </div>
</template>


<style scoped>

 .container{
    background-color: #6e5064;
    min-height: 100vh;
 }
</style>