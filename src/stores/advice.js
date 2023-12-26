import {ref} from 'vue'
import { defineStore } from 'pinia'

const adviceAll = JSON.parse(localStorage.getItem('allAdvice')) || []
const userAdvice = JSON.parse(localStorage.getItem('userAdvice')) || []


export const useAdviceStore = defineStore('advices', () => {


  const allAdvice = ref([...adviceAll])

  const userAuthAdvice = ref({...userAdvice})
  
  const addAvice = (oneAdvice) => {
    allAdvice.value = [...allAdvice.value, oneAdvice]
    localStorage.setItem('allAdvice', JSON.stringify(allAdvice.value))
  }
  

  const deleteAdvice = (removeAdviceId) => {
    
    allAdvice.value = allAdvice.value.filter(advice => advice._id !== removeAdviceId )
    localStorage.setItem('allAdvice', JSON.stringify(allAdvice.value))
  }

  const setAllAdvice = (usersAdvice) => {
    
    allAdvice.value = usersAdvice

    localStorage.setItem('allAdvice', JSON.stringify(usersAdvice))
  }


  const setAdvice = (userAdvice) => {
    userAuthAdvice.value = userAdvice
  }

  const editAdvice = (userAdvice, img, id) => {
    userAuthAdvice.value.advice = userAdvice
    if(id)  userAuthAdvice.value._id = id
    if(img)  userAuthAdvice.value.img = img
    localStorage.setItem('userAdvice', JSON.stringify(userAuthAdvice.value))
  }

  const resetUserAuthAdvice = () => {
   
    userAuthAdvice.value._id = ""
    userAuthAdvice.value.advice = "",
    userAuthAdvice.value.img = "",
    userAuthAdvice.value.like = 0
    localStorage.setItem('userAdvice', JSON.stringify(userAuthAdvice.value))
  }
 
  const sumLike = (adviceId) => {

    const adviceIndex = allAdvice.value.findIndex(advice => advice._id === adviceId)
    
    allAdvice.value[adviceIndex].like += 1
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
    sumLike
  }
})

