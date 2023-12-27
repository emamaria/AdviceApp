import userApi from '../../api/api';
import {useUserStore} from '../../stores/user';
import {useAdviceStore} from '../../stores/advice'


const options = {
    headers: {
     'token': localStorage.getItem('token')}
  };


  const useLikeReq = ( 
    requestResponseFail,
    requestFailMessage,
    requestResponseOk,
    loading
    ) => {

    const {userData} = useUserStore()


    const adviceStore = useAdviceStore()


    
    const {sumLike, restLike} = adviceStore

     const addLikeReq = async(adviceId, user) => {

      if(userData.uid === user) return

        loading.value = true
        const userId = {
            likedUsersId: userData.uid
        }

       
        try {

            const {data} = await userApi.patch(`/like/${adviceId}`, userId, options)
              
            loading.value = false
     
            requestResponseOk.value = true
  
            sumLike(adviceId)
            console.log(data)

            setTimeout(()=> {
                requestResponseOk.value = false
                }, 2000)
       

        } catch (error) {
             requestResponseFail.value = true
             loading.value = false
             requestFailMessage.value = error.response.data.msg || "Try again"
              console.log(error)
              
              
             
              console.log(requestFailMessage.value, "fail")
              setTimeout(()=> {
               requestResponseFail.value = false
               requestFailMessage.value = ""
            }, 5000)
        }
         
     }


     const removeLikeReq = async(adviceId, user) => {

      if(userData.uid === user) return
      
      loading.value = true
      const userId = {
         removelikeUsersId: userData.uid
      }

     
      try {

          const {data} = await userApi.patch(`/removelike/${adviceId}`, userId, options)
            
          loading.value = false
   
          requestResponseOk.value = true

          restLike(adviceId)
          console.log(data)

          setTimeout(()=> {
              requestResponseOk.value = false
              }, 2000)
     

      } catch (error) {
           requestResponseFail.value = true
           loading.value = false
           requestFailMessage.value = error.response.data.msg || "Try again"
            console.log(error)
            
            
           
            console.log(requestFailMessage.value, "fail")
            setTimeout(()=> {
             requestResponseFail.value = false
             requestFailMessage.value = ""
          }, 5000)
      }
       
   }



     return {
        addLikeReq,
        removeLikeReq
     }
  }

  export default useLikeReq
