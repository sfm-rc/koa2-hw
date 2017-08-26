'use strict';exports.__esModule = true;var _assign = require('babel-runtime/core-js/object/assign');var _assign2 = _interopRequireDefault(_assign);var _regenerator = require('babel-runtime/regenerator');var _regenerator2 = _interopRequireDefault(_regenerator);var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);var _db_connection = require('../models/db_connection');
var _uitil = require('../uitil');function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

/**
                                                                                                                                * 报名
                                                                                                                                * @param {*} ctx
                                                                                                                                * @param {*} next
                                                                                                                                */
var join = function () {var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(ctx, next) {var params, user_name, user_name_alias, sex, mobile, down_payment, activity_id, extra, joinUser, activities, activity, sql, data, update_res;return _regenerator2.default.wrap(function _callee$(_context) {while (1) {switch (_context.prev = _context.next) {case 0:
            params = ctx.request.body;
            user_name = params.user_name, user_name_alias = params.user_name_alias, sex = params.sex, mobile = params.mobile, down_payment = params.down_payment, activity_id = params.activity_id, extra = params.extra;
            // ---
            _context.next = 4;return (0, _db_connection.query)('set autocommit=0;');case 4:_context.next = 6;return (
              (0, _db_connection.query)('begin;'));case 6:_context.prev = 6;_context.next = 9;return (

              (0, _db_connection.query)('select count(*) as count from hw_join where activity_id=? and mobile=?', [activity_id, mobile]));case 9:joinUser = _context.sent;
            console.log('joinUser---', joinUser);if (!(
            joinUser[0].count > 0)) {_context.next = 15;break;}
            x.body = { code: 110, message: '您已经报过名', data: {} };_context.next = 35;break;case 15:


            console.info('lock for activity_id', activity_id);_context.next = 18;return (
              (0, _db_connection.query)('select * from hw_activity where id=? for update;', [activity_id]));case 18:activities = _context.sent; // activity_id这行加了行锁
            activity = activities[0];if (!(
            activity.cur_num < activity.limit_num)) {_context.next = 34;break;}
            // 可以报名
            sql = 'INSERT into hw_join VALUES(\n                NULL,\'' +
            user_name + '\', \'' + user_name_alias + '\', \'' + sex + '\', \'' + mobile + '\', \n                \'' +
            down_payment + '\', \'' + extra + '\', \'' + activity_id + '\', \'' + (0, _uitil.getLinuxTimeStamp)() + '\'\n            )';_context.next = 24;return (

              (0, _db_connection.query)(sql));case 24:data = _context.sent;
            console.log('insert hw_join for join', data);if (!(
            data.insertId > 0)) {_context.next = 32;break;}_context.next = 29;return (
              (0, _db_connection.query)('UPDATE hw_activity set cur_num=cur_num+1 WHERE id=?', [activity_id]));case 29:update_res = _context.sent;
            console.log('update set ++1', update_res);
            ctx.body = { code: 0, message: '报名成功', data: data };case 32:_context.next = 35;break;case 34:



            ctx.body = { code: 110, message: '报名失败,活动人数受限制', data: {} };case 35:_context.next = 43;break;case 37:_context.prev = 37;_context.t0 = _context['catch'](6);




            console.error('join fail', _context.t0);_context.next = 42;return (
              (0, _db_connection.query)('ROLLBACK'));case 42:
            ctx.body = { code: 110, message: '报名失败,未知异常', data: {} };case 43:_context.next = 45;return (

              (0, _db_connection.query)('commit;'));case 45:

            console.info('ulock for activity_id', activity_id);
            // ---
          case 46:case 'end':return _context.stop();}}}, _callee, undefined, [[6, 37]]);}));return function join(_x, _x2) {return _ref.apply(this, arguments);};}();

/**
                                                                                                                                                                      * 获取报名表
                                                                                                                                                                      * @param {*} ctx
                                                                                                                                                                      * @param {*} next
                                                                                                                                                                      */
