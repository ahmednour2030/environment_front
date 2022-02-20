import axios from '@axios'

export default {
  namespaced: true,
  state: {
    point: [],
  },
  getters: {},
  mutations: {
    SET_RECORD(state, point) {
      state.point = point
    },
    UPDATE_RECORD(state, data) {
      const catIndex = state.point.findIndex(cat => cat.id === data.id)
      Object.assign(state.point[catIndex], data)
    },
    REMOVE_RECORD(state, itemId) {
      const caseIndex = state.point.findIndex(d => d.id === itemId)
      state.point.splice(caseIndex, 1)
    },
  },
  actions: {
    store(ctx, data) {
      return new Promise((resolve, reject) => {
        axios
          .post('admin/modules/points/create', data)
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
          .get('admin/modules/points')
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
          .post('admin/modules/points/update', data)
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
    delete({ commit }, point_id) {
      return new Promise((resolve, reject) => {
        axios
          .post('admin/modules/points/delete', { point_id })
          .then(res => {
            commit('REMOVE_RECORD', point_id)
            resolve(res)
          })
          .catch(error => reject(error))
      })
    },
  },
}
