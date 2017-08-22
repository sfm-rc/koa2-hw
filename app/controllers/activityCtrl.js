'use strict';exports.__esModule = true;var _regenerator = require('babel-runtime/regenerator');var _regenerator2 = _interopRequireDefault(_regenerator);var _assign = require('babel-runtime/core-js/object/assign');var _assign2 = _interopRequireDefault(_assign);var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);
var _db_connection = require('../models/db_connection');
var _uitil = require('../uitil');
var _moment = require('moment');var _moment2 = _interopRequireDefault(_moment);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

/**
                                                                                                                                                                              * 获取活动列表
                                                                                                                                                                              * @param {*} ctx 
                                                                                                                                                                              * @param {*} next 
                                                                                                                                                                              */
var list = function () {var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(ctx, next) {var params, admin_id, limit, pageIndex, sql, data, count;return _regenerator2.default.wrap(function _callee$(_context) {while (1) {switch (_context.prev = _context.next) {case 0:
            params = ctx.request.body;
            admin_id = params.admin_id, limit = params.limit, pageIndex = params.pageIndex;
            sql = 'select * from hw_activity where admin_id=? ORDER BY seq desc limit ?,?';_context.next = 5;return (
              (0, _db_connection.query)(sql, [admin_id, (pageIndex - 1) * limit, limit]));case 5:data = _context.sent;_context.next = 8;return (
              (0, _db_connection.query)('select count(*) as count from hw_activity where admin_id=?', [admin_id]));case 8:count = _context.sent;
            // let join_count = await query('select count(*) as count from hw_join where activity_id=?', [data])
            data = data.map(function (item) {
              if (item.registrate_end_time < (0, _moment2.default)().unix()) {
                item.status = 'time_out';
              }
              if (item.limit_num <= item.cur_num) {
                item.status = 'full';
              }
              return item;
            });

            ctx.body = (0, _assign2.default)({ code: 0, message: 'success', 'data': data }, (0, _uitil.pagination)(limit, pageIndex, count[0].count));case 11:case 'end':return _context.stop();}}}, _callee, undefined);}));return function list(_x, _x2) {return _ref.apply(this, arguments);};}();


/**
                                                                                                                                                                                                                                                                                                       * 获取活动列表,管理后台使用
                                                                                                                                                                                                                                                                                                       * @param {*} ctx 
                                                                                                                                                                                                                                                                                                       * @param {*} next 
                                                                                                                                                                                                                                                                                                       */
var list_search = function () {var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(ctx, next) {var params, admin_id, id, title, limit, pageIndex, where, where_sql, first, item, value, sql, data, count;return _regenerator2.default.wrap(function _callee2$(_context2) {while (1) {switch (_context2.prev = _context2.next) {case 0:
            params = ctx.request.body;
            admin_id = params.admin_id, id = params.id, title = params.title, limit = params.limit, pageIndex = params.pageIndex;
            where = {};

            if (id) {
              where['id'] = id;
            }
            if (title) {
              where['title'] = title;
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
            if (admin_id && admin_id != 0) {
              if (first) {
                where_sql = 'where admin_id=' + admin_id;
                first = false;
              } else
              {
                where_sql = where_sql + ' and admin_id=' + admin_id;
              }
            }


            sql = 'select A.*, B.club_name from hw_activity as A join hw_admin as B on A.admin_id=B.id ' + where_sql + ' ORDER BY seq desc limit ' + (pageIndex - 1) * limit + ',' + limit;
            console.log('list_search_sql:', sql);_context2.next = 13;return (
              (0, _db_connection.query)(sql));case 13:data = _context2.sent;_context2.next = 16;return (
              (0, _db_connection.query)('select count(*) as count from hw_activity ' + where_sql));case 16:count = _context2.sent;
            // let join_count = await query('select count(*) as count from hw_join where activity_id=?', [data])
            data = data.map(function (item) {
              if (item.registrate_end_time < (0, _moment2.default)().unix()) {
                item.status = 'time_out';
              }
              if (item.limit_num <= item.cur_num) {
                item.status = 'full';
              }
              return item;
            });

            ctx.body = (0, _assign2.default)({ code: 0, message: 'success', 'data': data }, (0, _uitil.pagination)(limit, pageIndex, count[0].count));case 19:case 'end':return _context2.stop();}}}, _callee2, undefined);}));return function list_search(_x3, _x4) {return _ref2.apply(this, arguments);};}();


/**
                                                                                                                                                                                                                                                                                                                  * 获取详情
                                                                                                                                                                                                                                                                                                                  * @param {*} ctx 
                                                                                                                                                                                                                                                                                                                  * @param {*} next 
                                                                                                                                                                                                                                                                                                                  */
