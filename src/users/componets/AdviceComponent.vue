
<script setup>
import { ref } from 'vue';
import useLikeReq from '../composables/useLikeReq'

const props = defineProps({
 adviceData: Object,

})


let requestResponseMsg = ref("")

let clickedId = ref("")

const blockedCursor = ref(false)


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
   requestResponseMsg,
   blockedCursor
  
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
            <h3>{{ advice.userId.name[0].toUpperCase() + advice.userId.name.slice(1) }}</h3><img :src="(!advice.img)?'/image/noimage.png':advice.img" alt="avatar">
         </header>
         <main class="user_advice_main">
         <div class="advice_container">
         <h5>{{ advice.advice }}</h5>
         </div>
         <div class="req_resp" v-if="showReqMessage(clickedId, thisId =[...advice._id])">{{ requestResponseMsg }}</div>    
         <div class="like_container">  
         <div class="like">
         <img  id="heart" src="/image/heart.png" alt="heart_icon">
         <p>{{ advice.like }}</p>
         </div> 
         <div class="like_buttons_container">
         <button @click="removeLike([...advice._id], [...advice.userId._id])" :class='(blockedCursor)?"block_cursor": ""'>- Like</button>
         <button @click="addLike([...advice._id], [...advice.userId._id] )" :class='(blockedCursor)?"block_cursor": ""'>+ Like</button> 
         </div>
         </div> 
         </main>
        
        
</article>
</template>

<style scoped>

.block_cursor{
   pointer-events: none
}

.like_buttons_container{
   display: flex;
   flex-direction: row;
}

.like{
   display: flex;
   flex-direction: row;
   width: 150px;
   align-items: center;
}

#heart{
   width: 20px;
}

p{
  color: #372e35;
  font-size: 1.3rem;
  margin-left: 10px;
}

.req_resp{
   font-size: 1.1rem;
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
   width: 50px;
   border: none;
   background-color: #6e5064;
   border-radius: 50px;
   color:#d7cebb;
   padding: 5px;
   margin: 3px;
}

.advice_container{
   display: flex;
   justify-content: center;
   flex-direction: column;
   width: 100%;
   height: 100px;
   overflow-y: scroll;
   background-color: rgb(245, 243, 246);
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
      object-fit: cover;
   }

   .user_advice_main{
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
      height: 100vh;
   }

   @media screen and (max-width:500px){
      .user_advice_container{
         width: 90%;
         
      } 

      .req_resp{
         font-size: 0.9rem;
      }

      .user_advice_header h3{
        font-size: 1.5rem;
      }

      .user_advice_header img{
         width: 120px;
         height: 60px;
      }

      p{
         font-size: 1.2rem;
      }

      .advice_container{
         height: 110px;
      }

      h5{
         font-size: 1.1rem;
      }
      
   }
 
</style>