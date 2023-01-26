"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sendOrder = exports.getProducts = exports.getIndex = void 0;

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