import { storeToRefs } from "pinia";
import { useUserStore } from "../../stores/user";
import userApi from "../../api/api";

const options = {
    headers: {
     'token': localStorage.getItem('token')}
  };


const usePersonalReq = (isLoading,  isReqResponseOk,isReqResponseFail, reqResponseMessage) => {

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

    
           try {
     
             
              const {data} = await userApi.patch(`/users/${userData.value.uid}`, newData, options )
              
             
            isLoading.value = false
     
            isReqResponseOk.value = true
          

            editUserData(data.user.name, data.user.email)
            localStorage.setItem('token', data.token)
        
            
             setTimeout(()=> {
              isReqResponseOk.value = false
           
             }, 3000)
     
             
     
             return data
     
           } catch (error) {

            isLoading.value = false
            isReqResponseFail.value = true
            reqResponseMessage.value = error.response?.data?.errors?.password?.msg || "Try again"
                setTimeout(()=> {
                  isReqResponseFail.value = false
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
