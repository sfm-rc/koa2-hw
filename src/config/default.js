/**
 * Created at 16/4/11.
 * @Author Ling.
 * @Email i@zeroling.com
 */

let host = '127.0.0.1';
host = 'mysql_server_host';
if (process.env.NODE_ENV === 'dev') {
  host = '121.199.25.36';
}

export default {
  port: 3001,
  db: {
    host: host,
    port: '3306',
    database: 'hw',
    user: 'root',
    password: 'suyuan123'
  }
}
