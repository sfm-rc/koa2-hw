
import Router from 'koa-router'
import activityCtrl from '../controllers/activityCtrl'

const router = Router()


/**
 * 获取活动列表 
 *  {
    "admin_id":"1",
    "pageIndex": 1,
    "limit": 10
    }
 */
router.post('/list', activityCtrl.list)

/**
 * 获取活动列表,管理后台使用
 *  {
    "admin_id":"1",
    "pageIndex": 1,
    "limit": 10
    }
 */
router.post('/list_search', activityCtrl.list_search)

/**
 * 添加活动
 */
router.post('/add', activityCtrl.add)

/**
 * 更新活动
 */
router.post('/update', activityCtrl.update)

/**
 * 获取详情
 */
router.post('/get', activityCtrl.get)

/**
 * 隐藏展示
 */
router.post('/update_show', activityCtrl.update_show)

export default router