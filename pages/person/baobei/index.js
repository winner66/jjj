// pages/person/baobei/index.js
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
    // 弹窗
    isTipTrue: true,
    // 楼盘名
    houseName:null,
    // 楼盘id,
    rbuild_id:null,
    // 客户名
    clientName:null,
    clientphone:null,
    // 报备人
    rpName:null,
    rpPhone:null,
    //当前用户id
    rp_id:null,
    // 服务人员  ？
    manger_id:null,
    manger_name:null,

    // 预计看房时间
    date:null,
    // 看房人数
    pnum:2,
    // 带看方式
    lookIndex:0,
    looks: [{ id: 0, name: "带看"},{id:1,name:"自行前往"}],
    // 报备状态
    state:null,

  },
  // 点击弹窗之后- 隐藏
  tipAgree: function () {
    this.setData({
      isTipTrue: false
    })
  },
  clientphoneChange: function (e) {
    this.setData({
      clientphone: e.detail.value 
    })
  },
 
  rpNameChange: function (e) {
    this.setData({
      rpName: e.detail.value 
    })
  },
  houseNameChange: function (e) {
    this.setData({
      houseName: e.detail.value 
    })
  },
  clientNameChange: function (e) {
    this.setData({
      clientName: e.detail.value 
    })
  },
  rpPhoneChange: function (e) {
    this.setData({
      rpPhone: e.detail.value
    })
  },
  bindDateChange: function (e) {
    this.setData({
      date: e.detail.value
    })
  },
  pnumChange: function (e) {
    this.setData({
      pnum: e.detail.value
    })
  },
  lookPickerChange: function (e) {
    this.setData({
      lookIndex: e.detail.value
    })
  },
  /**
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   
  },

  toBaoBei: async function () {
    // console.log(data+JSON.stringify(data))
    let that = this;
    if(!that.data.houseName){
      wx.showModal({
        title: '请填写楼盘名',
        confirmText: '确定',
        cancelText: '取消',
      })
    } else if (!that.data.clientName) {
      wx.showModal({
        title: '请填写客户姓名',
        confirmText: '确定',
        cancelText: '取消',
      })
    } else if (!that.data.clientphone) {
      wx.showModal({
        title: '请填写客户电话号码',
        confirmText: '确定',
        cancelText: '取消',
      })
    } else if (!that.data.rpName) {
      wx.showModal({
        title: '请填写报备人姓名',
        confirmText: '确定',
        cancelText: '取消',
      })
    } else if (!that.data.rpPhone) {
      wx.showModal({
        title: '请填写报备人联系方式',
        confirmText: '确定',
        cancelText: '取消',
      })
    } else if (!that.data.date) {
      wx.showModal({
        title: '请填写看房时间',
        confirmText: '确定',
        cancelText: '取消',
      })
    } else if (!that.data.pnum) {
      wx.showModal({
        title: '请填写看房人数',
        confirmText: '确定',
        cancelText: '取消',
      })
    }else{
      var data={
        // 楼盘id,
        rbuild_id: 0,
        r_build: that.data.houseName,
        // 客户名
        root_name: that.data.clientName,
        root_phone: that.data.clientphone,
        // 报备人
        rp_name: that.data.rpName,
        rp_phone: that.data.rpPhone,
        //当前用户id
        rp_id: that.data.rp_id,


        // 预计看房时间
        time: that.data.date,
        // 看房人数
        num: that.data.pnum,
        // 带看方式
        look: that.data.lookIndex,
      };
      const json = await apis.getReport({
        data: data
      })
      if (json == '') {
        console.log("没有获取到json数据")
      } else {
        // 返回 1 成功
        console.log(json);
        if(json=="1"){
          wx.showToast({
            title: '推荐成功', 
            duration:2000,       
          })
        }else{
          wx.showToast({
            title: '推荐失败',
            duration: 2000,
          })
        }
       
      }
    }
  },
  //  submit form
  commFormSubmit: function (e) {
    console.log(e.detail.value);   
    
    this.toBaoBei();
    // 应该返回 -报备号
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
    // 弹窗
    // var that = this, time = e.formatTime(new Date());
    // console.log("合作 时间是：", time)
    let that = this;
    that.setData({
      isTipTrue: true
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