import axios from '@axios'

export default {
  namespaced: true,
  state: {
    ads: [],
    items: 0,
  },
  getters: {},
  mutations: {

    /**
     * @param state
     * @param ads
     * @constructor
     */
    SET_RECORD(state, ads) {
      state.ads = ads
    },

    /**
     * @param state
     * @param data
     * @constructor
     */
    UPDATE_RECORD(state, data) {
      const catIndex = state.ads.findIndex(cat => cat.id === data.id)
      Object.assign(state.ads[catIndex], data)
    },
    /**
     * @param state
     * @param itemId
     * @constructor
     */
    REMOVE_RECORD(state, itemId) {
      const caseIndex = state.ads.findIndex(d => d.id === itemId)
      state.ads.splice(caseIndex, 1)
    },
    /**
     *
     * @param state
     * @param itemId
     * @constructor
     */
    SHOW_RECORD(state, itemId) {
      state.items = state.ads.findIndex(d => d.id === itemId)
    },
  },
  actions: {
    /**
     * @param commit
     * @returns {Promise<unknown>}
     */
    fetchWaiting({ commit }) {
      return new Promise((resolve, reject) => {
        axios.get('admin/waitingAds')
          .then(response => {
            commit('SET_RECORD', response.data.data)
            resolve(response)
          })
          .catch(error => reject(error))
      })
    },
    fetchActive({ commit }) {
      return new Promise((resolve, reject) => {
        axios.get('admin/activeAds')
          .then(response => {
            commit('SET_RECORD', response.data.data)
            resolve(response)
          })
          .catch(error => reject(error))
      })
    },
    fetchFinish({ commit }) {
      return new Promise((resolve, reject) => {
        axios.get('admin/orders/finished')
          .then(response => {
            commit('SET_RECORD', response.data.data)
            resolve(response)
          })
          .catch(error => reject(error))
      })
    },
    /**
     * @param commit
     * @param data
     * @returns {Promise<unknown>}
     */
    edit({ commit }, data) {
      return new Promise((resolve, reject) => {
        axios.post('admin/category/update', data)
          .then(res => {
            commit('UPDATE_RECORD', data)
            resolve(res)
          })
          .catch(error => reject(error))
      })
    },
    /**
     *
     * @param commit
     * @param order_id
     * @param orderID
     * @returns {Promise<unknown>}
     */
    // eslint-disable-next-line camelcase
    showDetails({ commit }, order_id) {
      return new Promise((resolve, reject) => {
        axios.post('admin/order_detail', { order_id })
          .then(res => {
            commit('SHOW_RECORD', order_id)
            resolve(res)
          })
          .catch(error => reject(error))
      })
    },
    // eslint-disable-next-line camelcase
    delete({ commit }, category_id) {
      return new Promise((resolve, reject) => {
        axios.post('admin/category/delete', { category_id })
          .then(res => {
            commit('REMOVE_RECORD', category_id)
            resolve(res)
          })
          .catch(error => reject(error))
      })
    },
    // eslint-disable-next-line camelcase
    acceptOrder({ commit }, order_id) {
      return new Promise((resolve, reject) => {
        axios.post('user/order/accept', { order_id })
          .then(res => {
            commit('REMOVE_RECORD', order_id)
            resolve(res)
          })
          .catch(error => reject(error))
      })
    },
    // eslint-disable-next-line camelcase
    offer({ commit }, obj) {
      return new Promise((resolve, reject) => {
        axios.post('user/order/create/offer', obj)
          .then(res => {
            commit('REMOVE_RECORD', obj)
            resolve(res)
          })
          .catch(error => reject(error))
      })
    },
  },
}
