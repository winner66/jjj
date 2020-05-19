// pages/build/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // createtime:"2019-",
    // sum:0,
    // index:0,
    time: null,
    build: null,
    buildId: null,
    cover: null,
    con: null,
    title: null,

  },

  /**
   * 生命周期函数--监听页面加载
   */
  // 建设进度列表 传item 2-》houseId
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

    let that = this;
    const eventChannel = this.getOpenerEventChannel()
    eventChannel.emit('acceptDataFromOpenedPage', { data: 'cpt_result' });
    eventChannel.emit('someEvent', { data: 'cpt_result2' });
    // 监听acceptDataFromOpenerPage事件，获取上一页面通过eventChannel传送到当前页面的数据
    eventChannel.on('data', function (data) {
      let temdata = data.data;
      console.log(data.data);
      that.setData({
        time: temdata.createtime,
        build: temdata.build_title,
        buildId: temdata.build_id,
        cover: temdata.cover,
        con: temdata.content,
        title: temdata.title,
      })
      console.log(that.data.title);
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