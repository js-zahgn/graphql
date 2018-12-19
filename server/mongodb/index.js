const mongoose = require('mongoose');
const config = require('../config');

mongoose.Promise = global.Promise;

require('./schema/info');
require('./schema/student');
require('./schema/course');

exports.database = () => {
  // 链接数据库
  mongoose.connect(config.dbPath, {useNewUrlParser: true})
  let maxConnectCount = 0

  return new Promise((resolve, reject) => {
    // 增加数据库链接的事件监听
    mongoose.connection.on('disconnected', (err) => {
      console.log('*******数据库链子断了*******')
      if (maxConnectCount < 3) {
        maxConnectCount++
        // 进行重连
        mongoose.connect(config.dbPath, {useNewUrlParser: true})
      } else {
        reject(err)
        throw new Error('数据库已死，请进行人工呼吸。。。')
      }
    })

    // 数据库出错
    mongoose.connection.on('error', err => {
      console.log('*******数据库抛锚了*******')
      if (maxConnectCount < 3) {
        maxConnectCount++
        // 进行重连
        mongoose.connect(config.dbPath, {useNewUrlParser: true})
      } else {
        reject(err)
        throw new Error('数据库已死，请进行人工呼吸。。。')
      }
    })

    // 链接打开
    mongoose.connection.once('open', () => {
      console.log('MongoDB Connected successfully!')
      resolve()
    })
  })
}
