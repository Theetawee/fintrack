import { useMemo, useEffect } from 'react'
import axios, { AxiosError, type AxiosInstance, type InternalAxiosRequestConfig } from 'axios'

import { api_url } from './../constants'
import useAuth from '../context/auth/useAuth'
import { useNavigate } from "react-router"
import { IS_AUTHENTICATED_KEY } from '../context/auth/AuthContext'
import { getPath } from '../routing/urls'

const CSRF_COOKIE_NAME = 'csrf_token'
const CSRF_HEADER_NAME = 'X-CSRF-Token'

const SAFE_METHODS = new Set(['get', 'head', 'options'])
const REFRESH_PATH = '/auth/refresh/'

function readCookie(name: string): string | null {
  const match = document.cookie.split('; ').find((row) => row.startsWith(`${name}=`))
  return match ? decodeURIComponent(match.split('=').slice(1).join('=')) : null
}

interface RetriableRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean
}

function attachCsrfHeader(config: InternalAxiosRequestConfig): InternalAxiosRequestConfig {
  const method = (config.method ?? 'get').toLowerCase()
  if (SAFE_METHODS.has(method)) {
    return config
  }

  const csrfToken = readCookie(CSRF_COOKIE_NAME)
  if (csrfToken) {
    config.headers.set(CSRF_HEADER_NAME, csrfToken)
  }
  return config
}

interface UseAxiosOptions {
  baseURL?: string
}

const useAxios = ({ baseURL = api_url }: UseAxiosOptions = {}): AxiosInstance => {
  const { setIsAuthenticated } = useAuth()
  const navigate = useNavigate()

  // 1. Create a clean base instance during render.
  // This is completely pure and safe.
  const instance = useMemo(() => {
    return axios.create({
      baseURL,
      withCredentials: true,
    })
  }, [baseURL])

  // 2. Attach interceptors inside useEffect (Safe execution outside render phase)
  useEffect(() => {
    const clearLocalAuth = () => {
      localStorage.removeItem(IS_AUTHENTICATED_KEY)
      setIsAuthenticated(false)
      navigate(getPath('Login'), { replace: true })
    }

    const refreshState: { promise: Promise<void> | null } = {
      promise: null,
    }

    const reqInterceptor = instance.interceptors.request.use((config) => {
      attachCsrfHeader(config)
      return config
    })

    const resInterceptor = instance.interceptors.response.use(
      (response) => response,
      async (error: AxiosError) => {
        const originalRequest = error.config as RetriableRequestConfig | undefined

        if (!originalRequest || error.response?.status !== 401) {
          return Promise.reject(error)
        }

        if (originalRequest._retry) {
          clearLocalAuth()
          return Promise.reject(error)
        }

        originalRequest._retry = true

        try {
          if (!refreshState.promise) {
            const csrfToken = readCookie(CSRF_COOKIE_NAME)

            refreshState.promise = axios
              .post(
                `${baseURL}${REFRESH_PATH}`,
                {},
                {
                  withCredentials: true,
                  headers: csrfToken ? { [CSRF_HEADER_NAME]: csrfToken } : {},
                },
              )
              .then(() => undefined)
              .finally(() => {
                refreshState.promise = null
              })
          }

          await refreshState.promise
          attachCsrfHeader(originalRequest)
          return instance(originalRequest)
        } catch (refreshError) {
          clearLocalAuth()
          return Promise.reject(refreshError)
        }
      },
    )

    // Clean up step triggers if navigate or auth handlers change
    return () => {
      instance.interceptors.request.eject(reqInterceptor)
      instance.interceptors.response.eject(resInterceptor)
    }
  }, [instance, baseURL, setIsAuthenticated, navigate]) // Safe closure variables

  return instance
}

export default useAxios
