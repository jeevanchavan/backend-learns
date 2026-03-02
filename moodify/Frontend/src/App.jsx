import './App.css'
import AppRoutes from './AppRoutes'
import { AuthContext, AuthProvider } from './features/auth/auth.context'
import './features/shared/global.scss'

function App() {

  return (
    <AuthProvider>
      <AppRoutes />

    </AuthProvider>
  )
}

export default App