import Vue from 'vue';
import Vuex from 'vuex';
import primaries from '../data/primaries.json'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    primaries,
    data: [],
    primary: [],
    userState: '',
  },
  mutations: {
    SET_DATA(state, data) {
      state.data = data
      state.userState = data.state[0].name
      state.primary = state.primaries.filter(
        it => it.State === state.userState,
      )[0]
    },
  },
  actions: {
    setData({ commit }, data) {
      commit('SET_DATA', data)
    },
  },
  modules: {
  },
});
