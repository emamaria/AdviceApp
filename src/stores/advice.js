import { ref} from 'vue'
import { defineStore } from 'pinia'

export const useAdviceStore = defineStore('advices', () => {


  const allAdvice = ref([])

  const userAuthAdvice = ref({})
  
  const addAvice = (oneAdvice) => {allAdvice.value.push(oneAdvice)}
  

  const deleteAdvice = (removeAdviceId) => {
    allAdvice.value.filter(advice => advice.id === removeAdviceId )
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

