import Router from 'koa-router'
import adminCtrl from '../controllers/adminCtrl'

const router = Router()

/**
 * 登录
 * 
 * 
 * 
 */
router.post('/login', adminCtrl.login)


/**
 * 退出
 * 
 * 
 * 
 */
router.post('/logout', adminCtrl.logout)


/**
 * 后台列表
 * 
 * 
 * 
 */
router.post('/list_search', adminCtrl.list_search)

/**
 * 添加管理员
 */
router.post('/add', adminCtrl.add)

/**
 * 更新管理员
 */
router.post('/update', adminCtrl.update)

export default router