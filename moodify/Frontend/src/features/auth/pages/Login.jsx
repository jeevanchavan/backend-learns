import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import '../style/form.scss'
import { useAuth } from '../hooks/useAuth'

const Login = () => {

    const {loading,handleLogin} = useAuth()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const navigate = useNavigate()

    const handleSubmit = async(e)=>{
        e.preventDefault()

        await handleLogin(email,password)

        navigate("/")
    }

    if(loading){
        return(
            <main><h1>Loading..</h1></main>
        )
    }

  return (
    <main>
        <div className="form-container">
            <div className="top">
                <h1>Sign In</h1>
                <p>Please enter your details for sign in</p>
            </div>
            <form className='form'
                onSubmit={handleSubmit}
            >
                <input 
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
                type="text" name="email" id="email" placeholder='Enter your email address' />

                <input 
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}
                type="password" name="password" id="password" placeholder='Password' />
                <p>Forget Password?</p>
                <button className='button'>Sign In</button>
            </form>
            <span>OR</span>
            <div className="bottom">
                <p>Don't have an account?</p> <Link className='toggleTo' to='/register' >Sign Up</Link>
            </div>
        </div>
    </main>
  )
}

export default Login