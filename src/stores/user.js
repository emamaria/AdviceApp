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

  function editUserData(name, email) {
    userData.value.email = name
    userData.value.name  = email
  }

  return { showUserData, editUserData, userData, authStatus}
})
