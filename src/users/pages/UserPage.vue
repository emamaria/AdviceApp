
<script setup>
import userApi from '../../api/api';
import { useAdviceStore } from '../../stores/advice';
import useUserAdvice from '../composables/useUserAdvice';
import { ref, watch } from 'vue';
import {useUserStore} from '../../stores/user'


const {userData} = useUserStore()
 const {userAuthAdvice, isError, error, isLoading} = useUserAdvice()

 console.log(userAuthAdvice, "mi userAuth")
    const adviceStore = useAdviceStore()

 let userAdviceText = ref(userAuthAdvice.value.advice)
 let userImage = ref(userAuthAdvice.value.img)
 let sendingUserImage = ref()
 const loading =  ref(false)
 const requestResponseOk = ref(false)
 const requestResponseFail = ref(false)

 const options = {
        headers: {
         'Content-Type': 'multipart/form-data',
         'token': localStorage.getItem('token')}
      };

 const postAdvice = async(postData, postImage) => {
  
      loading.value = true
      const newData = {
         advice: postData,
         userId:userAuthAdvice.value.userId.uid,
         image: postImage
      }

      try {
         const {data} = await userApi.post(`/advice`, newData, options )
          console.log("post advice", data)
  

          loading.value = false

          requestResponseOk.value = true

          adviceStore.editAdvice(data.advice.advice,  data.advice.img, data.advice._id) 

         setTimeout(()=> {
         requestResponseOk.value = false
         }, 2000)

          return data
      } catch (error) {

           loading.value = false
           requestResponseFail.value = true
           setTimeout(()=> {
            requestResponseFail.value = false
         }, 2000)

           console.log(error)
      }
 }



 const updateAdvice = async(updateData, updateImage) => {

   loading.value = true

   const newData = {
      advice: updateData,
      image: updateImage
   }

   console.log(updateImage, "mi imagen")

      try {

         console.log(options)
         const {data} = await userApi.patch(`/advice/${userAuthAdvice.value._id}`, newData, options )
         console.log("patch data", data)
        
        loading.value = false

        requestResponseOk.value = true

        adviceStore.editAdvice(data.updatedAdvice.advice, data.updatedAdvice.img) 

        setTimeout(()=> {
         requestResponseOk.value = false
        }, 2000)

        return data

      } catch (error) {

         loading.value = false
         requestResponseFail.value = true
           setTimeout(()=> {
            requestResponseFail.value = false
         }, 2000)
          console.log(error)
      }
   
 }



const createAdvice = async() => {

  
  
    if(userAuthAdvice.value.advice.length > 0){
       const updatedAdvice = await updateAdvice(userAdviceText.value, sendingUserImage.value)
       console.log(updatedAdvice)
    }else{
        const postAdviceResult = await postAdvice(userAdviceText.value, sendingUserImage.value)

        console.log(postAdviceResult)
    }
   
}

const deleteAdvice = () => {
  console.log("delete advice")
}


const editImage = (e) => {

   const myImage = e.target.files[0]

   sendingUserImage.value = myImage

   console.log(sendingUserImage.value, "imgen subo")

   const readFile = new FileReader()
   readFile.readAsDataURL(myImage)

   readFile.onloadend = ()=> {
   
   userImage.value = readFile.result
   }
 
   
}

watch(userAuthAdvice, () => {
   userAdviceText.value = userAuthAdvice.value.advice
   userImage.value = userAuthAdvice.value.img
})




</script>


<template>

   <div v-if="isLoading">Loading</div>
   <div v-else-if="isError">{{ error }}</div>
   <div v-else class="main_container">

      <article class="user_advice_container">
         <header class="user_advice_header">
         <h3>{{ userData.name }}</h3>
         <div v-if="requestResponseFail" class="req_response">Try Again!</div>
         <div v-if="requestResponseOk" class="req_response">Success!👍</div>
         <div v-if="loading">loading...</div>
         <img :src="userImage" :alt="userImage">
         </header>
         <main class="user_advice_main">
         <textarea type="text" v-model="userAdviceText" class="user_text" rows="4" cols="50"></textarea>
         </main>
         <footer class="advice_container_footer">
         
            <button @click="createAdvice"> Create </button>
            <button @click="deleteAdvice"> Delete </button>
            <input @change="editImage" type="file" name="avatar" id="avatar">
            
         </footer>
      </article>
   </div>
 
</template>


<style scoped>

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