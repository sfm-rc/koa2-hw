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
    const sql = `INSERT into hw_insurance VALUES(
                NULL,'${activity_id}','${user_name}', '${cer_type}', '${cer_id}', '${sex}', '${birth}', '${mobile}', 
                '${e_contact}', '${e_contact_mobile}', '${getLinuxTimeStamp()}'
            )`;
    var data = await query(sql);
    console.log('insert hw_insurance:', data);
    ctx.body = {code: 110, message:'保单填写成功', data}
}


export default {
    add,
}