
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
  let count = await query('select count(*) as count from hw_activity ORDER BY seq desc where admin_id=?', [admin_id]);
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
 * 获取活动列表,管理后台使用
 * @param {*} ctx 
 * @param {*} next 
 */
const list_search = async (ctx, next) => {
  const params = ctx.request.body;
  const {admin_id, id, title, limit, pageIndex} = params;
  const where = {};
  if(admin_id){
    where['admin_id'] = admin_id;
  }
  if(id){
    where['id'] = id;
  }
  if(title){
    where['title'] = title;
  }
  let where_sql = '';
  let first = true;
  for(let item in where){
    const value = where[item];
    if(first){
      where_sql = `where ${item} like "%${value}%"`;
      first = false;
    }
    else {
      where_sql = `${where_sql} and ${item} like "%${value}%"`;
    }
  }

  const sql = `select * from hw_activity ${where_sql} ORDER BY seq desc limit ?,?`;
  console.log('list_search_sql:', sql);
  let data = await query(sql, [(pageIndex-1)*limit, limit]);
  let count = await query(`select count(*) as count from hw_activity ${where_sql}`);
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
 * 获取详情
 * @param {*} ctx 
 * @param {*} next 
 */
const get = async(ctx, next) => {
  const params = ctx.request.body;
  const {id} = params;
  const sql = 'select * from hw_activity where id=?';
  const activity = await query(sql, [id]);
  ctx.body = {code: 0, message: 'success', data: activity[0]}
}

/**
 * 添加活动 管理后台使用
 * @param {*} ctx 
 * @param {*} next 
 */
const add = async(ctx, next) => {
  const params = ctx.request.body;
  const {title, link_url, image_url, start_time, end_time, registrate_end_time, 
    cur_num, limit_num, location, leader_name_alias, success, points, seq, status, price,
    admin_id, type} = params;
  const sql = `INSERT INTO hw_activity VALUES (NULL, '${title}', '${link_url}', '${image_url}',
              '${start_time}', '${end_time}', '${registrate_end_time}', '${cur_num}', '${limit_num}', 
              '${location}', '${leader_name_alias}', '${success}', '${points}', '${seq}', '${status}', 
              ${price}, ${admin_id}, '${type}')`;
  console.log('add activity sql:', sql);
  const res = await query(sql);
  ctx.body = {code: 0, message: 'success', data: res}
}

/**
 * 更新活动 管理后台使用
 * @param {*} ctx 
 * @param {*} next 
 */
const update = async(ctx, next) => {
  const params = ctx.request.body;
  const {id, title, link_url, image_url, start_time, end_time, registrate_end_time, 
    cur_num, limit_num, location, leader_name_alias, success, points, seq, status, price,
    admin_id, type} = params;
  const sql = `update hw_activity set title='${title}', link_url='${link_url}', image_url='${image_url}',
              start_time='${start_time}', end_time='${end_time}', registrate_end_time='${registrate_end_time}', cur_num='${cur_num}', limit_num='${limit_num}', 
              location='${location}', leader_name_alias='${leader_name_alias}', success='${success}', points='${points}', seq='${seq}', status='${status}', 
              price=${price}, admin_id=${admin_id}, type='${type}' where id=${id}`;
  console.log('update activity sql:', sql);
  const res = await query(sql);
  ctx.body = {code: 0, message: 'success', data: res}
}


export default {
  list,
  add,
  update,
  get,
  list_search,
}