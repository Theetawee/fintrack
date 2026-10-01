import { Link } from 'react-router'
import useActivation from '../../hooks/auth/useActivation'
import { maskEmail } from '../../hooks/auth/utils'
import Button from '../common/Button'
import Loader from '../common/Loader'
import { getPath } from '../../routing/urls'

const ActivateEmail = ({ identifier }: { identifier: string }) => {
  const { handleActivation, isLoading, sent } = useActivation()
  return (
    <div>
      <div className='max-w-md p-4 sm:p-10 mx-auto border rounded border-gray-200 dark:border-gray-800'>
        <h1 className='mb-2 text-lg'>Activate your account</h1>
        {sent ? (
          <div>
            <p className='text-green-500 mb-4'>
              Please check your email to activate your account. If you don&apos;t see it, check your
              spam folder.
            </p>
            <Link to={getPath('Login')} className='text-primary-500 hover:underline'>
              Try again
            </Link>
          </div>
        ) : (
          <>
            <p className='text-gray-700 dark:text-gray-400'>
              To activate your account, an a verification code or link has been sent to{' '}
              {maskEmail(identifier)}
            </p>

            {isLoading && (
              <div className='p-4'>
                <Loader />
              </div>
            )}

            <div className='flex items-center gap-x-4 mt-6'>
              <Button
                disabled={isLoading}
                onClick={() => handleActivation('link')}
                className='max-w-fit'
              >
                Activate using link
              </Button>
              <Button
                disabled={isLoading}
                onClick={() => handleActivation('code')}
                className='max-w-fit'
                variant='light'
              >
                Activate using code
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default ActivateEmail
