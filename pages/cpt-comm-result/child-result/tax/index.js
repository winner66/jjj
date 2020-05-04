// pages/cpt-comm-result/child-result/tax/index.js
// 计算税费的函数
var cptTax = require('./cpt.js')
var app=getApp();
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    info: {
      type: Object,
      value: {}
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    personTax:null,
    // 印花-买方
    creditBuyMoney:null,
     // 印花-卖方
    creditSellMoney:null,
    // 契税
    deedTax: null,
    // 增值税计附加
    addMoney: null,
    // 土地出让金
    landMoney: null,
    // 继承税
    heritMoney: null,
    // 赠予税
    giveMoney: null,
    // 印花税
    creditMoney: null,
    // 工本费
    usbkeyMoney: null,
    // 中介费
    mediumMoney: null,
    // 中介费 买方
    buyerMoney: null,
    // 中介费 卖方
    sellerMoney: null,
    // 贷款服务费
    loanService: null,
    // 税费合计
    sumTax: null,

  },
  /**
   * 组件的方法列表
   */
  methods: {
    // 生成置业计算单
    toHouse: function () {
      // 判断是否是会员
      // if (app.globalData.user_token == null || app.globalData.user_token == '') {
      //   wx.showToast({
      //     title: "请注册会员",
      //     duration: 3000, //提示的延迟时间，单位毫秒，默认：1500 
      //     mask: false, //是否显示透明蒙层，防止触摸穿透，默认：false       

      //   })
      // } else {}
        let that = this;
        wx.navigateTo({
          url: '/pages/house/index?tag=3',
          events: {
            // 为指定事件添加一个监听器，获取被打开页面传送到当前页面的数据
            // acceptDataFromOpenedPage: function (data) {
            //   console.log(data)
            // },
            // someEvent: function (data) {
            //   console.log(data)
            // }
          },
          success: function (res) {
            // 通过eventChannel向被打开页面传送数据
            // 默认0： 不满足 
            var onlyHouse = "否";
            if (this.properties.info.yearIndex < 5 && this.properties.info.houseOnly == 1) {
              onlyHouse = "是";
            }

            var commData = {
              local: this.data.nameDes,
              buildArea: this.properties.info.area,
              // 土地性质
              land: this.properties.info.lands,
              // 产权时间
              time: this.properties.info.yearIndex,
              // 是否满五唯一
              onlyHouse: onlyHouse,
              // 预计成交价
              tradePrice: this.properties.info.price,
              // 贷款评估单价
              estimatePerPrice: this.properties.info.minprice,

              // 贷款额预估
              loanPrice: this.properties.info.loanmoney,
              // 预计税
              tax: this.data.sumTax,
              // 预计土地出让金
              landTax: this.data.landMoney,
              // 中介服务费用预估
              midServerEstimate: this.data.mediumMoney,

            }
            res.eventChannel.emit('data', {
              data: commData
            })

          }
        })
      
    },   
  },
  lifetimes: {
    attached: function () {
      // 在组件实例进入页面节点树时执行
      let that = this;
      var str = JSON.stringify(this.properties);
      console.log("  :" + str);
      var buyerMoney = cptTax.cptMidTax(this.properties.info.area, this.properties.info.minprice, this.properties.info.buymediums);
      var sellerMoney = cptTax.cptMidTax(this.properties.info.area, this.properties.info.minprice, this.properties.info.sellmediums);
      var loanService = cptTax.cptLoanServerTax(this.properties.info.loanmoney, this.properties.info.loanServer);
      that.setData({
        nameDes: this.properties.info.name + "--" + this.properties.info.houseStorey + " 楼",
        // 契税
        deedTax: cptTax.cptDeedTax(this.properties.info.area, this.properties.info.minprice, this.properties.info.buyerHouseCount),
        // 个人所得税，
        gTax: cptTax.cptGMoney(this.properties.info.area, this.properties.info.minprice, this.properties.info.yearIndex, this.properties.info.houseOnly),
        // 增值税计附加
        addMoney: cptTax.cptAddMoney(this.properties.info.area, this.properties.info.minprice, this.properties.info.yearIndex),
        // 土地出让金
        landMoney: cptTax.cptLandMoney(this.properties.info.area, this.properties.info.minprice, this.properties.info.lands),
        // 继承税
        heritMoney: cptTax.cptJTax(this.properties.info.herit, this.properties.info.area, this.properties.info.minprice),
        // 赠予税
        giveMoney: cptTax.cptPTax(this.properties.info.give, this.properties.info.area, this.properties.info.minprice),
        // 印花税
        creditMoney: 0,
        // 工本费
        usbkeyMoney: 0,
        // 中介费
        mediumMoney: buyerMoney + sellerMoney,
        // 中介费 买方
        buyerMoney: buyerMoney,
        // 中介费 卖方
        sellerMoney: sellerMoney,
        // 贷款服务费
        loanService: loanService,

      })
      var sum = that.data.loanService + that.data.sellerMoney +
        that.data.buyerMoney + that.data.usbkeyMoney + that.data.creditMoney +
        that.data.deedTax + that.data.gTax + that.data.addMoney
        + that.data.landMoney + that.data.heritMoney + that.data.giveMoney;
      that.setData({
        // 税费合计
        sumTax: sum,
      })
    }
  },
})