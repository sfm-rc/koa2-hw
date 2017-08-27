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


/**
 * 查询保单， 后台
 *
 *
 *
 */
router.post('/list_search', insuranceCtrl.list_search)


export default router