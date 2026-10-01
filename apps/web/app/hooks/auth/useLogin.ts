import axios, { AxiosError } from 'axios'
import { useState } from 'react'
import { api_url } from '../../constants'
import { useNavigate } from 'react-router'
import { getPath } from '../../routing/urls'
import { IDENTIFIER_KEY, METHOD_USED_KEY } from './useSignup'
import useAuth from '../../context/auth/useAuth'
import { IS_AUTHENTICATED_KEY } from '../../context/auth/AuthContext'

const useLogin = () => {
  const [identifier, setIdentifier] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [turnstileToken, setTurnstileToken] = useState('')
  const [method, setMethod] = useState<'email' | 'phone'>('email')
  const [isPhoneValid, setIsPhoneValid] = useState(false)
  const navigate = useNavigate()
  const { setIsAuthenticated } = useAuth()

  const validate = () => {
    setError('')
    if (!identifier || !password || !turnstileToken) {
      setError('Please fill in all fields')
      return false
    }

    return true
  }

  const handleLogin = async () => {
    if (!validate()) return
    setIsLoading(true)
    try {
      const response = await axios.post(
        `${api_url}/auth/login/`,
        {
          identifier,
          password,
          turnstile_token: turnstileToken,
        },
        { withCredentials: true },
      )
      console.log(response.data)

      if (response.status === 200) {
        setIsAuthenticated(true)
        localStorage.setItem(IS_AUTHENTICATED_KEY, 'true')

        navigate(getPath('Home'))
      } else {
        setError('Something went wrong. Please try again.')
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        const msg = error.response?.data?.msg || 'Something went wrong. Please try again.'
        setError(msg)
        const action = error.response?.data?.action || ''

        if (action === 'verify') {
          sessionStorage.setItem(IDENTIFIER_KEY, identifier)
          sessionStorage.setItem(METHOD_USED_KEY, method)
          navigate(getPath('AccountActivation'))
        }
        console.log(error.response)
      }
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  return {
    identifier,
    setIdentifier,
    password,
    setPassword,
    error,
    setError,
    isLoading,
    setIsLoading,
    turnstileToken,
    setTurnstileToken,
    method,
    setMethod,
    isPhoneValid,
    setIsPhoneValid,
    handleLogin,
  }
}

export default useLogin
