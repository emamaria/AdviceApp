<script setup>
// import useUserAuth from '../src/home/composables/useUserAuth'
// const {validateToken } = useUserAuth()
// import { useRouter } from 'vue-router';







// const router = useRouter()


// const changeRoute = () => {
//    router.push({path: '/'})
// }

// const checkToken = async() => {
//  let result = await validateToken()
//  console.log("validate token result", result)

// if(result === 'error'){
//   console.log("error")
//   changeRoute()
// }

// }

// checkToken()



</script>

<template>
 <div class="container">
   <RouterView />
</div>
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

.container{
  background-color:#6e5064;
  min-height: 100vh;
}


@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
