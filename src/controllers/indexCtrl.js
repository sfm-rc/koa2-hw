
import {query} from '../models/db_connection';

export default async (ctx, next) => {
  const title = 'koa2 title';
  // con.connect(function(err) {
  //   if (err) throw err;
  //   con.query("SELECT * FROM hw_activity", function (err, result, fields) {
  //     if (err) throw err;
  //     console.log(result);
  //   });
  // });

  // await ctx.render('index', {
  //   title
  // })
  let sql = 'SELECT * FROM hw_activity';
  let dataList = await query( sql );
   ctx.body = dataList
}
