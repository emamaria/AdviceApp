
<script setup>

import { useRouter } from 'vue-router';
import useUserAuth from '../../home/composables/useUserAuth';


//añadido logout
const {userData, logout} = useUserAuth()

const router = useRouter()

const cleanData = () => {
   logout()
   window.location.reload()
   router.push({name: 'home'})
}

</script>


<template>
  <div class="container">
   <header>  
      <nav>
      <RouterLink :to="{name: 'users-advice'}">Advice</RouterLink>
      <RouterLink :to="{name: 'user', params: {id:userData.uid}}">User</RouterLink>
      <RouterLink :to="{name: 'personal', params: {id:userData.uid}}">Personal</RouterLink>
      <button @click="cleanData">Logout</button>
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


  .container{
    background-color: #6e5064;
    min-height: 100vh;
    margin-bottom: 100px;
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