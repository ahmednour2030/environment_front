import Vue from 'vue'

// axios
import axios from 'axios'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import router from '@/router'

const domain = 'http://127.0.0.1:8000/api/'
// const domain = 'https://education.arkanorg.com/api/'

const axiosIns = axios.create({
  // You can add your headers here
  // ================================
  baseURL: domain,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  // baseURL: 'http://127.0.0.1:8000/api/'',
  // timeout: 1000,
})
// Add a response interceptor
axiosIns.interceptors.response.use(
  response => response,
  error => {
    if (error.response.data.message === 'token invalid'
    || error.response.data.message === 'Authorization Token not found'
    || error.response.data.message === 'Token is Expired'
    ) {
      localStorage.removeItem('token')
      localStorage.removeItem('info')
      localStorage.setItem('loggedIn', 'false')
      // eslint-disable-next-line no-unused-expressions
      router.go(0) || router.push('/login')
    }
    if (error.response.status === 401
    ) {
      localStorage.removeItem('token')
      localStorage.removeItem('info')
      localStorage.setItem('loggedIn', 'false')
      // eslint-disable-next-line no-unused-expressions
      router.go(0) || router.push('/login')
    }
    Vue.$toast({
      component: ToastificationContent,
      props: {
        title: error.response.data.errors,
        icon: 'CheckCircleIcon',
        variant: 'danger',
      },
    })
  },
)
Vue.prototype.$http = axiosIns

export default axiosIns
