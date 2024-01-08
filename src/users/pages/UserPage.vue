
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


   if(userAuthAdvice?.value?._id === ""){
    
   const postAdviceResult = await postAdvice(userAdviceText.value, sendingUserImage.value)
      
   console.log(postAdviceResult)
      
    }else{

     const updatedAdvice = await updateAdvice(userAdviceText.value, sendingUserImage.value)
      console.log(updatedAdvice)
    }
   
   
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
   <h2>Create My Advice</h2>

   <div v-if="isLoading" class="top_loading"><i class="fa-solid fa-spinner fa-spin"></i></div>
  
   
      <form  v-else @submit.prevent="submit" class="user_advice_form">
         <div class="user_advice_header">
         <h3>{{ userData.name[0].toUpperCase() + userData.name.slice(1) }}</h3>
         <div class="img_elements_container">
         <img :src="(!userImage)?'/image/noimage.png':userImage" alt="avatar">
         <button type="button" @click.stop="triggerClickImg(imgInput)" value="imgEvent">Select Image</button>
         </div>
         </div>
         <div class="user_advice_main">
         <textarea :required="false" type="text" v-model="userAdviceText" placeholder="write your advice" class="user_text" rows="4" cols="50"></textarea>
         
         </div>    
         <small v-if="requestResponseFail">{{ requestFailMessage }}</small>
         <small v-if="requestResponseOk"><i class="fa-solid fa-circle-check fa-fade"></i></small>
         <small v-if="loading"><i class="fa-solid fa-spinner fa-spin"></i></small>
         <div class="advice_container_footer">
         
           
            <div class="button_container">
            <button type="submit" :class='(blockedCursor)?"block_cursor": ""' @click=clickedButtonValue value="create"> Create </button>
            <button type="submit" :class='(blockedCursor)?"block_cursor": ""' @click=clickedButtonValue value="delete"> Delete </button>
            </div>
            <input @change="editImage" type="file" name="avatar" id="avatar" ref="imgInput">
            
         </div>
      </form>
      
</template>


<style scoped>

h2{
    color: white;
    margin-top: 100px;
    font-size: 2rem;
    text-align: center;
}
.top_loading{
   position: absolute;
   font-size: 3rem;
   top: 50%;
   left: 50%;
   transform: translate(-50%, -50%); 
   color: #d7cebb;
}


small{
   margin-left: auto;
   margin-right: auto;
   font-size: 1.5rem;
   color: #372e35;
}
.user_advice_form{
    display: flex;
    flex-direction: column;
    margin-top: 80px;
    width: 50%;
    margin-left: auto;
    margin-right: auto;
    height: 500px;
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
      font-size: 2.7rem;
      color: #372e35;
   }
   
   .img_elements_container{
    position: relative;
    margin: auto;
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
      height: 120px;
      background-color: #6e5064;
      width: 220px;
      object-fit: cover;
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

button:hover{
   cursor: pointer;
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
      flex-direction: column;
      padding: 10px;
   
}


.button_container{
   padding: 10px;
   margin-top: 20px;
   display: flex;
   justify-content: space-around;
   flex-direction: row;

}
.button_container button{
      padding: 10px;
      background-color: #6e5064;
      border: none;
      border-radius: 50px;
      color: #d7cebb;
      width: 180px;
      margin: 10px;
      font-size: 1.1rem;
}

@media screen and (max-width:600px){
 
   .user_advice_form{
      width: 95%;
   }
  
   .button_container{
   margin: auto;
   flex-direction: column;
  
}
.button_container button{
  margin-top: 20px;
   
}

.user_advice_form{
   height: 600px;
   margin-top: 50px;
}

h2{
   font-size: 1.5rem;
   }

   .user_advice_header h3{
      font-size: 1.7rem;
   }
}

</style>