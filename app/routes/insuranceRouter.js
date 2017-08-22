'use strict';exports.__esModule = true;var _koaRouter = require('koa-router');var _koaRouter2 = _interopRequireDefault(_koaRouter);
var _insuranceCtrl = require('../controllers/insuranceCtrl');var _insuranceCtrl2 = _interopRequireDefault(_insuranceCtrl);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

var router = (0, _koaRouter2.default)();

/**
                                          * 填写保单
                                          * 
                                          * 
                                          * 
                                          */
router.post('/add', _insuranceCtrl2.default.add);exports.default =


router;module.exports = exports['default'];
//# sourceMappingURL=insuranceRouter.js.map