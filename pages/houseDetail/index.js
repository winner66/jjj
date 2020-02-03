// pages/houseDetail/index.js
const app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    winWidth: null,
    winHeight: null,
    // 富文本
    html: null,
    // 当前楼盘图片
    current_img: null,
    img_urls: ["../../assets/images/tarbar_cpt/h2.jpg", "../../assets/images/tarbar_cpt/h2.jpg", "../../assets/images/tarbar_cpt/h3.jpg"],
    address:null,
    lat:null,
    lng: null,
    sell: null,
    province_id: null,
    city_id: null,
    area_id: null,
    cover: null,
    sell_id: null,
    title: null,
    createtime:null,
    build_id:null,

    autoplay: true,
    // 自动切换时间间隔
    interval: 5000,
    // 滑动动画时长
    duration: 500,
    // 是否显示面板指示点
    indicatorDots: true,
    // image组件默认宽度300px、高度225px
    

  },
  swiperchange: function (e) {
    console.log(e)
    console.log(e.detail.currentItemId)
  },
  // getHouseJson: async function (id) {
  //   let that = this;
  //   const json = await apis.buildPage({
  //     data: {
  //       limit: that.data.pageLimit,
  //       page: that.data.page,
  //     }
  //   });
  // },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    that.setData({
      winWidth: app.globalData.winWidth,
      winHeight: app.globalData.winHeight,

    })

    // // 两个来源 tag 1 ->地图  2->列表   新盘数据
    //   渠道 新盘活动 houseId 
    const eventChannel = this.getOpenerEventChannel()
    eventChannel.emit('acceptDataFromOpenedPage', { data: 'cpt_result' });
    eventChannel.emit('someEvent', { data: 'cpt_result2' });
    // 监听acceptDataFromOpenerPage事件，获取上一页面通过eventChannel传送到当前页面的数据
    eventChannel.on('data', function (data) {
      let temdata = data.data;
      console.log(temdata)
      that.setData({        
           // 富文本
        html: temdata.content,
        // 当前楼盘图片
        current_img: temdata.build_img,        
        address: temdata.address,      
        sell: temdata.sell,
        // 富文本
        html: temdata.content,
        img_urls: temdata.imgs,
        lat: temdata.lat,
        lng: temdata.lng,
        province_id: temdata.province_id,
        city_id: temdata.city_id,
        area_id: temdata.area_id,
        cover: temdata.cover,

        sell_id: temdata.is_sell,

        title: temdata.title,
        createtime: temdata.createtime,
        build_id: temdata.build_id,
      })
      console.log(that.data.title);
    })  
  },
  // 跳转建设进度
  build: function () {
    let that=this;
    wx.navigateTo({
      url: '/pages/build/list/index?houseId='+that.data.houseId,
    })

  },
  // 跳转楼盘活动
  activi: function () {
    let that = this;
    wx.navigateTo({
      url: '/pages/houseActive/list/index?houseId=' + that.data.houseId,
    })
  },
  qudao: function() {
    let that = this;
    wx.navigateTo({
      url: '/pages/qudao/list/index?houseId=' + that.data.houseId,
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