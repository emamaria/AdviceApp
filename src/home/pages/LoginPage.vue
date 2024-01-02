
<script setup>

import { ref, computed } from 'vue';
import useUserAuth from '../composables/useUserAuth'
import { useRouter } from 'vue-router';
const {login, authStatus } = useUserAuth()


const router = useRouter()

const changePage = () => {
    router.push({path: '/users'})
}
let errorMessage = ref('')

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
    console.log(form.value)

    errorMessage.value =  await login(form.value.email.toLowerCase(), form.value.password)


    setTimeout(()=>{

    if(errorMessage.value?.toLowerCase().includes("password")){
        errorMessage.value = ""
        form.value.password = ""
    }

    if(errorMessage.value?.toLowerCase().includes("email")){
        errorMessage.value = ""
        form.value.email = ""
    }
    
    }, 3000)
   
    if(authStatus.value === 'ok-auth'){
        changePage()
    }
  

  
} 

</script>


<template>

    <form @submit.prevent="submitLoginData">
       <h3>Sign In</h3>
       <input type="email" v-model="form.email" placeholder="email">  
       <input type="password" v-model="form.password" placeholder="password">
       <small v-if="fieldsNotEmpty">{{fieldsNotEmptyMessage}}</small>
       <small v-if="errorMessage">{{errorMessage}}</small>
       <small v-if="authStatus === 'loading'"><i class="fa-solid fa-spinner fa-spin"></i></small>
       <input id="button"  @mouseup="setColor('#6e5064')"  @mousedown="setColor('white')" :style={background:color} type="submit" value="Login">
       <RouterLink :to="{name: 'register'}">Not registered yet?</RouterLink>
    </form>

    
  
</template>


<style scoped>

small{
  color: #6e5064;
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
    max-width: 350px;
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
</style>