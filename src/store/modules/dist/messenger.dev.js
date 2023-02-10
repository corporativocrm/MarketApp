"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _messenger = require("../../config/api/messenger");

var _default = {
  name: 'messenger',
  namespaced: true,
  state: {
    messageList: [],
    messageText: []
  },
  mutations: {
    SET_LIST: function SET_LIST(state, param) {
      if (param.data.response !== null && param.data.response !== undefined && param.data.response.length !== 0) {
        state.messageList = param.data.response;
        state.messageList.sort(function (a, b) {
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        });
      }
    },
    SET_TEXT: function SET_TEXT(state, param) {
      if (param.data.response !== null && param.data.response !== undefined && param.data.response.length !== 0) {
        state.messageText = param.data.response;
      }
    }
  },
  actions: {
    getAllMessagesHead: function getAllMessagesHead(_ref) {
      var commit;
      return regeneratorRuntime.async(function getAllMessagesHead$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              commit = _ref.commit;
              _context.t0 = commit;
              _context.next = 4;
              return regeneratorRuntime.awrap((0, _messenger.getAllMessages)());

            case 4:
              _context.t1 = _context.sent;
              (0, _context.t0)('SET_LIST', _context.t1);

            case 6:
            case "end":
              return _context.stop();
          }
        }
      });
    },
    getMessagesText: function getMessagesText(_ref2, param) {
      var commit;
      return regeneratorRuntime.async(function getMessagesText$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              commit = _ref2.commit;
              _context2.t0 = commit;
              _context2.next = 4;
              return regeneratorRuntime.awrap((0, _messenger.getConversation)(param));

            case 4:
              _context2.t1 = _context2.sent;
              (0, _context2.t0)('SET_TEXT', _context2.t1);

            case 6:
            case "end":
              return _context2.stop();
          }
        }
      });
    },
    clearMessagesText: function clearMessagesText(_ref3) {
      var state = _ref3.state;
      state.messageText = [];
    },
    sendMessage: function sendMessage(param) {
      var r;
      return regeneratorRuntime.async(function sendMessage$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return regeneratorRuntime.awrap((0, _messenger.sendAnswer)(param));

            case 2:
              r = _context3.sent;
              return _context3.abrupt("return", r.data.response);

            case 4:
            case "end":
              return _context3.stop();
          }
        }
      });
    },
    setViewNotify: function setViewNotify(_ref4, index) {
      var state = _ref4.state;
      state.messageList[index].view = true;
    }
  }
};
exports["default"] = _default;