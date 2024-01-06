<script setup>
import usePersonalReq from '../composables/usePersonalReq';
import { ref, computed } from 'vue';


const isLoading = ref(false)
const isReqResponseOk = ref(false)
const isReqResponseFail = ref(false)
const reqResponseMessage = ref("")

const passwordInValid = computed( () => {
    if(form.value.password1 !== form.value.password2 ){
        if(form.value.password2.length !== 0 && form.value.password1.length !== 0){
             return true
        }
        
    }

    return false
})

const {showUserData, updateUser} = usePersonalReq(isLoading, isReqResponseOk, isReqResponseFail,reqResponseMessage)

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

    if(form.value.password1 !== form.value.password2){
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
    <div class="container">
        <h2>Change My Login Data</h2>
    <header>
    <div class="data_container">
        <h3>Name: {{ showUserData.name }}</h3>
        <h3>Email: {{ showUserData.email }}</h3>
        <h3>Password: **********</h3>
    </div>
    </header>
    <main>
        
       <form @submit.prevent="updatingPersData">
       <h4>Fill Only the data that you want to change</h4>
       <input type="text" v-model="form.name" placeholder="new name">
       <input type="email" v-model="form.email" placeholder="new email">
       <input type="password" v-model="form.password1" placeholder="new password">
       <input type="password" v-model="form.password2" placeholder="confirm new password">
       <small v-if="passwordInValid">Passwords don´t match</small>
       <small v-if="isLoading"><i class="fa-solid fa-spinner fa-spin"></i></small>
       <small v-if="isReqResponseFail">{{reqResponseMessage}}</small>
       <small v-if="isReqResponseOk"><i class="fa-solid fa-circle-check fa-fade"></i></small>
       <input type="submit" value="submit" id="submit">
       </form>
    </main>
</div>
</template>
<style scoped>

.data_container{
    background-color: #ede0f3;
    padding: 20px;
    border-radius: 5px;
}

small{
    font-size: 1.2rem;
   
}

#submit{
    margin-top: 20px;
    background-color:#6e5064;
    border: none;
    font-size: 1.1rem;
    color: #d7cebb;
    border-radius: 5px;
}

#submit:hover{
    cursor: pointer;
}

h2{
    color: white;
    margin-top: 100px;
    font-size: 2rem;
}

h3{
    margin: 5px;
    color: #372e35;
    font-size: 1.5rem;
}

h4{
    font-size: 1.1rem;
    color: #372e35;
    text-align: center;
}

header{
    margin-top: 50px;
    font-size: 1.2rem;
}

main{
    margin-top: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
}

form{
    display: flex;
    flex-direction: column;
    background-color: white;
    align-items: center;
    justify-content: center;
    width: 380px;
    height: 380px;
    border-radius: 10px;
}

form input{
    margin: 10px;
    padding: 8px;
    width: 90%;
}

.container{
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    
}

@media screen and (max-width:400px){
    form{
        width: 95%;
    }

    h2{
        font-size: 1.5rem;
    }

    h3{
        font-size: 1.2rem;
    }

    h4{
        font-size: 0.9rem;
    }
}
</style>