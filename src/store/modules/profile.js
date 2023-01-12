export default {
  name: 'StoreProfile',
  namespaced: true,
  state: {
    profile: { color: 'blue-grey', userid: null, organization: [{ name: '' }] },
    login: false,
    dataDefault: { color: 'blue-grey', userid: null, organization: [{ name: '' }] },
  },

  mutations: {
    LOGIN(state, payload) {
      state.login = payload;
    },
    SET_DATA(state, payload) {
      state.profile = payload;
    },
    RESET(state) {
      state.profile = state.dataDefault;
      state.login = false;
    },
  },

  actions: {
    setProfile({ commit }, data) {
      commit('SET_DATA', data);
    },
    setLogin({ commit }, value) {
      commit('LOGIN', value);
    },
    reset({ commit }) {
      commit('RESET');
    },
  },
};
