import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', () => {
  
  const userData = ref({userId: "1", email: "carmen@mail.com", name: "carmen", auth: false})
  const showUserData = computed(() => userData.value)

  function editUserData() {
    userData.value.email = "carm@mail.com"
    userData.value.name  = "carmencita"
    userData.value.img  = "carm.png"
    userData.value.text = "lorem ipsum aodisooajfijeifjoirh"


  }

  return { showUserData, editUserData, userData }
})
