'use strict';exports.__esModule = true;var _assign = require('babel-runtime/core-js/object/assign');var _assign2 = _interopRequireDefault(_assign);var _regenerator = require('babel-runtime/regenerator');var _regenerator2 = _interopRequireDefault(_regenerator);var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _db_connection = require('../models/db_connection');
var _uitil = require('../uitil');function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}



/**
                                                                                                                                * 登录
                                                                                                                                * @param {*} ctx 
                                                                                                                                * @param {*} next 
                                                                                                                                */
var login = function () {var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(ctx, next) {var params, userName, password, sql, data, admin;return _regenerator2.default.wrap(function _callee$(_context) {while (1) {switch (_context.prev = _context.next) {case 0:
                        params = ctx.request.body;
                        userName = params.userName, password = params.password;

                        sql = 'select * from hw_admin where \n    name=\'' +
                        userName + '\' and pwd=\'' + password + '\'';_context.next = 5;return (
                            (0, _db_connection.query)(sql));case 5:data = _context.sent;
                        console.log('select admin', data);
                        if (data.length > 0) {
                            admin = data[0];
                            ctx.cookies.set(
                            'admin_id',
                            admin.id,
                            {
                                // domain: 'localhost',  // 写cookie所在的域名
                                // path: '/index',       // 写cookie所在的路径
                                maxAge: 24 * 60 * 60 * 1000, // cookie有效时长
                                expires: new Date('2019-02-15'), // cookie失效时间
                                httpOnly: false // 是否只用于http请求中获取
                                // overwrite: false  // 是否允许重写
                            });

                            ctx.cookies.set('permission', '1',
                            {
                                maxAge: 24 * 60 * 60 * 1000, // cookie有效时长
                                expires: new Date('2019-02-15'), // cookie失效时间
                                httpOnly: false // 是否只用于http请求中获取
                            });
                            ctx.cookies.set('name', admin.name,
                            {
                                maxAge: 24 * 60 * 60 * 1000, // cookie有效时长
                                expires: new Date('2019-02-15'), // cookie失效时间
                                httpOnly: false // 是否只用于http请求中获取
                            });
                            ctx.body = { code: 0, message: 'success', data: data };
                        } else
                        {
                            ctx.body = { code: 401, message: 'failed', data: data };
                        }case 8:case 'end':return _context.stop();}}}, _callee, undefined);}));return function login(_x, _x2) {return _ref.apply(this, arguments);};}();





/**
                                                                                                                                                                          * 退出获取报名表
                                                                                                                                                                          * @param {*} ctx 
                                                                                                                                                                          * @param {*} next 
                                                                                                                                                                          */
var logout = function () {var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(ctx, next) {return _regenerator2.default.wrap(function _callee2$(_context2) {while (1) {switch (_context2.prev = _context2.next) {case 0:
                        ctx.cookies.set(
                        'admin_id',
                        '');

                        ctx.cookies.set('permission', false);
                        ctx.cookies.set('name', '');
                        ctx.body = { code: 0, message: 'success', data: {} };case 4:case 'end':return _context2.stop();}}}, _callee2, undefined);}));return function logout(_x3, _x4) {return _ref2.apply(this, arguments);};}();




/**
                                                                                                                                                                                                                                   * 获取俱乐部列表,管理后台使用
                                                                                                                                                                                                                                   * @param {*} ctx 
                                                                                                                                                                                                                                   * @param {*} next 
                                                                                                                                                                                                                                   */
var list_search = function () {var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(ctx, next) {var params, limit, pageIndex, where, where_sql, first, item, value, sql, data, count;return _regenerator2.default.wrap(function _callee3$(_context3) {while (1) {switch (_context3.prev = _context3.next) {case 0:
                        params = ctx.request.body;
                        limit = params.limit, pageIndex = params.pageIndex;
                        where = {};
                        // if(admin_id){
                        //   where['admin_id'] = admin_id;
                        // }
                        // if(id){
                        //   where['id'] = id;
                        // }
                        // if(title){
                        //   where['title'] = title;
                        // }
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

                        sql = 'select * from hw_admin ' + where_sql + ' limit ?,?';
                        console.log('list_search_sql:', sql);_context3.next = 10;return (
                            (0, _db_connection.query)(sql, [(pageIndex - 1) * limit, limit]));case 10:data = _context3.sent;_context3.next = 13;return (
                            (0, _db_connection.query)('select count(*) as count from hw_admin ' + where_sql));case 13:count = _context3.sent;

                        ctx.body = (0, _assign2.default)({ code: 0, message: 'success', 'data': data }, (0, _uitil.pagination)(limit, pageIndex, count[0].count));case 15:case 'end':return _context3.stop();}}}, _callee3, undefined);}));return function list_search(_x5, _x6) {return _ref3.apply(this, arguments);};}();


