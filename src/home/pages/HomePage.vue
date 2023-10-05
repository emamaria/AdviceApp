<script setup>
</script>


<template>
   <h1>Home</h1>
   <div class="wrapper">
      <!-- <HelloWorld msg="You did it!" /> -->

      <nav>
        <RouterLink :to="{name: 'home'}">Home</RouterLink>
        <RouterLink :to="{name: 'login'}">Sign In</RouterLink>
        <RouterLink :to="{name: 'register'}">Sign Up</RouterLink>
      </nav>
    </div>
</template>


<style scoped>

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}
</style>