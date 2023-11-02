
<script setup>

import { RouterView } from 'vue-router';

</script>


<template>
  <div class="container">
   <header>
   
      <input type="text"  placeholder="find advice type by word">
      <nav>
      <RouterLink :to="{name: 'users-advice'}">Advice</RouterLink>
      <RouterLink :to="{name: 'user', params: {id:'123'}}">User</RouterLink>
      <RouterLink :to="{name: 'entry'}">Logout</RouterLink>
      </nav>
   </header>
   

<RouterView/>
  </div>
   
</template>


<style scoped>
header{
   width: 100%;
   display: flex;
   justify-content: flex-end;
   align-items: center;
   padding-top: 20px;
}

input{
   height: 35px;
   width: 300px;
   margin-right: 100px;
   border: none;
}
  .container{
    background-color: #6e5064;
    min-height: 100vh;
   
 }

 nav {
 
 display: flex;
 padding-right: 30px;
}

nav a.router-link-exact-active {
  color: #d7cebb;
}


nav a {
  margin: 25px;
  color: white;
  text-decoration: none;
  font-size: 1.3rem;
}

nav a:hover{
  color:#d7cebb
}

nav a:first-of-type {
  border: 0;
}
</style>