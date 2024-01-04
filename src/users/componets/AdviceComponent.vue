
<script setup>
import { ref } from 'vue';
import useLikeReq from '../composables/useLikeReq'

const props = defineProps({
 adviceData: Object,

})


let requestResponseMsg = ref("")

let clickedId = ref("")

//retorno true solo en el advice que he hecho click comparando  mirando si es de mismo id el advice
//que hice click con ese advice y muestro mensaje
const showReqMessage = (clickedAdviceId, thisAdviceIdFragment, ) => {

   let thisAdviceId;
    clickedId.value = clickedAdviceId 

    if(thisAdviceIdFragment !== undefined){
      thisAdviceId = thisAdviceIdFragment.join("")
       
      if(clickedId.value === thisAdviceId){
      return true
     }
    }else{
       return false
     }
}

const {addLikeReq, removeLikeReq} = useLikeReq(
   showReqMessage,
   requestResponseMsg
  
)

const addLike = async(adviceIdFragment, userIdFragment) => {
 
//al ser el id del advice readonly tomo una copia fragmentada en 
//formato array y recompongo como string

let AdviceId = adviceIdFragment.join("")
let userId = userIdFragment.join("")

await addLikeReq(AdviceId, userId)

}

const removeLike = async(adviceIdFragment, userIdFragment) => {

let AdviceId = adviceIdFragment.join("")
let userId = userIdFragment.join("")  

 await removeLikeReq(AdviceId, userId)
}


</script>

<template>
   
  
<article class="user_advice_container" v-for="advice of props.adviceData" :key="advice._id">
         <header class="user_advice_header">
            <h3>{{ advice.userId.name[0].toUpperCase() + advice.userId.name.slice(1) }}</h3><img :src="advice.img" :alt="advice.img">
         </header>
         <main class="user_advice_main">
         <div class="advice_container">
         <h5>{{ advice.advice }}</h5>
         </div>
         <div class="req_resp" v-if="showReqMessage(clickedId, thisId =[...advice._id])">{{ requestResponseMsg }}</div>    
         <div class="like_container">   
         <button @click="addLike([...advice._id], [...advice.userId._id] )">Add Like</button>
         <p>{{ advice.like }}</p>
         <button @click="removeLike([...advice._id], [...advice.userId._id])">Remove Like</button>
         </div> 
         </main>
        
        
</article>
</template>

<style scoped>

p{
  color: #372e35;
}

.req_resp{
   font-size: 1.2rem;
   color: #372e35;
}

h5{
   color: #372e35;
   word-wrap: break-word;
   height: 100%;
   width: 100%;
   font-weight: normal;
}

button{
   width: 100px;
   border: none;
   background-color: #6e5064;
   border-radius: 50px;
   color:#d7cebb
}

.advice_container{
   display: flex;
   justify-content: center;
   flex-direction: column;
   width: 100%;
   height: 100px;
   overflow-y: scroll;
   background-color: rgb(242, 226, 246);
}

.like_container{
   width: 100%;
   display: flex;
   flex-direction: row;
   justify-content: space-between;
}

.user_advice_container{
      width: 430px;
      background-color: white;
      margin: 10px;
      height: 270px;
      display: flex;
      flex-direction: column;
      padding: 10px;
      font-size: 1.5rem;
      border-radius: 10px;
   }

   .user_advice_header{
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      padding: 10px;
   }

   .user_advice_header h3{
      font-size: 2rem;
      color: #372e35;
   }

   .user_advice_header img{
      width: 130px;
      height: 70px;
      background-color: plum;
   }

   .user_advice_main{
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
      height: 100vh;
   }

 
</style>