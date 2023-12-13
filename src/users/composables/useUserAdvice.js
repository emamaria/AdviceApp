import { useQuery } from "@tanstack/vue-query";
import userApi from '../../api/api'
import {useAdviceStore} from '../../stores/advice'
import { storeToRefs } from 'pinia';
import {watch} from 'vue'
import { useUserStore } from "../../stores/user";



const getAllUsersAdvice = async() => {

    const {data} = await userApi.get('/advice')

    return data
}

const allAdvice = await getAllUsersAdvice()

console.log(allAdvice, "adv")

const store = useAdviceStore()

    const {userAuthAdvice} = storeToRefs(store)
  
   const userStore = useUserStore()
  
   
                    
  const userId = userStore.userData.uid
  
  console.log(userId, "id usuario")
  
  const authUserAdviceId = allAdvice.advise.filter(advice => advice.userId._id === userId)[0]._id

  console.log(authUserAdviceId, "adviceid")
const getAuthUserAdvice = async() => {

    const {data} = await userApi.get(`/advice/${authUserAdviceId}`)
   console.log(data, "mi peticion")
    return data
}

const useUserAdvice = () => {

    

    const {isLoading, data, error, isError} = useQuery({
        queryKey: ['userAdvice', authUserAdviceId],
        queryFn: getAuthUserAdvice,
        staleTime: 1000 * 60 * 60 * 24
    })

   
    

    watch(data, advice => {
        if(advice){
            store.setAdvice(advice) 
           
        }
                       
    }, {immediate: true})

 

    return {
        userAuthAdvice,
        isLoading,
        error,
        isError,
       
    
    }
}

export default useUserAdvice

