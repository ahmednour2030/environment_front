import axios from '@axios'

export default {
  namespaced: true,
  state: {
    exams: [],
  },
  getters: {},
  mutations: {
    SET_RECORD(state, exams) {
      state.exams = exams
    },
    UPDATE_RECORD(state, data) {
      const catIndex = state.exams.findIndex(cat => cat.id === data.id)
      Object.assign(state.exams[catIndex], data)
    },
    REMOVE_RECORD(state, itemId) {
      const caseIndex = state.exams.findIndex(d => d.id === itemId)
      state.exams.splice(caseIndex, 1)
    },
  },
  actions: {
    store(ctx, data) {
      return new Promise((resolve, reject) => {
        axios.post('admin/exams/create', data)
          .then(res => {
            resolve(res)
          })
          .catch(error => reject(error))
      })
    },
    update(ctx, data) {
      return new Promise((resolve, reject) => {
        axios.post('admin/exams/update', data)
          .then(res => {
            resolve(res)
          })
          .catch(error => reject(error))
      })
    },
    fetch({ commit }) {
      return new Promise((resolve, reject) => {
        axios.get('admin/exams')
          .then(response => {
            commit('SET_RECORD', response.data.data)
            resolve(response)
          })
          .catch(error => reject(error))
      })
    },
    fetchName() {
      return new Promise((resolve, reject) => {
        axios.get('admin/exams/name')
          .then(response => {
            resolve(response)
          })
          .catch(error => reject(error))
      })
    },
    delete({ commit }, examId) {
      return new Promise((resolve, reject) => {
        axios.post('admin/exams/delete', { exam_id: examId })
          .then(res => {
            commit('REMOVE_RECORD', examId)
            resolve(res)
          })
          .catch(error => reject(error))
      })
    },
  },
}
