'use strict';exports.__esModule = true;var _promise = require('babel-runtime/core-js/promise');var _promise2 = _interopRequireDefault(_promise);



var _mysql = require('mysql');var _mysql2 = _interopRequireDefault(_mysql);
var _config = require('../config');var _config2 = _interopRequireDefault(_config);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };} /**
                                                                                                                                                                                 * Created by zhuzhu on 2017/7/3.
                                                                                                                                                                                 */require('colors'); //const mysql =  require('mysql');
// var con = mysql.createConnection(config.db);
// console.log("start Connected!".green);
// con.connect(function(err) {
//     if (err) throw err;
//     console.log("Connected!".green);
// });

var pool = _mysql2.default.createPool(
//     {
//   host     :  '127.0.0.1',
//   user     :  'root',
//   password :  '123456',
//   database :  'my_database'
// }
_config2.default.db);


var query = function query(sql, values) {
  return new _promise2.default(function (resolve, reject) {
    pool.getConnection(function (err, connection) {
      if (err) {
        reject(err);
      } else {
        connection.query(sql, values, function (err, rows) {

          if (err) {
            reject(err);
          } else {
            resolve(rows);
          }
          connection.release();
        });
      }
    });
  });
};exports.default =


{ query: query };module.exports = exports['default'];
//# sourceMappingURL=db_connection.js.map