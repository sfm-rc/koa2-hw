'use strict';exports.__esModule = true;var _regenerator = require('babel-runtime/regenerator');var _regenerator2 = _interopRequireDefault(_regenerator);var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);var _http = require('http');var _http2 = _interopRequireDefault(_http);
var _koa = require('koa');var _koa2 = _interopRequireDefault(_koa);
var _path = require('path');var _path2 = _interopRequireDefault(_path);
var _koaConvert = require('koa-convert');var _koaConvert2 = _interopRequireDefault(_koaConvert);
var _koaJson = require('koa-json');var _koaJson2 = _interopRequireDefault(_koaJson);
var _koaBodyparser = require('koa-bodyparser');var _koaBodyparser2 = _interopRequireDefault(_koaBodyparser);
var _koaLogger = require('koa-logger');var _koaLogger2 = _interopRequireDefault(_koaLogger);
var _koaStaticPlus = require('koa-static-plus');var _koaStaticPlus2 = _interopRequireDefault(_koaStaticPlus);
var _config = require('./config');var _config2 = _interopRequireDefault(_config);
var _koa2Cors = require('koa2-cors');var _koa2Cors2 = _interopRequireDefault(_koa2Cors);
var _koaSend = require('koa-send');var _koaSend2 = _interopRequireDefault(_koaSend);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

var app = new _koa2.default();
var bodyparser = (0, _koaBodyparser2.default)();

// middlewares
app.use((0, _koa2Cors2.default)({
  origin: function origin(ctx) {
    if (ctx.url === '/test') {
      return false;
    }
    return '*';
  },
  // exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
  maxAge: 60 * 60 * 24 * 7,
  credentials: true
  // allowMethods: ['GET', 'POST', 'DELETE'],
  // allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
}));
app.use((0, _koaConvert2.default)(bodyparser));
app.use((0, _koaConvert2.default)((0, _koaJson2.default)()));
app.use((0, _koaConvert2.default)((0, _koaLogger2.default)()));

// static
app.use((0, _koaConvert2.default)((0, _koaStaticPlus2.default)(_path2.default.join(__dirname, '../public'), {
  pathPrefix: '' })));


// views
// app.use(views(path.join(__dirname, '../views'), {
//   extension: 'ejs'
// }))

// 500 error
// koaOnError(app, {
//   template: 'views/500.ejs'
// })

// logger
app.use(function () {var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(ctx, next) {var start, ms;return _regenerator2.default.wrap(function _callee$(_context) {while (1) {switch (_context.prev = _context.next) {case 0:
            start = new Date();_context.next = 3;return (
              next());case 3:
            ms = new Date() - start;
            console.log(ctx.method + ' ' + ctx.url + ' - ' + ms + 'ms');case 5:case 'end':return _context.stop();}}}, _callee, undefined);}));return function (_x, _x2) {return _ref.apply(this, arguments);};}());

app.use(function () {var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(ctx, next) {var url, filePath;return _regenerator2.default.wrap(function _callee2$(_context2) {while (1) {switch (_context2.prev = _context2.next) {case 0:
            //console.log('--------ctx:', ctx);
            url = ctx.url;if (!(
            url.indexOf('/dist') > -1)) {_context2.next = 8;break;}
            filePath = url.substr(url.lastIndexOf('/'), url.length);
            console.log('---------filePath:', filePath);_context2.next = 6;return (
              (0, _koaSend2.default)(ctx, _path2.default.resolve('/public/dist' + filePath)));case 6:_context2.next = 10;break;case 8:_context2.next = 10;return (

              (0, _koaSend2.default)(ctx, _path2.default.resolve('/public/index.html')));case 10:_context2.next = 12;return (

              next());case 12:case 'end':return _context2.stop();}}}, _callee2, undefined);}));return function (_x3, _x4) {return _ref2.apply(this, arguments);};}());


//app.use(serve('/public'));
app.use(function () {var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3(ctx, next) {var url, filePath;return _regenerator2.default.wrap(function _callee3$(_context3) {while (1) {switch (_context3.prev = _context3.next) {case 0:
            url = ctx.url;
            console.log('--------url:', url);if (!(
            url.indexOf('user-hw-static') > -1)) {_context3.next = 9;break;}
            filePath = url.substr(url.lastIndexOf('/'), url.length);
            console.log('---------filePath:', filePath);_context3.next = 7;return (
              (0, _koaSend2.default)(ctx, _path2.default.resolve('/public/dist' + filePath)));case 7:_context3.next = 11;break;case 9:_context3.next = 11;return (


              (0, _koaSend2.default)(ctx, _path2.default.resolve('/public/dist/index.html')));case 11:_context3.next = 13;return (

              next());case 13:case 'end':return _context3.stop();}}}, _callee3, undefined);}));return function (_x5, _x6) {return _ref3.apply(this, arguments);};}());


// response router
app.use(function () {var _ref4 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee4(ctx, next) {return _regenerator2.default.wrap(function _callee4$(_context4) {while (1) {switch (_context4.prev = _context4.next) {case 0:
            console.log('----api');_context4.next = 3;return (
              require('./routes').routes()(ctx, next));case 3:case 'end':return _context4.stop();}}}, _callee4, undefined);}));return function (_x7, _x8) {return _ref4.apply(this, arguments);};}());

// const routers = require('./routes')
// app.use('/hw', routers.routes()).use(routers.allowedMethods())

// 404
// app.use(async (ctx) => {
//   ctx.status = 404
//   await ctx.render('404')
// })

// error logger
app.on('error', function () {var _ref5 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee5(err, ctx) {return _regenerator2.default.wrap(function _callee5$(_context5) {while (1) {switch (_context5.prev = _context5.next) {case 0:
            console.log('error occured:', err);case 1:case 'end':return _context5.stop();}}}, _callee5, undefined);}));return function (_x9, _x10) {return _ref5.apply(this, arguments);};}());


var port = parseInt(_config2.default.port || '3000');
var server = _http2.default.createServer(app.callback());

server.listen(port);
server.on('error', function (error) {
  if (error.syscall !== 'listen') {
    throw error;
  }
  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(port + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(port + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;}

});
server.on('listening', function () {
  console.log('Listening on port: %d', port);
});exports.default =

app;module.exports = exports['default'];
//# sourceMappingURL=app.js.map