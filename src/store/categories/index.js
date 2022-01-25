import axios from '@axios'

export default {
  namespaced: true,
  state: {
    categories: [],
  },
  getters: {},
  mutations: {
    SET_RECORD(state, categories) {
      state.categories = categories
    },
    UPDATE_RECORD(state, data) {
      const catIndex = state.categories.findIndex(cat => cat.id === data.id)
      Object.assign(state.categories[catIndex], data)
    },
    REMOVE_RECORD(state, itemId) {
      const caseIndex = state.categories.findIndex(d => d.id === itemId)
      state.categories.splice(caseIndex, 1)
    },
  },
  actions: {
    store(ctx, data) {
      return new Promise((resolve, reject) => {
        axios
          .post('admin/categories/create', data)
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
          .get('admin/categories')
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
          .post('admin/categories/update', data)
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
    delete({ commit }, category_id) {
      return new Promise((resolve, reject) => {
        axios
          .post('admin/categories/delete', { category_id })
          .then(res => {
            commit('REMOVE_RECORD', category_id)
            resolve(res)
          })
          .catch(error => reject(error))
      })
    },
  },
}
