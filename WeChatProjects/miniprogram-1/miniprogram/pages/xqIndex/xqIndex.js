// miniprogram/pages/xqIndex/xqIndex.js
// 首先获取数据库的引用
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    avatarUrl:'',
    userInfo: {},
    actives: [] // 最近的动态
  },
  /**
   * 处理底部camera的点击事件,跳转到camera页面
   * 
   */
  handleCamera : () => {
    wx.navigateTo({
      url: '/pages/camera/camera',
      success: (res) => {
       console.log(res)
      },
      fail: (err)=>{
        console.log(err)
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    // 获取用户信息
    wx.getSetting({
      success : res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              this.setData({
                avatarUrl: res.userInfo.avatarUrl,
                userInfo: res.userInfo
              })
            }
          })
        }
      }
    })
    // 获取最近上传的图片
    db.collection('photo').get({
      success: (res) => {
        const data = res.data || []
        this.setData({
          actives: data
        })
        // res.data 包含该记录的数据
        console.log(res.data)
      }
    })
   
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})