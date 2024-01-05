
import userApi from '../../api/api';
import { useQueryClient } from '@tanstack/vue-query';
import { useAdviceStore } from '../../stores/advice';


const options = {
    headers: {
     'Content-Type': 'multipart/form-data',
     'token': localStorage.getItem('token')}
  };



const useAdviceReq = (
    userData,
    loading,
    requestResponseOk,
    userAuthAdvice,
    requestResponseFail,
    requestFailMessage,
    blockedCursor,
    userAdviceText,
    userImage,
    imgInput
    ) => {

    const queryClient = useQueryClient() 
    const adviceStore = useAdviceStore()

    const postAdvice = async(postData, postImage) => {
        console.log(userData.uid, "uid usuario")
        blockedCursor.value = true
           loading.value = true
           const newData = {
              advice: postData,
              userId:userData.uid,
              image: postImage
           }
     
           try {
              const {data} = await userApi.post(`/advice`, newData, options )
     
               loading.value = false
     
               requestResponseOk.value = true
     
               adviceStore.editAdvice(data.advice.advice,  data.advice.img, data.advice._id) 
               adviceStore.addAvice({...data.advice})
               queryClient.removeQueries({ queryKey: ['userAdvice',userAuthAdvice.value._id] });
              // queryClient.invalidateQueries({queryKey: ['userAdvice',userAuthAdvice.value._id]})
              setTimeout(()=> {
              requestResponseOk.value = false
              blockedCursor.value = false

              }, 2000)
     
               return data
           } catch (error) {
     
                loading.value = false
                requestResponseFail.value = true
                requestFailMessage.value = error.response?.data?.errors?.advice?.msg || "Try again"
                setTimeout(()=> {
                 requestResponseFail.value = false
                 requestFailMessage.value = ""
                 blockedCursor.value = false

              }, 2000)
     
              
           }
      }
     
      const updateAdvice = async(updateData, updateImage) => {

        blockedCursor.value = true
       
        loading.value = true
     
        const newData = {
           advice: updateData,
           image: updateImage
        }
     
     
     
           try {
     
              console.log(options)
              const {data} = await userApi.patch(`/advice/${userAuthAdvice.value._id}`, newData, options )
              
             
             loading.value = false
     
             requestResponseOk.value = true
     
             adviceStore.editAdvice(data.updatedAdvice.advice, data.updatedAdvice.img) 
             
             queryClient.invalidateQueries({queryKey: ['userAdvice',userAuthAdvice.value._id]})
             setTimeout(()=> {
              requestResponseOk.value = false
               blockedCursor.value = false

             }, 2000)
     
             
     
             return data
     
           } catch (error) {
     
              loading.value = false
              requestResponseFail.value = true
              requestFailMessage.value = error.response?.data?.errors?.advice?.msg || "Try again"
                setTimeout(()=> {
                 requestResponseFail.value = false
                 requestFailMessage.value = ""
                 blockedCursor.value = false

                
              }, 2000)
               console.log(error)
           }
        
      }
     
      const deleteAdvice = async() => {
         
      if(userAuthAdvice.value._id === "") return
      
        loading.value = true
        blockedCursor.value = true
     
       
     
       try {
        const {data} = await userApi.delete(`/advice/${userAuthAdvice.value._id}`, options )
        queryClient.removeQueries({ queryKey: ['userAdvice',userAuthAdvice.value._id] });
        queryClient.invalidateQueries({queryKey: ['advice']})
        adviceStore.deleteAdvice(userAuthAdvice.value._id)
        adviceStore.resetUserAuthAdvice()
        console.log("delete advice", (userAuthAdvice.value._id))
        loading.value = false
     
        requestResponseOk.value = true
       
        userAdviceText.value = userAuthAdvice.value.advice
        userImage.value = userAuthAdvice.value.img
         if(imgInput.value?.value?.length > 0){
           console.log(imgInput.value.value)
           imgInput.value.value = ""
         } 
        
     
        
             setTimeout(()=> {
              requestResponseOk.value = false
              blockedCursor.value = false
             
              
             }, 2000)
     
             return data
             
     } catch (error) {
           console.log(error)
           loading.value = false
              requestResponseFail.value = true
              requestFailMessage.value = error.response?.data?.errors?.advice?.msg || "Try again"
                setTimeout(()=> {
                 blockedCursor.value = false
                 requestResponseFail.value = false
                 requestFailMessage.value = ""
                
              }, 2000)
             
       }
     }
     



    return {
       postAdvice,
       updateAdvice,
       deleteAdvice
    }
}


export default useAdviceReq