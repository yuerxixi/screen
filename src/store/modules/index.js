// 样例
const state = {
  projectId: '' // 项目id
}

const mutations = {
  GET_PROJECTID: (state, data) => {
    state.projectId = data
  }
}

const actions = {
  GET_PROJECTID({ commit }, data) {
    commit('GET_PROJECTID', data)
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}
