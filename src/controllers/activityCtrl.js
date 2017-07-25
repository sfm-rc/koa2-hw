
import {query} from '../models/db_connection';
import { pagination, getLinuxTimeStamp} from '../uitil';

/**
 * 获取活动列表
 * @param {*} ctx 
 * @param {*} next 
 */
const list = async (ctx, next) => {
  const params = ctx.request.body;
  const {admin_id, limit, pageIndex} = params;
  const sql = 'select * from hw_activity where admin_id=? limit ?,?';
  let data = await query(sql, [admin_id, (pageIndex-1)*limit, limit]);
  let count = await query('select count(*) as count from hw_activity where admin_id=?', [admin_id]);
  
  ctx.body = Object.assign({code: 0, message: 'success', 'data': data}, pagination(limit, pageIndex, count[0].count));
}

/**
 * 添加活动
 * @param {*} ctx 
 * @param {*} next 
 */
const add = async(ctx, next) => {
  const params = ctx.request.body;
  const {admin_id} = params;
  const sql = 'insert into hw_activity ';
  console.log(ctx.request.body)
}


export default {
  list,
  add,
  
}