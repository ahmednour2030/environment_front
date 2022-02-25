import axios from '@axios'

export default {
  namespaced: true,
  state: {
    files: [],
  },
  getters: {},
  mutations: {
    SET_RECORD(state, files) {
      state.files = files
    },
    UPDATE_RECORD(state, data) {
      const catIndex = state.files.findIndex(cat => cat.id === data.id)
      Object.assign(state.files[catIndex], data)
    },
    REMOVE_RECORD(state, itemId) {
      const caseIndex = state.files.findIndex(d => d.id === itemId)
      state.files.splice(caseIndex, 1)
    },
  },
  actions: {
    store(ctx, data) {
      return new Promise((resolve, reject) => {
        axios
          .post('admin/modules/files/create', data)
          .then(res => {
            resolve(res)
          })
          .catch(error => reject(error))
      })
    },
    /**
     *
     * @param commit
     * @returns {Promise<unknown>}
     */
    fetch({ commit }) {
      return new Promise((resolve, reject) => {
        axios
          .get('admin/modules/files')
          .then(response => {
            commit('SET_RECORD', response.data.data)
            resolve(response)
          })
          .catch(error => reject(error))
      })
    },
    edit({ commit }, data) {
      return new Promise((resolve, reject) => {
        axios
          .post('admin/modules/files/update', data)
          .then(res => {
            commit('UPDATE_RECORD', {
              id: res.data.data.id,
              name: res.data.data.name,
              image: res.data.data.image,
            })
            resolve(res)
          })
          .catch(error => reject(error))
      })
    },
    // eslint-disable-next-line camelcase
    delete({ commit }, file_id) {
      return new Promise((resolve, reject) => {
        axios
          .post('admin/modules/files/delete', { file_id })
          .then(res => {
            commit('REMOVE_RECORD', file_id)
            resolve(res)
          })
          .catch(error => reject(error))
      })
    },
  },
}
