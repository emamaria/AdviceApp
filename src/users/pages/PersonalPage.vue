<script setup>
import usePersonalReq from '../composables/usePersonalReq';



 const {showUserData, editUserData} = usePersonalReq()

 console.log(showUserData)
</script>
<template>
    <div>
    <header>
        <h3>My Name: {{ showUserData.name }}</h3>
        <h3>My Email: {{ showUserData.email }}</h3>
    </header>
    <button type="button" @click="editUserData('carmen', 'sari@mail')">click</button>
    <main>

    </main>
</div>
</template>
<style scoped>


</style>