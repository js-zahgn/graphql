const mongoose = require('mongoose');
const Info = mongoose.model('Info');

module.exports = {
  saveInfo: async (ctx, next) => {
    const opts = ctx.request.body;
    
    const info = new Info(opts);
    const saveInfo = await info.save();
  
    let res;
    if (saveInfo) {
      res = {
        success: true,
        data: saveInfo
      }
    } else {
      res = {
        success: false
      }
    }
    ctx.body = res
  },
  fetchInfo: async (ctx, next) => {
    const infos = await Info.find({});
  
    let res;
    if (infos.length) {
      res = {
        success: true,
        data: infos
      }
    } else {
      res = {
        success: false
      }
    }
    ctx.body = res;
  }
};
