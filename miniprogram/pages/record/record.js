// pages/record/record.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    recordList:[],

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title:"学习记录"
    })
    this.getData(options.title)
  },

  getData(title){
    const res = wx.getStorageSync(title)
    if(res.length == 0){
      wx.showModal({
        content:"还没有学习记录，赶紧学习吧",
        showCancel:false,
        success:res=>{
          wx.navigateBack({
            delta: 0,
          })
        }
      })
      return
    }
    this.setData({
      recordList : res
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