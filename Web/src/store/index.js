import { createStore } from 'vuex'
import persistedState from 'vuex-persistedstate'
let create_persistedstate = persistedState({
  key: 'store',
  storege: window.loaclStorege,
})
export default createStore({
  state: {
    tagList: [{ name: '主页', path: '/home' }],
    Bard: {},
  },
  mutations: {
    addView(state, res) {
      const data = state.tagList.find((item) => item.path === res.path)
      if (!data) {
        state.tagList.push(res)
      }
    },
    TagDel(state, res) {
      state.tagList.splice(res, 1)
    },
    AddBard(state, res) {
      state.Bard = res
    },
  },
  actions: {
    async Addview({ commit }, data) {
      const res = await data
      commit('addView', res)
    },
    async TagDel({ commit }, data) {
      const res = await data
      commit('TagDel', res)
    },
    async AddBard({ commit }, data) {
      const res = await data
      commit('AddBard', res)
    },
  },
  plugins: [create_persistedstate],
})
