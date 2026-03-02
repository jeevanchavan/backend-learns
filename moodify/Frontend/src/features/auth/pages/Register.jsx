import React, { useState } from 'react'
import '../style/form.scss'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

const Register = () => {

    const {loading,handleRegister} = useAuth()

    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const navigate = useNavigate()

    const handleSubmit =async (e)=>{
        e.preventDefault()
        await handleRegister(username,email,password)

        navigate('/')
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
                <h1>Sign Up</h1>
                <p>Please enter your details for sign up</p>
            </div>
            <form onSubmit={handleSubmit}
            className='form'>
                <input 
                    value={username}
                    onChange={(e)=>setUsername(e.target.value)}
                type="text" name="username" id="username" placeholder='Enter your username' />

                <input 
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}
                type="email" name="email" id="email" placeholder='Enter your email address' />

                <input 
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}
                type="password" name="password" id="password" placeholder='Password' />

                <button className='button'>Sign Up</button>
            </form>
            <span>OR</span>
            <div className="bottom">
                <p>Already have an account?</p> <Link className='toggleTo' to='/login' >Sign In</Link>
            </div>
        </div>
    </main>
  )
}

export default Register