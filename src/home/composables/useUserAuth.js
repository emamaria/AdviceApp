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

            localStorage.setItem('user', JSON.stringify({...data.user}))
         
             authStatus.value = "ok-auth"
            
        } catch (error) {

             let errorMessage;
             console.log(error)

             authStatus.value = "no-auth"

             if(error?.response?.data.ok === false){
                errorMessage = error.response.data
                console.log(errorMessage)
                return  errorMessage
             }
        }
    }


    const login = async(email, password) => {
       
        try {

        authStatus.value = "loading"

        const {data} = await userApi.post('/auth/login', {email, password})

        console.log(data)

        userData.value = {...data.userDB}

        localStorage.setItem('token', data.token)

        localStorage.setItem('user', JSON.stringify({...data.userDB}))

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
            // authStatus.value = 'ok-auth'
            
            console.log("token",data)
        } catch (error) {
            console.log(error)
           
                
                localStorage.clear()
                userData.value = {}
                authStatus.value = "no-auth"
               
            
        }
    }

    
return{
   register,
   authStatus,
   login,
   validateToken
}
}




export default useUserAuth