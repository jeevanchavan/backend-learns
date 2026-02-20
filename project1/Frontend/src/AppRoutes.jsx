import React from 'react'
import {BrowserRouter,Route,Routes} from 'react-router-dom'
import Login from './features/pages/Login'
import Register from './features/pages/Register'

const AppRoutes = () => {
  return (
    <BrowserRouter>
        <Routes>
            <Route path='/login' element={<Login/>} />
            <Route path='/register' element={<Register/>} />
        </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes