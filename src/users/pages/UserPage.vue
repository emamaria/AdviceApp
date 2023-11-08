
<script setup>
import { ref } from 'vue';

let userData =  {id: "1", email: "carmen@mail.com", name: "carmen", img: "carmen", liked: 0, text:"Do consectetur in proident pariatur irure eiusmod."}
const user = ref(userData)

const createAdvice = () => {
   console.log(user.value.name, user.value.text)
}

const deleteAdvice = () => {
  console.log("delete advice")
}


const editImage = () => {
   console.log("edit image")
}
</script>


<template>
   <div class="main_container">
      <h3>{{ user.name }}</h3>
      <article class="user_advice_container">
         <header class="user_advice_header">
         <input type="text" v-model="user.name" class="user_name"><img :src="user.img" :alt="user.img">
         </header>
         <main class="user_advice_main">
         <textarea type="text" v-model="user.text" class="user_text" rows="4" cols="50"></textarea>
         </main>
         <footer class="advice_container_footer">
            <button @click="createAdvice"> Create </button>
            <button @click="deleteAdvice"> Delete </button>
            <button @click="editImage"> Image</button>
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
      background-color: white;
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