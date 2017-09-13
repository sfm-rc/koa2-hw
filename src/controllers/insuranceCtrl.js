import {query} from '../models/db_connection';
import { pagination, getLinuxTimeStamp} from '../uitil';

/**
 * 填写保险
 * @param {*} ctx 
 * @param {*} next 
 */
const add = async(ctx, next) => {
    const params = ctx.request.body;
    const {activity_id, user_name, cer_type, cer_id, sex, birth, mobile, e_contact, e_contact_mobile} = params;

    const exit_sql = `select * from hw_insurance where activity_id='${activity_id}' and cer_id='${cer_id}'`;
    const exit_data = await query(exit_sql);
    if(exit_data.length>0){
      ctx.body = {code: 1, message:'保单已经填写', exit_data}
      return;
    }
    else {

      const sql = `INSERT into hw_insurance VALUES(
                NULL,'${activity_id}','${user_name}', '${cer_type}', '${cer_id}', '${sex}', '${birth}', '${mobile}', 
                '${e_contact}', '${e_contact_mobile}', '${getLinuxTimeStamp()}'
            )`;
      console.log('insert insurance', sql);
      var data = await query(sql);
      console.log('insert hw_insurance:', data);
      ctx.body = {code: 0, message:'保单填写成功', data}
    }
}



/**
 * 获取资料列表,管理后台使用
 * @param {*} ctx
 * @param {*} next
 */
const list_search = async (ctx, next) => {
  const params = ctx.request.body
  const {admin_id, activity_id, user_name, mobile, limit, pageIndex} = params
  const where = {}
  // if (activity_id) {
  //   where['activity_id'] = activity_id
  // }

  if (user_name) {
    where['user_name'] = user_name
  }

  if (mobile) {
    where['mobile'] = mobile
  }

  let where_sql = ''
  let first = true
  for (let item in where) {
    const value = where[item]
    if (first) {
      where_sql = `where A.${item} like "%${value}%"`
      first = false
    }
    else {
      where_sql = `${where_sql} and A.${item} like "%${value}%"`
    }
  }

  let activities = []
  if (admin_id && admin_id != 0) {
    activities = await query(`select id from hw_activity where admin_id=${admin_id}`)
    activities = activities.map(item => item.id)
    console.log('activities', activities)
    if (activities.length == 0) {
      activities = 0;
    }
    console.log('-----', activities);
    if (first) {
      where_sql = `where activity_id in (${activities})`
      first = false
    }
    else {
      where_sql = `${where_sql} and activity_id in (${activities})`
    }
  }

  if (activity_id) {
    if (first) {
      where_sql = `where activity_id=${activity_id}`
      first = false
    }
    else {
      where_sql = `${where_sql} and activity_id=${activity_id}`
    }
    // where['activity_id'] = activity_id
  }

  const sql = `select A.*, B.title from hw_insurance as A join hw_activity as B 
    on A.activity_id=B.id ${where_sql} limit ${(pageIndex - 1) * limit},${limit}`

  console.log('insurance_list_search_sql:', sql)
  let data = await query(sql)
  // for (let item in data){
  //   let ziliao = await query(`select * from hw_insurance where activity_id=? and mobile=?`, [item.activity_id, item.mobile]);
  //   data[item].isZiliao = ziliao.length === 0 ? 0 : 1;
  // }
  let count = await query(`select count(*) as count from hw_insurance as A ${where_sql}`)

  ctx.body = Object.assign({code: 0, message: 'success', 'data': data}, pagination(limit, pageIndex, count[0].count))
}

export default {
    add,
  list_search,
}