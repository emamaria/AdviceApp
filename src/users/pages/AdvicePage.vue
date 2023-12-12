
<script setup>
import { computed} from 'vue';
import useUsersAdvice from '../composables/useUsersAdvice.js' 


const {allAdvice, isLoading} = useUsersAdvice()



console.log(allAdvice.value, '1')

const props = defineProps({
   searchAdvise: String
})


const addLike = (id) => {
    return allAdvice.value.find(data => data.id === id).liked += 1

}

 let adviceData = computed(() => allAdvice.value.filter( data => data.advice.toLowerCase().includes(props.searchAdvise.toLowerCase()) ))

 
</script>


<template>
   <div v-if="isLoading">Loading</div>
   <div v-else class="main_container">
      <article class="user_advice_container" v-for="advice of adviceData" :key="advice._id">
         <header class="user_advice_header">
            <h3>{{ advice.userId.name }}</h3><img :src="advice.img" :alt="advice.img">
         </header>
         <main class="user_advice_main">
         <p>{{ advice.advice }}</p>
         <p @click="addLike(advice.id)">{{ advice.like }}</p>
         </main>
        
      </article>
   </div>

</template>


<style scoped>

   

 
   .main_container{
      /* background-color:pink; */
      margin-top: 5rem;
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      justify-content: center;
   }

   .user_advice_container{
      background-color: white;
      margin: 10px;
      height: 30vh;
      display: flex;
      flex-direction: column;
      padding: 20px;
      font-size: 1.5rem;
   }

   .user_advice_header{
      display: flex;
      flex-direction: row;
      justify-content: space-around;
      padding: 10px;
   }

   .user_advice_header h3{
      font-size: 2rem;
   }

   .user_advice_header img{
      width: 200px;
      height: 10vh;
      background-color: red;
   }

   .user_advice_main{
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
      background-color: pink;
      height: 100vh;
   }

   .user_advice_main p{
      background-color: aqua;
   }
</style>