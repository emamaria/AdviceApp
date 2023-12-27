
<script setup>
import { computed, ref } from 'vue';
import useUsersAdvice from '../composables/useUsersAdvice.js' 
import AdviceComponent from '../componets/AdviceComponent.vue';
import useLikeReq from '../composables/useLikeReq'

const {allAdvice, isLoading, isError, error} = useUsersAdvice()

let loading = ref(false)
let requestFailMessage = ref("")
let requestResponseOk = ref(false)
let requestResponseFail = ref(false)


const {addLikeReq, removeLikeReq} = useLikeReq(

   loading, 
   requestFailMessage,
   requestResponseOk,
   requestResponseFail
)

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
      <div class="req_message" id="loading" v-if="loading">loading...</div>
      <div class="req_message" id="responseOk" v-if="requestResponseOk">Ok!👍</div>
      <div class="req_message" id="responseFail" v-if="requestResponseFail">{{ requestFailMessage }}</div>
      <AdviceComponent :adviceData="adviceData" :addLikeReq="addLikeReq"  :removeLikeReq="removeLikeReq"/>
     
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