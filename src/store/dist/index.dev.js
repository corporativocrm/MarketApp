"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _vue = _interopRequireDefault(require("vue"));

var _vuex = _interopRequireDefault(require("vuex"));

var _profile = _interopRequireDefault(require("./modules/profile"));

var _menu = _interopRequireDefault(require("./modules/menu"));

var _webservices = _interopRequireDefault(require("./modules/webservices"));

var _mensaje = _interopRequireDefault(require("./modules/mensaje"));

var _messenger = _interopRequireDefault(require("./modules/messenger"));

var _catalogue = _interopRequireDefault(require("./modules/catalogue"));

var _drawer = _interopRequireDefault(require("./modules/drawer"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// eslint-disable-next-line import/extensions
_vue["default"].use(_vuex["default"]);

var _default = new _vuex["default"].Store({
  modules: {
    WebServices: _webservices["default"],
    StoreProfile: _profile["default"],
    menu: _menu["default"],
    navigationDrawer: _drawer["default"],
    mensaje: _mensaje["default"],
    messenger: _messenger["default"],
    catalogue: _catalogue["default"]
  }
});

exports["default"] = _default;