'use strict';exports.__esModule = true;var _koaRouter = require('koa-router');var _koaRouter2 = _interopRequireDefault(_koaRouter);
var _joinCtrl = require('../controllers/joinCtrl');var _joinCtrl2 = _interopRequireDefault(_joinCtrl);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

var router = (0, _koaRouter2.default)();

/**
                                          * 报名
                                          * 
                                          * {
                                             "user_name":"sy1",
                                             "user_name_alias": "sy1_1",
                                             "sex": 1,
                                             "mobile": "1111111",
                                             "down_payment": 8888,
                                             "activity_id": 1,
                                             "extra": "ooooo"
                                             }
                                          * 
                                          */
router.post('/add', _joinCtrl2.default.join);

/**
                                               * 获取报名列表
                                               * 
                                               * {
                                                  "limit": 10,
                                                  "pageIndex":1,
                                                  "activity_id": 1
                                                  }
                                               */
router.post('/list', _joinCtrl2.default.list);

/**
                                                * 获取报名列表， 后台使用
                                                * 
                                                * {
                                                   "limit": 10,
                                                   "pageIndex":1,
                                                   "activity_id": 1
                                                   }
                                                */
router.post('/list_search', _joinCtrl2.default.list_search);exports.default =


router;module.exports = exports['default'];
//# sourceMappingURL=joinRouter.js.map