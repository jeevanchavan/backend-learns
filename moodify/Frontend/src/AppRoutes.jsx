import React from 'react'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Login from './features/auth/pages/Login'
import Register from './features/auth/pages/Register'
import FaceExpression from './features/Expression/components/FaceExpression'
import Protected from './features/auth/components/Protected'
import Home from './features/home/pages/Home'

const AppRoutes = () => {
  return (
    <BrowserRouter>
        <Routes>
            <Route path='/' element={<Protected><Home/></Protected> } />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register/>} />
        </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes