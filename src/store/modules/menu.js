export default {

  name: 'footerMenu',

  namespaced: true,

  state: {

    catalogue: false,

    shopcart: false,

    showModalUpdate: false,

    showModalNotify: false,

    showNavigationBar: true,

  },
  mutations: {

    HOME(state) {
      state.catalogue = false;
      state.shopcart = false;
      state.showNavigationBar = true;
    },

    CATALOGUE(state, param = null) {
      state.catalogue = param != null ? param : !state.catalogue;
      state.shopcart = false;
    },

    SHOPCART(state, param = null) {
      state.shopcart = param != null ? param : !state.shopcart;
      state.catalogue = false;
    },

    SHOW_FORM_NOTIFY_MODAL(state) {
      state.showModalNotify = !state.showModalNotify;
    },
  },
  actions: {
    toggleFormModalNotify({ commit }) {
      commit('SHOW_FORM_NOTIFY_MODAL');
    },
    setNavigationBar({ state }, param) {
      state.showNavigationBar = param;
    },
  },

};
