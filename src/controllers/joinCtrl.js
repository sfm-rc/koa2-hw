

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

export default {
    join,
}