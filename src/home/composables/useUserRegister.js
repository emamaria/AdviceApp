import { useQuery } from "@tanstack/vue-query";
import userApi from '../../api/api'

//hago login register y verificarToken, desde pantalla login register paso dato
//del usuario al composable  para completar peticion http y ese dato obtenido lo
//almaceno en el store, accedo al dato del usuario desde este composable accediendo al store



const register = async(userName, email, password) => {

    const {data} = await userApi.post('/users', {userName, email, password})

    return data
}

const useUserRegister = (userName, email, password) => {


    const {isLoading, isError, isSuccess, data} = useQuery(

       ['user', email],
       () => register(userName, email, password)

    )

    return {
        isLoading,
        isError,
        isSuccess, 
        data
    }
}


export default useUserRegister