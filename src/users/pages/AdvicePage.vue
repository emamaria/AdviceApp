
<script setup>
import { computed} from 'vue';
import useUsersAdvice from '../composables/useUsersAdvice.js' 
import AdviceComponent from '../componets/AdviceComponent.vue';


const {allAdvice, isLoading, isError, error} = useUsersAdvice()



const props = defineProps({
   searchAdvise: String
})


// const addLike = (id) => {
//     return allAdvice.value.find(data => data.id === id).liked += 1

// }

 let adviceData = computed(() => allAdvice.value.filter( data => data.advice.toLowerCase().includes(props.searchAdvise.toLowerCase()) ))

 
</script>


<template>
   <div v-if="isLoading">Loading</div>
   <div v-else-if="isError">{{error}}</div>
   <div v-else class="main_container">
      <AdviceComponent :adviceData="adviceData"/>
     
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

  
</style>