
<script setup>
import { computed, ref } from 'vue';

let datas = [
   {id: "1", name: "carmen", img: "carmen", liked: 0, text:"Do consectetur in proident pariatur irure eiusmod."},
   {id: "2", name: "mamen", img: "mamen", liked: 2, text:"Sit magna culpa ut aliqua nulla consequat cupidatat."},
   {id: "3", name: "sara", img: "sara", liked: 3, text: "Aliqua id Lorem est qui veniam proident non eiusmod commodo minim veniam irure adipisicing."}
]

let data = ref(datas)

const props = defineProps({
   searchAdvise: String
})


const addLike = (id) => {
    return data.value.find(data => data.id === id).liked += 1
//   console.log(id, data.value)
}
 let userData = computed(() => data.value.filter( data => data.text.toLowerCase().includes(props.searchAdvise.toLowerCase()) ))

</script>


<template>
   <div  class="main_container">
      <article class="user_advice_container" v-for="user of userData" :key="user.id">
         <header class="user_advice_header">
            <h3>{{ user.name }}</h3><img :src="user.img" :alt="user.img">
         </header>
         <main class="user_advice_main">
         <p>{{ user.text }}</p>
         <p @click="addLike(user.id)">{{ user.liked }}</p>
         </main>
        
      </article>
   </div>

</template>


<style scoped>

   

 
   .main_container{
      /* background-color:pink; */
      margin-top: 5rem;
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      justify-content: center;
   }

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