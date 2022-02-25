import router from '@/router'
import jwtDefaultConfig from './jwtDefaultConfig'

export default class JwtService {
  // Will be used by this service for making API calls
  axiosIns = null

  // jwtConfig <= Will be used by this service
  jwtConfig = { ...jwtDefaultConfig }

  // For Refreshing Token
  isAlreadyFetchingAccessToken = false

  // For Refreshing Token
  subscribers = []

  /**
   *
   * @param axiosIns
   * @param jwtOverrideConfig
   */
  constructor(axiosIns, jwtOverrideConfig) {
    this.axiosIns = axiosIns
    this.jwtConfig = { ...this.jwtConfig, ...jwtOverrideConfig }

    // Request Interceptor
    this.axiosIns.interceptors.request.use(
      config => {
        // Get token from localStorage
        const accessToken = this.getToken()
        // eslint-disable-next-line no-param-reassign
        config.withCredentials = true

        // If token is present add it to request's Authorization Header
        if (accessToken) {
          // eslint-disable-next-line no-param-reassign
          config.headers.Authorization = `${this.jwtConfig.tokenType} ${accessToken}`
        }
        return config
      },
      () => {
        localStorage.removeItem('info')
        localStorage.removeItem('token')
        localStorage.removeItem('loggedIn')
        // Redirect to login page
        this.$router.push({ name: 'login' })
      },
    )

    // Add request/response interceptor
    this.axiosIns.interceptors.response.use(
      response => {
        if (response.data.message === 'token invalid'
        || response.data.message === 'Authorization Token not found'
        || response.data.message === 'Token is Expired'
        ) {
          localStorage.removeItem('token')
          localStorage.removeItem('info')
          localStorage.setItem('loggedIn', 'false')
          // eslint-disable-next-line no-unused-expressions
          router.go(0) || router.push('/login')
        } else {
        // Important: response interceptors **must** return the response.
          return response
        }
        return response
      },
      error => {
        // const { config, response: { status } } = error
        const { config, response } = error
        if (response.data.message === 'token invalid'
        || response.data.message === 'Authorization Token not found'
        || response.data.message === 'Token is Expired'
        || config.data.message === 'Token is Expired'
        ) {
          localStorage.removeItem('token')
          localStorage.removeItem('info')
          localStorage.setItem('loggedIn', 'false')
          // eslint-disable-next-line no-unused-expressions
          router.go(0) || router.push('/login')
        }
        // if (status === 401) {
        return Promise.reject(error)
      },
    )
  }

  onAccessTokenFetched(accessToken) {
    this.subscribers = this.subscribers.filter(callback => callback(accessToken))
  }

  /**
   *
   * @param callback
   */
  addSubscriber(callback) {
    this.subscribers.push(callback)
  }

  getToken() {
    return localStorage.getItem(this.jwtConfig.storageTokenKeyName)
  }

  getRefreshToken() {
    return localStorage.getItem(this.jwtConfig.storageRefreshTokenKeyName)
  }

  /**
   *
   * @param value
   */
  setToken(value) {
    localStorage.setItem(this.jwtConfig.storageTokenKeyName, value)
  }

  /**
   *
   * @param value
   */
  setRefreshToken(value) {
    localStorage.setItem(this.jwtConfig.storageRefreshTokenKeyName, value)
  }

  /**
   *
   * @param args
   * @returns {*}
   */
  login(...args) {
    return this.axiosIns.post(this.jwtConfig.loginEndpoint, ...args)
  }

  /**
   *
   * @param args
   * @returns {*}
   */
  register(...args) {
    return this.axiosIns.post(this.jwtConfig.registerEndpoint, ...args)
  }

  /**
   *
   * @returns {*}
   */
  refreshToken() {
    return this.axiosIns.post(this.jwtConfig.refreshEndpoint, {
      refreshToken: this.getRefreshToken(),
    })
  }
}
