'use strict';exports.__esModule = true;var _koaRouter = require('koa-router');var _koaRouter2 = _interopRequireDefault(_koaRouter);
var _adminCtrl = require('../controllers/adminCtrl');var _adminCtrl2 = _interopRequireDefault(_adminCtrl);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

var router = (0, _koaRouter2.default)();

/**
                                          * 登录
                                          * 
                                          * 
                                          * 
                                          */
router.post('/login', _adminCtrl2.default.login);


/**
                                                   * 退出
                                                   * 
                                                   * 
                                                   * 
                                                   */
router.post('/logout', _adminCtrl2.default.logout);


/**
                                                     * 后台列表
                                                     * 
                                                     * 
                                                     * 
                                                     */
router.post('/list_search', _adminCtrl2.default.list_search);

/**
                                                               * 添加管理员
                                                               */
router.post('/add', _adminCtrl2.default.add);

/**
                                               * 更新管理员
                                               */
router.post('/update', _adminCtrl2.default.update);exports.default =

router;module.exports = exports['default'];
//# sourceMappingURL=adminRouter.js.map