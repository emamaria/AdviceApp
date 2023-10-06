<script setup>

</script>


<template>

  
<form>
       <h3>Sign Up</h3>
       <input type="text" v-model="name" placeholder="name">
       <input type="email" v-model="email" placeholder="email">
        
       <input type="password" v-model="password" placeholder="password">
       <input type="password" v-model="password" placeholder="password">
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