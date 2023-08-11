import React, { useContext, useRef } from 'react'
import './Login.css'
import { loginCall } from '../../apiCalls'
import { AuthContext } from '../../context/AuthContext';
import CircularProgress from '@mui/material/CircularProgress';

const Login = () => {
  const email=useRef();
  const password=useRef();
  const {user,isFetching,error,dispatch}=useContext(AuthContext);
  const handleClick=(e)=>{
    e.preventDefault();
    console.log("clicked")
    loginCall({email:email.current.value,password:password.current.value},dispatch)
  }
  console.log(user)
  return (
    <div className='login'>
      <div className="loginWrapper">
        <div className="loginLeft">
            <h3 className='loginLogo'>Be Social</h3>
            <span className='loginDesc'>Connect with friends and the world around you on Be Social.</span>
        </div>
        <div className="loginRight">
            <form className="loginBox" onSubmit={handleClick}>
                <input className='loginInput' type="email" placeholder='Email' ref={email} required/>
                <input className='loginInput' type="password" placeholder='password' ref={password} minLength="6" required/>
                <button className="loginButton">{isFetching?<CircularProgress color='primary'/>:"Log IN"}</button>
                <span className='loginForgot'> Forgot Password?</span>
                <button className='loginRegisterButton'>Create a New Account</button>
            </form>
        </div>
      </div>
    </div>
  )
}

export default Login
