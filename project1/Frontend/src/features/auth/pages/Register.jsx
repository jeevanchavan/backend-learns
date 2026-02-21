import React, { useState } from 'react'
import '../style/form.scss'
import { Link } from 'react-router-dom'
import { register } from '../services/auth.api'

const Register = () => {

    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("")

    const handleSubmit = (e)=>{
        e.preventDefault()

        register(username,email,password)
    }

  return (
    <main>
        <div className="form-container">
            <h1>Register</h1>
            <form onSubmit={handleSubmit}>
                <input 
                    onInput={(e)=>{
                        setUsername(e.target.value)
                    }}
                    type="text" 
                    name='username' 
                    placeholder='username' 
                />
                <input 
                    onInput={(e)=>{
                        setEmail(e.target.value)
                    }}
                    type="text" 
                    name='email' 
                    placeholder='email' 
                />
                <input 
                    onInput={(e)=>{
                        setPassword(e.target.value)
                    }}
                    type="password" 
                    name='password' 
                    placeholder='password' 
                />

                <button>Register</button>
            </form>
            <p>Already have an account? <Link className='toggleAuthForm' to='/login' >Login</Link> </p>
        </div> 
    </main>
  )
}

export default Register