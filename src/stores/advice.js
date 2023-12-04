import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useAdviceStore = defineStore('advices', () => {
  const advice = ref({id: "1", name: "carmen", img: "carmen", liked: 0, text:"Do consectetur in proident pariatur irure eiusmod."},
  {id: "2", name: "mamen", img: "mamen", liked: 2, text:"Sit magna culpa ut aliqua nulla consequat cupidatat."},
  {id: "3", name: "sara", img: "sara", liked: 3, text: "Aliqua id Lorem est qui veniam proident non eiusmod commodo minim veniam irure adipisicing."})

  const advicesComputed = computed(() => advice.value)

  function addAvice() {
    advice.value.push( {id: "4", name: "mara", img: "mara", liked: 3, text: "lalala id Lorem est qui veniam proident non eiusmod commodo minim veniam irure adipisicing."})
  }

  function deleteAdvice(){
    advice.value.filter(advice => advice.id === "2")
  }

  return { advice, advicesComputed, addAvice, deleteAdvice }
})

//desde el composable donde hago peticion http accedo al store y asigno datos y retorno del composable
//una vez hecho peticion de edit, delete etc llamo las funciones del store para actualizar sus datos