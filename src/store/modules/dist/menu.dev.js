"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _default = {
  name: 'footerMenu',
  namespaced: true,
  state: {
    catalogue: false,
    shopcart: false,
    showDialogMessage: false,
    dialogOrders: false,
    dialogFavorite: false
  },
  mutations: {
    HOME: function HOME(state) {
      state.catalogue = false;
      state.shopcart = false;
      state.showDialogMessage = false;
      state.dialogOrders = false;
      state.dialogFavorite = false;
    },
    CATALOGUE: function CATALOGUE(state) {
      var param = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      state.catalogue = param != null ? param : !state.catalogue;
      state.shopcart = false;
      state.showDialogMessage = false;
      state.dialogOrders = false;
      state.dialogFavorite = false;
    },
    FAVORITE: function FAVORITE(state) {
      var param = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      state.dialogFavorite = param != null ? param : !state.dialogFavorite;
      state.catalogue = false;
      state.shopcart = false;
      state.showDialogMessage = false;
      state.dialogOrders = false;
    },
    SHOPCART: function SHOPCART(state) {
      var param = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      state.shopcart = param != null ? param : !state.shopcart;
      state.catalogue = false;
      state.showDialogMessage = false;
      state.dialogOrders = false;
      state.dialogFavorite = false;
    },
    MESSAGE: function MESSAGE(state) {
      var param = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      state.showDialogMessage = param != null ? param : !state.showDialogMessage;
      state.shopcart = false;
      state.catalogue = false;
      state.dialogOrders = false;
      state.dialogFavorite = false;
    },
    ORDERS: function ORDERS(state) {
      var param = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      state.dialogOrders = param != null ? param : !state.dialogOrders;
      state.shopcart = false;
      state.catalogue = false;
      state.showDialogMessage = false;
      state.dialogFavorite = false;
    }
  },
  actions: {
    toggleFormModalNotify: function toggleFormModalNotify(_ref) {
      var state = _ref.state;
      state.showDialogMessage = !state.showDialogMessage;
    }
  }
};
exports["default"] = _default;