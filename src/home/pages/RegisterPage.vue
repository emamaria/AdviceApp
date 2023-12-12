<script setup>

import { ref, computed } from 'vue';
import useUserAuth from '../composables/useUserAuth'
import { useRouter } from 'vue-router';
const {register, authStatus } = useUserAuth()


const router = useRouter()

const changePage = () => {
    router.push({path: '/users'})
}

const form =  ref({
    email: "",
    name: "",
    password1: "",
    password2: ""
})

let color = ref('#6e5064')

let errorMessage = ref('')
const setColor = (colour) => {
    color.value = colour
   
}

const passwordValidationMessage = ref("The password must be the same")

const passwordInValid = computed( () => {
    if(form.value.password1 !== form.value.password2 ){
        if(form.value.password2.length !== 0 && form.value.password1.length !== 0){
             return true
        }
        
    }

    return false
})

const fieldsNotEmptyMessage = ref( "Please complete all the fields" )

const fieldsNotEmpty = computed(() => {
    if(form.value.password1.length === 0 ||
      form.value.password2.length === 0 ||
       form.value.name.length === 0   || 
       form.value.email.length === 0 
    ){
        if(form.value.password1.length > 0 ||
      form.value.password2.length > 0 ||
       form.value.name.length > 0   || 
       form.value.email.length > 0 
    ){
        return true
    }

  }

    return false

})

const submitRegisterData = async() => {

    

    if(form.value.password1.length === 0 ||
      form.value.password2.length === 0 ||
       form.value.name.length === 0   || 
       form.value.email.length === 0 
    ){
       return
    }

    if(form.value.password1 !== form.value.password2){
       return
    }

   

    console.log(form.value)


    errorMessage.value = await register(form.value.name, form.value.email, form.value.password1)

    setTimeout(()=>{
    errorMessage.value = ""

    }, 10000) 

    setTimeout(()=>{
    form.value = {
    email: "",
    name: "",
    password1: "",
    password2: ""
}
    }, 3000)
   
    if(authStatus.value === 'ok-auth'){
        changePage()
    }
  
} 

</script>


<template>

  
<form @submit.prevent="submitRegisterData">
       <h3>Sign Up</h3>
       <input type="text" v-model="form.name" placeholder="name">
       <input type="email" v-model="form.email" placeholder="email">
        
       <input type="password" v-model="form.password1" placeholder="password">
       <small class="errorMessage" v-if="passwordInValid">{{passwordValidationMessage}}</small>
       <input type="password" v-model="form.password2" placeholder="password">
       <small v-if="fieldsNotEmpty">{{fieldsNotEmptyMessage}}</small>
       <small v-if="errorMessage">{{errorMessage}}</small>
       <input id="button" @mouseup="setColor('#6e5064')"  @mousedown="setColor('white')" :style={background:color} type="submit" value="Register"><span v-if="authStatus === 'loading'">...loading</span>
       <RouterLink :to="{name: 'login'}">Already registered?</RouterLink>
       </form>
</template>


<style scoped>


small{
  color: #6e5064;
}

h3{
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

a{
  color: #6e5064;
 
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