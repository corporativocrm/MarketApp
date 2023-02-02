"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.toggleFavorite = exports.getFavorite = exports.sendOrder = exports.getOrder = exports.getProducts = exports.getIndex = void 0;

var _axios = _interopRequireDefault(require("../axios"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var getIndex = function getIndex(param) {
  return regeneratorRuntime.async(function getIndex$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          return _context.abrupt("return", _axios["default"].getAPI('market/get/index', param));

        case 1:
        case "end":
          return _context.stop();
      }
    }
  });
};

exports.getIndex = getIndex;

var getProducts = function getProducts(param) {
  return regeneratorRuntime.async(function getProducts$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          return _context2.abrupt("return", _axios["default"].getAPI('market/get/products', param));

        case 1:
        case "end":
          return _context2.stop();
      }
    }
  });
};

exports.getProducts = getProducts;

var sendOrder = function sendOrder(param) {
  return regeneratorRuntime.async(function sendOrder$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          return _context3.abrupt("return", _axios["default"].getAPI('market/order/add', {
            data: param
          }));

        case 1:
        case "end":
          return _context3.stop();
      }
    }
  });
};

exports.sendOrder = sendOrder;

var getOrder = function getOrder() {
  return regeneratorRuntime.async(function getOrder$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          return _context4.abrupt("return", _axios["default"].getAPI('market/order/list', {}));

        case 1:
        case "end":
          return _context4.stop();
      }
    }
  });
};

exports.getOrder = getOrder;

var getFavorite = function getFavorite() {
  return regeneratorRuntime.async(function getFavorite$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          return _context5.abrupt("return", _axios["default"].getAPI('market/get/product/favorite', {}));

        case 1:
        case "end":
          return _context5.stop();
      }
    }
  });
};

exports.getFavorite = getFavorite;

var toggleFavorite = function toggleFavorite(param) {
  return regeneratorRuntime.async(function toggleFavorite$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          return _context6.abrupt("return", _axios["default"].getAPI('market/set/product/favorite', {
            data: param
          }));

        case 1:
        case "end":
          return _context6.stop();
      }
    }
  });
};

exports.toggleFavorite = toggleFavorite;