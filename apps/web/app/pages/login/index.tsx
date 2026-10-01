import { PasswordField } from '@/components/auth/PasswordField'
import Button from '@/components/common/Button'
import Card from '@/components/auth/Card'
import { getPath } from '@/routing/urls'
import { Link } from 'react-router'
import useLogin from '@/hooks/auth/useLogin'
import IdentifierInput from '@/components/auth/IdentifierInput'
import Turnstile from '@/components/auth/Turnstile'
import { site_key } from '@/constants'

const LoginPage = () => {
  const {
    method,
    setMethod,
    identifier,
    setIdentifier,
    setIsPhoneValid,
    setTurnstileToken,
    isPhoneValid,
    handleLogin,
    isLoading,
    error,
    password,
    setPassword,
  } = useLogin()
  return (
    <Card>
      <div>
        <div className='grid grid-cols-1 gap-4'>
          <div>
            <IdentifierInput
              setIsPhoneValid={setIsPhoneValid}
              method={method}
              setMethod={setMethod}
              identifier={identifier}
              setIdentifier={setIdentifier}
            />
          </div>
          <div>
            <PasswordField
              label='Password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              name='password'
              autoComplete='current-password'
              placeholder='Enter your password'
            />
            <div className='mt-2 text-right'>
              <Link
                to='/forgot-password'
                className='text-sm text-gray-500 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100'
              >
                Forgot password?
              </Link>
            </div>
          </div>

          <Turnstile siteKey={site_key} onToken={(e) => setTurnstileToken(e)} />
          {error && (
            <div className='text-red-500 text-sm bg-rose-50 rounded px-2 py-4'>
              <ul>
                <li key={error} className='list-disc list-inside'>
                  {error}
                </li>
              </ul>
            </div>
          )}
          <Button
            onClick={handleLogin}
            type='button'
            isLoading={isLoading}
            disabled={!identifier || !setTurnstileToken || (method === 'phone' && !isPhoneValid)}
          >
            Log in
          </Button>
        </div>

        <div className='text-center pt-8'>
          <p className='text-sm text-gray-600 dark:text-gray-300'>
            Don&apos;t have an account?{' '}
            <Link className='text-primary-500 hover:underline' to={getPath('Authentication')}>
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </Card>
  )
}

export default LoginPage
