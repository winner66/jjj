// pages/housecpt/cpt.js
import commFormSubmit from '../../service/cpt.js'
import { loanrates, loanrate, gloanrates, gloanrate } from '../../assets/comm/rate.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 当前计算类型-商业贷 税贷。。。标签
    currentTab: 0,
    // 宽高
    winWidth: 0,
    winHeight: 0

  },
  // 贷款导航
  switchNav: function (e) {
    var page = this;
    if (this.data.currentTab == e.target.dataset.current) {
      return false;
    } else {
      page.setData({ currentTab: e.target.dataset.current });
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var page = this;

    wx.getSystemInfo({

      success: function (res) {

        console.log(res);

        page.setData({ winWidth: res.windowWidth });
        page.setData({ winHeight: res.windowHeight });
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