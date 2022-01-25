import axios from '@axios'

export default {
  namespaced: true,
  state: {
    sliders: [],
  },
  getters: {},
  mutations: {
    SET_RECORD(state, sliders) {
      state.sliders = sliders
    },
    UPDATE_RECORD(state, data) {
      const catIndex = state.sliders.findIndex(cat => cat.id === data.id)
      Object.assign(state.sliders[catIndex], data)
    },
    REMOVE_RECORD(state, itemId) {
      const caseIndex = state.sliders.findIndex(d => d.id === itemId)
      state.sliders.splice(caseIndex, 1)
    },
  },
  actions: {
    store(ctx, data) {
      return new Promise((resolve, reject) => {
        axios.post('admin/add_slider', data)
          .then(res => {
            resolve(res)
          })
          .catch(error => reject(error))
      })
    },
    fetch({ commit }) {
      return new Promise((resolve, reject) => {
        axios.get('admin/get_sliders')
          .then(response => {
            commit('SET_RECORD', response.data.data)
            resolve(response)
          })
          .catch(error => reject(error))
      })
    },
    edit({ commit }, data) {
      return new Promise((resolve, reject) => {
        axios.post('admin/update_slider', data)
          .then(res => {
            commit('UPDATE_RECORD', data)
            resolve(res)
          })
          .catch(error => reject(error))
      })
    },
    // eslint-disable-next-line camelcase
    delete({ commit }, slider_id) {
      return new Promise((resolve, reject) => {
        axios.post('admin/delete_slider', { slider_id })
          .then(res => {
            commit('REMOVE_RECORD', slider_id)
            resolve(res)
          })
          .catch(error => reject(error))
      })
    },
  },
}
