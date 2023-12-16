
<script setup>

import { useRoute, useRouter } from 'vue-router';
import { computed, ref, watch } from 'vue';
import useUserAuth from '../../home/composables/useUserAuth';


//añadido logout
 const {userData, logout} = useUserAuth()

const route = useRoute()

const router = useRouter()
const currentPath = computed(() => route.name)
console.log(currentPath.value)

const searchAdvise = ref("")

watch(searchAdvise, () => {
  console.log(searchAdvise.value)
})

const cleanData = () => {

   router.push({name: 'home'})
   logout()

  
}

</script>


<template>
  <div class="container">
   <header>
   
      <input v-model="searchAdvise" v-if="currentPath === 'users-advice'" type="text"  placeholder="find advice type by word">
      <nav>
      <RouterLink :to="{name: 'users-advice'}">Advice</RouterLink>
      <RouterLink :to="{name: 'user', params: {id:userData.uid}}">User</RouterLink>
      <button @click="cleanData">Logout</button>
      </nav>
   </header>
   

<RouterView :searchAdvise="searchAdvise"/>
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