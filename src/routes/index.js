import Router from 'koa-router'
import indexCtrl from '../controllers/indexCtrl'
import activityCtrl from '../controllers/activityCtrl'

const router = Router()

// router.get('/', indexCtrl)

const activity = require('./activity')
router.use('/activity', activity.routes(), activity.allowedMethods())


const routers = Router()
routers.use('/hw', router.routes(), router.allowedMethods())
export default routers
