// pages/person/agent/index.js
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
    name:null,
    phone:null,
    // 楼盘名
    housename:null,

    methods: [{
      id: 0,
      name: '商贷'
    }, {
      id: 1,
        name: '公积金'},
      {
        id: 2,
        name: '全款'
      }],
    methodsindex:0,
    mortgages: [{
      id: 0,
      name: '按揭'
    }, {
      id: 1,
      name: '非按揭'
    },{
      id:2,
      name:'无'

    }],
    mortgagesindex:0,
    houses:[],
    index:0,

  },
  getLouPan: async function (data) {
    // console.log(data+JSON.stringify(data))
    let that=this;
    const json = await apis.getLouPan({
      data: data
    })
    if (json == '') {
      console.log("没有获取到json数据")
    } else {
      console.log(json);
      let houses=that.data.houses;
      for(var i in json){
        var item={}
        item.name=json[i].title;
        item.id=json[i].build_id;
        houses.push(item);
      }
      console.log(JSON.stringify(houses));
      that.setData({
        houses:houses
      })
      console.log(JSON.stringify(that.data.houses));
    }
  },
  getApplyAgent:async function(data){
    // console.log(data+JSON.stringify(data))
    data.loupan=this.data.houses[this.data.index].id
    const json=await apis.apply({
      data:data
    })
    if(json==''){
      console.log("没有获取到json数据")
    }else{
      console.log(json);
      if(json==1){
        wx.showToast({
          title: '申请成功',
          icon: 'success',
          duration: 2000
        })        
      }else if(json== -1){
        wx.showToast({
          title: '申请失败',
          icon: 'fail',
          duration: 2000
        })  
      }else{

      }
    }


  },
  //  reset form
  commFormReset: function (e) {
  },
  //  submit form
  commFormSubmit: function (e) {
    console.log(e.detail.value);
    // user_id
    // 
    let data=e.detail.value;
    let json=wx.getStorageSync('user_info');
    json=JSON.parse(json)
    // 获取id
    var user_id=json.user_id;

    data['user_id']='1'
    this.getApplyAgent(data);
  },
  nameChanget: function (e) {
    this.setData({
      name: e.detail.value
    })
    console.log('name', this.data.name)
  },
  phoneChanget: function (e) {
    this.setData({
      phone: e.detail.value
    })
    console.log('phone:', this.data.phone)
  },
  houseChange: function (e) {
    this.setData({
      housename: this.data.houses[e.detail.value],
      index: e.detail.value
    })
    console.log('housename', e.detail.value)
  },
  // 付款方式
  methodsPickerChange: function (e) {
    this.setData({
      methodsindex: e.detail.value
    })
    console.log('housename', this.data.methodsindex)
  },
  // 是否有抵押
  mortgagesPickerChange: function (e) {
    this.setData({
      mortgagesindex: e.detail.value
    })
    console.log('mortgagesindex:', this.data.mortgagesindex)
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (e) {
   

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
    this.getLouPan();
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