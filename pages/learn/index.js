// pages/learn/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    time:2019,
    house:null,
    cover:"",
    con:null,
    title:null,

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
  
    // console.log("result:tag ->" + option.tag)
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
        house: temdata.id,
        cover: temdata.cover,
        con: temdata.content,
        title: temdata.title,

      })
      console.log(that.data.title);
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