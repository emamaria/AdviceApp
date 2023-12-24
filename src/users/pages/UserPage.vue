
<script setup>


import useUserAdvice from '../composables/useUserAdvice';
import { ref, watch } from 'vue';
import {useUserStore} from '../../stores/user'
import useAdviceReq from '../composables/useAdviceReq';

const {userData} = useUserStore()
const {userAuthAdvice, isLoading} = useUserAdvice()

let userAdviceText = ref(userAuthAdvice.value.advice)
let userImage = ref(userAuthAdvice.value.img)
let sendingUserImage = ref()
const imgInput = ref(null)
const loading =  ref(false)
const requestResponseOk = ref(false)
const requestResponseFail = ref(false)
const requestFailMessage = ref("")
const blockedCursor = ref(false)
let clickedButton = ref("")
 
 const { postAdvice,updateAdvice,deleteAdvice} = useAdviceReq(
   userData,
    loading,
    requestResponseOk,
    userAuthAdvice,
    requestResponseFail,
    requestFailMessage,
    blockedCursor,
    userAdviceText,
    userImage,
    imgInput
   )

 

const createAdvice = async() => {

   blockedCursor.value = true

   if(userAuthAdvice?.value?._id === ""){
    
   const postAdviceResult = await postAdvice(userAdviceText.value, sendingUserImage.value)
      
   console.log(postAdviceResult)
      
    }else{

     const updatedAdvice = await updateAdvice(userAdviceText.value, sendingUserImage.value)
      console.log(updatedAdvice)
    }
   
    blockedCursor.value = false 
   
}



const editImage = (e) => {

   const myImage = e.target.files[0]

   sendingUserImage.value = myImage

   const readFile = new FileReader()
   readFile.readAsDataURL(myImage)

   readFile.onloadend = ()=> {
   
   userImage.value = readFile.result
   }
 
   
}


const clickedButtonValue = (e) => {
   clickedButton.value = e.target.value
}

const submit = async() => {
   if(clickedButton.value === "create"){
     await createAdvice()
   }

   if(clickedButton.value === "delete"){
     await deleteAdvice()
   }
  
}

watch(userAuthAdvice, () => {
   userAdviceText.value = userAuthAdvice.value.advice
   userImage.value = userAuthAdvice.value.img
 
})




</script>


<template>

   <div v-if="isLoading">Loading</div>
   <div v-else class="main_container">

      <form @submit.prevent="submit" class="user_advice_container">
         <header class="user_advice_header">
         <h3>{{ userData.name }}</h3>
         <div v-if="requestResponseFail" class="req_response">{{ requestFailMessage }}</div>
         <div v-if="requestResponseOk" class="req_response">Success!👍</div>
         <div v-if="loading">loading...</div>
         <img :src="userImage" :alt="userImage">
         </header>
         <main class="user_advice_main">
         <textarea :required="false" type="text" v-model="userAdviceText" class="user_text" rows="4" cols="50"></textarea>
         </main>
         <footer class="advice_container_footer">
         
            <button type="submit" :class='(blockedCursor)?"block_cursor": ""' @click=clickedButtonValue value="create"> Create </button>
            <button type="submit" :class='(blockedCursor)?"block_cursor": ""' @click=clickedButtonValue value="delete"> Delete </button>
            <input @change="editImage" type="file" name="avatar" id="avatar" ref="imgInput">
            
         </footer>
      </form>
   </div>
 
</template>


<style scoped>


.block_cursor{
   pointer-events: none
}
.req_response{
   font-size: 2rem;
}

h3{
   margin-bottom: 20px;
   font-size: 2rem;
}

.user_name{
   font-size: 2rem;
}

.user_text{
   width: 100%;
   font-size: 1.5rem;
}

.main_container{
   display: flex;
   flex-direction: column;
   justify-content: center;
   align-items: center;
}
.user_advice_container{
      background: white;
      margin: 10px;
      display: flex;
      flex-direction: column;
      padding: 20px;
      font-size: 1.5rem;
   }

   .user_advice_header{
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      margin-bottom: 10px;
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
      
   }

   .user_advice_main p{
      background-color: aqua;
   }

   .advice_container_footer{
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      padding: 10px;
   }

   .advice_container_footer button{
      padding: 10px;
   }
</style>