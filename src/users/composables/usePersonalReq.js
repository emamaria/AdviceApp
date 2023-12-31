import { storeToRefs } from "pinia";
import { useUserStore } from "../../stores/user";
import userApi from "../../api/api";

const options = {
    headers: {
     'token': localStorage.getItem('token')}
  };


const usePersonalReq = () => {

    const userStore = useUserStore()

    const {showUserData, userData} = storeToRefs(userStore)

    const {editUserData} = userStore


    const updateUser = async(name, email, password) => {

        // loading.value = true
     
        const newData = {
    
        }
       
        name && (newData.name = name)
        email && (newData.email = email)
        password && (newData.password = password)

        console.log(newData, "data")
           try {
     
              console.log(options)
              const {data} = await userApi.patch(`/users/${userData.value.uid}`, newData, options )
              
             
            //  loading.value = false
     
            //  requestResponseOk.value = true
            editUserData(data.user.name, data.user.email)
            localStorage.setItem('token', data.token)
             console.log(data)
            
             setTimeout(()=> {
            //   requestResponseOk.value = false
             }, 2000)
     
             
     
             return data
     
           } catch (error) {
     
            //   loading.value = false
            //   requestResponseFail.value = true
            //   requestFailMessage.value = error.response?.data?.errors?.advice?.msg || "Try again"
            //     setTimeout(()=> {
            //      requestResponseFail.value = false
            //      requestFailMessage.value = ""
                
            //   }, 2000)
               console.log(error)
           }
        
      }
     

    return {
        showUserData,
        editUserData,
        updateUser
    }

}


export default usePersonalReq
