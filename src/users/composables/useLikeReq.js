import userApi from '../../api/api';
import {useUserStore} from '../../stores/user';
import {useAdviceStore} from '../../stores/advice'


const options = {
    headers: {
     'token': localStorage.getItem('token')}
  };


  const useLikeReq = ( 
   showReqMessage,
   requestResponseMsg,
   blockedCursor
  
    ) => {

    
    const {userData} = useUserStore()


    const adviceStore = useAdviceStore()


    
    const {sumLike, restLike} = adviceStore

     const addLikeReq = async(adviceId, user) => {

      if(userData.uid === user) return

      blockedCursor.value = true

        const userId = {
            likedUsersId: userData.uid
        }

       
        try {

            const {data} = await userApi.patch(`/like/${adviceId}`, userId, options)
              
            showReqMessage(adviceId)
            requestResponseMsg.value = "Ok"
  
            sumLike(adviceId)
            console.log(data)

            setTimeout(()=> {
              
               showReqMessage("")
               requestResponseMsg.value = ""
               blockedCursor.value = false
                }, 1500)
       

        } catch (error) {
         showReqMessage(adviceId)
         requestResponseMsg.value = error.response.data.msg || "Try again"
           
              
              setTimeout(()=> {
               showReqMessage("")
               requestResponseMsg.value = ""
               blockedCursor.value = false
            }, 1500)
        }
         
     }


     const removeLikeReq = async(adviceId, user) => {

      if(userData.uid === user) return
      
      blockedCursor.value = true
     
      const userId = {
         removelikeUsersId: userData.uid
      }

     
      try {

          const {data} = await userApi.patch(`/removelike/${adviceId}`, userId, options)
            

         showReqMessage(adviceId)
         requestResponseMsg.value = "Ok"

          restLike(adviceId)
          console.log(data)

          setTimeout(()=> {
            showReqMessage("")
            requestResponseMsg.value = ""
            blockedCursor.value = false
              }, 1500)
     

      } catch (error) {
         
         showReqMessage(adviceId)
         requestResponseMsg.value = error.response.data.msg || "Try again"
            
            setTimeout(()=> {
               showReqMessage("")
               requestResponseMsg.value = ""
               blockedCursor.value = false
            
          }, 1500)
      }
       
   }



     return {
        addLikeReq,
        removeLikeReq
     }
  }

  export default useLikeReq
