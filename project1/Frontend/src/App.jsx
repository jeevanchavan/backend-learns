import React from 'react'
import AppRoutes from './AppRoutes'
import { AuthProvider } from './features/auth/auth.context'
import { PostContextProvider } from './features/posts/post.context'

const App = () => {
  return (
    <AuthProvider>
      <PostContextProvider>
      <AppRoutes />
      </PostContextProvider>
    </AuthProvider>
    
  )
}

export default App