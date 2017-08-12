

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
  //---
  await query('set autocommit=0;');
  await query('begin;');
  try{
    const joinUser = await query('select count(*) as count from hw_join where activity_id=? and mobile=?', [activity_id, mobile]);
    console.log('joinUser---', joinUser);
    if(joinUser[0].count>0){
        ctx.body = {code: 110, message:'您已经报过名', data:{}}
    }
    else{
        console.info('lock for activity_id', activity_id);
        const activities = await query('select * from hw_activity where id=? for update;', [activity_id]);// activity_id这行加了行锁
        const activity = activities[0];
        if(activity.cur_num<activity.limit_num){
            // 可以报名
            const sql = `INSERT into hw_join VALUES(
                NULL,'${user_name}', '${user_name_alias}', '${sex}', '${mobile}', 
                '${down_payment}', '${extra}', '${activity_id}', '${getLinuxTimeStamp()}'
            )`;
            var data = await query(sql);
            console.log('insert hw_join for join', data);
            if(data.insertId>0){
                const update_res = await query('UPDATE hw_activity set cur_num=cur_num+1 WHERE id=?', [activity_id]);
                console.log('update set ++1', update_res);
                ctx.body = {code: 0, message:'报名成功', data}
            }
        }
        else{
            ctx.body = {code: 110, message:'报名失败,活动人数受限制', data:{}}
        }
    }
  }
  catch(error){
    console.error('join fail', error);
    await query('ROLLBACK');
    ctx.body = {code: 110, message:'报名失败,未知异常', data:{}}
  }
  await query('commit;');

  console.info('ulock for activity_id', activity_id);
  //---
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