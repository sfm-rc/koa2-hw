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
  const sql = 'select * from hw_travel_note where type=? and admin_id=? and is_show=1 ORDER BY id desc limit ?,?';
  let data = await query(sql, [type, admin_id, (pageIndex-1)*limit, limit]);
  let count = await query('select count(*) as count from hw_travel_note where type=? and admin_id=? and is_show=1', [type, admin_id]);
  ctx.body = Object.assign({code: 0, message: 'success', 'data': data}, pagination(limit, pageIndex, count[0].count));
}

/**
 * 添加， 后台
 * @param {*} ctx
 * @param {*} next
 */
const add = async(ctx, next) => {
  const params = ctx.request.body;
  const {title, desc, link_url, image_url, author, view_count, start_date, type, admin_id} = params;

  const sql = `INSERT into hw_travel_note VALUES(
              NULL,'${title}','${desc}', '${link_url}', '${image_url}', '${author}', '${view_count}', '${start_date}', 
              '${type}', '${admin_id}', '${getLinuxTimeStamp()}', 1
          )`;
  console.log('add hw_travel_note sql', sql);
  const data = await query(sql);
  // console.log('insert hw_travel_note:', data);
  ctx.body = {code: 0, message:'保存成功', data}

}


/**
 * 更新 管理后台使用
 * @param {*} ctx
 * @param {*} next
 */
const update = async(ctx, next) => {
  const params = ctx.request.body;
  const {id, title, desc, link_url, image_url, author, view_count, start_date, type,
    admin_id, created_at} = params;
  const sql = `update hw_travel_note set title='${title}', \`desc\`='${desc}', link_url='${link_url}', image_url='${image_url}',
  author='${author}', view_count='${view_count}',
              start_date='${start_date}', type='${type}', admin_id=${admin_id}, created_at='${created_at}' where id=${id}`;
  console.log('update hw_travel_note sql:', sql);
  const res = await query(sql);
  ctx.body = {code: 0, message: 'success', data: res}
}




/**
 * 获取列表,管理后台使用
 * @param {*} ctx
 * @param {*} next
 */
const list_search = async (ctx, next) => {
  const params = ctx.request.body
  const {admin_id, id, title, author, limit, pageIndex, type} = params
  const where = {}

  if (id) {
    where['id'] = id;
  }

  if (title) {
    where['title'] = title;
  }

  if (author) {
    where['author'] = author;
  }
  if (type) {
    where['type'] = type;
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
    if (first) {
      where_sql = `where admin_id=${admin_id}`
      first = false
    }
    else {
      where_sql = `${where_sql} and admin_id=${admin_id}`
    }
  }

  const sql = `select A.*, B.club_name from hw_travel_note as A join hw_admin as B 
    on A.admin_id=B.id ${where_sql} limit ${(pageIndex - 1) * limit},${limit}`

  console.log('hw_travel_note list sql:', sql)
  let data = await query(sql)
  let count = await query(`select count(*) as count from hw_travel_note as A ${where_sql}`)

  ctx.body = Object.assign({code: 0, message: 'success', 'data': data}, pagination(limit, pageIndex, count[0].count))
}


/***
 * 隐藏 展示
 * @param ctx
 * @param next
 * @returns {Promise.<void>}
 */
const update_show = async(ctx, next) => {
  const params = ctx.request.body;
  const {id, is_show} = params;
  const sql = `update hw_travel_note set is_show='${is_show}' where id=${id}`;
  console.log('update hw_travel_note sql:', sql);
  const res = await query(sql);
  ctx.body = {code: 0, message: 'success', data: res}
}



export default {
  list,
  add,
  list_search,
  update,
  update_show,
}