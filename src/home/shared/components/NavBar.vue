<script setup>


const props = defineProps({
 links: Array
})



</script>


<template>
<h1>AdviseApp</h1>
<nav>
<RouterLink :key="link.name" v-for="link of props.links" :to="{name:link.name}">{{ link.title }}</RouterLink>
</nav>
</template>


<style scoped>

h1{
  padding:2px;
  position: absolute;
  margin: 20px;
  color:#d7cebb;
  font-size: 1.5rem;
}



nav {
  width: 100%;
 display: flex;
 justify-content:flex-end ;
 background-color: #6e5064;
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