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
    url: '',
    registered: '',
    notRegistered: ''
  },
  mutations: {
    SET_DATA(state, data) {
      state.data = data
      state.userState = data.state[0].name
      state.primary = state.primaries.filter(
        it => it.State === state.userState,
      )[0]
      state.url = state.primary.Url
    },
    SET_REGISTRATION(state, { value, type }) {
      if (type === 'yes') {
        state.registered = value
        state.notRegistered = !value
      } else {
        state.registered = false
        state.notRegistered = true
      }
    }
  },
  actions: {
    setData({ commit }, data) {
      commit('SET_DATA', data)
    },
    setRegistrationStatus({ commit }, { value, type }) {
      commit('SET_REGISTRATION', { value, type })
    },
  },
  modules: {
  },
});
