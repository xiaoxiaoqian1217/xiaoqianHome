//app.js

App({
  onLaunch: function () {
   
      // 初始化云函数
      wx.cloud.init({
        traceUser:true  // 用户在调试器看到日志
      })
  }
})
