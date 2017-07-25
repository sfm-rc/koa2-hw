
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
 * 添加活动
 */
router.post('/add', activityCtrl.add)

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
router.post('/join', activityCtrl.join)

export default router