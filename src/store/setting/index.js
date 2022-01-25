import axios from '@axios'

export default {
  namespaced: true,
  state: {
    settings: [],
  },
  getters: {},
  mutations: {
    SET_RECORD(state, settings) {
      state.settings = settings
    },
    UPDATE_RECORD(state, data) {
      const catIndex = state.settings.findIndex(cat => cat.id === data.id)
      Object.assign(state.settings[catIndex], data)
    },
    REMOVE_RECORD(state, itemId) {
      const caseIndex = state.settings.findIndex(d => d.id === itemId)
      state.settings.splice(caseIndex, 1)
    },
  },
  actions: {
    store(ctx, data) {
      return new Promise((resolve, reject) => {
        axios.post('admin/setting/create', data)
          .then(res => {
            resolve(res)
          })
          .catch(error => reject(error))
      })
    },
    fetch({ commit }) {
      return new Promise((resolve, reject) => {
        axios.get('admin/setting')
          .then(response => {
            commit('SET_RECORD', response.data.data)
            resolve(response)
          })
          .catch(error => reject(error))
      })
    },
    edit({ commit }, data) {
      return new Promise((resolve, reject) => {
        axios.post('admin/setting/update', data)
          .then(res => {
            commit('UPDATE_RECORD', data)
            resolve(res)
          })
          .catch(error => reject(error))
      })
    },
    // eslint-disable-next-line camelcase
    delete({ commit }, setting_id) {
      return new Promise((resolve, reject) => {
        axios.post('admin/setting/delete', { setting_id })
          .then(res => {
            commit('REMOVE_RECORD', setting_id)
            resolve(res)
          })
          .catch(error => reject(error))
      })
    },
  },
}
