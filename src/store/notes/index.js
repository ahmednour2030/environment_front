import axios from '@axios'

export default {
  namespaced: true,
  state: {
    notes: [],
  },
  getters: {},
  mutations: {

    /**
     * @param state
     * @param notes
     * @constructor
     */
    SET_RECORD(state, notes) {
      state.notes = notes
    },

    /**
     * @param state
     * @param data
     * @constructor
     */
    UPDATE_RECORD(state, data) {
      const catIndex = state.notes.findIndex(cat => cat.id === data.id)
      Object.assign(state.notes[catIndex], data)
    },
    /**
     * @param state
     * @param itemId
     * @constructor
     */
    REMOVE_RECORD(state, itemId) {
      const caseIndex = state.notes.findIndex(d => d.id === itemId)
      state.notes.splice(caseIndex, 1)
    },
  },
  actions: {
    /**
     * @param commit
     * @returns {Promise<unknown>}
     */
    fetch({ commit }) {
      return new Promise((resolve, reject) => {
        axios.get('admin/notes')
          .then(response => {
            commit('SET_RECORD', response.data.data)
            resolve(response)
          })
          .catch(error => reject(error))
      })
    },

    /**
     * @param commit
     * @returns {Promise<unknown>}
     */
    store({ commit }, data) {
      return new Promise((resolve, reject) => {
        axios.post('admin/notes/create', data)
          .then(response => {
            commit('SET_RECORD', response.data.data)
            resolve(response)
          })
          .catch(error => reject(error))
      })
    },
    /**
     * @param commit
     * @param data
     * @returns {Promise<unknown>}
     */
    edit({ commit }, data) {
      return new Promise((resolve, reject) => {
        axios.post('admin/notes/update', data)
          .then(res => {
            commit('UPDATE_RECORD', data)
            resolve(res)
          })
          .catch(error => reject(error))
      })
    },
    /**
     *
     * @param commit
     * @param order_id
     * @param orderID
     * @returns {Promise<unknown>}
     */
    // eslint-disable-next-line camelcase
    showDetails({ commit }, order_id) {
      return new Promise((resolve, reject) => {
        axios.post('admin/order_detail', { order_id })
          .then(res => {
            commit('SHOW_RECORD', order_id)
            resolve(res)
          })
          .catch(error => reject(error))
      })
    },
    // eslint-disable-next-line camelcase
    delete({ commit }, note_id) {
      return new Promise((resolve, reject) => {
        axios.post('admin/notes/delete', { note_id })
          .then(res => {
            commit('REMOVE_RECORD', note_id)
            resolve(res)
          })
          .catch(error => reject(error))
      })
    },
    // eslint-disable-next-line camelcase
    acceptOrder({ commit }, order_id) {
      return new Promise((resolve, reject) => {
        axios.post('user/order/accept', { order_id })
          .then(res => {
            commit('REMOVE_RECORD', order_id)
            resolve(res)
          })
          .catch(error => reject(error))
      })
    },
    // eslint-disable-next-line camelcase
    offer({ commit }, obj) {
      return new Promise((resolve, reject) => {
        axios.post('user/order/create/offer', obj)
          .then(res => {
            commit('REMOVE_RECORD', obj)
            resolve(res)
          })
          .catch(error => reject(error))
      })
    },
  },
}
