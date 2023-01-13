import { getIndex, getProducts } from '../../config/api/catalogue';

export default {
  name: 'catalogue',
  namespaced: true,
  state: {
    products: [],
    index: [],
    showDetail: false,
    itemView: null,
    querySearch: '',
    catalogueLoaded: false,
  },

  mutations: {
    SHOW_DETAIL(state) {
      state.showDetail = state.showDetail === false;
    },
    SET_INDEX(state, param) {
      state.index = param.data.response;
    },
    SET_PRODUCTS(state, param) {
      state.products = param.data.response;
      state.catalogueLoaded = true;
    },
  },

  actions: {
    toggleFormDetail({ commit }) {
      commit('SHOW_DETAIL');
    },
    setItemView({ state }, param) {
      state.itemView = param;
    },
    async QuerySearch({ commit, state }, param) {
      if (param.query.trim().length) {
        state.querySearch = param.query;
        state.catalogueLoaded = false;
        state.index = [];
        state.products = [];

        commit('SET_INDEX', await getIndex({ data: JSON.stringify(param) }));
        commit('SET_PRODUCTS', await getProducts({ data: JSON.stringify(param) }));
      }
    },
  },
};
