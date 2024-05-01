import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import router from './router.jsx'
import { ThemeContextProvider } from './contexts/ThemeContext.jsx'
import { AuthContextProvider } from './contexts/AuthContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthContextProvider>
    <ThemeContextProvider>
      <RouterProvider router={router} />
    </ThemeContextProvider>
  </AuthContextProvider>
)
