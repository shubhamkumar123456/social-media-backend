export const LoginStart=(userCredentials)=>({
    type:"Login_Start",
    payload:userCredentials,
});
export const LoginSuccess=(user)=>({
    type:"Login_Success",
    payload:user,
});
export const LoginFailure=(error)=>({
    type:"Login_Failure",
    payload:error
});

export const follow= (userId)=>({
    type:"FOLLOW",
    payload:userId

})
export const Unfollow= (userId)=>({
    type:"UNFOLLOW",
    payload:userId

})