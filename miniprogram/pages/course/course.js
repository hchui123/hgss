// pages/course/course.js

let count = ''
const countTime = require('../../utils/countTime.js')
const format = require('../../utils/util.js')

const db = wx.cloud.database()
const carousel = db.collection('carousel')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    countTime:"00天00时00分00秒",
    endTime:"2021/06/07 00:00:00",
    cardCur: 0,
    swiperList: [],

    enlishList:[
      {collection:"english",tag:"word",name:"背读单词",icon:"dancigendu",color:"red"},
      {collection:"english",tag:"lesson",name:"单元课文",icon:"lesson",color:"pink"},
      {collection:"english",tag:"essay",name:"听短文学单词",icon:"duanwenben",color:"green"}
    ],

  },
  // 轮播图
  cardSwiper(e) {
    this.setData({
      cardCur: e.detail.current
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    //调用高考倒计时
    this.getTime()
    //调用轮播图数据
    this.getCarousel()
  },
  //获取轮播图数据
  getCarousel(){
    const currentTime = (new Date()).getTime()
    const storageTime = wx.getStorageSync('storageTime') + 3600000 * 6 // 缓存的时间戳加上6小时的时间戳
    const carouselStorage = wx.getStorageSync('carouselStorage')
    if(carouselStorage.length != 0 && currentTime < storageTime){
      this.setData({
        swiperList:carouselStorage
      })
      return
    }
    wx.clearStorageSync('storageTime')
    wx.clearStorageSync('carouselStorage')
    wx.showLoading({
      title: '加载中...',
    })
    carousel.get().then(res=>{
      this.setData({
        swiperList:res.data
      })
      //增加缓存时所处的时间
      const storageT = (new Date()).getTime()
      wx.setStorageSync('carouselStorage',res.data)
      wx.setStorageSync('storageTime', storageT)
      wx.hideLoading()
    })
  },
  // 高考倒计时处理函数
   getTime(){
     count = setInterval(() => {
      this.setData({
        countTime:countTime.countTime(this.data.endTime)
      })
    }, 1000);
  },
  //检查用户是否登录
  isLogin(){
    const user = wx.getStorageSync('userInfo')
    if(user){
      wx.navigateTo({
        url: '../swWork/swWork?openid='+user._openid+'&nickName='+user.nickName+'&avatarUrl='+user.avatarUrl,
      })
    }else{
      wx.showModal({
        content:"请先登录",
        showCancel:false,
        success:res=>{
          wx.switchTab({
            url: '../personal/personal',
          })
        }
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
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    //页面切换时，关闭定时器
    clearInterval(count)
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})