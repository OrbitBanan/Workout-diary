import { createBrowserRouter } from 'react-router-dom'
import LoginPage from '../../pages/Login/LoginPage'
import RegisterPage from '../../pages/Register/RegisterPage'
import CalendarPage from '../../pages/Calendar/CalendarPage'
import ProtectedRoute from './ProtectedRoute'

const router = createBrowserRouter([
  {
    path: '/register',
    element: <RegisterPage />,
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: '/app/calendar',
        element: <CalendarPage />,
      },
    ],
  },
])

export default router