var get = function () {var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(ctx, next) {var params, id, sql, activity;return _regenerator2.default.wrap(function _callee3$(_context3) {while (1) {switch (_context3.prev = _context3.next) {case 0:
            params = ctx.request.body;
            id = params.id;
            sql = 'select * from hw_activity where id=?';_context3.next = 5;return (
              (0, _db_connection.query)(sql, [id]));case 5:activity = _context3.sent;
            ctx.body = { code: 0, message: 'success', data: activity[0] };case 7:case 'end':return _context3.stop();}}}, _callee3, undefined);}));return function get(_x5, _x6) {return _ref3.apply(this, arguments);};}();


/**
                                                                                                                                                                                                                             * 添加活动 管理后台使用
                                                                                                                                                                                                                             * @param {*} ctx 
                                                                                                                                                                                                                             * @param {*} next 
                                                                                                                                                                                                                             */
var add = function () {var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4(ctx, next) {var params, title, link_url, image_url, start_time, end_time, registrate_end_time, cur_num, limit_num, location, leader_name_alias, success, points, seq, status, price, admin_id, type, sql, res;return _regenerator2.default.wrap(function _callee4$(_context4) {while (1) {switch (_context4.prev = _context4.next) {case 0:
            params = ctx.request.body;
            title =

            params.title, link_url = params.link_url, image_url = params.image_url, start_time = params.start_time, end_time = params.end_time, registrate_end_time = params.registrate_end_time, cur_num = params.cur_num, limit_num = params.limit_num, location = params.location, leader_name_alias = params.leader_name_alias, success = params.success, points = params.points, seq = params.seq, status = params.status, price = params.price, admin_id = params.admin_id, type = params.type;
            sql = 'INSERT INTO hw_activity VALUES (NULL, \'' + title + '\', \'' + link_url + '\', \'' + image_url + '\',\n              \'' +
            start_time + '\', \'' + end_time + '\', \'' + registrate_end_time + '\', \'' + cur_num + '\', \'' + limit_num + '\', \n              \'' +
            location + '\', \'' + leader_name_alias + '\', \'' + success + '\', \'' + points + '\', \'' + seq + '\', \'' + status + '\', \n              ' +
            price + ', ' + admin_id + ', \'' + type + '\')';
            console.log('add activity sql:', sql);_context4.next = 6;return (
              (0, _db_connection.query)(sql));case 6:res = _context4.sent;
            ctx.body = { code: 0, message: 'success', data: res };case 8:case 'end':return _context4.stop();}}}, _callee4, undefined);}));return function add(_x7, _x8) {return _ref4.apply(this, arguments);};}();


/**
                                                                                                                                                                                                                     * 更新活动 管理后台使用
                                                                                                                                                                                                                     * @param {*} ctx 
                                                                                                                                                                                                                     * @param {*} next 
                                                                                                                                                                                                                     */
var update = function () {var _ref5 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee5(ctx, next) {var params, id, title, link_url, image_url, start_time, end_time, registrate_end_time, cur_num, limit_num, location, leader_name_alias, success, points, seq, status, price, admin_id, type, sql, res;return _regenerator2.default.wrap(function _callee5$(_context5) {while (1) {switch (_context5.prev = _context5.next) {case 0:
            params = ctx.request.body;
            id =

            params.id, title = params.title, link_url = params.link_url, image_url = params.image_url, start_time = params.start_time, end_time = params.end_time, registrate_end_time = params.registrate_end_time, cur_num = params.cur_num, limit_num = params.limit_num, location = params.location, leader_name_alias = params.leader_name_alias, success = params.success, points = params.points, seq = params.seq, status = params.status, price = params.price, admin_id = params.admin_id, type = params.type;
            sql = 'update hw_activity set title=\'' + title + '\', link_url=\'' + link_url + '\', image_url=\'' + image_url + '\',\n              start_time=\'' +
            start_time + '\', end_time=\'' + end_time + '\', registrate_end_time=\'' + registrate_end_time + '\', cur_num=\'' + cur_num + '\', limit_num=\'' + limit_num + '\', \n              location=\'' +
            location + '\', leader_name_alias=\'' + leader_name_alias + '\', success=\'' + success + '\', points=\'' + points + '\', seq=\'' + seq + '\', status=\'' + status + '\', \n              price=' +
            price + ', admin_id=' + admin_id + ', type=\'' + type + '\' where id=' + id;
            console.log('update activity sql:', sql);_context5.next = 6;return (
              (0, _db_connection.query)(sql));case 6:res = _context5.sent;
            ctx.body = { code: 0, message: 'success', data: res };case 8:case 'end':return _context5.stop();}}}, _callee5, undefined);}));return function update(_x9, _x10) {return _ref5.apply(this, arguments);};}();exports.default =



{
  list: list,
  add: add,
  update: update,
  get: get,
  list_search: list_search };module.exports = exports['default'];
//# sourceMappingURL=activityCtrl.js.map