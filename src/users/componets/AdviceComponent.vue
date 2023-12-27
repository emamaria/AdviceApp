<script setup>


const props = defineProps({
 adviceData: Object,
 addLikeReq: Function,
 removeLikeReq: Function
})




const addLike = async(adviceIdFragment, userIdFragment) => {

  
//al ser el id del advice readonly tomo una copia fragmentada en 
//formato array y recompongo como string

let AdviceId = adviceIdFragment.join("")
let userId = userIdFragment.join("")

 await props.addLikeReq(AdviceId, userId)
//sumLike(AdviceId)
}

const removeLike = async(adviceIdFragment, userIdFragment) => {

let AdviceId = adviceIdFragment.join("")
let userId = userIdFragment.join("")  

 await props.removeLikeReq(AdviceId, userId)
}


</script>

<template>
   
  
<article class="user_advice_container" v-for="advice of props.adviceData" :key="advice._id">
         <header class="user_advice_header">
            <h3>{{ advice.userId.name }}</h3><img :src="advice.img" :alt="advice.img">
         </header>
         <main class="user_advice_main">
         <p>{{ advice.advice }}</p>
         <p>{{ advice.like }}</p>
         <button @click="addLike([...advice._id], [...advice.userId._id] )">Add Like</button>
         <button @click="removeLike([...advice._id], [...advice.userId._id])">Remove Like</button>
         </main>
        
        
</article>
</template>

<style scoped>


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