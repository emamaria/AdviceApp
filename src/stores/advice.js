import { ref} from 'vue'
import { defineStore } from 'pinia'

const adviceAll = JSON.parse(localStorage.getItem('allAdvice')) || []

export const useAdviceStore = defineStore('advices', () => {


  const allAdvice = ref([...adviceAll])

  const userAuthAdvice = ref({})
  
  const addAvice = (oneAdvice) => {allAdvice.value = [...allAdvice.value, oneAdvice]}
  

  const deleteAdvice = (removeAdviceId) => {
    
    allAdvice.value = allAdvice.value.filter(advice => advice._id !== removeAdviceId )
  }

  const setAllAdvice = (usersAdvice) => {
    allAdvice.value = usersAdvice.advise
  }


  const setAdvice = (userAdvice) => {
    userAuthAdvice.value = userAdvice
  }

  const editAdvice = (userAdvice, img, id) => {
    userAuthAdvice.value.advice = userAdvice
    if(id)  userAuthAdvice.value._id = id
    if(img)  userAuthAdvice.value.img = img
  }

  const resetUserAuthAdvice = () => {
   
    userAuthAdvice.value._id = ""
    userAuthAdvice.value.advice = "",
    userAuthAdvice.value.img = "",
    userAuthAdvice.value.like = 0
  }
 
 
  
  return { 
    allAdvice,
    setAllAdvice,
    addAvice,
    deleteAdvice,
    userAuthAdvice, 
    setAdvice,
    editAdvice,
    resetUserAuthAdvice,
    // userAuthAdviceId: computed(() => userAuthAdvice.value._id)
  }
})

