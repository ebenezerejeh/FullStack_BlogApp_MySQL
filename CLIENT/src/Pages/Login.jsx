// import React from 'react'
import { Link, useNavigate } from "react-router-dom"
import { useState, useContext } from 'react'
import axios from 'axios'
import { AuthContext } from "../Context/Auth_Context"

const Login = () => {
  const [inputs,setInputs] = useState({
    username:"",
    password:","
  });

  const [error, setError] = useState(null);

  const navigate = useNavigate()

  const {login} = useContext(AuthContext)

  const handleChange = (e)=>{
    setInputs(prev=>({...prev, [e.target.name]:e.target.value}))

  }

  const handleSubmit= async(e)=>{
    e.preventDefault()
    try {
      await login(inputs)           
      navigate("/")

      
      
    } catch (err) {
      console.log(err)
      setError(error.response.data)    
    }


  }


  return (
    <div className="auth">
      <h1>Login</h1>
      <form>
        <input required type="text" name='username' placeholder="username" onChange={handleChange}/>
        <input required type="password" name='password' placeholder="password" onChange={handleChange}/>
        <button onClick={handleSubmit}>Login</button>
        {error && <p>{error}</p>}
        <span>Dont you have an account?<Link to = "/register">Register</Link>
        

        </span>


      </form>
    </div>
  )
}

export default Login