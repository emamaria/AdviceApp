
<script setup>
import userApi from '../../api/api';
import { useAdviceStore } from '../../stores/advice';
import useUserAdvice from '../composables/useUserAdvice';
import { ref, watch } from 'vue';


 const {userAuthAdvice, isError, error, isLoading} = useUserAdvice()

    const adviceStore = useAdviceStore()

 let userAdviceText = ref(userAuthAdvice.value.advice)

 const postAdvice = async(postData) => {
     
   const options = {
        headers: {'token': localStorage.getItem('token')}
      };

      const newData = {
         advice: postData,
         userId:userAuthAdvice.value.userId.uid
      }

      try {
         const {data} = await userApi.post(`/advice`, newData, options )
          console.log("post advice", data)

          adviceStore.editAdvice(data.advice.advice, data.advice._id, data.advice.img) 
          return data
      } catch (error) {
           console.log(error)
      }
 }

 const updateAdvice = async(updateData) => {

   const options = {
        headers: {'token': localStorage.getItem('token')}
      };

   const newData = {advice: updateData}

      try {

         console.log(options)
         const {data} = await userApi.patch(`/advice/${userAuthAdvice.value._id}`, newData, options )
          
         return data

      } catch (error) {
          console.log(error)
      }
   
 }



const createAdvice = async() => {

  
  
    if(userAuthAdvice.value.advice.length > 0){
       const updatedAdvice = await updateAdvice(userAdviceText.value)
       console.log(updatedAdvice)
    }else{
        const postAdviceResult = await postAdvice(userAdviceText.value)

        console.log(postAdviceResult)
    }
   
}

const deleteAdvice = () => {
  console.log("delete advice")
}


const editImage = () => {
   console.log("edit image")
}

watch(userAuthAdvice, () => {
   userAdviceText.value = userAuthAdvice.value.advice
})


</script>


<template>

   <div v-if="isLoading">Loading</div>
   <div v-else-if="isError">{{ error }}</div>
   <div v-else class="main_container">

      <article class="user_advice_container">
         <header class="user_advice_header">
         <h3>{{ userAuthAdvice.userId.name }}</h3><img :src="userAuthAdvice.img" :alt="userAuthAdvice.img">
         </header>
         <main class="user_advice_main">
         <textarea type="text" v-model="userAdviceText" class="user_text" rows="4" cols="50"></textarea>
         </main>
         <footer class="advice_container_footer">
            <button @click="createAdvice"> Create </button>
            <button @click="deleteAdvice"> Delete </button>
            <button @click="editImage">Image</button>
         </footer>
      </article>
   </div>
 
</template>


<style scoped>

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