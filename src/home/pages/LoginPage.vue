
<script setup>
import {ref} from 'vue'

const form =  ref({
    email: "",
    password: ""
})

const submitLoginData = () => {
    console.log(form.value)
} 

</script>


<template>

    <form @submit.prevent="submitLoginData">
       <h3>Sign In</h3>
       <input type="email" v-model="form.email" placeholder="email">
        
       <input type="password" v-model="form.password" placeholder="password">
       <input id="button" type="submit" value="Login">
       <RouterLink :to="{name: 'register'}">Not registered yet?</RouterLink>
    </form>

    
  
</template>


<style scoped>

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