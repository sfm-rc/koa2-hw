import Router from 'koa-router'
import indexCtrl from '../controllers/indexCtrl'
import activityCtrl from '../controllers/activityCtrl'

const router = Router()

router.get('/', indexCtrl)


/**
 * 获取活动列表 
 *  {
    "admin_id":"1",
    "pageIndex": 1,
    "limit": 10
    }
 */
router.post('/hw/activity/list', activityCtrl.list)

export default router
