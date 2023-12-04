<script setup>

// import useUserRegister from '../composables/useUserRegister'


// const {data, isLoading} = useUserRegister()

import { ref, computed } from 'vue';

const form =  ref({
    email: "",
    name: "",
    password1: "",
    password2: ""
})

const passwordValidationMessage = ref("The password must be the same")

const passwordInValid = computed( () => {
    if(form.value.password1 !== form.value.password2 ){
        if(form.value.password2.length !== 0 && form.value.password1.length !== 0){
             return true
        }
        
    }

    return false
})

const fieldsNotEmpty = ref({
    invalid: false,
    warnMesage: "You have  to fill all the fields" 
})

const submitRegisterData = () => {

    if(form.value.password1.length === 0 ||
      form.value.password2.length === 0 ||
       form.value.name.length === 0   || 
       form.value.email.length === 0 
    ){
        fieldsNotEmpty.value.invalid = true

        return
    }

    if(form.value.password1 !== form.value.password2){
       return
    }

  

    console.log(form.value)

    fieldsNotEmpty.value.invalid = false
} 

</script>


<template>

  
<form @submit.prevent="submitRegisterData">
       <h3>Sign Up</h3>
       <input type="text" v-model="form.name" placeholder="name">
       <input type="email" v-model="form.email" placeholder="email">
        
       <input type="password" v-model="form.password1" placeholder="password">
       <small v-if="passwordInValid">{{passwordValidationMessage}}</small>
       <input type="password" v-model="form.password2" placeholder="password">
       <small v-if="fieldsNotEmpty.invalid">{{fieldsNotEmpty.warnMesage}}</small>
       <input id="button" type="submit" value="Register">
       <RouterLink :to="{name: 'login'}">Already registered?</RouterLink>
    </form>
</template>


<style scoped>
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