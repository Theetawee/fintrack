import { Navigate, Outlet } from 'react-router'
import useAuth from '../context/auth/useAuth'
import { getPath } from '../routing/urls'

const AuthLayout = () => {
  const { isAuthenticated } = useAuth()

  if (isAuthenticated) {
    return <Navigate to={getPath('Home')} />
  }

  return (
    <div>
      <Outlet />
    </div>
  )
}

export default AuthLayout
