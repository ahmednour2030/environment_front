import axios from '@axios'

export default {
  namespaced: true,
  state: {
    adsCategory: [],
    items: 0,
  },
  getters: {},
  mutations: {

    /**
     * @param state
     * @param adsCategory
     * @constructor
     */
    SET_RECORD(state, adsCategory) {
      state.adsCategory = adsCategory
    },

    /**
     * @param state
     * @param data
     * @constructor
     */
    UPDATE_RECORD(state, data) {
      const catIndex = state.adsCategory.findIndex(cat => cat.id === data.id)
      Object.assign(state.adsCategory[catIndex], data)
    },

    /**
     * @param state
     * @param itemId
     * @constructor
     */
    REMOVE_RECORD(state, itemId) {
      const caseIndex = state.adsCategory.findIndex(d => d.id === itemId)
      state.adsCategory.splice(caseIndex, 1)
    },

    /**
     *
     * @param state
     * @param itemId
     * @constructor
     */
    SHOW_RECORD(state, itemId) {
      const caseIndex = state.adsCategory.findIndex(d => d.id === itemId)
      state.items = caseIndex
    },
  },
  actions: {

    /**
     * @param commit
     * @param category_id
     * @returns {Promise<unknown>}
     */
    // eslint-disable-next-line camelcase
    fetch({ commit }, category_id) {
      return new Promise((resolve, reject) => {
        axios.post('admin/get_category_ads', { category_id })
          .then(response => {
            commit('SET_RECORD', response.data.data)
            resolve(response)
          })
          .catch(error => reject(error))
      })
    },

    /**
     *
     * @param commit
     * @returns {Promise<unknown>}
     */
    fetchUser({ commit }) {
      return new Promise((resolve, reject) => {
        axios.get('user/orders/new')
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

    /**
     *
     * @param commit
     * @param category_id
     * @returns {Promise<unknown>}
     */
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

    /**
     *
     * @param commit
     * @param order_id
     * @returns {Promise<unknown>}
     */
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

    /**
     *
     * @param commit
     * @param obj
     * @returns {Promise<unknown>}
     */
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
