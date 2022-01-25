import axios from '@axios'

export default {
  namespaced: true,
  state: {
    question: [],
  },
  getters: {},
  mutations: {
    SET_RECORD(state, categories) {
      state.question = categories
    },
    UPDATE_RECORD(state, data) {
      const catIndex = state.question.findIndex(cat => cat.id === data.id)
      Object.assign(state.question[catIndex], data)
    },
    REMOVE_RECORD(state, itemId) {
      const caseIndex = state.question.findIndex(d => d.id === itemId)
      state.question.splice(caseIndex, 1)
    },
  },
  actions: {
    store(ctx, data) {
      return new Promise((resolve, reject) => {
        axios.post('admin/questions/create', data)
          .then(res => {
            resolve(res)
          })
          .catch(error => reject(error))
      })
    },
    fetch({ commit }) {
      return new Promise((resolve, reject) => {
        axios.get('admin/questions')
          .then(response => {
            commit('SET_RECORD', response.data.data)
            resolve(response)
          })
          .catch(error => reject(error))
      })
    },
    fetchByExam({ commit }, examId) {
      return new Promise((resolve, reject) => {
        axios.post('admin/questions/exam', { exam_id: examId })
          .then(response => {
            commit('SET_RECORD', response.data.data)
            resolve(response)
          })
          .catch(error => reject(error))
      })
    },
    show(ctx, questionId) {
      return new Promise((resolve, reject) => {
        axios.post('admin/questions/show', { question_id: questionId })
          .then(res => {
            resolve(res)
          })
          .catch(error => reject(error))
      })
    },
    edit(ctx, data) {
      return new Promise((resolve, reject) => {
        axios.post('admin/questions/update', data)
          .then(res => {
            resolve(res)
          })
          .catch(error => reject(error))
      })
    },
    // eslint-disable-next-line camelcase
    delete({ commit }, coupon_id) {
      return new Promise((resolve, reject) => {
        axios.post('admin/question/delete', { coupon_id })
          .then(res => {
            commit('REMOVE_RECORD', coupon_id)
            resolve(res)
          })
          .catch(error => reject(error))
      })
    },
  },
}
