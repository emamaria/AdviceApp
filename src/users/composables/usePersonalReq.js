import { storeToRefs } from "pinia";
import { useUserStore } from "../../stores/user";



const usePersonalReq = () => {

    const userStore = useUserStore()

    const {showUserData} = storeToRefs(userStore)

    const {editUserData} = userStore

    return {
        showUserData,
        editUserData
    }

}


export default usePersonalReq
