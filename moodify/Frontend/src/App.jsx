import './App.css'
import AppRoutes from './AppRoutes'
import { AuthContext, AuthProvider } from './features/auth/auth.context'
import { SongContextProvider } from './features/home/song.context'
import './features/shared/global.scss'

function App() {

  return (
    <SongContextProvider>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </SongContextProvider>
  )
}

export default App