
<script setup>
import { computed } from 'vue';
import useUsersAdvice from '../composables/useUsersAdvice.js' 
import AdviceComponent from '../componets/AdviceComponent.vue';


const {allAdvice, isLoading, isError, error} = useUsersAdvice()


const props = defineProps({
   searchAdvise: String
})



 let adviceData = computed(() => allAdvice.value.filter( data => data.advice.toLowerCase().includes(props.searchAdvise.toLowerCase()) ))

 
</script>


<template>
   <div v-if="isLoading">Loading</div>
   <div v-else-if="isError">{{error}}</div>
   <div v-else class="main_container">
      <AdviceComponent :adviceData="adviceData" />
   </div>

</template>


<style scoped>

.req_message{
   font-size: 5rem;
   position: absolute;

}

.req_message#loading{
   top: 20px;
}
.req_message#responseOk{
   top: 50px;
}

.req_message#responseFail{
   top: 80px;
}




 
   .main_container{
      /* background-color:pink; */
      margin-top: 5rem;
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      justify-content: center;
   }

  
</style>