import axios from '@axios'

export default {
  namespaced: true,
  state: {
    link: [],
  },
  getters: {},
  mutations: {
    SET_RECORD(state, link) {
      state.link = link
    },
    UPDATE_RECORD(state, data) {
      const catIndex = state.link.findIndex(cat => cat.id === data.id)
      Object.assign(state.link[catIndex], data)
    },
    REMOVE_RECORD(state, itemId) {
      const caseIndex = state.link.findIndex(d => d.id === itemId)
      state.link.splice(caseIndex, 1)
    },
  },
  actions: {
    store(ctx, data) {
      return new Promise((resolve, reject) => {
        axios
          .post('admin/modules/links/create', data)
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
          .get('admin/modules/links')
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
          .post('admin/modules/links/update', data)
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
    delete({ commit }, link_id) {
      return new Promise((resolve, reject) => {
        axios
          .post('admin/modules/links/delete', { link_id })
          .then(res => {
            commit('REMOVE_RECORD', link_id)
            resolve(res)
          })
          .catch(error => reject(error))
      })
    },
  },
}
