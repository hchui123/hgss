// pages/detail/detail.js

const bgm = wx.getBackgroundAudioManager()
let index = 0
let list = []
let wordHeight = 0

Page({

  /**
   * 页面的初始数据
   */
  data: {
    isPlaying:false,
    lyricList:[],
    wordTime:0,
    scrollTop:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.getSystemInfo({
      success: (res) => {
        wordHeight = res.screenWidth / 750 * 300
      },
    })
    index = options.index
    list = wx.getStorageSync(options.tag)
    this.getData()
    if(wx.getStorageSync('userInfo')){
      const study = wx.getStorageSync('studywork')
      study.unshift({
        time:new Date().toLocaleDateString(),
        title:options.title
      })
      wx.setStorageSync('studywork',study)
    }
  },
  //播放音频
  getData(){
     bgm.stop()
     const info = list[index]
     // 设置当前页面的标题为传过来的标题
     wx.setNavigationBarTitle({title:info.title})
     bgm.src = info.bgm
     bgm.title = info.title

     const lyric = info.content.split('\n')
     const wordList = []
     lyric.forEach((e)=>{
      const fj = e.match(/\[(\d{2}):(\d{2}).(\d{2})](\s*)(.*?$)/)
      if(fj){
        let time = parseInt(fj[1])*60 + parseInt(fj[2])
        let word = fj[5]
        wordList.push({
         time,
         word
        })
      }
     })
     this.setData({
      lyricList:wordList
     })

     
     bgm.onTimeUpdate(()=>{
      let currentTime = parseInt(bgm.currentTime)
       for (let i = 0; i < wordList.length; i++) {
          if(currentTime <= wordList[i].time){
            this.setData({
              wordTime: i - 1,
              scrollTop: (i - 1) * wordHeight
            })
            return
          }
       }
       
     })


  },
  
  //暂停和播放
  play(){
    if(this.data.isPlaying){
      bgm.play()
    }else{
      bgm.pause()
    }
    this.setData({
      isPlaying:!this.data.isPlaying
    })
  },
  
  //上一首
  prev(){
    bgm.stop()
    index--
    if(index < 0){
      index = list.length - 1
    }
    this.getData()
    this.setData({
      isPlaying:false
    })
  },
  
  //下一首
  next(){
    bgm.stop()
    index++
    if(index == list.length){
       index = 0
    }
    this.getData()
    this.setData({
      isPlaying:false
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