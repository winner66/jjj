// pages/ptax/index.js
import regeneratorRuntime from '../../utils/runtime';
import api from '../../utils/api';
import apis from '../../utils/apis';
// import tip from '../../utils/tip';
var base64 = require('../../utils/base.js');
// var base64 = require('../../utils/base_64.js');

var path = 'http://49.234.199.223:9090';
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inputShowed: false,
    searchKeyword: '', //需要搜索的字符 
    // isFromSearch: true, // 用于判断searchList数组是不是空数组，默认true，空的数组  
    searchPageNum: 1, // 设置加载的第几次，默认是第一次  
    callbackcount: 10, //返回数据的个数  
    isFromSearch: true, // 用于判断searchList数组是不是空数组，默认true，空的数组  
    searchLoading: false, //"上拉加载"的变量，默认false，隐藏  
    searchLoadingComplete: false, //“没有数据”的变量，默认false，隐藏  
    // 搜索列表
    searchList: [{}]
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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