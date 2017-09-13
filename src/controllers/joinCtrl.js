import { query } from '../models/db_connection'
import { pagination, getLinuxTimeStamp } from '../uitil'

/**
 * 报名
 * @param {*} ctx
 * @param {*} next
 */
const join = async (ctx, next) => {
  const params = ctx.request.body
  const {user_name, user_name_alias, sex, mobile, down_payment, activity_id, extra} = params
  // ---
  await query('set autocommit=0;')
  await query('begin;')
  try {
    const joinUser = await query('select count(*) as count from hw_join where activity_id=? and mobile=? and is_success=1', [activity_id, mobile])
    console.log('joinUser---', joinUser)
    if (joinUser[0].count > 0) {
      x.body = {code: 110, message: '您已经报过名', data: {}}
    }
    else {
      console.info('lock for activity_id', activity_id)
      const activities = await query('select * from hw_activity where id=? for update;', [activity_id])// activity_id这行加了行锁
      const activity = activities[0]
      if (activity.cur_num < activity.limit_num) {
        // 可以报名
        const sql = `INSERT into hw_join VALUES(
                NULL,'${user_name}', '${user_name_alias}', '${sex}', '${mobile}', 
                '${down_payment}', '${extra}', '${activity_id}', '${getLinuxTimeStamp()}', 1
            )`
        var data = await query(sql)
        console.log('insert hw_join for join', data)
        if (data.insertId > 0) {
          const update_res = await query('UPDATE hw_activity set cur_num=cur_num+1 WHERE id=?', [activity_id])
          console.log('update set ++1', update_res)
          ctx.body = {code: 0, message: '报名成功', data}
        }
      }
      else {
        ctx.body = {code: 110, message: '报名失败,活动人数受限制', data: {}}
      }
    }
  }
  catch (error) {
    console.error('join fail', error)
    await query('ROLLBACK')
    ctx.body = {code: 110, message: '报名失败,未知异常', data: {}}
  }
  await query('commit;')

  console.info('ulock for activity_id', activity_id)
  // ---
}

/**
 * 获取报名表
 * @param {*} ctx
 * @param {*} next
 */
const list = async (ctx, next) => {
  const params = ctx.request.body
  const {pageIndex, limit, activity_id} = params
  const sql = `select * from hw_join where 
    activity_id='${activity_id}' limit ${(pageIndex - 1) * limit}, ${limit}`
  const c_sql = `select count(*) as count from hw_join where 
    activity_id='${activity_id}'`
  let data = await query(sql)
  const count = (await query(c_sql))[0].count
  ctx.body = Object.assign(
    {code: 0, message: 'success', data},
    pagination(limit, pageIndex, count)
  )
}

/**
 * 获取活动报名列表,管理后台使用
 * @param {*} ctx
 * @param {*} next
 */
const list_search = async (ctx, next) => {
  const params = ctx.request.body
  const {admin_id, activity_id, user_name, user_name_alias, mobile, limit, pageIndex} = params
  const where = {}

  if (user_name) {
    where['user_name'] = user_name
  }

  if (user_name_alias) {
    where['user_name_alias'] = user_name_alias
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

  const sql = `select A.*, B.title from hw_join as A join hw_activity as B 
    on A.activity_id=B.id ${where_sql} limit ${(pageIndex - 1) * limit},${limit}`

  console.log('join_list_search_sql:', sql)
  let data = await query(sql)
  for (let item in data){
    let ziliao = await query(`select * from hw_insurance where activity_id=? and mobile=?`, [item.activity_id, item.mobile]);
    data[item].isZiliao = ziliao.length === 0 ? 0 : 1;
  }
  let count = await query(`select count(*) as count from hw_join as A ${where_sql}`)

  ctx.body = Object.assign({code: 0, message: 'success', 'data': data}, pagination(limit, pageIndex, count[0].count))
}

/***
 *  报名成功失败
 * @param ctx
 * @param next
 * @returns {Promise.<void>}
 */
const update_success = async(ctx, next) => {
  const params = ctx.request.body;
  const {id, is_success} = params;
  const sql = `update hw_join set is_success='${is_success}' where id=${id}`;
  console.log('update hw_join sql:', sql);
  const res = await query(sql);
  ctx.body = {code: 0, message: 'success', data: res}
}

export default {
  join,
  list,
  list_search,
  update_success,
}