var list = function () {var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(ctx, next) {var params, pageIndex, limit, activity_id, sql, c_sql, data, count;return _regenerator2.default.wrap(function _callee2$(_context2) {while (1) {switch (_context2.prev = _context2.next) {case 0:
            params = ctx.request.body;
            pageIndex = params.pageIndex, limit = params.limit, activity_id = params.activity_id;
            sql = 'select * from hw_join where \n    activity_id=\'' +
            activity_id + '\' limit ' + (pageIndex - 1) * limit + ', ' + limit;
            c_sql = 'select count(*) as count from hw_join where \n    activity_id=\'' +
            activity_id + '\'';_context2.next = 6;return (
              (0, _db_connection.query)(sql));case 6:data = _context2.sent;_context2.next = 9;return (
              (0, _db_connection.query)(c_sql));case 9:count = _context2.sent[0].count;
            ctx.body = (0, _assign2.default)(
            { code: 0, message: 'success', data: data },
            (0, _uitil.pagination)(limit, pageIndex, count));case 11:case 'end':return _context2.stop();}}}, _callee2, undefined);}));return function list(_x3, _x4) {return _ref2.apply(this, arguments);};}();



/**
                                                                                                                                                                                                                  * 获取活动报名列表,管理后台使用
                                                                                                                                                                                                                  * @param {*} ctx
                                                                                                                                                                                                                  * @param {*} next
                                                                                                                                                                                                                  */
var list_search = function () {var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(ctx, next) {var params, admin_id, activity_id, user_name, user_name_alias, mobile, limit, pageIndex, where, where_sql, first, item, value, activities, sql, data, _item, ziliao, count;return _regenerator2.default.wrap(function _callee3$(_context3) {while (1) {switch (_context3.prev = _context3.next) {case 0:
            params = ctx.request.body;
            admin_id = params.admin_id, activity_id = params.activity_id, user_name = params.user_name, user_name_alias = params.user_name_alias, mobile = params.mobile, limit = params.limit, pageIndex = params.pageIndex;
            where = {};
            if (activity_id) {
              where['activity_id'] = activity_id;
            }

            if (user_name) {
              where['user_name'] = user_name;
            }

            if (user_name_alias) {
              where['user_name'] = user_name;
            }

            if (mobile) {
              where['mobile'] = mobile;
            }

            where_sql = '';
            first = true;
            for (item in where) {
              value = where[item];
              if (first) {
                where_sql = 'where ' + item + ' like "%' + value + '%"';
                first = false;
              } else
              {
                where_sql = where_sql + ' and ' + item + ' like "%' + value + '%"';
              }
            }

            activities = [];if (!(
            admin_id && admin_id != 0)) {_context3.next = 20;break;}_context3.next = 14;return (
              (0, _db_connection.query)('select id from hw_activity where admin_id=' + admin_id));case 14:activities = _context3.sent;
            activities = activities.map(function (item) {return item.id;});
            console.log('activities', activities);
            if (activities.length == 0) {
              activities = 0;
            }
            console.log('-----', activities);
            if (first) {
              where_sql = 'where activity_id in (' + activities + ')';
              first = false;
            } else
            {
              where_sql = where_sql + ' and activity_id in (' + activities + ')';
            }case 20:


            sql = 'select A.*, B.title from hw_join as A join hw_activity as B \n    on A.activity_id=B.id ' +
            where_sql + ' limit ' + (pageIndex - 1) * limit + ',' + limit;

            console.log('join_list_search_sql:', sql);_context3.next = 24;return (
              (0, _db_connection.query)(sql));case 24:data = _context3.sent;_context3.t0 = _regenerator2.default.keys(
            data);case 26:if ((_context3.t1 = _context3.t0()).done) {_context3.next = 34;break;}_item = _context3.t1.value;_context3.next = 30;return (
              (0, _db_connection.query)('select * from hw_insurance where activity_id=? and mobile=?', [_item.activity_id, _item.mobile]));case 30:ziliao = _context3.sent;
            data[_item].isZiliao = ziliao.length === 0 ? 0 : 1;_context3.next = 26;break;case 34:_context3.next = 36;return (

              (0, _db_connection.query)('select count(*) as count from hw_join ' + where_sql));case 36:count = _context3.sent;

            ctx.body = (0, _assign2.default)({ code: 0, message: 'success', 'data': data }, (0, _uitil.pagination)(limit, pageIndex, count[0].count));case 38:case 'end':return _context3.stop();}}}, _callee3, undefined);}));return function list_search(_x5, _x6) {return _ref3.apply(this, arguments);};}();exports.default =


{
  join: join,
  list: list,
  list_search: list_search };module.exports = exports['default'];

//# sourceMappingURL=joinCtrl.js.map