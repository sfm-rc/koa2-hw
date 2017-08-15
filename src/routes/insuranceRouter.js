import Router from 'koa-router'
import insuranceCtrl from '../controllers/insuranceCtrl'

const router = Router()

/**
 * 填写保单
 * 
 * 
 * 
 */
router.post('/add', insuranceCtrl.add)


export default router