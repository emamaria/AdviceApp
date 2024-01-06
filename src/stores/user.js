import { ref, computed } from 'vue'
import { defineStore } from 'pinia'


 const user = JSON.parse(localStorage.getItem('user')) || {}

 const auth = localStorage.getItem('token')?'ok-auth': {}

export const useUserStore = defineStore('user', () => {
  //userData : email, uid, name
  //authStatus: ok-auth, no-auth, loading
  const userData = ref({})
  const authStatus = ref('no-auth') //ok-auth //no-auth//loading
  const showUserData = computed(() => userData.value)

  userData.value = user
  authStatus.value =  auth

  function editUserData(name = null, email = null) {
   if(email) userData.value.email = email
   if(name) userData.value.name  = name
   localStorage.setItem('user', JSON.stringify(userData.value))
   
  }


  return { showUserData, editUserData, userData, authStatus}
})
