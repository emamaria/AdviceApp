
<script setup>

import { useRouter } from 'vue-router';
import useUserAuth from '../../home/composables/useUserAuth';
import { ref } from 'vue';


//añadido logout
const {userData, logout} = useUserAuth()

const router = useRouter()

const cleanData = () => {
   logout()
   window.location.reload()
   router.push({name: 'home'})
}

const respMenu = ref(false)

const respNavStyle = ref("nav nav_noshow")

const clickHamburguer = () => {

  respMenu.value = !respMenu.value
  respNavStyle.value = (respMenu.value)? 'nav nav_show':'nav nav_noshow'
}

</script>


<template>
  <div class="container">
   <header>  
      <h3>{{ userData.name[0].toUpperCase() + userData.name.slice(1) }}</h3>
      <nav :class="respNavStyle">
      <RouterLink :to="{name: 'users-advice'}">all advice</RouterLink>
      <RouterLink :to="{name: 'user', params: {id:userData.uid}}">my advice</RouterLink>
      <RouterLink :to="{name: 'personal', params: {id:userData.uid}}">my data</RouterLink>
      <button @click="cleanData">Logout</button>
      </nav>
      <div class="hamburguer" @click="clickHamburguer"><i class="fa-solid fa-bars"></i></div>
    </header>  
<RouterView/>
  </div>
   
</template>


<style scoped>

.hamburguer{
  color: white;
  position: absolute;
  top: 25px;
  right: 25px;
  font-size: 1.5rem;
  display: none;
}

h3{
  position: absolute;
  left: 25px;
  top: 25px;
  padding-left: 15px;
  padding-right: 15px;
  font-size: 1.2rem;
  color: #ede0f3;
  border: 2px solid #ede0f3;
  border-radius: 50px;
  font-weight: normal;
}

header{
   width: 100%;
   display: flex;
   justify-content: end;
   align-items: center;
   padding-top: 20px;
   height: 50px;
}

button{
  height: 0px;
  border: none;
  color: white;
  font-size: 1.2rem;
  margin-top: 28px;
  margin-left: 50px;
}

button:hover{
  color: #d7cebb;
}
  .container{
    background-color: #6e5064;
    min-height: 100vh;
    margin-bottom: 100px;
 }

 .nav{
 
 display: flex;
 flex-direction: row;
 justify-content: space-between;
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

@media screen and (max-width:700px){

  .hamburguer{
  display: block;
}
 
  .nav_show{
   
    margin-top: 230px;
    flex-direction: column;
    padding-top: 20px;
    padding-bottom: 20px;
    background-color: #ede0f3;
    opacity: 0.8;
    width: 100%;
    align-items: end;
    justify-content: baseline;
    z-index: 1;
  }

  .nav_noshow{
    display: none;
    margin-top: 230px;
    flex-direction: column;
    padding-top: 20px;
    padding-bottom: 20px;
    background-color: #ede0f3;
    opacity: 0.8;
    width: 100%;
    align-items: end;
    justify-content: baseline;
    z-index: 1;
  }


 

  nav a{
    margin: 0;
    color: #372e35;
    padding-top: 2px;
    font-size: 1.2rem;
  }

  button{
    margin: 0;
    background-color: #ede0f3;
    padding-top: 20px;
    padding-bottom: 20px;
    color: #372e35;
    font-size: 1.2rem;
  }

  nav a.router-link-exact-active {
  color: #6f5a2d;
}

}
</style>