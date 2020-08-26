// 计算服务器消耗时长的中间件
module.exports = async function(ctx, next) {
  const start = Date.now()
  await next()
  const end = Date.now()
  const duration = end - start
  ctx.set('x-Response-Time', duration + 'ms')
}