import { ref, computed } from 'vue'
import { defineStore } from 'pinia'


 const user = JSON.parse(localStorage.getItem('user')) || {}

 const auth = localStorage.getItem('token')?'ok-auth': {}

export const useUserStore = defineStore('user', () => {
  
  const userData = ref({})
  const authStatus = ref('no-auth') //ok-auth //no-auth//loading
  const showUserData = computed(() => userData.value)

  userData.value = user
  authStatus.value =  auth

  function editUserData() {
    userData.value.email = "carm@mail.com"
    userData.value.name  = "carmencita"
    userData.value.img  = "carm.png"
    userData.value.text = "lorem ipsum aodisooajfijeifjoirh"


  }

  return { showUserData, editUserData, userData, authStatus}
})
