

import {query} from '../models/db_connection';
import { pagination, getLinuxTimeStamp} from '../uitil';

/**
 * 报名
 * @param {*} ctx 
 * @param {*} next 
 */
const join = async(ctx, next) => {
  const params = ctx.request.body;
  const {user_name, user_name_alias, sex, mobile, down_payment, activity_id, extra} = params;

  const sql = `INSERT into hw_join VALUES(
    NULL,'${user_name}', '${user_name_alias}', '${sex}', '${mobile}', 
    '${down_payment}', '${extra}', '${activity_id}', '${getLinuxTimeStamp()}'
  )`;
  let data = await query(sql);
  ctx.body = {code: 0, message:'报名成功', data}
}

/**
 * 获取报名表
 * @param {*} ctx 
 * @param {*} next 
 */
const list = async(ctx, next) =>{
    const params = ctx.request.body;
    const {pageIndex, limit, activity_id} = params;
    const sql = `select * from hw_join where 
    activity_id='${activity_id}' limit ${(pageIndex-1)*limit}, ${limit}`;
    const c_sql = `select count(*) as count from hw_join where 
    activity_id='${activity_id}'`;
    let data = await query(sql);
    const count = (await query(c_sql))[0].count
    ctx.body = Object.assign( 
        {code: 0, message: 'success', data}, 
        pagination(limit, pageIndex, count)
    )
}

export default {
    join,
    list
}