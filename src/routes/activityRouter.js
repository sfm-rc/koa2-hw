
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


export default router