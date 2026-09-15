import { createBrowserRouter } from 'react-router-dom'
import LoginPage from '../../pages/Login/LoginPage'
import RegisterPage from '../../pages/Register/RegisterPage'

const router = createBrowserRouter([
  {
    path: '/register',
    element: <RegisterPage />,
  },
  {
    path: '/login',
    element: <LoginPage />
  }
])

export default router