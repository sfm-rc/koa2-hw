import Router from 'koa-router'
import indexCtrl from '../controllers/indexCtrl'
import activityCtrl from '../controllers/activityCtrl'

const router = Router()

// router.get('/', indexCtrl)

/**
 * 活动路由
 */
const activity = require('./activityRouter')
router.use('/activity', activity.routes(), activity.allowedMethods())

/**
 * 报名路由
 */
const join = require('./joinRouter')
router.use('/join', join.routes(), join.allowedMethods())

/**
 * 管理员路由
 */
const admin = require('./adminRouter')
router.use('/admin', admin.routes(), admin.allowedMethods())


/**
 * 总路由 hw
 */
const routers = Router()
routers.use('/hw', router.routes(), router.allowedMethods())
export default routers
