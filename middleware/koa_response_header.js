// 设置响应头的中间件
module.exports = async function(ctx, next) {
  const contentType = 'application/json; charset=utf-8'
  ctx.set('Content-Type', contentType)
  ctx.set("Access-Control-Allow-Origin", "*")
  ctx.set("Access-Control-Methods-Origin", "OPTIONS,GET,PUT,POST,DELETE")
  ctx.response.body = '{"success" : true}'
  await next()
}