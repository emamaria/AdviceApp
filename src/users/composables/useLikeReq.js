import userApi from '../../api/api';
import {useUserStore} from '../../stores/user';
import {useAdviceStore} from '../../stores/advice'


const options = {
    headers: {
     'token': localStorage.getItem('token')}
  };


  const useLikeReq = ( 
   showReqMessage,
   requestResponseMsg
  
    ) => {

    const {userData} = useUserStore()


    const adviceStore = useAdviceStore()


    
    const {sumLike, restLike} = adviceStore

     const addLikeReq = async(adviceId, user) => {

      if(userData.uid === user) return

        const userId = {
            likedUsersId: userData.uid
        }

       
        try {

            const {data} = await userApi.patch(`/like/${adviceId}`, userId, options)
              
            showReqMessage(adviceId)
            requestResponseMsg.value = "ok!"
  
            sumLike(adviceId)
            console.log(data)

            setTimeout(()=> {
              
               showReqMessage("")
               requestResponseMsg.value = ""

                }, 2000)
       

        } catch (error) {
         showReqMessage(adviceId)
         requestResponseMsg.value = error.response.data.msg || "Try again"
           
              console.log(error)
              
              setTimeout(()=> {
               showReqMessage("")
               requestResponseMsg.value = ""
              
            }, 3000)
        }
         
     }


     const removeLikeReq = async(adviceId, user) => {

      if(userData.uid === user) return
      
     
      const userId = {
         removelikeUsersId: userData.uid
      }

     
      try {

          const {data} = await userApi.patch(`/removelike/${adviceId}`, userId, options)
            

         showReqMessage(adviceId)
         requestResponseMsg.value = "ok!"

          restLike(adviceId)
          console.log(data)

          setTimeout(()=> {
            showReqMessage("")
            requestResponseMsg.value = ""
           
              }, 2000)
     

      } catch (error) {
         
         showReqMessage(adviceId)
         requestResponseMsg.value = error.response.data.msg || "Try again"
            console.log(error)
            
            setTimeout(()=> {
               showReqMessage("")
               requestResponseMsg.value = ""
            
          }, 3000)
      }
       
   }



     return {
        addLikeReq,
        removeLikeReq
     }
  }

  export default useLikeReq
