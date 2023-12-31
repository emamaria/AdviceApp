import { storeToRefs } from "pinia";
import { useUserStore } from "../../stores/user";
import userApi from "../../api/api";

const options = {
    headers: {
     'token': localStorage.getItem('token')}
  };


const usePersonalReq = (isLoading,  isReqResponse, reqResponseMessage) => {

    const userStore = useUserStore()

    const {showUserData, userData} = storeToRefs(userStore)

    const {editUserData} = userStore


    const updateUser = async(name, email, password) => {

       isLoading.value = true
     
        const newData = {
    
        }
       
        name && (newData.name = name)
        email && (newData.email = email)
        password && (newData.password = password)

        console.log(newData, "data")
           try {
     
              console.log(options)
              const {data} = await userApi.patch(`/users/${userData.value.uid}`, newData, options )
              
             
            isLoading.value = false
     
            isReqResponse.value = true
            reqResponseMessage.value = "ok!"

            editUserData(data.user.name, data.user.email)
            localStorage.setItem('token', data.token)
             console.log(data)
            
             setTimeout(()=> {
              isReqResponse.value = false
              reqResponseMessage.value = ""
             }, 3000)
     
             
     
             return data
     
           } catch (error) {
     
            console.log(error, "mensaje de error")

            isLoading.value = false
            isReqResponse.value = true
            reqResponseMessage.value = error.response?.data?.errors?.password?.msg || "Try again"
                setTimeout(()=> {
                  isReqResponse.value = false
                  reqResponseMessage.value = ""
                
              }, 5000)
               
           }
        
      }
     

    return {
        showUserData,
        editUserData,
        updateUser
    }

}


export default usePersonalReq
