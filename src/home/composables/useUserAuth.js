import userApi from '../../api/api'


//creo composable que retorna las funciones de login register y renew

const useUserAuth = () => {
   
     console.log(userApi)
    const register = async(name, email, password) => {
        try {
            const {data} = await userApi.post('/users', {name, email, password})
               console.log(data)
             return data
        } catch (error) {
             console.log(error)
        }
    }

    
return{
   register
}
}




export default useUserAuth