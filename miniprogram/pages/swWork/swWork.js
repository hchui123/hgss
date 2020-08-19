// pages/swWork/swWork.js
let time = ''
let value = ''
let answer = ''
const db = wx.cloud.database()
const sw = db.collection('sw')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    countDown:"00:00",
    maxTime:10,
    workList:[],
    isShowParse:false,
    submitContent:"练习提交",
    isdisabled:false,
    isSwWork:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    clearInterval(time)
    this.getTime()
    this.getSwWork()
  },

  getSwWork(){
    const swWork = wx.getStorageSync('swWork')
    if(swWork.length != 0){
       if(swWork.time == new Date().toLocaleDateString()){
        this.setData({
          workList:swWork.list,
          isShowParse:true,
          isdisabled:true,
          isSwWork:false,
          submitContent:"练习已完成"
        })
        return
       }
      return
    }
    wx.showLoading({
      title: '获取题目中...',
    })
    sw.where({today:new Date().toLocaleDateString()}).get().then(res=>{
      if(res.data.length == 0){
        this.setData({
          isSwWork:true,
        })
        wx.hideLoading()
        return
      }
      for (let i = 0; i < res.data.length; i++) {
        res.data[i].parse = res.data[i].parse.split('\n')
      }
      this.setData({
        workList:res.data,
        isSwWork:false
      })
      wx.hideLoading()
    })
  },

  getRadio(e){
    answer = e.currentTarget.dataset.answer
    value = e.detail.value
    if(answer != value){
      wx.showModal({
        content:"选择错误，请再思考一下",
        showCancel:false,
        mask:true
      })
      return
    }
    wx.showToast({
      title: '恭喜你，选对了',
      mask:true
    })
  },
  
  // 练习提交操作
  getValue(){
    if(answer == ''){
       wx.showModal({
          content:"请先答题，再提交",
          showCancel:false,
          mask:true
       })
       return
    }
    wx.showToast({
      title: '练习已完成',
      mask:true
    })

    const work = {
      list:this.data.workList,
      time:new Date().toLocaleDateString()
    }
    wx.setStorageSync('swWork',work)
    const homework = wx.getStorageSync('homework')
    homework.unshift({
      time:new Date().toLocaleDateString(),
      title:"今日练习完成"
    })
    wx.setStorageSync('homework',homework)

    this.setData({
      isShowParse:true,
      isdisabled:true,
      submitContent:"练习已完成"
    })
  },

  showModal(e) {
    this.setData({
      modalName: e.currentTarget.dataset.target
    })
  },
  hideModal(e) {
    this.setData({
      modalName: null
    })
  },

  //获取时间
  getTime(){
    let count = this.data.maxTime * 60
    time = setInterval(() => {
      if(count <=0){
        clearInterval(time)
        this.setData({
          countDown:"00:00"
        })
        wx.showModal({
          content:"时间到，速度要快点哦",
          showCancel:false
        })
        return
      }
      this.setData({
         countDown:this.timeFormat(count--)
      })
    }, 1000)
  },

  timeFormat(time){
    let min = Math.floor(time / 60)
    let sec = Math.floor(time % 60)
    min = min < 10 ? '0'+min : min
    sec = sec < 10 ? '0'+sec : sec
    return min + ":" + sec
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
    //页面切换时，关闭定时器
    clearInterval(time)
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