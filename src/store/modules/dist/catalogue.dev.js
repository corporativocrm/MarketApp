"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _catalogue = require("../../config/api/catalogue");

var _default = {
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
    orders: []
  },
  mutations: {
    SHOW_DETAIL: function SHOW_DETAIL(state) {
      state.showDetail = state.showDetail === false;
    },
    SET_INDEX: function SET_INDEX(state, param) {
      state.index = param.data.response;
    },
    SET_PRODUCTS: function SET_PRODUCTS(state, param) {
      state.products = param.data.response;
      state.catalogueLoaded = true;
    },
    SET_ORDERS: function SET_ORDERS(state, param) {
      state.orders = param.data.response;
    },
    SET_FAVORITES: function SET_FAVORITES(state, param) {
      state.favorites = param.data.response;
      state.catalogueLoaded = true;
    }
  },
  actions: {
    toggleFormDetail: function toggleFormDetail(_ref) {
      var commit = _ref.commit;
      commit('SHOW_DETAIL');
    },
    setItemView: function setItemView(_ref2, param) {
      var state = _ref2.state;
      state.itemView = param;
    },
    favorite: function favorite(_ref3, param) {
      var state;
      return regeneratorRuntime.async(function favorite$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              state = _ref3.state;
              _context.next = 3;
              return regeneratorRuntime.awrap((0, _catalogue.toggleFavorite)(param).then(function (result) {
                if (result.data.response) {
                  if (state.products.length > param.position) {
                    if (state.products[param.position].id === param.code) {
                      state.products[param.position].detail.favorite = param.status;
                    }
                  }

                  if (state.favorites.length > param.position && state.favorites[param.position].id === param.code) {
                    var index = state.favorites.findIndex(function (obj) {
                      return obj.id === param.code;
                    });

                    if (index > -1) {
                      state.favorites.splice(index, 1);
                    }
                  }
                }
              }));

            case 3:
            case "end":
              return _context.stop();
          }
        }
      });
    },
    QuerySearch: function QuerySearch(_ref4, param) {
      var commit, state;
      return regeneratorRuntime.async(function QuerySearch$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              commit = _ref4.commit, state = _ref4.state;

              if (!param.query.trim().length) {
                _context2.next = 16;
                break;
              }

              state.querySearch = param.query;
              state.catalogueLoaded = false;
              state.index = [];
              state.products = [];
              _context2.t0 = commit;
              _context2.next = 9;
              return regeneratorRuntime.awrap((0, _catalogue.getIndex)({
                data: JSON.stringify(param)
              }));

            case 9:
              _context2.t1 = _context2.sent;
              (0, _context2.t0)('SET_INDEX', _context2.t1);
              _context2.t2 = commit;
              _context2.next = 14;
              return regeneratorRuntime.awrap((0, _catalogue.getProducts)({
                data: JSON.stringify(param)
              }));

            case 14:
              _context2.t3 = _context2.sent;
              (0, _context2.t2)('SET_PRODUCTS', _context2.t3);

            case 16:
            case "end":
              return _context2.stop();
          }
        }
      });
    },
    getOrders: function getOrders(_ref5) {
      var commit;
      return regeneratorRuntime.async(function getOrders$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              commit = _ref5.commit;
              _context3.t0 = commit;
              _context3.next = 4;
              return regeneratorRuntime.awrap((0, _catalogue.getOrder)());

            case 4:
              _context3.t1 = _context3.sent;
              (0, _context3.t0)('SET_ORDERS', _context3.t1);

            case 6:
            case "end":
              return _context3.stop();
          }
        }
      });
    },
    getFavorites: function getFavorites(_ref6) {
      var commit, state;
      return regeneratorRuntime.async(function getFavorites$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              commit = _ref6.commit, state = _ref6.state;
              state.catalogueLoaded = false;
              _context4.t0 = commit;
              _context4.next = 5;
              return regeneratorRuntime.awrap((0, _catalogue.getFavorite)());

            case 5:
              _context4.t1 = _context4.sent;
              (0, _context4.t0)('SET_FAVORITES', _context4.t1);

            case 7:
            case "end":
              return _context4.stop();
          }
        }
      });
    }
  }
};
exports["default"] = _default;