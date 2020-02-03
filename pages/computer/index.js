// pages/computer/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    
    bankname:null,
    accountname: null,
    account: null,
    // 存入网点
    cun: null,
    // 支付网点
    zhi: null,

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that=this;
    const eventChannel = this.getOpenerEventChannel()
    eventChannel.emit('acceptDataFromOpenedPage', { data: 'cpt_result' });
    eventChannel.emit('someEvent', { data: 'cpt_result2' });
    // 监听acceptDataFromOpenerPage事件，获取上一页面通过eventChannel传送到当前页面的数据
    eventChannel.on('data', function (data) {

      let temdata =data.data;
      // console.log("dfgd"+temdata);
      that.setData({
        bankname: temdata.jg_bank,
        account: temdata.jg_account,
        accountname:temdata.jg_name,
        // 存入网点
        cun: temdata.jg_cun,
        // 支付网点
        zhi: temdata.jg_zhi,
      })

      // console.log("1111"+that.data.account);
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