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

 
 
  
  return { allAdvice,setAllAdvice, addAvice, deleteAdvice, userAuthAdvice, setAdvice}
})

