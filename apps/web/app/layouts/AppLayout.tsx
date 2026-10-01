import { Navigate, Outlet } from 'react-router'
import useAuth from '../context/auth/useAuth'
import { getPath } from '../routing/urls'

const AppLayout = () => {
  const { isAuthenticated } = useAuth()

  if (!isAuthenticated) {
    return <Navigate to={getPath('Login')} />
  }

  return (
    <div>
      <Outlet />
    </div>
  )
}

export default AppLayout
