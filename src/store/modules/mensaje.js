export default {
  name: 'mensaje',
  namespaced: true,
  state: {
    showModalAlert: false,
    mensaje: '',
    tipo: '',
    condition: false,
    value: null,
  },
  mutations: {
    MOSTRAR(state) {
      if (state.mensaje.length && state.mensaje !== null && state.tipo.length) {
        state.showModalAlert = !state.showModalAlert;
        if (state.showModalAlert) state.value = null;
      }
    },
    MENSAJE(state, payload) {
      state.mensaje = payload;
    },
    TIPO(state, payload) {
      state.tipo = payload;
    },
    MODE(state, payload) {
      state.condition = payload;
    },
  },
  actions: {
    ejecutar({ commit }) {
      commit('MOSTRAR');
    },
    cerrar({ commit, state }, param = null) {
      commit('MOSTRAR');
      state.value = param;
      state.condition = false;
    },
    push({ commit }, data) {
      commit('MENSAJE', data[0]);
      commit('TIPO', data[1]);
      commit('MOSTRAR');
    },

    getResponse({ state }, param) {
      const path = localStorage.getItem('alert-condition-param-path');
      if (path !== null && path === param) {
        return state.value;
      }
      return null;
    },

    condition({ commit }, param) {
      commit('MENSAJE', param);
      commit('TIPO', 'info');
      commit('MODE', true);
      commit('MOSTRAR');
    },
  },
};
