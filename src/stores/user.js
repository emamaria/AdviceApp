import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', () => {
  
  const userData = ref({})
  const authStatus = ref('no-auth') //ok-auth //no-auth//loading
  const showUserData = computed(() => userData.value)

  function editUserData() {
    userData.value.email = "carm@mail.com"
    userData.value.name  = "carmencita"
    userData.value.img  = "carm.png"
    userData.value.text = "lorem ipsum aodisooajfijeifjoirh"


  }

  return { showUserData, editUserData, userData, authStatus}
})
