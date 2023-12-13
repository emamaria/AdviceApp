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

  const findAuthUserAdvice = (id) => {
    userAuthAdvice.value = allAdvice.value.filter(advice => advice.userId._id === id)[0]
  }

 
  
  return { allAdvice,setAllAdvice, addAvice, deleteAdvice, findAuthUserAdvice, userAuthAdvice }
})

