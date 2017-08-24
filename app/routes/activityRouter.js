'use strict';exports.__esModule = true;
var _koaRouter = require('koa-router');var _koaRouter2 = _interopRequireDefault(_koaRouter);
var _activityCtrl = require('../controllers/activityCtrl');var _activityCtrl2 = _interopRequireDefault(_activityCtrl);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

var router = (0, _koaRouter2.default)();


/**
                                          * 获取活动列表 
                                          *  {
                                             "admin_id":"1",
                                             "pageIndex": 1,
                                             "limit": 10
                                             }
                                          */
router.post('/list', _activityCtrl2.default.list);

/**
                                                    * 获取活动列表,管理后台使用
                                                    *  {
                                                       "admin_id":"1",
                                                       "pageIndex": 1,
                                                       "limit": 10
                                                       }
                                                    */
router.post('/list_search', _activityCtrl2.default.list_search);

/**
                                                                  * 添加活动
                                                                  */
router.post('/add', _activityCtrl2.default.add);

/**
                                                  * 更新活动
                                                  */
router.post('/update', _activityCtrl2.default.update);

/**
                                                        * 获取详情
                                                        */
router.post('/get', _activityCtrl2.default.get);exports.default =

router;module.exports = exports['default'];
//# sourceMappingURL=activityRouter.js.map