/**
                                                                                                                                                                                                                                                                                                                              * 添加管理员 管理后台使用
                                                                                                                                                                                                                                                                                                                              * @param {*} ctx 
                                                                                                                                                                                                                                                                                                                              * @param {*} next 
                                                                                                                                                                                                                                                                                                                              */
var add = function () {var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4(ctx, next) {var params, name, mobile, email, pwd, club_name, club_address, contact_name, contact_mobile, contact_email, sql, res;return _regenerator2.default.wrap(function _callee4$(_context4) {while (1) {switch (_context4.prev = _context4.next) {case 0:
                        params = ctx.request.body;
                        name =
                        params.name, mobile = params.mobile, email = params.email, pwd = params.pwd, club_name = params.club_name, club_address = params.club_address, contact_name = params.contact_name, contact_mobile = params.contact_mobile, contact_email = params.contact_email;
                        sql = 'INSERT INTO hw_admin VALUES (NULL, \'' + name + '\', \'' + mobile + '\', \'' + email + '\',\n              \'' +
                        pwd + '\', \'' + club_name + '\', \'' + club_address + '\', \'' + contact_name + '\', \'' + contact_mobile + '\', \n              \'' +
                        contact_email + '\')';
                        console.log('add admin sql:', sql);_context4.next = 6;return (
                            (0, _db_connection.query)(sql));case 6:res = _context4.sent;
                        ctx.body = { code: 0, message: 'success', data: res };case 8:case 'end':return _context4.stop();}}}, _callee4, undefined);}));return function add(_x7, _x8) {return _ref4.apply(this, arguments);};}();



/**
                                                                                                                                                                                                                                 * 更新管理员 管理后台使用
                                                                                                                                                                                                                                 * @param {*} ctx 
                                                                                                                                                                                                                                 * @param {*} next 
                                                                                                                                                                                                                                 */
var update = function () {var _ref5 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee5(ctx, next) {var params, id, name, mobile, email, pwd, club_name, club_address, contact_name, contact_mobile, contact_email, sql, res;return _regenerator2.default.wrap(function _callee5$(_context5) {while (1) {switch (_context5.prev = _context5.next) {case 0:
                        params = ctx.request.body;
                        id =
                        params.id, name = params.name, mobile = params.mobile, email = params.email, pwd = params.pwd, club_name = params.club_name, club_address = params.club_address, contact_name = params.contact_name, contact_mobile = params.contact_mobile, contact_email = params.contact_email;
                        sql = 'update hw_admin set name=\'' + name + '\', mobile=\'' + mobile + '\', email=\'' + email + '\',\n              pwd=\'' +
                        pwd + '\', club_name=\'' + club_name + '\', club_address=\'' + club_address + '\', contact_name=\'' + contact_name + '\',\n              contact_mobile=\'' +
                        contact_mobile + '\', \n              contact_email=\'' +
                        contact_email + '\' where id=' + id;
                        console.log('update admin sql:', sql);_context5.next = 6;return (
                            (0, _db_connection.query)(sql));case 6:res = _context5.sent;
                        ctx.body = { code: 0, message: 'success', data: res };case 8:case 'end':return _context5.stop();}}}, _callee5, undefined);}));return function update(_x9, _x10) {return _ref5.apply(this, arguments);};}();exports.default =



{
    logout: logout,
    login: login,
    list_search: list_search,
    add: add,
    update: update };module.exports = exports['default'];
//# sourceMappingURL=adminCtrl.js.map