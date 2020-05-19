// pages/person/post/index.js
import apis from '../../../utils/apis.js';
import regeneratorRuntime from '../../../utils/runtime.js';
var base64 = require('../../../utils/base.js');
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    feed: [],
    feed_length: 0,
    list: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   
  },
  // 获取自己的二手帖子
  getMyErShouJson: async function () {
    var that = this;
    // id?
    var id = app.globalData.userInfo.id;
    const json = await apis.getErShou({
      data: {
        id: id
      }
    });
    console.log(json);
    if (json == '') {
      console.log("没有获取到数据")
    } else {
      var tem = json;
      console.log(json);

      var temp = json;

      for (var i = 0; i < json.length; i++) {
        var tempimg = apis.imgCoverPath + json[i].img;
        console.log(tempimg);
        temp[i].img = tempimg;
      }
      that.setData({
        feed: temp,
      })
      console.log(temp);
    }
  },
  bindItemTap: function (event) {
    // console.log(event);
    let str = event.currentTarget.dataset.item;
    wx.navigateTo({
      url: '../../assistant/posts/index',
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
        res.eventChannel.emit('data', { data: str })
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

    this.getMyErShouJson();

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