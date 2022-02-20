import axios from '@axios'

export default {
  namespaced: true,
  state: {
    content: [],
  },
  getters: {},
  mutations: {
    SET_RECORD(state, content) {
      state.content = content
    },
    UPDATE_RECORD(state, data) {
      const catIndex = state.content.findIndex(cat => cat.id === data.id)
      Object.assign(state.content[catIndex], data)
    },
    REMOVE_RECORD(state, itemId) {
      const caseIndex = state.content.findIndex(d => d.id === itemId)
      state.content.splice(caseIndex, 1)
    },
  },
  actions: {
    store(ctx, data) {
      return new Promise((resolve, reject) => {
        axios
          .post('admin/modules/content/create', data)
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
          .get('admin/modules/content')
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
          .post('admin/modules/content/update', data)
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
    delete({ commit }, content_id) {
      return new Promise((resolve, reject) => {
        axios
          .post('admin/modules/content/delete', { content_id })
          .then(res => {
            commit('REMOVE_RECORD', content_id)
            resolve(res)
          })
          .catch(error => reject(error))
      })
    },
  },
}
