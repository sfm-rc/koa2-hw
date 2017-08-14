

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
    if(data.length>0){
        const admin = data[0];
         ctx.cookies.set(
            'id', 
            admin.id,
            {
                // domain: 'localhost',  // 写cookie所在的域名
                // path: '/index',       // 写cookie所在的路径
                maxAge: 10 * 60 * 1000, // cookie有效时长
                // expires: new Date('2019-02-15'),  // cookie失效时间
                httpOnly: false,  // 是否只用于http请求中获取
                // overwrite: false  // 是否允许重写
            }
        );
        ctx.cookies.set('permission', '1', 
        {
            maxAge: 10 * 60 * 1000, // cookie有效时长
            // expires: new Date('2019-02-15'),  // cookie失效时间
            httpOnly: false,  // 是否只用于http请求中获取
        });
        ctx.cookies.set('name', admin.name, 
        {
            maxAge: 10 * 60 * 1000, // cookie有效时长
            // expires: new Date('2019-02-15'),  // cookie失效时间
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
        'id', 
        ''
    );
    ctx.cookies.set('permission', false);
    ctx.cookies.set('name', '')
    ctx.body = {code: 0, message: 'success', data: {}};
}

export default {
    logout,
    login
}