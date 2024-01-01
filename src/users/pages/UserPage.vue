
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


const triggerClickImg = (imgInput) =>{

   imgInput.click()

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

   
      <form  v-else @submit.prevent="submit" class="user_advice_form">
         <div class="user_advice_header">
         <h3>{{ userData.name }}</h3>
         <div class="img_elements_container">
         <img :src="userImage" :alt="userImage">
         <button type="button" @click.stop="triggerClickImg(imgInput)" value="imgEvent">Select Image</button>
         </div>
         </div>
         <div class="user_advice_main">
         <textarea :required="false" type="text" v-model="userAdviceText" placeholder="write your advice" class="user_text" rows="4" cols="50"></textarea>
         
         </div>
         <div class="advice_container_footer">
         
            <button type="submit" :class='(blockedCursor)?"block_cursor": ""' @click=clickedButtonValue value="create"> Create </button>
            <small v-if="requestResponseFail">{{ requestFailMessage }}</small>
            <small v-if="requestResponseOk">Success!👍</small>
            <small v-if="loading">loading...</small>
            <button type="submit" :class='(blockedCursor)?"block_cursor": ""' @click=clickedButtonValue value="delete"> Delete </button>
            <input @change="editImage" type="file" name="avatar" id="avatar" ref="imgInput">
            
         </div>
      </form>
      
</template>


<style scoped>


.user_advice_form{
    display: flex;
    flex-direction: column;
    margin-top: 150px;
    width: 50%;
    margin-left: auto;
    margin-right: auto;
    height: 400px;
    border-radius: 10px;
    background-color: white;
    padding: 15px;
   }

   .user_advice_header{
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
     justify-content: space-between;
   }

   .user_advice_header h3{
      margin: auto;
      padding: 5px;
      font-size: 3rem;
      color: #6e5064;
   }
   
   .img_elements_container{
    position: relative;
   }

   .img_elements_container button{
    position: absolute;
    right: 2px;
    bottom: 2px;
    border-radius: 2px;
    height: 30px;
    width: 100px;
    background-color:#d7cebb;
    border: none;
    border-radius: 20px;
   }

   img{
      margin: 10px;
      width: 300px;
      height: 100px;
      background-color: #6e5064;
   }


   .user_advice_main{
     display: flex;
     height: 30vh;
   }

   .user_advice_main textarea{
      background-color: white;
      margin: 10px;
      border-color: #d7cebb;
   }


#avatar{
   display: none;
}
.block_cursor{
   pointer-events: none
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
      background-color: #6e5064;
      border: none;
      border-radius: 50px;
      color: #d7cebb;
   }
</style>