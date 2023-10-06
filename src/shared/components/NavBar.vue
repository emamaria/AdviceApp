<script setup>


const props = defineProps({
 links: []
})



</script>


<template>
   
<nav>
<RouterLink :key="link.name" v-for="link of props.links" :to="{name: link.name }">{{ link.title }}</RouterLink>
</nav>
</template>


<style scoped>


nav {
  width: 100%;
 display: flex;
 justify-content:flex-end ;
 background-color: #6e5064;
}

nav a.router-link-exact-active {
  color: white;
}

nav a.router-link-exact-active:hover {
  color: white;
}

nav a {
  margin: 10px;
  color: #d7cebb;
  text-decoration: none;
}

nav a:first-of-type {
  border: 0;
}
</style>