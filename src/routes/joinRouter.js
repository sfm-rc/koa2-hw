import Router from 'koa-router'
import joinCtrl from '../controllers/joinCtrl'

const router = Router()

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
router.post('/add', joinCtrl.join)

/**
 * 获取报名列表
 * 
 * {
    "limit": 10,
    "pageIndex":1,
    "activity_id": 1
    }
 */
router.post('/list', joinCtrl.list)

/**
 * 获取报名列表， 后台使用
 * 
 * {
    "limit": 10,
    "pageIndex":1,
    "activity_id": 1
    }
 */
router.post('/list_search', joinCtrl.list_search)

router.post('/update_success', joinCtrl.update_success)

export default router