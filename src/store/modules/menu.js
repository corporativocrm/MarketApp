export default {

  name: 'footerMenu',

  namespaced: true,

  state: {

    catalogue: false,

    shopcart: false,

    showDialogMessage: false,

    dialogOrders: false,
  },
  mutations: {

    HOME(state) {
      state.catalogue = false;
      state.shopcart = false;
      state.showDialogMessage = false;
      state.dialogOrders = false;
    },

    CATALOGUE(state, param = null) {
      state.catalogue = param != null ? param : !state.catalogue;
      state.shopcart = false;
      state.showDialogMessage = false;
      state.dialogOrders = false;
    },

    SHOPCART(state, param = null) {
      state.shopcart = param != null ? param : !state.shopcart;
      state.catalogue = false;
      state.showDialogMessage = false;
      state.dialogOrders = false;
    },

    MESSAGE(state, param = null) {
      state.showDialogMessage = param != null ? param : !state.showDialogMessage;
      state.shopcart = false;
      state.catalogue = false;
      state.dialogOrders = false;
    },

    ORDERS(state, param = null) {
      state.dialogOrders = param != null ? param : !state.dialogOrders;
      state.shopcart = false;
      state.catalogue = false;
      state.showDialogMessage = false;
    },
  },
  actions: {
    toggleFormModalNotify({ state }) {
      state.showDialogMessage = !state.showDialogMessage;
    },
  },

};
