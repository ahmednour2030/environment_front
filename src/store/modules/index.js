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
        axios.get('admin/modules')
          .then(response => {
            commit('SET_RECORD', response.data.data)
            resolve(response)
          })
          .catch(error => reject(error))
      })
    },
    fetchNames({ commit }) {
      return new Promise((resolve, reject) => {
        axios.get('admin/modules/name')
          .then(response => {
            commit('SET_RECORD', response.data.data)
            resolve(response)
          })
          .catch(error => reject(error))
      })
    },
    store(ctx, data) {
      return new Promise((resolve, reject) => {
        axios.post('admin/modules/create', data)
          .then(res => {
            resolve(res)
          })
          .catch(error => reject(error))
      })
    },
    update({ commit }, data) {
      return new Promise((resolve, reject) => {
        axios.post('admin/modules/update', data)
          .then(res => {
            commit('UPDATE_RECORD', {
              id: res.data.data.id,
              name: res.data.data.name,
              description: res.data.data.description,
              image: res.data.data.image,
            })
            resolve(res)
          })
          .catch(error => reject(error))
      })
    },

    delete({ commit }, moduleId) {
      return new Promise((resolve, reject) => {
        axios.post('admin/modules/delete', { module_id: moduleId })
          .then(res => {
            commit('REMOVE_RECORD', moduleId)
            resolve(res)
          })
          .catch(error => reject(error))
      })
    },
  },
}
