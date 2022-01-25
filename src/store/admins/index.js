import axios from '@axios'

export default {
  namespaced: true,
  state: {
    admins: [],
    adminsActive: [],
  },
  getters: {},
  mutations: {
    SET_RECORD(state, admins) {
      state.admins = admins
    },
    UPDATE_RECORD(state, data) {
      const catIndex = state.admins.findIndex(cat => cat.id === data.id)
      Object.assign(state.admins[catIndex], data)
    },
    REMOVE_RECORD(state, itemId) {
      const caseIndex = state.admins.findIndex(d => d.id === itemId)
      state.admins.splice(caseIndex, 1)
    },

    /** Active  */
    SET_RECORD_Active(state, admins) {
      state.adminsActive = admins
    },
    UPDATE_RECORD_Active(state, data) {
      const catIndex = state.adminsActive.findIndex(cat => cat.id === data.id)
      Object.assign(state.adminsActive[catIndex], data)
    },
    REMOVE_RECORD_Active(state, itemId) {
      const caseIndex = state.adminsActive.findIndex(d => d.id === itemId)
      state.adminsActive.splice(caseIndex, 1)
    },
  },
  actions: {
    store(ctx, data) {
      return new Promise((resolve, reject) => {
        axios.post('admin/create/admins', data)
          .then(res => {
            resolve(res)
          })
          .catch(error => reject(error))
      })
    },
    update(ctx, data) {
      return new Promise((resolve, reject) => {
        axios.post('admin/profile/edit', data)
          .then(res => {
            resolve(res)
          })
          .catch(error => reject(error))
      })
    },
    fetch({ commit }) {
      return new Promise((resolve, reject) => {
        axios.get('admin/index/admins')
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
        axios.post('admin/delete/user', { user_id })
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
