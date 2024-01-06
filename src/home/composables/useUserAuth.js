import { storeToRefs } from 'pinia'
import userApi from '../../api/api'
import { useUserStore } from '../../stores/user'
import { ref } from 'vue'
import { useAdviceStore } from '../../stores/advice'



//creo composable que retorna las funciones de login register y renew

const useUserAuth = () => {
   
    const userStore = useUserStore()
    const adviceStore = useAdviceStore()

    const { allAdvice, userAuthAdvice } = storeToRefs(adviceStore)

    const { userData, authStatus } = storeToRefs(userStore)
    
    const register = async(name, email, password) => {

        
        try {

          

            authStatus.value = "loading"
            const {data} = await userApi.post('/users', {name, email, password})

            userData.value = {
                createdAt: data.user.createdAt,
                email: data.user.email,
                name: data.user.name,
                uid: data.user.uid,
                updatedAt: data.user.updatedAt
            }


            localStorage.setItem('token', data.token)

            localStorage.setItem('user', JSON.stringify({...data.user}))
         
             authStatus.value = "ok-auth"

            
            
        } catch (error) {

             let errorMessage = ref('')
             console.log(error)

             authStatus.value = "no-auth"
             userData.value = {}
             localStorage.clear()

             if(error?.response?.data?.errors?.password){
                 
                errorMessage.value = error?.response?.data?.errors?.password?.msg
                return errorMessage.value
             }

             if(error?.response?.data?.ok === false){
               
                errorMessage.value = error?.response?.data?.msg
                return errorMessage.value
             }
      
            
        }
    }


    const login = async(email, password) => {
       
        try {

        authStatus.value = "loading"

        const {data} = await userApi.post('/auth/login', {email, password})


        userData.value = {
            createdAt: data.userDB.createdAt,
            email: data.userDB.email,
            name: data.userDB.name,
            uid: data.userDB.uid,
            updatedAt: data.userDB.updatedAt
        }

        localStorage.setItem('token', data.token)

        localStorage.setItem('user', JSON.stringify({...data.userDB}))

        authStatus.value = "ok-auth"
            
        } catch (error) {
            let errorMessage = ref('')
            console.log(error)

            authStatus.value = "no-auth"
            userData.value = {}
            localStorage.clear()

            if(error?.response?.data?.errors?.password){
                
               errorMessage.value = error?.response?.data?.errors?.password?.msg
               return errorMessage.value
            }

            if(error?.response?.data?.ok === false){
               
                errorMessage.value = error?.response?.data?.msg
                return errorMessage.value
             }
             
            
           
        }
        
    }

    const validateToken = async() => {

        const options = {
            headers: {'token':localStorage.getItem('token')}
        }

        try {
            const {data} = await userApi.get('/auth/renew', options)
            localStorage.setItem('token', data.token)
            userData.value.name = data.name
            userData.value.email = data.email
            userData.value.uid = data.uid
            localStorage.setItem('user', JSON.stringify({...userData.value}))
            
            
         } catch (error) {
            console.log(error)
           
                
                localStorage.clear()
                userData.value = {}
                authStatus.value = "no-auth"
                return "error"
            
        }
    }
//añadido
    const logout = () => {

       localStorage.clear()
       userData.value = {}
       authStatus.value = "no-auth"
       allAdvice.value = []
       userAuthAdvice.value = {}
       
    }
    
return{
   register,
   authStatus,
   login,
   validateToken,
   userData,
   logout
}
}




export default useUserAuth