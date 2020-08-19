// pages/article/article.js
const format = require('../../utils/util.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    articleInfo:{},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getData(options.index)
  },

  getData(index){
    const article = wx.getStorageSync('carouselStorage')
    const artDetail = article[index]
    // 设置当前页面的标题为传过来的标题
    wx.setNavigationBarTitle({title:artDetail.title})
    //时间格式化
    artDetail.createTime = format.formatTime(new Date(artDetail.createTime))
    //缓存的内容是字符串，需要处理成数组
    artDetail.content = artDetail.content.split('\n')
    
    this.setData({
      articleInfo:artDetail
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