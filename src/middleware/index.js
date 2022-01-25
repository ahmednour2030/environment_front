const localStorageKey = 'loggedIn'

class AuthService {
  // eslint-disable-next-line class-methods-use-this
  logOut() {
    localStorage.removeItem(localStorageKey)
    localStorage.removeItem('info')
  }

  // eslint-disable-next-line class-methods-use-this
  isAuthenticated() {
    return localStorage.getItem(localStorageKey) === 'true'
  }

  // eslint-disable-next-line class-methods-use-this
  role() {
    return JSON.parse(localStorage.getItem('info')).role.name
  }
}

export default new AuthService()
