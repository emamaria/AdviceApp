
<script setup>
import { computed, ref } from 'vue';
import useUsersAdvice from '../composables/useUsersAdvice.js' 
import AdviceComponent from '../componets/AdviceComponent.vue';


const {allAdvice, isLoading} = useUsersAdvice()

const searchAdvise = ref("")

let adviceData = computed(() => allAdvice.value.filter( data => data.advice.toLowerCase().includes(searchAdvise.value.toLowerCase()) ))


 
</script>


<template>
   <div class="top_loading" v-if="isLoading"><i class="fa-solid fa-spinner fa-spin"></i></div>
   <div v-else class="main_container">
      <input v-model="searchAdvise" type="text"  placeholder="find advice by it's containing word">
      <AdviceComponent :adviceData="adviceData" />
   </div>
</template>


<style scoped>

input{
   height: 35px;
   width: 300px;
   border: none;
   position: absolute;
   top: 8rem;
   border-radius: 50px;
   text-align: center;
}

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
      margin-top: 10rem;
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      justify-content: center;
   }


   @media screen and (max-width:500px){
      input{
         width: 250px;
        
      } 
   }

  
</style>