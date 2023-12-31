<script setup>
import usePersonalReq from '../composables/usePersonalReq';
import { ref } from 'vue';


const isLoading = ref(false)
const isReqResponse = ref(false)
const reqResponseMessage = ref("")

const {showUserData, updateUser} = usePersonalReq(isLoading, isReqResponse, reqResponseMessage)

 const form =  ref({
    email: "",
    name: "",
    password1: "",
    password2: ""
})



const updatingPersData = async() => {
    if(form.value.email === "" && form.value.name === "" && form.value.password1 === ""){
        return
    } 

    console.log(form.value.name, form.value.email, form.value.password1)

 
   
   const result = await updateUser(form.value.name, form.value.email, form.value.password1)
   console.log(result, "resultado")
   form.value.email =  "",
   form.value.name = "",
   form.value.password1 = "",
   form.value.password2 = ""

}
 console.log(showUserData)
</script>
<template>
    <div>
    <header>
        <h3>My Name: {{ showUserData.name }}</h3>
        <h3>My Email: {{ showUserData.email }}</h3>
    </header>
    <main>
       <form @submit.prevent="updatingPersData">
       <input type="text" v-model="form.name" placeholder="name">
       <input type="email" v-model="form.email" placeholder="email">
       <input type="password" v-model="form.password1" placeholder="password">
       <input type="password" v-model="form.password2" placeholder="password">
       <input type="submit" value="submit">
       <small v-if="isLoading">loading...</small>
       <small v-if="isReqResponse">{{ reqResponseMessage }}</small>
       </form>
    </main>
</div>
</template>
<style scoped>


</style>