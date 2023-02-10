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
        var flag = true;

        for (var i = 0; i < param.data.response.length; i += 1) {
          flag = true;

          for (var j = 0; j < state.messageList.length; j += 1) {
            if (state.messageList[j].id === param.data.response[i].id) {
              flag = false;
            }
          }

          if (flag) state.messageList.push(param.data.response[i]);
        }

        state.messageList.sort(function (a, b) {
          return b.id - a.id;
        });
      }
    }
  },
  actions: {
    getAllMessagesHead: function getAllMessagesHead(_ref) {
      var commit, state, r;
      return regeneratorRuntime.async(function getAllMessagesHead$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              commit = _ref.commit, state = _ref.state;
              r = [];

              if (state.messageList.length) {
                state.messageList.forEach(function (e) {
                  r.push({
                    id: e.id,
                    view: e.view
                  });
                });
              }

              _context.t0 = commit;
              _context.next = 6;
              return regeneratorRuntime.awrap((0, _messenger.getAllMessages)({
                data: JSON.stringify(r)
              }));

            case 6:
              _context.t1 = _context.sent;
              (0, _context.t0)('SET_LIST', _context.t1);

            case 8:
            case "end":
              return _context.stop();
          }
        }
      });
    },
    sendAnswerNotify: function sendAnswerNotify(_ref2, param) {
      var state, i, r;
      return regeneratorRuntime.async(function sendAnswerNotify$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              state = _ref2.state;

              for (i = 0; i < state.messageList.length; i += 1) {
                if (state.messageList[i].id === param.id) {
                  state.messageList[i].answer = {
                    guid: param.id,
                    text: param.answer
                  };
                }
              }

              _context2.next = 4;
              return regeneratorRuntime.awrap((0, _messenger.sendAnswer)({
                data: JSON.stringify(param)
              }));

            case 4:
              r = _context2.sent;
              return _context2.abrupt("return", r.data.response);

            case 6:
            case "end":
              return _context2.stop();
          }
        }
      });
    },
    setViewNotify: function setViewNotify(_ref3, index) {
      var state = _ref3.state;
      state.messageList[index].view = true;
    }
  }
};
exports["default"] = _default;