// pages/house/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    local:"",
    //建筑面积
    buildArea:"",
    // 分摊面积
    landArea:"",
    // 装修情况
    fit:"",
    // 电梯
    ele:"",
    // 建筑性质
    build:"",
    // 土地性质
    land:"",
    // 房屋来源
    houseOrig:"",
    // 建成年代
    houseTime:"",
    // 产权时间
    time:"",
    // 是否满五唯一
    onlyHouse:"",
    // 预计成交价
    tradePrice:"",
    // 付款方式
    payMethods:"",
    // 贷款评估单价
    estimatePerPrice:"",
    //  贷款评估总价
    estimatePrice:"",
// 首付款额预估
    firstPayPrice:"",
// 贷款额预估
    loanPrice:"",
    // 预计税
    tax:"",
    // 预计土地出让金
    landTax:"",
    // 中介服务费用预估
    midServerEstimate:"",
// 首付预备合计预估
    firstSumEstimate:"",
    // 贷款年限
    loanTime:"",
    // 还款方式
    methods:"",
    // 预计月供
    monthPay:"",
    // 经纪人姓名
    name:"",
    phone:"",
    // 预计时间
    createTime:"",

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
// 
    console.log("置业计算：result:tag ->" + options.tag)
    let that = this;
    const eventChannel = this.getOpenerEventChannel()
    // eventChannel.emit('acceptDataFromOpenedPage', { data: 'cpt_result' });
    // eventChannel.emit('someEvent', { data: 'cpt_result2' });
    // // 监听acceptDataFromOpenerPage事件，获取上一页面通过eventChannel传送到当前页面的数据
 
    if (options.tag==0)
    {
     

    } else if (options.tag == 1){
      // 税费计算-- 住宅
      eventChannel.on('data', function (data) {
        console.log(data.data);
        that.setData({
          local: data.data.local,
          buildArea: data.data.buildArea,
          // 土地性质
          land: data.data.land,
          // 产权时间
          time: data.data.time,
          // 是否满五唯一
          onlyHouse: data.data.onlyHouse,
          // 预计成交价
          tradePrice: data.data.tradePrice,
          // 贷款评估单价
          estimatePerPrice: data.data.estimatePerPrice,

          // 贷款额预估
          loanPrice: data.data.loanPrice,
          // 预计税
          tax: data.data.tax,
          // 预计土地出让金
          landTax: data.data.landTax,
          // 中介服务费用预估
          midServerEstimate: data.data.midServerEstimate,
        })
        console.log("------");
      })

    } else if (options.tag == 2) {
//  ////商业贷
      eventChannel.on('data', function (data) {
        console.log(data.data);
        that.setData({
          buildArea: data.data.buildArea,
        // 贷款评估单价
          estimatePerPrice: data.data.estimatePerPrice,
          //  贷款评估总价
          estimatePrice: data.data.estimatePrice,
            // 首付款额预估
          firstPayPrice: data.data.firstPayPrice,
              // 贷款额预估
          loanPrice: data.data.loanPrice,
                // 贷款年限
          loanTime: data.data.loanTime,
                  // 还款方式
          methods: data.data.method,
                    // 预计月供
          monthPay: data.data.monthPay,

        })
      })

    } else if (options.tag == 3){
      // 税费计算--非住宅
      eventChannel.on('data', function (data) {
        console.log(data.data);
        that.setData({
          local: data.data.local,
          buildArea: data.data.buildArea,
          // 土地性质
          land: data.data.land,
          // 产权时间
          time: data.data.time,
          // 是否满五唯一
          onlyHouse: data.data.onlyHouse,
          // 预计成交价
          tradePrice: data.data.tradePrice,
          // 贷款评估单价
          estimatePerPrice: data.data.estimatePerPrice,

          // 贷款额预估
          loanPrice: data.data.loanPrice,
          // 预计税
          tax: data.data.tax,
          // 预计土地出让金
          landTax: data.data.landTax,
          // 中介服务费用预估
          midServerEstimate: data.data.midServerEstimate,
        })
        console.log("------");
      })
    }else{

    }  
  },
  formSubmit: function (e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
  },
  formReset: function () {
    console.log('form发生了reset事件')
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