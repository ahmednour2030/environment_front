import axios from '@axios'

export default {
  namespaced: true,
  state: {
    users: [],
    usersActive: [],
  },
  getters: {},
  mutations: {
    SET_RECORD(state, users) {
      state.users = users
    },
    UPDATE_RECORD(state, data) {
      const catIndex = state.users.findIndex(cat => cat.id === data.id)
      Object.assign(state.users[catIndex], data)
    },
    REMOVE_RECORD(state, itemId) {
      const caseIndex = state.users.findIndex(d => d.id === itemId)
      state.users.splice(caseIndex, 1)
    },

    /** Active  */
    SET_RECORD_Active(state, users) {
      state.usersActive = users
    },
    UPDATE_RECORD_Active(state, data) {
      const catIndex = state.usersActive.findIndex(cat => cat.id === data.id)
      Object.assign(state.usersActive[catIndex], data)
    },
    REMOVE_RECORD_Active(state, itemId) {
      const caseIndex = state.usersActive.findIndex(d => d.id === itemId)
      state.usersActive.splice(caseIndex, 1)
    },
  },
  actions: {
    store(ctx, data) {
      return new Promise((resolve, reject) => {
        axios.post('admin/index/users', data)
          .then(res => {
            resolve(res)
          })
          .catch(error => reject(error))
      })
    },
    fetch({ commit }) {
      return new Promise((resolve, reject) => {
        axios.get('admin/user_list')
          .then(response => {
            commit('SET_RECORD', response.data.data)
            resolve(response)
          })
          .catch(error => reject(error))
      })
    },
    fetchLast({ commit }) {
      return new Promise((resolve, reject) => {
        axios.get('admin/last_users')
          .then(response => {
            commit('SET_RECORD', response.data.data)
            resolve(response)
          })
          .catch(error => reject(error))
      })
    },
    active({ commit }, data) {
      return new Promise((resolve, reject) => {
        axios.post('admin/active', data)
          .then(res => {
            commit('REMOVE_RECORD', data.user_id)
            resolve(res)
          })
          .catch(error => reject(error))
      })
    },
    // eslint-disable-next-line camelcase
    delete({ commit }, user_id) {
      return new Promise((resolve, reject) => {
        axios.post('admin/delete_user', { user_id })
          .then(res => {
            commit('REMOVE_RECORD', user_id)
            resolve(res)
          })
          .catch(error => reject(error))
      })
    },

    /** Active */
    fetchActive({ commit }) {
      return new Promise((resolve, reject) => {
        axios.get('admin/companies/active')
          .then(response => {
            commit('SET_RECORD_Active', response.data.data)
            resolve(response)
          })
          .catch(error => reject(error))
      })
    },
    inActive({ commit }, data) {
      return new Promise((resolve, reject) => {
        axios.post('admin/active', data)
          .then(res => {
            commit('REMOVE_RECORD_Active', data.user_id)
            resolve(res)
          })
          .catch(error => reject(error))
      })
    },
    // eslint-disable-next-line camelcase
    deleteActive({ commit }, userId) {
      return new Promise((resolve, reject) => {
        axios.post(`admin/company/delete/${userId}`)
          .then(res => {
            commit('REMOVE_RECORD_Active', userId)
            resolve(res)
          })
          .catch(error => reject(error))
      })
    },
  },
}
