import axios from '@axios'

export default {
  namespaced: true,
  state: {
    reports: [],
  },
  getters: {},
  mutations: {
    SET_RECORD(state, reports) {
      state.reports = reports
    },
    UPDATE_RECORD(state, data) {
      const catIndex = state.reports.findIndex(cat => cat.id === data.id)
      Object.assign(state.reports[catIndex], data)
    },
    REMOVE_RECORD(state, itemId) {
      const caseIndex = state.reports.findIndex(d => d.id === itemId)
      state.reports.splice(caseIndex, 1)
    },
  },
  actions: {
    store(ctx, data) {
      return new Promise((resolve, reject) => {
        axios.post('admin/report/add', data)
          .then(res => {
            resolve(res)
          })
          .catch(error => reject(error))
      })
    },
    fetch({ commit }) {
      return new Promise((resolve, reject) => {
        axios.get('admin/report_list')
          .then(response => {
            commit('SET_RECORD', response.data.data)
            resolve(response)
          })
          .catch(error => reject(error))
      })
    },
    edit({ commit }, data) {
      return new Promise((resolve, reject) => {
        axios.post('admin/report/update', data)
          .then(res => {
            commit('UPDATE_RECORD', data)
            resolve(res)
          })
          .catch(error => reject(error))
      })
    },
    // eslint-disable-next-line camelcase
    delete({ commit }, report_id) {
      return new Promise((resolve, reject) => {
        // eslint-disable-next-line camelcase
        axios.post('admin/delete_report', { report_id })
          .then(res => {
            commit('REMOVE_RECORD', report_id)
            resolve(res)
          })
          .catch(error => reject(error))
      })
    },
  },
}
