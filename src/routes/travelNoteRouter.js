import Router from 'koa-router';
import travelNoteCtrl from '../controllers/travelNoteCtrl';

const router = Router()

router.post('/list', travelNoteCtrl.list)

router.post('/add', travelNoteCtrl.add)

router.post('/list_search', travelNoteCtrl.list_search)


router.post('/update', travelNoteCtrl.update)
export default router