import Router from 'koa-router';
import travelNoteCtrl from '../controllers/travelNoteCtrl';

const router = Router()

router.post('/list', travelNoteCtrl.list)

export default router