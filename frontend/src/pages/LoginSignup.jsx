import React, { useState } from 'react'
import "./CSS/loginsignup.css"

const LoginSignup = () => {


const [state , setState] = useState("Sign Up");

const [formData, setFormData] = useState( {
  username:"",
  password:"",
  email:""
})

const changeHandler = (e) => {
  setFormData({...formData, [e.target.name]:e.target.value})
}


const Login = async () =>{

console.log("login" , formData)
let responseData;
  await fetch ('http://localhost:4000/login', {
    method: 'POST',
    headers: {
      Accept:'application/form-data',
      'Content-Type':'application/json',
    },
    body: JSON.stringify(formData)
  })
  .then((response) => response.json())
    .then((data) => {
      console.log(data);  // Log the complete response
      responseData = data;
    });

  if(responseData.success){
    localStorage.setItem('auth-token', responseData.token);
    window.location.replace("/")
  }else{
    alert(responseData.error)
  }
}




const signup = async () =>{
  console.log("signup",  formData)
  let responseData;
  await fetch ('http://localhost:4000/signup', {
    method: 'POST',
    headers: {
      Accept:'application/form-data',
      'Content-Type':'application/json',
    },
    body: JSON.stringify(formData)
  })
  .then((response) => response.json())
    .then((data) => {
      console.log(data);  // Log the complete response
      responseData = data;
    });

  if(responseData.success){
    localStorage.setItem('auth-token', responseData.token);
    window.location.replace("/")
  }else{
    alert(responseData.message)
  }
}


  return (
    <div className='login-Signup'>
       <div className="login-container">
        <h1> {state}</h1>
          <div className="login-signup-fields">
            {state === "Sign Up" ?
            <input type="text" name="username" 
            value={formData.username} onChange={changeHandler} placeholder='Your Name' />  : <></>}

             <input type="email" name="email" value={formData.email} onChange={changeHandler} placeholder='Email' />
              <input type="password" name="password" value={formData.password} onChange={changeHandler}  placeholder='Password' />
          </div>

           <div className="login-Signup-agree">
              <input type="checkbox" name='' id=''/>
              <p>By continuing , i agree to the term of use & privacy policy</p>
           </div>
          <button onClick={() => state === "Login" ? Login() : signup() }> Continue</button>

          {state === "Sign Up" ? <p className="login-signup-login">
             Already have an account? <span onClick={() => {setState("Login")}}>Login here</span>
           </p> : <p className="login-signup-login">
             Create an account? <span onClick={() => {setState("Sign Up")}}>Click here</span>
           </p>
          } 
           
           
       </div>
    </div>
  )
}

export default LoginSignup
