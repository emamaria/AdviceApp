import { storeToRefs } from 'pinia'
import userApi from '../../api/api'
import { useUserStore } from '../../stores/user'

//creo composable que retorna las funciones de login register y renew

const useUserAuth = () => {
   
    const store = useUserStore()

    const { userData, authStatus } = storeToRefs(store)
    
    const register = async(name, email, password) => {
        try {

            authStatus.value = "loading"
            const {data} = await userApi.post('/users', {name, email, password})
            
            console.log(data)

            userData.value = {...data.user}

            console.log(userData.value)

            localStorage.setItem('token', data.token)
         
             authStatus.value = "ok-auth"
            
        } catch (error) {

            let errorMessage;
             console.log(error)

             authStatus.value = "no-auth"

             if(error.response.data.ok === false){
                errorMessage = error.response.data
                console.log(errorMessage)
                return  errorMessage
             }
        }
    }

    
return{
   register,
   authStatus
}
}




export default useUserAuth