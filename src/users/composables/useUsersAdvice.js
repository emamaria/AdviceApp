import { useQuery } from "@tanstack/vue-query";
import userApi from '../../api/api'
import {useAdviceStore} from '../../stores/advice'
import { storeToRefs } from 'pinia';
import {watch} from 'vue'




const getAllUsersAdvice = async() => {

    const {data} = await userApi.get('/advice')

    return data
}

const useUsersAdvice = () => {

  const store = useAdviceStore()

  const {allAdvice, userAuthAdvice} = storeToRefs(store)

    const {isLoading, data, error, isError} = useQuery({
        queryKey: ['advice'],
        queryFn: getAllUsersAdvice,
        staleTime: 1000 * 60 * 60 * 24
    })

   
    

    watch(data, usersAdvice => {
        if(usersAdvice){
            store.setAllAdvice(usersAdvice)
           
        }
                       
    }, {immediate: true})

  
   

    return {
        allAdvice,
        isLoading,
        error,
        isError,
        userAuthAdvice
    
    }
}

export default useUsersAdvice

