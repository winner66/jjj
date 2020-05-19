import regeneratorRuntime from '../../utils/runtime';
import apis from '../../utils/apis';
import tip from '../../utils/tip';
var base64 = require('../../utils/base.js');// pages/learn/index.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    time:2019,
    // 楼盘名
    house:null,
    cover:"",
    con:null,
    title:null,
    video:null,

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
    this.videoContext = wx.createVideoContext('myVideo')
  },
  bindPlayVideo() {
    console.log('1')
    this.videoContext.play()
  },
  bindSendDanmu() {
    this.videoContext.sendDanmu({
      text: this.inputValue,
      color: getRandomColor()
    })
  },

  videoErrorCallback(e) {
    console.log('视频错误信息:')
    console.log(e.detail.errMsg)
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

    // console.log("result:tag ->" + option.tag)
    let that = this;
    const eventChannel = this.getOpenerEventChannel()
    eventChannel.emit('acceptDataFromOpenedPage', { data: 'cpt_result' });
    eventChannel.emit('someEvent', { data: 'cpt_result2' });
    // 监听acceptDataFromOpenerPage事件，获取上一页面通过eventChannel传送到当前页面的数据
    eventChannel.on('data', function (data) {

      let temdata = data.data;
      console.log(data.data);
      var tem = "";
      if (data.data.video) {
        tem = apis.videoPath + data.data.video;
      }

      that.setData({
        time: temdata.createtime,
        house: temdata.id,
        cover: temdata.cover,
        con: temdata.content,
        title: temdata.title,
        video: tem,
      })
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