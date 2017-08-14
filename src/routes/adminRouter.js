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

export default router