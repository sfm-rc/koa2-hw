import http from 'http'
import Koa from 'koa'
import path from 'path'
import convert from 'koa-convert'
import json from 'koa-json'
import Bodyparser from 'koa-bodyparser'
import logger from 'koa-logger'
import koaStatic from 'koa-static-plus'
import config from './config'
import cors from 'koa2-cors'
import send from 'koa-send'

const app = new Koa()
const bodyparser = Bodyparser()

// middlewares
app.use(cors({
  origin: function(ctx) {
    if (ctx.url === '/test') {
      return false;
    }
    return '*';
  },
  // exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
  maxAge: 60*60*24*7,
  credentials: true,
  // allowMethods: ['GET', 'POST', 'DELETE'],
  // allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
}))
app.use(convert(bodyparser))
app.use(convert(json()))
app.use(convert(logger()))

// static
app.use(convert(koaStatic(path.join(__dirname, '../public'), {
  pathPrefix: ''
})))

// views
// app.use(views(path.join(__dirname, '../views'), {
//   extension: 'ejs'
// }))

// 500 error
// koaOnError(app, {
//   template: 'views/500.ejs'
// })

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})
app.use(async (ctx, next) => {
  //console.log('--------ctx:', ctx);
  const url = ctx.url;
  if (url.indexOf('/dist') > -1) {
    const filePath = url.substr(url.lastIndexOf('/'), url.length);
    console.log('---------filePath:', filePath);
    await send(ctx, path.resolve('/public/dist' + filePath));
  } else {
    await send(ctx, path.resolve('/public/index.html'));
  }
  await next();
});

//app.use(serve('/public'));
app.use(async (ctx, next) => {
  const url = ctx.url;
  console.log('--------url:', url);
  if (url.indexOf('user-hw-static') > -1) {
    const filePath = url.substr(url.lastIndexOf('/'), url.length);
    console.log('---------filePath:', filePath);
    await send(ctx, path.resolve('/public/dist' + filePath));
  } 
  else {
    await send(ctx, path.resolve('/public/dist/index.html'));
  }
  await next();
});

// response router
app.use(async (ctx, next) => {
  console.log('----api');
  await require('./routes').routes()(ctx, next)
})
// const routers = require('./routes')
// app.use('/hw', routers.routes()).use(routers.allowedMethods())

// 404
// app.use(async (ctx) => {
//   ctx.status = 404
//   await ctx.render('404')
// })

// error logger
app.on('error', async (err, ctx) => {
  console.log('error occured:', err)
})

const port = parseInt(config.port || '3000')
const server = http.createServer(app.callback())

server.listen(port)
server.on('error', (error) => {
  if (error.syscall !== 'listen') {
    throw error
  }
  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(port + ' requires elevated privileges')
      process.exit(1)
      break
    case 'EADDRINUSE':
      console.error(port + ' is already in use')
      process.exit(1)
      break
    default:
      throw error
  }
})
server.on('listening', () => {
  console.log('Listening on port: %d', port)
})

export default app
