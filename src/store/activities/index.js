import axios from '@axios'

export default {
  namespaced: true,
  state: {
    activities: [],
  },
  getters: {},
  mutations: {
    SET_RECORD(state, activities) {
      state.activities = activities
    },
    UPDATE_RECORD(state, data) {
      const catIndex = state.activities.findIndex(cat => cat.id === data.id)
      Object.assign(state.activities[catIndex], data)
    },
    REMOVE_RECORD(state, itemId) {
      const caseIndex = state.activities.findIndex(d => d.id === itemId)
      state.activities.splice(caseIndex, 1)
    },
  },
  actions: {
    store(ctx, data) {
      return new Promise((resolve, reject) => {
        axios.post('admin/modules/activities/create', data)
          .then(res => {
            resolve(res)
          })
          .catch(error => reject(error))
      })
    },
    update(ctx, data) {
      return new Promise((resolve, reject) => {
        axios.post('admin/modules/activities/update', data)
          .then(res => {
            resolve(res)
          })
          .catch(error => reject(error))
      })
    },
    fetch({ commit }) {
      return new Promise((resolve, reject) => {
        axios.get('admin/modules/activities')
          .then(response => {
            commit('SET_RECORD', response.data.data)
            resolve(response)
          })
          .catch(error => reject(error))
      })
    },
    fetchName() {
      return new Promise((resolve, reject) => {
        axios.get('admin/activities/name')
          .then(response => {
            resolve(response)
          })
          .catch(error => reject(error))
      })
    },

    delete({ commit }, activityId) {
      return new Promise((resolve, reject) => {
        axios.post('admin/modules/activities/delete', { activity_id: activityId })
          .then(res => {
            commit('REMOVE_RECORD', activityId)
            resolve(res)
          })
          .catch(error => reject(error))
      })
    },
  },
}
