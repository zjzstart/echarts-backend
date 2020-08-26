const path = require('path')
const fileUtils = require('../utils/file_utils')
const ws = require('ws')
// 创建WebSocket服务端的对象，绑定端口号是9998
const wss = new ws.Server({
  port: 9998
})

module.exports.listen = () => {
  // 对客户端的连接事件进行监听
  // client: 代表的是客户端的连接socket对象
  wss.on('connection', client => {
    console.log('有客户端连接成功...')
    // 对客户端的连接对象进行message事件的监听
    // msg：由客户端发给服务端的数据
    client.on('message', async msg => {
      console.log('客户端发送数据给服务器端了...' + msg)
      let payload = JSON.parse(msg)
      const action = payload.action
      if (action === 'getData') {
        let filePath = '../data/' + payload.chartName + '.json'
        // payload.chartName // hot map rank seller stock trend
        filePath = path.join(__dirname, filePath)
        const ret = await fileUtils.getFileJsonData(filePath)
        // 需要在服务端获取到数据的基础上，增加一个data字段
        // data所对应的值，就是某个json对应的内容
        payload.data = ret
        client.send(JSON.stringify(payload))
      } else {
        // 原封不动的将所接收的数据转发给每个处于连接状态的客户端
        // wss.clients // 所有客户端的连接
        wss.clients.forEach(client => {
          client.send(msg)
        })
      }
      // 由服务端往客户端发送数据
      // client.send('Hello socket from backend')
    })
  })
}
