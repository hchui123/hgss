// pages/list/list.js
let collection = ''
let tag = ''
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nameList:[]

  },
  

  //出现动画
  toggleDelay() {
    var that = this;
    that.setData({
      toggleDelay: true
    })
    setTimeout(function() {
      that.setData({
        toggleDelay: false
      })
    }, 1000)
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    collection = options.collection
    tag = options.tag
    this.toggleDelay()
    // 设置当前页面的标题为传过来的标题
    wx.setNavigationBarTitle({title:options.name})
    //调用数据
    this.getList()
  },
   

  //获取该项列表
  getList(){
    wx.showLoading({
      title: '拼命加载中...',
    })
    wx.cloud.callFunction({
      name:"getListData",
      data:{
        collection:collection,
        where:{
          tag:tag
        },
        skip:this.data.nameList.length,
        limit:100
      }
    }).then(res=>{
      const result = this.data.nameList.concat(res.result.data)
      this.setData({
        nameList:result
      })
      wx.setStorageSync(tag,result)
      wx.hideLoading()
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
    this.getList()

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})