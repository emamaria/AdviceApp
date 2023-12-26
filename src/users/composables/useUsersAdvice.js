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

    })

   
    

    watch(data, usersAdvice => {
        if(usersAdvice){
          let adviceArray = usersAdvice.advise.map(adv => {
            
            return {
                _id: adv._id,
                advice: adv.advice,
                createdAt: adv.createdAt,
                img: adv.img,
                like: adv.like,
                likedUsersId: adv.likedUsersId,
                updatedAt: adv.updatedAt,
                userId: adv.userId
            }
            
          })

          console.log(adviceArray, "adviceAll")
            store.setAllAdvice(adviceArray)
           
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

