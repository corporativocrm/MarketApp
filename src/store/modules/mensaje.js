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

    condition({ commit }, caption) {
      commit('MENSAJE', caption);
      commit('TIPO', 'info');
      commit('MODE', true);
      commit('MOSTRAR');
    },
  },
};
