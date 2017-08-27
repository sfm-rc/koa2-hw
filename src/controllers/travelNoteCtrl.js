import {query} from '../models/db_connection';
import { pagination, getLinuxTimeStamp} from '../uitil';
import moment from 'moment';

/**
 * 获取游记列表
 * @param {*} ctx 
 * @param {*} next 
 */
const list = async (ctx, next) => {
  const params = ctx.request.body;
  const {limit, pageIndex, type, admin_id} = params;
  const sql = 'select * from hw_travel_note where type=? and admin_id=? ORDER BY id desc limit ?,?';
  let data = await query(sql, [type, admin_id, (pageIndex-1)*limit, limit]);
  let count = await query('select count(*) as count from hw_travel_note where type=? and admin_id=?', [type, admin_id]);
  ctx.body = Object.assign({code: 0, message: 'success', 'data': data}, pagination(limit, pageIndex, count[0].count));
}

export default {
  list
}