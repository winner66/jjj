// pages/cpt-comm-result/child-result/tax/tax-result.js
Component({
  /**
   *          // 屏幕的宽高
          winWidth: that.winWidth,
          winHeight: that.winHeight,
          // 卖房是否是唯一房
          sellerhouse: that.sellerhouse,
          // 买房是否是唯一房
          purcharehouse: that.purcharehouse,
          // 是否有电梯
          elevator: that.elevator,

          //房屋类型 -新房-二手房
          cpthouseFlag: that.cpthouseFlag,

           // 计价方式
          cptmethodid: that.cptmethods[that.cptmethodindex].id,
          // 二手房中的 房屋类型
          houseid: that.houses[that.houseindex].id,

          //  二手房购买时间
          housetimeid: that.housetime[that.housetimeindex].id,

          unitprice: that.unitprice,
          area: that.area,
          originprice: that.originprice,
          tradeprice: that.tradeprice
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
    toHouse: function() {
      // 判断是否是会员
      if (app.globalData.user_token == null || app.globalData.user_token == '') {
        wx.showToast({

          title: "请注册会员",

          duration: 3000, //提示的延迟时间，单位毫秒，默认：1500 

          mask: false, //是否显示透明蒙层，防止触摸穿透，默认：false        

        })
      } else {
        let that = this;
        wx.navigateTo({
          url: '/pages/house/index?tag=1',
          events: {
            // 为指定事件添加一个监听器，获取被打开页面传送到当前页面的数据
            acceptDataFromOpenedPage: function(data) {
              console.log(data)
            },
            someEvent: function(data) {
              console.log(data)
            }
          },
          success: function(res) {
            // 通过eventChannel向被打开页面传送数据
            var commData = {}
            res.eventChannel.emit('data', {
              data: commData
            })

          }
        })
      }
    }
  }
})