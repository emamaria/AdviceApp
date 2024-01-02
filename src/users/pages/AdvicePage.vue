
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
   <div class="top_loading" v-if="isLoading"><i class="fa-solid fa-spinner fa-spin"></i></div>
   <div v-else-if="isError">{{error}}</div>
   <div v-else class="main_container">
      <AdviceComponent :adviceData="adviceData" />
   </div>

</template>


<style scoped>

.top_loading{
   position: absolute;
   font-size: 3rem;
   top: 50%;
   left: 50%;
   color: #d7cebb;
}

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