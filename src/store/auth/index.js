import jwt from '@/auth/jwt/useJwt'
import router from '../../router/index'

export default {
  namespaced: true,
  state: {
    userInfo: JSON.parse(localStorage.getItem('info')),
    reload: null,
  },
  getters: {},
  mutations: {
    SET_DATA(state, data) {
      state.userInfo = data
    },
  },
  actions: {
    login({ commit }, payload) {
      return new Promise((resolve, reject) => {
        jwt.login(payload)
          .then(response => {
            // If there's user data in response
            if (response.data.data && (response.data.token)) {
              // Set accessToken
              jwt.setToken(response.data.token)
              commit('SET_DATA', response.data.data)
              localStorage.setItem('info', JSON.stringify(response.data.data))
              localStorage.setItem('loggedIn', 'true')
              // Navigate User to homepage
              router.push(router.currentRoute.query.to || '/')
              resolve(response)
            } else {
              // eslint-disable-next-line prefer-promise-reject-errors
              reject({ message: 'هناك خطا في البريد الالكتروني او كلمة المرور' })
            }
          })
          .catch(error => reject(error))
      })
    },
  },
  logOut() {
    const localStorageKey = 'loggedIn'
    localStorage.removeItem(localStorageKey)
    localStorage.removeItem('info')
    router.push('/login')
  },
}
