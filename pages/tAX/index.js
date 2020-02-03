// pages/tAX/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 当前计算类型-住宅。。。标签
    currentTab: 0,
    // 宽高
    winWidth: 0,
    winHeight: 0,
    
    houseName:null,
    // 楼层
    houseStorey:null,
    houseStoreyCount:null,
    area:null,
    price:null,
    // 中介费
    mediums: [{ id: 0, name: "买房2%卖方1%" }, { id: 1, name: "买房2%卖方0%" },{ id: 2, name: "买房1%卖方1%" }, { id: 3, name: "自定义" }],
    loanserver: [{ id: 0, name: "贷款服务费2%" }, {id: 1, name: "自定义"}],
    loanserverIndex:0,
    // 自定义贷款服务  
    loanServer:0,
    mediumIndex:0,
    // 中介方案 -卖方 买方
    buymediums:null,
    sellmediums:null,
    // 贷款
    loanmoney:null,
    // 123456789
    years:[1,2,3,4,5,6],
    // 卖方产权年限
    yearIndex:5,
    
    // 卖方
    isorNo:["是","否"],
    houseOnlyIndex:1,
    // 买房家庭住宅数
    buyerHouseCount:1,
    // 赠送
    giveIndex:1,
    // 继承
    heritIndex:1,
    // cQ拆迁
    cQIndex:1,
    // 土地性质
    lands: [{ id: 0, name: "出让" }, { id: 1, name: "划拨" },{ id: 2, name: "划拨(房改)" }],
    landIndex:0,
    cQprice:1,
 
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
  // 总楼层
  houseStoreyCountChange:function(e){
    console.log('houseStoreyCount:', e.detail.value);
    var page = this;
    this.setData({
      houseStoreyCount: e.detail.value
    })
    console.log(page.data.houseStoreyCount);
  },
  // 所处楼层
  houseStoreyChange: function (e) {
    console.log('houseStorey:', e.detail.value);
    var page = this;
    this.setData({
      houseStorey: e.detail.value
    })
    console.log(page.data.houseStorey);
  },
  // 楼盘名称
  houseNameChange: function (e) {
    console.log('houseName:', e.detail.value);
    var page = this;
    this.setData({
      houseName: e.detail.value
    })
    console.log(page.data.houseName);
  },
  // 建筑面积
  areaChange: function (e) {
    console.log('area:', e.detail.value);
    var page = this;
    this.setData({
      area: e.detail.value
    })
    console.log(page.data.area);
  },
  // 价格
  priceChange: function (e) {
    console.log('priceChange:', e.detail.value);
    var page = this;
    this.setData({
      price: e.detail.value
    })
    console.log(page.data.price);
  },
  // 中介费方案
  mediumsPickerChange: function (e) {
    console.log('mediums:', e.detail.value);
    var page = this;
    this.setData({
      mediumIndex: e.detail.value
    })
    console.log(page.data.mediumIndex);
  },
  // 
  sellChange: function (e) {
    console.log('loanServer:', e.detail.value);
    var page = this;
    this.setData({
      sellmediums: e.detail.value
    })
    console.log(page.data.sellmediums);
  },
  // buymediums
  buyerChange:function (e) {
    console.log('loanServer:', e.detail.value);
    var page = this;
    this.setData({
      buymediums: e.detail.value
    })
    console.log(page.data.buymediums);
  },
  // 贷款服务费
  loanServerPickerChange: function (e) {
    console.log('loanServer:', e.detail.value);
    var page = this;
    this.setData({
      loanserverIndex: e.detail.value
    })
    console.log(page.data.loanServerIndex);
  },
  // 
  loanServerChange: function (e) {
    console.log('loanServer:', e.detail.value);
    var page = this;
    this.setData({
      loanServer: e.detail.value
    })
  },
  // 贷款金额
  loanmoneyChange: function (e) {
    console.log('loanmoney:', e.detail.value);
    var page = this;
    this.setData({
      loanmoney: e.detail.value
    })
    console.log(page.data.loanmoney);
  },
  // 土地性质
  landChange: function (e) {
    console.log('land:', e.detail.value);
    var page = this;
    this.setData({
      landIndex: e.detail.value
    })
    console.log(page.data.landIndex);
  },
  cQChange: function (e) {
    console.log('cq:', e.detail.value);
    var page = this;
    this.setData({
      cQIndex: e.detail.value
    })
    console.log(page.data.cQIndex);
  },
  
  // 卖方年限
  yearChange: function (e) {
    console.log('year:', e.detail.value);
    var page = this;
    this.setData({
      yearIndex: e.detail.value
    })
    console.log(page.data.yearIndex);
  },
  // 是否是卖方家庭的唯一住房
  houseOnlyChange:  function (e) {
    console.log('houseOnly:', e.detail.value);
      var page = this;
      this.setData({
        houseOnlyIndex: e.detail.value
      })
    console.log(page.data.houseOnlyIndex);
    },

  // 买房家庭住宅数
  houseCountChange: function(e) {
    console.log('buyerHouseCount:', e.detail.value);
    var page = this;
    this.setData({
      buyerHouseCount: e.detail.value
    })
    console.log(page.data.buyerHouseCount);
  },
  // 继承
  heritChange: function (e) {
    console.log('herit:', e.detail.value);
    var page = this;
    this.setData({
      heritIndex: e.detail.value
    })
    console.log(page.data.heritIndex);
  },
  // 赠送
    giveChange: function(e) {
      console.log('give:', e.detail.value);
      var page = this;
      this.setData({
        giveIndex: e.detail.value
      })
      console.log(page.data.giveIndex);
    },
    // 拆迁金额
  cQpriceChange: function (e) {
    console.log('拆迁:', e.detail.value);
    var page = this;
    this.setData({
      cQprice: e.detail.value
    })
    console.log(page.data.cQprice);
  },
  cQChange:function(e){
    console.log('cq:', e.detail.value);
    var page = this;
    this.setData({
      cQIndex: e.detail.value
    })
    console.log(page.data.cQIndex);
  },
  //计算  submit form
  taxFormSubmit: function (e) {
    // if(){};
    let that = this;
    wx.navigateTo({
      url: '/pages/cpt-comm-result/cpt-comm-result?tag=1',
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
        var commData = {
        }
        res.eventChannel.emit('data', { data: commData })
        //税       
        res.eventChannel.emit('tab', { tab: 1 })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var page = this;

    wx.getSystemInfo({

      success: function (systemInfo) {

        console.log(systemInfo);
        // px转换到rpx的比例
        let pxToRpxScale = 750 / systemInfo.windowWidth;
        // 状态栏的高度
        let ktxStatusHeight = systemInfo.statusBarHeight * pxToRpxScale
        // 导航栏的高度
        let navigationHeight = 44 * pxToRpxScale
        // window的高度
        let ktxWindowHeight = systemInfo.windowHeight * pxToRpxScale
        // window的宽度
        let ktxWindowWidth = systemInfo.windowWidth * pxToRpxScale
        // 屏幕的高度
        let ktxScreentHeight = systemInfo.screenHeight * pxToRpxScale
        // 底部tabBar的高度
        let tabBarHeight = ktxScreentHeight - ktxStatusHeight - navigationHeight - ktxWindowHeight


        page.setData({ winWidth: systemInfo.windowWidth });
        page.setData({ winHeight: ktxWindowHeight });
      }
    })

    console.log("h:" + this.data.winHeight + "w:" + this.data.winWidth)
  },
  formSubmit: function(e) {
    // if(){};
    console.log(e.detail.value);
    let { area ,   cQ  ,  cQprice,    give,    herit,    houseStorey,    houseStoreyCount,    loanMoney,    mediumMedthods,    minprice,    name,    price } = e.detail.value;
    if (name=="") {
      wx.wx.showModal({
        title: '请填写物业名称',
        confirmText: '确定',
        cancelText: '取消',
      }) 
    }  
      
     else if (!cQprice) {
      wx.wx.showModal({
        title: '请填写物业名称',
        confirmText: '确定',
        cancelText: '取消',
      } )

     } else if (!loanMoney) {
       wx.wx.showModal({
         title: '请填写贷款金额',
         confirmText: '确定',
         cancelText: '取消',
       })
     } else if (!mediumMedthods) { 
       wx.wx.showModal({
         title: '请填写中介费方案',
         confirmText: '确定',
         cancelText: '取消',
       })
    } else if (!area){
      wx.wx.showModal({
        title: '请填写建筑面积',
        confirmText: '确定',
        cancelText: '取消',
      } )
    }else{
      let that = this;
      wx.navigateTo({
        url: '/pages/cpt-comm-result/cpt-comm-result?tag=4',
        events: {
          // 为指定事件添加一个监听器，获取被打开页面传送到当前页面的数据
          acceptDataFromOpenedPage: function (data) {
            console.log(data)
          },
          someEvent: function (data) {
            console.log(data)
          }

        },
        success: function (res) {          // // 通过eventChannel向被打开页面传送数据
          // var commData = {

          // }
          res.eventChannel.emit('data', { data: e.detail.value })
          //税       
          res.eventChannel.emit('tab', { tab: 4 })
        }
      })
    }
   
  },
  // swip-view函数
  upper(e) {
    console.log(e)
  },

  lower(e) {
    console.log(e)
  },

  scroll(e) {
    console.log(e)
  },

  scrollToTop() {
    this.setAction({
      scrollTop: 0
    })
  },

  tap() {
    for (let i = 0; i < order.length; ++i) {
      if (order[i] === this.data.toView) {
        this.setData({
          toView: order[i + 1],
          scrollTop: (i + 1) * 200
        })
        break
      }
    }
  },

  tapMove() {
    this.setData({
      scrollTop: this.data.scrollTop + 10
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
    if (res.from === 'button') { }
    return {
      title: '经纪人之家（南充）',
      path: "pages/tAX/index",
      success: function (res) { }
    }
  }
  
})