import axios, { AxiosError } from 'axios'
import { useState } from 'react'
import { api_url } from '../../constants'
import { IDENTIFIER_KEY } from './useSignup'
import { toast } from 'react-hot-toast'
import { useNavigate } from 'react-router'
import { getPath } from '../../routing/urls'
import useAuth from '../../context/auth/useAuth'
import { IS_AUTHENTICATED_KEY } from '../../context/auth/AuthContext'

const useActivationVerification = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const identifier = sessionStorage.getItem(IDENTIFIER_KEY) as string | null
  const navigate = useNavigate()

  const { setIsAuthenticated } = useAuth()

  const handleVerification = async (token: string) => {
    if (!token || !identifier) {
      setError('Something went wrong. Please try again.')
      return
    }

    setIsLoading(true)

    try {
      const response = await axios.post(
        `${api_url}/auth/verify/`,
        {
          access: token,
          identifier,
        },
        { withCredentials: true },
      )
      console.log(response.data)
      if (response.status === 200) {
        console.log('successful', response.data)
        setIsAuthenticated(true)
        localStorage.setItem(IS_AUTHENTICATED_KEY, 'true')
        navigate(getPath('Home'))
      } else {
        setError('Something went wrong. Please try again.')
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        const msg = error.response?.data?.msg || 'Something went wrong. Please try again.'
        toast.error(msg)
        navigate(getPath('Login'))
        console.log(error.response)
      }
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  return {
    isLoading,
    error,
    handleVerification,
    identifier,
  }
}

export default useActivationVerification
