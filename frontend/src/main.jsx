import ReactDOM from 'react-dom/client'
import './index.css'
import { ThemeContextProvider } from './contexts/ThemeContext.jsx'
import { AuthContextProvider } from './contexts/AuthContext.jsx'
import CustomRouter from './router/CustomRouter.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthContextProvider>
    <ThemeContextProvider>
      <CustomRouter />
    </ThemeContextProvider>
  </AuthContextProvider>
)
