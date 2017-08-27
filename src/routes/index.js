import Router from 'koa-router'
import indexCtrl from '../controllers/indexCtrl'

const router = Router()

// router.get('/', indexCtrl)

/**
 * 游记路由
 */
const travelNote = require('./travelNoteRouter')
router.use('/travelNote', travelNote.routes(), travelNote.allowedMethods())
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
 * 保单路由
 */
const insurance = require('./insuranceRouter')
router.use('/insurance', insurance.routes(), insurance.allowedMethods())

/**
 * 总路由 hw
 */
const routers = Router()
routers.use('/hw', router.routes(), router.allowedMethods())
export default routers
