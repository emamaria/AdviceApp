<script setup>
import NavBar from '../shared/components/NavBar.vue';




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
     <main class="app_explanation_container">
       <h2>Give one advice about anything you want!</h2>
       <p>For example: Better have Ceylon Cinnamon than Cassia, is less toxic for your liver, anyway don`t abuse any of it.</p>
        
    </main>
   
    
    </div>
</template>


<style scoped>


 h2{
    color: white;
    font-size: 7rem;
    
 }

 p{
    width: 70%;
    margin-top: 30px;
    font-size: 2rem;
    padding: 2rem;
    color: #d7cebb;
 }
 .container{
    background-color: #6e5064;
    min-height: 100vh;
   
 }

 .app_explanation_container{
    width: 90%;
    padding: 6rem;
 }
</style>