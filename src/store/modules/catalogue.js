export default {
  name: 'catalogue',
  namespaced: true,
  state: {
    showDetail: false,
    itemView: null,
    querySearch: '',
  },

  mutations: {
    SHOW_DETAIL(state) {
      state.showDetail = state.showDetail === false;
    },
  },

  actions: {
    toggleFormDetail({ commit }) {
      commit('SHOW_DETAIL');
    },
    setItemView({ state }, param) {
      state.itemView = param;
    },
    QuerySearch({ state }, param) {
      state.querySearch = param;
    },
  },
};
