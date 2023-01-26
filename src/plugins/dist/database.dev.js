"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.resetDB = resetDB;
exports.saveSessionInDB = saveSessionInDB;
exports.DB = void 0;

var _dexie = _interopRequireDefault(require("dexie"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var DB = new _dexie["default"]('clientMaferca');
exports.DB = DB;
DB.version(1).stores({
  session: '++guid, name, dni, client_id, seller, address, color, org, versionCurrent, timewake'
});

function resetDB() {
  return regeneratorRuntime.async(function resetDB$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          return _context.abrupt("return", DB["delete"]().then(function () {
            return DB.open();
          }));

        case 1:
        case "end":
          return _context.stop();
      }
    }
  });
}

function saveSessionInDB(data) {
  return regeneratorRuntime.async(function saveSessionInDB$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return regeneratorRuntime.awrap(DB.session.clear());

        case 3:
          _context2.next = 5;
          return regeneratorRuntime.awrap(DB.session.add(data));

        case 5:
          return _context2.abrupt("return", _context2.sent);

        case 8:
          _context2.prev = 8;
          _context2.t0 = _context2["catch"](0);
          console.error(_context2.t0);

        case 11:
          return _context2.abrupt("return", false);

        case 12:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 8]]);
}