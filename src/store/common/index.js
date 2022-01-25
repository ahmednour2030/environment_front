import axios from '@axios'

export default {
  namespaced: true,
  state: {
    governorates: [],
    cities: [],
    freelancerCategories: [],
  },
  getters: {},
  mutations: {
    SET_GOVERNORATES(state, governorates) {
      state.governorates = governorates
    },
    SET_CITIES(state, cities) {
      state.cities = cities
    },
    SET_FREELANCERCATEGORIES(state, freelancerCategories) {
      state.freelancerCategories = freelancerCategories
    },
  },
  actions: {
    FETCH_GOV({ commit }) {
      return new Promise((resolve, reject) => {
        axios.post('commons/governorates')
          .then(response => {
            commit('SET_GOVERNORATES', response.data.data.governorates)
            resolve(response)
          })
          .catch(error => reject(error))
      })
    },
    // eslint-disable-next-line camelcase
    FETCH_CITY({ commit }, governorate_id) {
      return new Promise((resolve, reject) => {
        axios.post('commons/cities', { governorate_id })
          .then(response => {
            commit('SET_CITIES', response.data.data.cities)
            resolve(response)
          })
          .catch(error => reject(error))
      })
    },
    fetchFreelancerCategories({ commit }) {
      return new Promise((resolve, reject) => {
        axios.post('commons/categories/freelancer')
          .then(response => {
            commit('SET_FREELANCERCATEGORIES', response.data.data.categories)
            resolve(response)
          })
          .catch(error => reject(error))
      })
    },
    fetchOrdersCountUser({ commit }) {
      return new Promise((resolve, reject) => {
        axios.get('user/orders/count')
          .then(response => {
            commit('SET_FREELANCERCATEGORIES', response.data.data.categories)
            resolve(response)
          })
          .catch(error => reject(error))
      })
    },
    fetchOrdersCount({ commit }) {
      return new Promise((resolve, reject) => {
        axios.get('admin/orders/count')
          .then(response => {
            commit('SET_FREELANCERCATEGORIES', response.data.data.categories)
            resolve(response)
          })
          .catch(error => reject(error))
      })
    },
  },
}
