// pages/index.js
import regeneratorRuntime from '../utils/runtime';
import api from '../utils/api';
import apis from '../utils/apis';


var base64 = require('../utils/base.js');
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  test1:async function(){
    console.log("1:2131");
    const json = await apis.rulerPage({
      data: {
        limit:2,
        page:1
        }
    });

    console.log(json);

  },
  test2: async function () {
    console.log("2: 2131");
    const json = await apis.test2({
      data: {
        type: 1
      }
    });
    console.log(json);

  },
  test3: async function () {
    console.log("3: 2131");
    const json = await apis.test3({
      data: {
        type: 1
      }
    });
    console.log(json);
  },
  test4: async function () {
    console.log("4: 2131");
    const json = await apis.test4({
      data: {
        type: 1
      }
    });
    console.log(json);
  },

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
    this.test1(); // array()
    // this.test2();  //no
    // this.test3(); //  yse

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