import { useQuery } from "@tanstack/vue-query";
import userApi from '../../api/api'
import {useAdviceStore} from '../../stores/advice'
import { storeToRefs } from 'pinia';
import {watch} from 'vue'
import { useUserStore } from "../../stores/user";


const userStore = useUserStore()
const store = useAdviceStore()
const {userAuthAdvice, allAdvice} = storeToRefs(store)
const userId = userStore.userData.uid 



const getAuthUserAdvice = async(adviceId) => {

    
    const {data} = await userApi.get(`/advice/${adviceId}`)
   
    return data
}

const useUserAdvice = () => {

    const authUserAdviceId = userAuthAdvice.value._id || allAdvice.value.filter(advice => advice.userId?._id === userId)[0]?._id


  //si el usuario no tiene advice hago el set del dato del store solo con dato de usuario id, name e email
  if(authUserAdviceId === undefined){
    store.setAdvice({
        _id: "",
        advice: "",
        img: "",
        like: 0,
        userId: userStore.userData
        
    })

    
}


    //si el usuario tiene advice ejecuto la peticion para obtener advice y retorno el advice ,loading, error etc

    if(authUserAdviceId){
         
        const {isLoading, data, error, isError} = useQuery({
            queryKey: ['userAdvice', authUserAdviceId],
            queryFn: () => getAuthUserAdvice(authUserAdviceId),
          
        })
    
       
        
    
        watch(data, advice => {
            if(advice){
                store.setAdvice({
                    _id: advice._id,
                    advice: advice.advice,
                    img: advice.img,
                    like: advice.like,
                    userId: userStore.userData
                    
                }) 
                localStorage.setItem('userAdvice', JSON.stringify({
                    _id: advice._id,
                    advice: advice.advice,
                    img: advice.img,
                    like: advice.like,
                    userId: userStore.userData
                    
                }))
            }
                           
        }, {immediate: true})


        return {
            userAuthAdvice,
            isLoading,
            error,
            isError
           }
    
    }else{

        return {
            //si el usuario no tiene advice hecho retorno el advice vacío solo con datos del usuario name, email, id
            userAuthAdvice
           
        }
    }

   
 

   
}

export default useUserAdvice

