// pages/cpt-comm-result/child-result/comm/comm-result.js
const app=getApp();
Component({
  /**
   * 组件的属性列表
   *  // 金额
          money: that.loan_money(),
          //时间
          time: that.data.timeindex,
          // 利率
          rate: that.data.loanrates[that.data.rateindex].id,
          // 还款方式
          methods: that.data.cptmethodFlag

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
    //计算方式 
    methods: 1,
    firstMoney: null,
    firstMonthMoney: null,
    lastMonthMoney: null,
    reduceMoney: null,
    sumLoan: null,
    sumRate: null,
    sumMoney: null,
    months: null,




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
          url: '/pages/house/index?tag=2',
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