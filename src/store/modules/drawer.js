export default {
  name: 'navigationDrawer',
  namespaced: true,
  state: {
    drawer: false,
  },
  actions: {
    toggleDrawer({ state }) {
      state.drawer = !state.drawer;
    },
    setVisibilityDrawer({ state }, value) {
      state.drawer = value;
    },
  },
};
