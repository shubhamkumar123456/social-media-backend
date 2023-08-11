
import axios from 'axios';
import React, { useRef } from 'react'
import './Register.css'
import {useNavigate} from "react-router-dom"

const Register = () => {
  const navigate = useNavigate();
  const username=useRef();
    const email=useRef();
  const password=useRef();
  const passwordAgain=useRef();

  const handleClick=async(e)=>{
    e.preventDefault();
    console.log("clicked")
    if(passwordAgain.current.value!==password.current.value){
      password.current.setCustomValidity("password do not match")
    }
    else{
      const user={
        username:username.current.value,
        email:email.current.value,
        password:password.current.value
      }
   try {
    await axios.post("http://localhost:5000/api/auth/register",user);
    navigate('/login')

   } catch (error) {
    console.log(error)
   }
    }
   
  }

  return (
    <div className='login'>
      <div className="loginWrapper">
        <div className="loginLeft">
            <h3 className='loginLogo'>Be Social</h3>
            <span className='loginDesc'>Connect with friends and the world around you on Be Social.</span>
        </div>
        <div className="loginRight">
            <form className="loginBox" onSubmit={handleClick}>
                <input className='loginInput' ref={username} type="text" placeholder='Username'  required/>
                <input className='loginInput' ref={email} type="email" placeholder='Email' required />
                <input className='loginInput' ref={password} type="password" minLength="6" placeholder='password' required />
                <input className='loginInput' ref={passwordAgain} type="password" placeholder='password again' required />
                <button className="loginButton">Sign Up</button>
               
                <button type='submit' className='loginRegisterButton'>Log into Account</button>
            </form>
        </div>
      </div>
    </div>
  )
}

export default Register
