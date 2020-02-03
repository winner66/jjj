// pages/person/register/index.js
import regeneratorRuntime from '../../../utils/runtime';
import api from '../../../utils/api';
import apis from '../../../utils/apis';


var base64 = require('../../../utils/base.js');
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 当前标签  登录/注册
    currentTab: 1,
    // 宽高
    winWidth: 0,
    winHeight: 0,
    // 公司or个人
    registerFlag: 2,
    companyName: null,
    name: null,
    passwd: null,
    phone: null,
    code: null,
    passwdF: false,
  },
  currentChange: function (e) {
    console.log(e)
    this.setData({
      currentTab: e.detail.current
    })
    // console.log('this:', this.data)
    console.log('currentTab:', this.data.currentTab)

  },
  companyNameInput: function(e) {
    this.setData({
      companyName: e.detail.value

    });
    console.log("name:" + this.data.companyName);
  },
  nameInput: function(e) {
    this.setData({
      name: e.detail.value

    });
    console.log("name:" + this.data.name);
  },

  passwdInput: function(e) {
    this.setData({
      passwd: e.detail.value
    });
    console.log("passwd:" + this.data.passwd);
  },
  qrpasswdInput: function(e) {
    let that = this;
    if (e.detail.value != that.data.passwd) {
      this.setData({
        passwdF: true
      });
    } else {
      this.setData({
        passwdF: false
      });

    }
    console.log("passwdF:" + this.data.passwdF);
  },
  phoneInput: function(e) {
    this.setData({
      phone: e.detail.value
    });
    console.log("phone:" + this.data.phone);
  },

  codeInput: function(e) {
    this.setData({
      code: e.detail.value
    });
    console.log("code:" + this.data.code);
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

    this.setData({
      winWidth: app.globalData.winWidth,
      winHeight: app.globalData.winHeight,
    });
    console.log("h:" + this.data.winHeight + " w:" + this.data.winWidth);
  },
  // 导航
  switchNav: function(e) {
    var page = this;
    if (this.data.currentTab == e.target.dataset.current) {
      return false;
    } else {
      page.setData({
        currentTab: e.target.dataset.current
      });
    }
    console.log(page.data.currentTab)
  },
  // 登录
  formSubmit1: function(e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.value)

    let jsonData = JSON.stringify(e.detail.value)
    // wx.setStorage({
    //   key: 'userInfo',
    //   data: 'jsonData',
    // })
    this.login(e.detail.value);   
  
  
  },
  formReset1: function() {
 
    console.log("form:" + JSON.stringify(e.detail.value));
    this.login(e.detail.value);   
    
  },
  // 注册
  formSubmit2: function(e) {
    // console.log('form发生了submit事件，携带数据为：', e.detail.value)
    // e.detail.value
    // 
    // let that=this;
    // let data={
    //   registerFlag: that.data.registerFlag,
    //   companyName: that.data.companyName,
    //   name: that.data.name,
    //   passwd: that.data.passwd,
    //   phone: that.data.phone,
    //   code: that.data.code,
    // };
    console.log("form:" + JSON.stringify(e.detail.value));
    this.registe(e.detail.value);    
   

  },
  login: async function (data) {
    console.log("registe:" + JSON.stringify(data))
    const json = await apis.login({
      data: data
    })
    console.log(json);
    if (json == '') {
      console.log('没有获取json')
    } else if (json == '-1') {
      console.log('登录失败')
      wx.showToast({
        title: '登录失败',
        icon: 'fail',
        duration: 2000
      })

    } else {
      console.log('登录成功')
      wx.showToast({
        title: '登录成功',
        icon: 'success',
        duration: 2000
      })
      let jsonData = JSON.stringify(json)
    
      try {
        wx.setStorageSync('userInfo', jsonData)
      } catch (e) { }
    }

    
  },
  registe:async function(data){
    console.log("registe:" + JSON.stringify(data))
    const json=await apis.registe({
      data:data
    })
    console.log(json);
    if(json==''){
      console.log('没有获取json')
    }else if(json=='-1'){
      console.log('注册失败')
      wx.showToast({
        title: '注册失败',
        icon: 'fail',
        duration: 2000
      })  
      
    }else{
      console.log('注册成功')
      wx.showToast({
        title: '注册成功',
        icon: 'success',
        duration: 2000
      })
      //将数据存储在本地缓存中指定的 key 中。会覆盖掉原来该 key 对应的内容。除非用户主动删除或因存储空间原因被系统清理，否则数据都一直可用。单个 key 允许存储的最大数据长度为 1MB，所有数据存储上限为 10MB。数据超过10M 会自动清理
      // data只支持原生类型、Date、及能够通过JSON.stringify序列化的对象
      let jsonData=JSON.stringify(json)
      // wx.setStorage({
      //   key: 'userInfo',
      //   data: 'jsonData',
      // })
      try {
        wx.setStorageSync('userInfo', jsonData)
      } catch (e) { }
    }
  },
  formReset2: function() {
    console.log('form发生了reset事件')
  },

  // 
  // 注册-公司or个人
  cpt_radioChange_1: function(e) {
    console.log('radio1:', e.detail.value);
    var page = this;
    this.setData({
      registerFlag: e.detail.value
    })
    console.log(page.data.registerFlag);

  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },
  /**
   * 用户点击右上角分享
   */
  //转发
  onShareAppMessage: function() {
    // let users = wx.getStorageSync('user');
    if (res.from === 'button') {}
    return {
      title: '经纪人之家（南充）',
      path: "pages/person/loginOrReg/index",
      success: function(res) {}
    }
  }

})