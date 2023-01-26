"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _default = {
  name: 'mensaje',
  namespaced: true,
  state: {
    showModalAlert: false,
    mensaje: '',
    tipo: '',
    condition: false,
    value: null
  },
  mutations: {
    MOSTRAR: function MOSTRAR(state) {
      if (state.mensaje.length && state.mensaje !== null && state.tipo.length) {
        state.showModalAlert = !state.showModalAlert;
        if (state.showModalAlert) state.value = null;
      }
    },
    MENSAJE: function MENSAJE(state, payload) {
      state.mensaje = payload;
    },
    TIPO: function TIPO(state, payload) {
      state.tipo = payload;
    },
    MODE: function MODE(state, payload) {
      state.condition = payload;
    }
  },
  actions: {
    ejecutar: function ejecutar(_ref) {
      var commit = _ref.commit;
      commit('MOSTRAR');
    },
    cerrar: function cerrar(_ref2) {
      var commit = _ref2.commit,
          state = _ref2.state;
      var param = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      commit('MOSTRAR');
      state.value = param;
      state.condition = false;
    },
    push: function push(_ref3, data) {
      var commit = _ref3.commit;
      commit('MENSAJE', data[0]);
      commit('TIPO', data[1]);
      commit('MOSTRAR');
    },
    getResponse: function getResponse(_ref4, param) {
      var state = _ref4.state;
      var path = localStorage.getItem('alert-condition-param-path');

      if (path !== null && path === param) {
        return state.value;
      }

      return null;
    },
    condition: function condition(_ref5, param) {
      var commit = _ref5.commit;
      commit('MENSAJE', param);
      commit('TIPO', 'info');
      commit('MODE', true);
      commit('MOSTRAR');
    }
  }
};
exports["default"] = _default;