// pages/personal/personal.js
const db = wx.cloud.database()
const user = db.collection('user')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:"",
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const userInfo = wx.getStorageSync('userInfo')
    this.setData({
      userInfo:userInfo
    })
  },

  getInfo(e){
    const info = e.detail.userInfo
    if(info){
      wx.showLoading({
        title: '授权中...',
      })
      // 点击允许之后调用云函数
      wx.cloud.callFunction({
        name:"getOpenId"
      }).then(res=>{
        const openid = res.result.openid
        // 检查一下数据库中是否存在
        user.where({_openid:openid}).get().then(result=>{
           if(result.data.length == 0){
             //数据库没有数据则写入数据库
             user.add({
               data:{
               ...info,
               createTime:db.serverDate(),
               score:0
               }
              }).then(r=>{
               user.where({_id:r._id}).get().then(re=>{
                this.setData({
                  userInfo:re.data[0]
                })
                wx.setStorageSync('userInfo',re.data[0])
                wx.hideLoading()
               })
             })
           }else{
             //数据库存在数据，则直接获取数据
             this.setData({
                userInfo:result.data[0]
             })
             wx.setStorageSync('userInfo',result.data[0])
             wx.hideLoading()
           }
        })
      })
      //登录之后即可生成作业记录和学习记录本地缓存
      wx.setStorageSync('homework',[])
      wx.setStorageSync('studywork',[])
    }else{
      wx.showModal({
        content:"登录之后才能查看具体信息",
        showCancel:false
      })
    }
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