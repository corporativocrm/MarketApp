export default {
  name: 'WebServices',
  namespaced: true,
  state: {
    preload: true,
    loading: false,
  },
  actions: {
    setLoading({ state }, value) {
      state.loading = value;
    },
    setPreload({ state }, value) {
      state.preload = value;
    },
  },
};
