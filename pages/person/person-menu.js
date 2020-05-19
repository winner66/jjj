// pages/person/person-menu.js

import regeneratorRuntime from '../../utils/runtime';

import apis from '../../utils/apis';
var base64 = require('../../utils/base.js');
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    img_src:"../../assets/images/person/avatar.png"  ,
    // wx头像登录
    user_account:null,
    user_info:null,
    // 0 没有登录
    login:0,

  },
 
  headimgHD: function (imageUrl) {
    console.log('原来的头像', imageUrl);
    imageUrl = imageUrl.split('/');        //把头像的路径切成数组

    //把大小数值为 46 || 64 || 96 || 132 的转换为0
    if (imageUrl[imageUrl.length - 1] && (imageUrl[imageUrl.length - 1] == 46 || imageUrl[imageUrl.length - 1] == 64 || imageUrl[imageUrl.length - 1] == 96 || imageUrl[imageUrl.length - 1] == 132)) {
      imageUrl[imageUrl.length - 1] = 0;
    }

    imageUrl = imageUrl.join('/');   //重新拼接为字符串

    console.log('高清的头像', imageUrl);
    return imageUrl;
  },
  /**
 * 用户点击右上角分享
 */
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      console.log(res.target, res)
    }
    return {
      title: '快来和我一起关注考研吧',
      path: 'pages/person/person-menu',
      // imageUrl: '../../images/chat.png'
    }
  },

  // 代办
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
  tobaoBei:function(e){
    wx.navigateTo({
      url: '/pages/person/baobei/index',
    })

  },
  toMyPost: function (e) {
    wx.navigateTo({
      url: '/pages/person/post/index',
    })

  },
  toMyErShou: function (e) {
    wx.navigateTo({
      url: '/pages/person/ershou/index',
    })

  },
  // 获取会员码
  memberCode:function(e){
    
  },
  bindGetUserInfo: function (e) {

    var that = this
    _getUserInfo();
    function _getUserInfo() {
      wx.getUserInfo({
        success: function (res) {
          that.setData({
            userInfo: res.userInfo
          })
        }
      })
    }


    console.log(e.detail.userInfo);
    this.setData({
      hidden: 1
    })
  },



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   
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

    // 从缓存中取数据
    let that = this;
    wx.getStorage({
      key: 'userInfo',
      success(res) {
        console.log("userInfo: " + res.data)
        app.globalData.userInfo = res.data;
      }
    })

    // 登录  --从自己的服务器中 -获取openid
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        var Params = {
          code: res.code, //临时登录凭证

        };
        console.log("code " + res.code);
        wx.request({
          url: 'https://43.97.93.214', //此处填写第三方的接口地址
          data: Params,
          header: {
            'content-type': 'application/json'
          },
          method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
          success: function (res) {
            console.log(res);
            var openid = res.data.RntData.openid //返回openid
            app.globalData.openid = openid;
            console.log(openid);
          }
        })
      }
    })
    // 查看是否授权
    wx.getSetting({
      success: function (res) {
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: function (res) {
              console.log(res.userInfo)
            }
          })
        }
      }
    })

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