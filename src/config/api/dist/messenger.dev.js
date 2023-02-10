"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sendAnswer = exports.getConversation = exports.getAllMessages = void 0;

var _axios = _interopRequireDefault(require("../axios"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var getAllMessages = function getAllMessages() {
  return regeneratorRuntime.async(function getAllMessages$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          return _context.abrupt("return", _axios["default"].getAPI('notify/all', null));

        case 1:
        case "end":
          return _context.stop();
      }
    }
  });
};

exports.getAllMessages = getAllMessages;

var getConversation = function getConversation(param) {
  return regeneratorRuntime.async(function getConversation$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          return _context2.abrupt("return", _axios["default"].getAPI('notify/get/'.concat(param), null));

        case 1:
        case "end":
          return _context2.stop();
      }
    }
  });
};

exports.getConversation = getConversation;

var sendAnswer = function sendAnswer(param) {
  return regeneratorRuntime.async(function sendAnswer$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          return _context3.abrupt("return", _axios["default"].getAPI('notify/send', param));

        case 1:
        case "end":
          return _context3.stop();
      }
    }
  });
};

exports.sendAnswer = sendAnswer;