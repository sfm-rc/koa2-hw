
import {query} from '../models/db_connection';
import { pagination, getLinuxTimeStamp} from '../uitil';
import moment from 'moment';

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
  // let join_count = await query('select count(*) as count from hw_join where activity_id=?', [data])
  data = data.map(item=>{
    if(item.registrate_end_time < moment().unix()){
      item.status = 'time_out';
    }
    if(item.limit_num<=item.cur_num){
      item.status = 'full';
    }
    return item;
  });

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