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
          .post('admin/sub_add_category', data)
          .then(res => {
            resolve(res)
          })
          .catch(error => reject(error))
      })
    },
    // eslint-disable-next-line camelcase
    fetch({ commit }, category_id) {
      return new Promise((resolve, reject) => {
        axios
          .post('admin/sub_get_categories', { category_id })
          .then(response => {
            commit('SET_RECORD', response.data.data)
            resolve(response)
          })
          .catch(error => reject(error))
      })
    },
    edit(commit, data) {
      return new Promise((resolve, reject) => {
        axios
          .post('admin/update_category', data)
          .then(res => {
            console.log('res', res)
            console.log('data', data)
            resolve(res)
          })
          .catch(error => reject(error))
      })
    },
    // eslint-disable-next-line camelcase
    delete({ commit }, sub_category_id) {
      return new Promise((resolve, reject) => {
        axios
          .post('admin/sub_delete_category', { sub_category_id })
          .then(res => {
            commit('REMOVE_RECORD', sub_category_id)
            resolve(res)
          })
          .catch(error => reject(error))
      })
    },
  },
}
