import { Navigate, Outlet } from 'react-router'
import useAuth from '../context/auth/useAuth'
import { getPath } from '../routing/urls'
import { ThemeToggle } from "../components/common/ThemeToggle";

const AuthLayout = () => {
  const { isAuthenticated } = useAuth()

  if (isAuthenticated) {
    return <Navigate to={getPath('Home')} />
  }

  return (
    <div className='max-w-4xl px-4 mx-auto w-full py-4'>
      <div className='max-w-3xl mb-10 flex items-center justify-between mx-auto'>
        <div>App</div>
        <div>
          <ThemeToggle />
        </div>
      </div>

      <Outlet />
    </div>
  )
}

export default AuthLayout
