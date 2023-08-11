import axios from "axios"

export const loginCall= async(userCredential,dispatch)=>{
    dispatch({type:'Login_Start'});
    try {
        const res= await axios.post("http://localhost:5000/api/auth/login",userCredential)
        dispatch({type:'Login_Success',payload:res.data})
    } catch (error) {
        dispatch({type:'Login_Failure',payload:error})
    }
}