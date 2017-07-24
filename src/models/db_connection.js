/**
 * Created by zhuzhu on 2017/7/3.
 */
require('colors')
import mysql from 'mysql';
import config from '../config';
//const mysql =  require('mysql');

// var con = mysql.createConnection(config.db);
// console.log("start Connected!".green);
// con.connect(function(err) {
//     if (err) throw err;
//     console.log("Connected!".green);
// });

const pool = mysql.createPool(
//     {
//   host     :  '127.0.0.1',
//   user     :  'root',
//   password :  '123456',
//   database :  'my_database'
// }
config.db
)

const query = function( sql, values ) {
  return new Promise(( resolve, reject ) => {
    pool.getConnection(function(err, connection) {
      if (err) {
        reject( err )
      } else {
        connection.query(sql, values, ( err, rows) => {

          if ( err ) {
            reject( err )
          } else {
            resolve( rows )
          }
          connection.release()
        })
      }
    })
  })
}


export default { query };