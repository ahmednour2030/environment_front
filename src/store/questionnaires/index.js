import axios from '@axios'

export default {
  namespaced: true,
  state: {
    questionnaires: [],
  },
  getters: {},
  mutations: {
    SET_RECORD(state, categories) {
      state.questionnaires = categories
    },
    UPDATE_RECORD(state, data) {
      const catIndex = state.questionnaires.findIndex(cat => cat.id === data.id)
      Object.assign(state.questionnaires[catIndex], data)
    },
    REMOVE_RECORD(state, itemId) {
      const caseIndex = state.questionnaires.findIndex(d => d.id === itemId)
      state.questionnaires.splice(caseIndex, 1)
    },
  },
  actions: {
    store(ctx, data) {
      return new Promise((resolve, reject) => {
        axios.post('admin/questionnaires/create', data)
          .then(res => {
            resolve(res)
          })
          .catch(error => reject(error))
      })
    },
    fetch({ commit }) {
      return new Promise((resolve, reject) => {
        axios.get('admin/questionnaires')
          .then(response => {
            commit('SET_RECORD', response.data.data)
            resolve(response)
          })
          .catch(error => reject(error))
      })
    },
    show(ctx, id) {
      return new Promise((resolve, reject) => {
        axios.post('admin/questionnaires/show', { id })
          .then(res => {
            resolve(res)
          })
          .catch(error => reject(error))
      })
    },
    edit(ctx, data) {
      return new Promise((resolve, reject) => {
        axios.post('admin/questionnaires/update', data)
          .then(res => {
            resolve(res)
          })
          .catch(error => reject(error))
      })
    },
    // eslint-disable-next-line camelcase
    delete({ commit }, questionnaire_id) {
      return new Promise((resolve, reject) => {
        axios.post('admin/questionnaires/delete', { questionnaire_id })
          .then(res => {
            commit('REMOVE_RECORD', questionnaire_id)
            resolve(res)
          })
          .catch(error => reject(error))
      })
    },
  },
}
