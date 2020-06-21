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
  insertDataBase: function(){
    var {fileIds} = this.data
    console.log('fileIds',fileIds)
    wx.cloud.callFunction({
      name:"photo",
      data:{
        imgUrls: fileIds,
      },
      success:res=>{
        const imgUrls = res.result.imgUrls
        const date = formatTime(new Date().getTime())
        db.collection("photo").add({
          data: { 
            imgUrls,
            date
          },
          success:function(ret){
            console.log('插入云数据库成功')
            wx.navigateTo({
              url: '/pages/xqIndex/xqIndex',
              success: (res) => {
               console.log(res)
              },
              fail: (err)=>{
                console.log(err)
              }
            })
          }
        })   
      }
    })
  },
  /**
   * 单个文件上传到云
   */
  upLoadCloud: function(param)  {
     wx.cloud.uploadFile({
      cloudPath: param.cloudPath, //  文件名 
      filePath: param.filePath, // 文件路径
    }).then(res => {
      // 预览图片
      this.data.fileIds.push(res.fileID)
      console.log(res.fileID)
      
    }).catch(error => {
      console.log('error', error)
      // handle error
    }) 
  },
  /**
   * 上传图片
   */
  uploadFile: function() {
    wx.chooseImage({
      count: 3,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: (res) => {
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths
        // 创建每个文件的名字
        const cloudPath = []
        tempFilePaths.forEach((file,index) => {
          cloudPath.push(`myImage${Math.random()}`)
        })
        // 把所有异步上传图片到云的存入数组
        const promiseArr = []
        tempFilePaths.forEach((filePath,index)=>{
          console.log('filePath', filePath)
          promiseArr.push(new Promise((resolve, reject)=>{
            wx.cloud.uploadFile({
              cloudPath: cloudPath[index], //  文件名 
              filePath: filePath, // 文件路径
            }).then(res => {
              // 预览图片
              this.setData({
                fileIds: this.data.fileIds.concat(res.fileID)
              })
              
              console.log(res.fileID)
              resolve()
            }).catch(error => {
              console.log('error', error)
              reject()
              // handle error
            }) 
          }))
        })
        Promise.all(promiseArr).then(res=>{
          console.log('all')
        // 当所有图片都上传成功以后，当作一条记录插入数据库
          this.insertDataBase()
          console.log('res', res)
        }).catch(err=> {
          console.log('err', err)
          // 捕捉最先失败的promise，一个promise失败则算失败
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