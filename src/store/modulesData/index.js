import axios from '@axios'

export default {
  namespaced: true,
  state: {
    modules: [],
  },
  getters: {},
  mutations: {
    SET_RECORD(state, users) {
      state.modules = users
    },
    UPDATE_RECORD(state, data) {
      const catIndex = state.modules.findIndex(cat => cat.id === data.id)
      Object.assign(state.modules[catIndex], data)
    },
    REMOVE_RECORD(state, itemId) {
      const caseIndex = state.modules.findIndex(d => d.id === itemId)
      state.modules.splice(caseIndex, 1)
    },

  },
  actions: {
    fetch({ commit }) {
      return new Promise((resolve, reject) => {
        axios.get('admin/modules/data')
          .then(response => {
            commit('SET_RECORD', response.data.data)
            resolve(response)
          })
          .catch(error => reject(error))
      })
    },
    fetchObjectives({ commit }) {
      return new Promise((resolve, reject) => {
        axios.get('admin/modules/data/objectives')
          .then(response => {
            commit('SET_RECORD', response.data.data)
            resolve(response)
          })
          .catch(error => reject(error))
      })
    },
    fetchSummary({ commit }) {
      return new Promise((resolve, reject) => {
        axios.get('admin/modules/data/summary')
          .then(response => {
            commit('SET_RECORD', response.data.data)
            resolve(response)
          })
          .catch(error => reject(error))
      })
    },
    fetchNames({ commit }) {
      return new Promise((resolve, reject) => {
        axios.get('admin/modules/data/names')
          .then(response => {
            commit('SET_RECORD', response.data.data)
            resolve(response)
          })
          .catch(error => reject(error))
      })
    },
    store(ctx, data) {
      return new Promise((resolve, reject) => {
        axios.post('admin/modules/data/create', data)
          .then(res => {
            resolve(res)
          })
          .catch(error => reject(error))
      })
    },
    update(ctx, data) {
      return new Promise((resolve, reject) => {
        axios.post('admin/modules/update', data)
          .then(res => {
            resolve(res)
          })
          .catch(error => reject(error))
      })
    },

    // eslint-disable-next-line camelcase
    delete({ commit }, id) {
      return new Promise((resolve, reject) => {
        axios.post('admin/modules/data/delete', { id })
          .then(res => {
            commit('REMOVE_RECORD', id)
            resolve(res)
          })
          .catch(error => reject(error))
      })
    },
  },
}
