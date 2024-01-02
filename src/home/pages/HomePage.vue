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
   
    <h1>AdviceApp</h1>
    </div>
</template>


<style scoped>


h1{
  
  color:#d7cebb;
  font-size: 1.5rem;
  display: none;
  bottom: 20px;
  text-align: center;
}


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

 @media screen and (max-width:1200px){
 
  

 h2{
    
    font-size: 5rem;
    
 }

 p{
    font-size: 1.5rem;
 }

 
}

@media screen and (max-width:900px){
 

  h2{
    
    font-size: 3rem;
    
 }

 p{
    font-size: 1.2rem;
    width: 95%;
 }

}


@media screen and (max-width:700px){
 
h1{
  display: block;
  font-size: 1.2rem;
}

  p{
   margin-top: 10px;
   font-size: 0.9rem;
  }

  h2{
   font-size: 2rem;
   padding-top: 1rem;

  }

  .app_explanation_container{
    width: 98%;
    padding-left: 0rem;
    padding-right: 0rem;
    text-align: center;
 }
}
</style>