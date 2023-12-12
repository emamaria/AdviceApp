import { useQuery } from "@tanstack/vue-query";
import userApi from '../../api/api'
import {useAdviceStore} from '../../stores/advice'
import { storeToRefs } from 'pinia';
import {watch} from 'vue'
//traigo todos los advice los almaceno en store desde aquí y los retorno del store
//desde aquí



const getAllUsersAdvice = async() => {

    const {data} = await userApi.get('/advice')

    return data
}

const useUsersAdvice = () => {

  const store = useAdviceStore()

  const {allAdvice} = storeToRefs(store)

    const {isLoading, data, error} = useQuery({
        queryKey: ['advice'],
        queryFn: getAllUsersAdvice,
        staleTime: 1000 * 60 * 60
    })

   
    

    watch(data, usersAdvice => {
        if(usersAdvice) store.setAllAdvice(usersAdvice)
      
    }, {immediate: true})

   if(error){
    console.log(error)
   }
   

    return {
        allAdvice,
        isLoading
    
    }
}

export default useUsersAdvice

