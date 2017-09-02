

import {query} from '../models/db_connection';
import { pagination, getLinuxTimeStamp} from '../uitil';



/**
 * 登录
 * @param {*} ctx 
 * @param {*} next 
 */
const login = async(ctx, next) =>{
    const params = ctx.request.body;
    const {userName, password} = params;

    const sql = `select * from hw_admin where 
    name='${userName}' and pwd='${password}'`;
    let data = await query(sql);
    console.log('select admin', data);
    if(data.length>0){
        const admin = data[0];
         ctx.cookies.set(
            'admin_id', 
            `0123${admin.id}`,
            {
                // domain: 'localhost',  // 写cookie所在的域名
                // path: '/index',       // 写cookie所在的路径
                maxAge: 24 * 60 * 60 * 1000, // cookie有效时长
                expires: new Date('2019-02-15'),  // cookie失效时间
                httpOnly: false,  // 是否只用于http请求中获取
                // overwrite: false  // 是否允许重写
            }
        );
        ctx.cookies.set('permission', '1', 
        {
            maxAge: 24 * 60 * 60 * 1000, // cookie有效时长
            expires: new Date('2019-02-15'),  // cookie失效时间
            httpOnly: false,  // 是否只用于http请求中获取
        });
        ctx.cookies.set('name', admin.name, 
        {
            maxAge: 24 * 60 * 60 * 1000, // cookie有效时长
            expires: new Date('2019-02-15'),  // cookie失效时间
            httpOnly: false,  // 是否只用于http请求中获取
        })
        ctx.body = {code: 0, message: 'success', data};
    }
    else{
        ctx.body = {code: 401, message: 'failed', data}
    }

}



/**
 * 退出获取报名表
 * @param {*} ctx 
 * @param {*} next 
 */
const logout = async(ctx, next) =>{
    ctx.cookies.set(
        'admin_id', 
        ''
    );
    ctx.cookies.set('permission', false);
    ctx.cookies.set('name', '')
    ctx.body = {code: 0, message: 'success', data: {}};
}



/**
 * 获取俱乐部列表,管理后台使用
 * @param {*} ctx 
 * @param {*} next 
 */
const list_search = async (ctx, next) => {
  const params = ctx.request.body;
  const {limit, pageIndex} = params;
  const where = {};
  // if(admin_id){
  //   where['admin_id'] = admin_id;
  // }
  // if(id){
  //   where['id'] = id;
  // }
  // if(title){
  //   where['title'] = title;
  // }
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

  const sql = `select * from hw_admin ${where_sql} limit ?,?`;
  console.log('list_search_sql:', sql);
  let data = await query(sql, [(pageIndex-1)*limit, limit]);
  let count = await query(`select count(*) as count from hw_admin ${where_sql}`);

  ctx.body = Object.assign({code: 0, message: 'success', 'data': data}, pagination(limit, pageIndex, count[0].count));
}

/**
 * 添加管理员 管理后台使用
 * @param {*} ctx 
 * @param {*} next 
 */
const add = async(ctx, next) => {
  const params = ctx.request.body;
  const {name, mobile, email, pwd, club_name, club_address, 
    contact_name, contact_mobile, contact_email} = params;
  const sql = `INSERT INTO hw_admin VALUES (NULL, '${name}', '${mobile}', '${email}',
              '${pwd}', '${club_name}', '${club_address}', '${contact_name}', '${contact_mobile}', 
              '${contact_email}', '', '', '')`;
  console.log('add admin sql:', sql);
  const res = await query(sql);
  ctx.body = {code: 0, message: 'success', data: res}
}


/**
 * 更新管理员 管理后台使用
 * @param {*} ctx 
 * @param {*} next 
 */
const update = async(ctx, next) => {
  const params = ctx.request.body;
  const {id, name, mobile, email, pwd, club_name, club_address_p, club_address_c, club_address_t, club_address_detail,
    contact_name, contact_mobile, contact_email} = params;
  const sql = `update hw_admin set name='${name}', mobile='${mobile}', email='${email}',
              pwd='${pwd}', club_name='${club_name}', 
              club_address_p='${club_address_p}', club_address_t='${club_address_t}', club_address_c='${club_address_c}',club_address_detail='${club_address_detail}',
              contact_name='${contact_name}',
              contact_mobile='${contact_mobile}', 
              contact_email='${contact_email}' where id=${id}`;
  console.log('update admin sql:', sql);
  const res = await query(sql);
  ctx.body = {code: 0, message: 'success', data: res}
}

/**
 *
 * @param ctx
 * @param next
 * @returns {Promise.<void>}
 */
const get = async(ctx, next) => {
  const params = ctx.request.body;
  const {admin_id} = params;
  const sql = `select * from hw_admin where id='${admin_id}'`;
  console.log('get admin sql:', sql);
  const res = await query(sql);
  ctx.body = {code: 0, message: 'success', data: res}
}

export default {
    logout,
    login,
    list_search,
    add,
    update,
  get,
}
