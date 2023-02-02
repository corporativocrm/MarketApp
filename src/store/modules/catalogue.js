import {
  getIndex,
  getProducts,
  getOrder,
  getFavorite,
  toggleFavorite,
} from '../../config/api/catalogue';

export default {
  name: 'catalogue',
  namespaced: true,
  state: {
    products: [],
    favorites: [],
    index: [],
    showDetail: false,
    itemView: null,
    querySearch: '',
    catalogueLoaded: false,
    orders: [],
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
    SET_ORDERS(state, param) {
      state.orders = param.data.response;
    },
    SET_FAVORITES(state, param) {
      state.favorites = param.data.response;
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

    async favorite({ state }, param) {
      await toggleFavorite(param).then((result) => {
        if (result.data.response) {
          if (state.products.length > param.position) {
            if (state.products[param.position].id === param.code) {
              state.products[param.position].detail.favorite = param.status;
            }
          }
          if (state.favorites.length > param.position && state.favorites[param.position].id === param.code) {
            const index = state.favorites.findIndex((obj) => obj.id === param.code);
            if (index > -1) {
              state.favorites.splice(index, 1);
            }
          }
        }
      });
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

    async getOrders({ commit }) {
      commit('SET_ORDERS', await getOrder());
    },
    async getFavorites({ commit, state }) {
      state.catalogueLoaded = false;
      commit('SET_FAVORITES', await getFavorite());
    },
  },
};
