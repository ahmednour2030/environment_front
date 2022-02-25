import axios from '@axios'

export default {
  namespaced: true,
  state: {
    data: [],
  },
  getters: {},
  mutations: {
    SET_RECORD(state, data) {
      state.data = data
    },
    UPDATE_RECORD(state, data) {
      const catIndex = state.data.findIndex(cat => cat.id === data.id)
      Object.assign(state.data[catIndex], data)
    },
    REMOVE_RECORD(state, itemId) {
      const caseIndex = state.data.findIndex(d => d.id === itemId)
      state.data.splice(caseIndex, 1)
    },
  },
  actions: {
    /**
     *
     * @param commit
     * @returns {Promise<unknown>}
     */
    fetch({ commit }) {
      return new Promise((resolve, reject) => {
        axios
          .get('admin/home')
          .then(response => {
            commit('SET_RECORD', response.data.data)
            resolve(response)
          })
          .catch(error => reject(error))
      })
    },

  },
}
