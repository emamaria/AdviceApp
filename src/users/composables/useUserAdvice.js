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



const store = useAdviceStore()

    const {userAuthAdvice} = storeToRefs(store)
  
   const userStore = useUserStore()
  
   
                    
  const userId = userStore.userData.uid
  
 //miro si el usuario registrado ya tiene un advice
  
  const authUserAdviceId = allAdvice.advise.filter(advice => advice.userId?._id === userId)[0]?._id


  console.log(authUserAdviceId, "id del advice de usuario registrado")

  //si el usuario no tiene advice hago el set del dato del store solo con dato de usuario id, name e email
  if(authUserAdviceId === undefined){
    store.setAdvice({
        _id: "",
        advice: "",
        img: "",
        userId: userStore.userData
        
    })

    
}


const getAuthUserAdvice = async() => {

    
    const {data} = await userApi.get(`/advice/${authUserAdviceId}`)
   
    return data
}

const useUserAdvice = () => {

    //si el usuario tiene advice ejecuto la peticion para obtener advice y retorno el advice ,loading, error etc

    if(authUserAdviceId){

        const {isLoading, data, error, isError} = useQuery({
            queryKey: ['userAdvice', authUserAdviceId],
            queryFn: getAuthUserAdvice,
            // staleTime: 1000 * 60 * 60 * 24
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
    
    }else{
        return {
            //si el usuario no tiene advice hecho retorno el advice vacío solo con datos del usuario name, email, id
            userAuthAdvice  
        }
    }

   
 

   
}

export default useUserAdvice

