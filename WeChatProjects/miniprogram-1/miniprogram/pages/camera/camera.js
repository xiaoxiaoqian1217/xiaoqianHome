// miniprogram/pages/camera/camera.js
const {formatTime} = require('../../utils/formatTime.js')
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    fileIds: [] // 保存上传到云的图片id
  },
  insertDataBase: () => {
    wx.cloud.callFunction({
      name:"photo",
      data:{
        imgUrl: res.fileID,
      },
      success:res=>{
        const imgUrl = res.result.imgUrl
        const date = formatTime(new Date().getTime())
        db.collection("photo").add({
          data: { 
            imgUrl ,
            date
          },
          success:function(ret){
            console.log('插入云数据库成功')
            // wx.navigateTo({
            //   url: '/pages/xqIndex/xqIndex',
            //   success: (res) => {
            //    console.log(res)
            //   },
            //   fail: (err)=>{
            //     console.log(err)
            //   }
            // })
          }
        })   
      }
    })
  },
  /**
   * 上传到云
   */
  upLoad: () => {
    wx.cloud.uploadFile({
      cloudPath: cloudPath[index],
      filePath: filePath, // 文件路径
    }).then(res => {
      // 预览图片
      this.setData({     
      })
      console.log(res.fileID)
      // 把数据写入数据库
    }).catch(error => {
      console.log('error', error)
      // handle error
    }) 
  },
  /**
   * 上传图片
   */
  uploadFile: () => {
    
    wx.chooseImage({
      count: 3,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: (res) => {
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths
        // 批量上传
        const cloudPath = []
        tempFilePaths.forEach((file,index) => {
          cloudPath.push(`myImage${Math.random()}`)
        })

        console.log('tempFilePaths',tempFilePaths)
        // 把所有异步上传图片到云的存入数组
        const promiseArr = []
        tempFilePaths.forEach(()=>{
          promiseArr.push(new Promise((resolve, reject)=>{

          }))
        })
        }
    })

  },
  /**
   * 拍照
   */
  takePhoto: () => {

  },
  /**
   * 上传图片
   */

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
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