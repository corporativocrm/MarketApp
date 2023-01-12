export default {
  name: 'mensaje',
  namespaced: true,
  state: {
    showModalAlert: false,
    mensaje: '',
    tipo: '',
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
  },
  actions: {
    ejecutar({ commit }) {
      commit('MOSTRAR');
    },
    cerrar({ commit }) {
      commit('MOSTRAR');
    },
    push({ commit }, data) {
      commit('MENSAJE', data[0]);
      commit('TIPO', data[1]);
      commit('MOSTRAR');
    },
  },
};
