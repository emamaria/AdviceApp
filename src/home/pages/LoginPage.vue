
<script setup>

import { ref, computed } from 'vue';
import useUserAuth from '../composables/useUserAuth'
import { useRouter } from 'vue-router';
const {login, authStatus } = useUserAuth()


const router = useRouter()

const changePage = () => {
    router.push({path: '/users'})
}
let respMessage = ref('')

const form =  ref({
    email: "",
    password: ""
})


let color = ref('#6e5064')

const setColor = (colour) => {
    color.value = colour
   
}


const fieldsNotEmptyMessage = ref( "Please complete all the fields" )

const fieldsNotEmpty = computed(() => {
    if(form.value.password.length === 0 || form.value.email.length === 0 ){
    if(form.value.password.length > 0 ||form.value.email.length > 0 ){
        return true
    }
  }
    return false
})


const submitLoginData = async() => {

    if(form.value.password.length === 0 || form.value.email.length === 0 ){
       return
    }
 

    respMessage.value =  await login(form.value.email.toLowerCase(), form.value.password)


    setTimeout(()=>{

    if(respMessage.value?.toLowerCase().includes("password")){
        respMessage.value = ""
        form.value.password = ""
    }

    if(respMessage.value?.toLowerCase().includes("email")){
       respMessage.value = ""
        form.value.email = ""
    }
    
    }, 3000)

   
   
    if(respMessage.value === 'ok'){
        changePage()
        setTimeout(()=>{
          respMessage.value = ""
        }, 2000)
      
    }
  

  
} 

</script>


<template>

    <form @submit.prevent="submitLoginData">
       <h3>Sign In</h3>
       <input type="email" v-model="form.email" placeholder="email">  
       <input type="password" v-model="form.password" placeholder="password">
       <small v-if="fieldsNotEmpty">{{fieldsNotEmptyMessage}}</small>
       <small v-if="respMessage">{{respMessage}}</small>
       <small v-if="authStatus === 'loading'"><i class="fa-solid fa-spinner fa-spin"></i></small>
       <input id="button"  @mouseup="setColor('#6e5064')"  @mousedown="setColor('white')" :style={background:color} type="submit" value="Login">
       <RouterLink :to="{name: 'register'}">Not registered yet?</RouterLink>
    </form>

    <h1>AdviceApp</h1>
  
</template>


<style scoped>

h1{
  
  color:#d7cebb;
  font-size: 1.5rem;
  display: none;
  margin-top: 30px;
  text-align: center;
}


small{
  color: #650445;
  font-weight: bold;
  text-align: center;
}


h3{
    color: #6e5064;  
}

a{
  color: #6e5064;
 
}


form{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    max-width: 380px;
    height: 400px;
    background-color: white;
    border-radius: 10px;
}



input{
    margin: 15px;
    padding: 3px;
    width: 80%;

}


#button{
    background-color: #6e5064;
    color: #d7cebb;
    border: none;
    padding: 9px;
    border-radius: 3px;
    width: 100px;
}

#button:hover{
  cursor: pointer;
}

@media screen and (max-width:600px){
  form{
    width: 95%;
  }
}

@media screen and (max-width:700px){
 
 h1{
   display: block;
   font-size: 1.2rem;
 }

}

</style>