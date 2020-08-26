// 服务器的入口文件
// 1.创建Koa的实例对象
const Koa = require('koa')
const app = new Koa()

// 2.绑定中间件
// 绑定第1层中间件
const resDurationMiddleware = require('./middleware/koa_response_duration')
app.use(resDurationMiddleware)

// 绑定第2层中间件
const resHeaderMiddleware = require('./middleware/koa_response_header')
app.use(resHeaderMiddleware)

// 绑定第3层中间件
const resDataMiddleware = require('./middleware/koa_response_data')
app.use(resDataMiddleware)

// 3.绑定端口号 8888
app.listen(8888)

const webSocketService = require('./service/web_socket_service')
// 开启服务端的监听，监听客户端的连接
// 当某一个客户端连接成功之后，就会对这个客户端进行message事件的监听
webSocketService.listen()