import axios from '@axios'

export default {
  namespaced: true,
  state: {
    library: [],
  },
  getters: {},
  mutations: {

    /**
     * @param state
     * @param library
     * @constructor
     */
    SET_RECORD(state, library) {
      state.library = library
    },

    /**
     * @param state
     * @param data
     * @constructor
     */
    UPDATE_RECORD(state, data) {
      const catIndex = state.library.findIndex(cat => cat.id === data.id)
      Object.assign(state.library[catIndex], data)
    },
    /**
     * @param state
     * @param itemId
     * @constructor
     */
    REMOVE_RECORD(state, itemId) {
      const caseIndex = state.library.findIndex(d => d.id === itemId)
      state.library.splice(caseIndex, 1)
    },
    /**
     *
     * @param state
     * @param itemId
     * @constructor
     */
    SHOW_RECORD(state, itemId) {
      state.items = state.ads.findIndex(d => d.id === itemId)
    },
  },
  actions: {
    /**
     * @param commit
     * @returns {Promise<unknown>}
     */
    fetch({ commit }) {
      return new Promise((resolve, reject) => {
        axios.get('admin/libraries')
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
        axios.post('admin/libraries/create', data)
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
        axios.post('admin/libraries/update', data)
          .then(res => {
            commit('UPDATE_RECORD', data)
            resolve(res)
          })
          .catch(error => reject(error))
      })
    },

    // eslint-disable-next-line camelcase
    delete({ commit }, library_id) {
      return new Promise((resolve, reject) => {
        axios.post('admin/libraries/delete', { library_id })
          .then(res => {
            commit('REMOVE_RECORD', library_id)
            resolve(res)
          })
          .catch(error => reject(error))
      })
    },
  },
}
