// pages/person/person-menu.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    img_src:"../../assets/images/person/avatar.png"  

  },
  toAgent:function(e){
    wx.getStorageInfo({
      success: function(res) {},
    })
    // // 判断是否是会员
    // if (app.globalData.user_token == null || app.globalData.user_token == '') {
    //   wx.showToast({

    //     title: "请注册会员",

    //     duration: 3000, //提示的延迟时间，单位毫秒，默认：1500 

    //     mask: false, //是否显示透明蒙层，防止触摸穿透，默认：false        

    //   })
    // } else {
    //   let that = this;
    // }
    wx.navigateTo({
      url: '/pages/person/agent/index',
    })
  },
  // 报备
  baoBei:function(e){

  },
  // 获取会员码
  memberCode:function(e){
    
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  // 报备
  baoBei: function (e) {

  },
  // 会员码  
  memberCode:function(e){

  },
  // 登录or注册
  loginOrReg: function(e) {
    wx.navigateTo({
      // + JSON.stringify(item)
      url: '/pages/person/loginOrReg/index',
      events: {
        // 为指定事件添加一个监听器，获取被打开页面传送到当前页面的数据
        acceptDataFromOpenedPage: function (data) {
          console.log(data)
        },
        someEvent: function (data) {
          console.log(data)
        }
      },
      success: function (res) {
        // 通过eventChannel向被打开页面传送数据        
        // res.eventChannel.emit('item', { data: item })
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