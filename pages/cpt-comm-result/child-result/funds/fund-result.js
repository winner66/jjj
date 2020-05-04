// pages/cpt-comm-result/child-result/comm/comm-result.js
// 商业贷
const app = getApp();
// 保留位数
const keepNum = 4;
const winHeight = app.globalData.winHeight;
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
    //计算方式  1 :等额本息 2：等额本金
    method: 0,
    // 首付
    firstMoney: null,
    // 首月
    firstMonthMoney: null,
    // 最后一个月支付的钱
    lastMonthMoney: null,
    // 每个月比上个月减少的钱
    reduceMoney: null,
    // 总贷款
    sumLoan: null,
    // 总利率
    sumRate: null,
    // 总支付
    sumMoney: null,

    // 总月份
    months: 120,
    // 贷款年限
    years: 10,
    // ______________等额本金专属数据——————————————————
    // 当前月
    index: 1,
    // /当前月利息
    indexRateMoney: 0,
    // /当前支付的钱
    indexPayMoney: 0,
    winHeight: winHeight,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 生成置业计算表
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
        url: '/pages/house/index?tag=2',
        events: {
          // 为指定事件添加一个监听器，获取被打开页面传送到当前页面的数据
          // acceptDataFromOpenedPage: function(data) {
          //   console.log(data)
          // },
          // someEvent: function(data) {
          //   console.log(data)
          // }
        },
        success: function (res) {
          // 通过eventChannel向被打开页面传送数据
          var that = this;
          var method = "";
          var temp = that.data.method;
          if (temp == 0) {
            method = "等额本息";
          } else {
            method = "等额本金";
          }

          var commData = {
            //建筑面积
            buildArea: that.properties.info.buildArea,
            // 贷款评估单价
            estimatePerPrice: that.properties.info.areaprice,
            //  贷款评估总价
            estimatePrice: that.properties.info.money,
            // 首付款额预估
            firstPayPrice: that.data.firstMoney,
            // 贷款额预估
            loanPrice: that.data.sumLoan,
            // 贷款年限
            loanTime: that.properties.info.time,
            // 还款方式
            method: method,
            // 预计月供
            monthPay: that.data.firstMonthMoney,

          }
          res.eventChannel.emit('data', {
            data: commData
          })


        }
      })

    },
    // 等额本金
    // 等额本金还款每个月的本金还款额是固定的，而每月的利息是递减的，
    // 因此，等额本金还款每个月的还款额是不一样的。开始还得多，而后逐月递减。 
    //  index 某个月 mon:总月
    equMethods2: function (index, mon, sumLoan, yearRate) {
      // 每月本金还款
      var payMonthMoney = (sumLoan * 1.0) / mon;
      var monRate = yearRate / 12.0;
      // 当月利息 =总贷款数×（1－（还款月数-1）÷还款次数）×月利率
      var indexRateMoney = sumLoan * (1 - (index - 1) / (mon * 1.0)) * monRate;
      //  前一个月的利息
      var perIndexRateMoney = 0;
      if (index > 1) {
        perIndexRateMoney = sumLoan * (1 - (index - 1) / (mon * 1.0)) * monRate;
      }
      // 当月月还款额 = 当月本金还款＋当月利息 
      //          = 总贷款数×（1÷还款次数＋（1－（还款月数 - 1）÷还款次数）×月利率）
      var indexPayMoney = sumLoan * (1.0 / mon + (1 - (index - 1) / (mon * 1.0)) * monRate);
      // 总利息＝所有利息之和 
      //       =总贷款数×月利率×（还款次数＋1）÷2 
      var sumRate = sumLoan * monRate * (mon + 1) / 2.0;
      var firstMonthMoney = sumLoan * (1.0 / mon + monRate);
      var lastMonthMoney = sumLoan * (1.0 / mon + (1 - (mon - 1) / (mon * 1.0)) * monRate);

      return {
        firstMonthMoney: firstMonthMoney.toFixed(keepNum),
        lastMonthMoney: lastMonthMoney.toFixed(keepNum),
        reduceMoney: (perIndexRateMoney - indexRateMoney).toFixed(keepNum),
        sumRate: sumRate.toFixed(keepNum),
        sumMoney: (sumRate + sumLoan).toFixed(keepNum),
        // 当月利息
        indexRateMoney: indexRateMoney.toFixed(keepNum),
        // 当月支付
        indexPayMoney: indexPayMoney.toFixed(keepNum),
        // 某月
        index: index
      }
    },
    // 等额本息 
    // 等额本息还款，顾名思义就是每个月的还款额是固定的。由于还款利息是逐月减少的，
    // 因此反过来说，每月还款中的本金还款额是逐月增加的。
    //     设：总贷款额＝Ａ 
    // 还款次数＝Ｂ 
    // 还款月利率＝Ｃ 
    // 月还款额＝Ｘ 
    // 当月本金还款＝Ｙｎ（ｎ＝还款月数）
    //  index 某个月 mon:总月
    equMethods1: function (mon, sumLoan, yearRate) {
      // 月利率
      var monRate = yearRate / 12.0;
      // 月还款额
      // Ｘ＝Ａ×Ｃ×（１＋Ｃ）^ Ｂ÷（（１＋Ｃ）^ Ｂ－１） 
      var payMoney = sumLoan * monRate * Math.pow(1 + monRate, mon) / (Math.pow(1 + monRate, mon) - 1);
      // 总利息＝总还款额－总贷款额＝Ｘ×Ｂ－Ａ 
      var sumRate = payMoney * mon - sumLoan;
      return {
        payMoney: payMoney.toFixed(keepNum),
        sumRate: sumRate.toFixed(keepNum),
        sumMoney: (sumRate + sumLoan).toFixed(keepNum),
      }

    },
    // 贷款导航
    switchNav: function (e) {
      var page = this;
      if (this.data.method == e.target.dataset.current) {
        return false;
      } else {
        page.setData({ method: e.target.dataset.current });
      }
    },
    // 
    currentChange: function (e) {
      console.log(e)
      var that = this;
      if (e.detail.current == 0) {
        // 等额本息
        var obj = this.equMethods1(that.properties.info.time * 12, that.properties.info.loanmoney, that.properties.info.rate);
        console.log("obj " + obj);
        console.log("obj " + obj.payMoney)
        that.setData({
          //计算方式 
          method: e.detail.current,
          //  首付
          firstMoney: ((1 - that.properties.info.loanP / 10) * that.properties.info.money).toFixed(keepNum),
          firstMonthMoney: obj.payMoney,
          lastMonthMoney: obj.payMoney,
          reduceMoney: 0,
          sumLoan: that.properties.info.loanmoney,
          sumRate: obj.sumRate,
          sumMoney: obj.sumMoney,
          months: that.properties.info.time * 12,
        })

      } else {
        // 等额本金 index =2 --以后再改
        var obj = this.equMethods2(2, that.properties.info.time * 12, that.properties.info.loanmoney, that.properties.info.rate);
        that.setData({
          //计算方式 
          method: e.detail.current,
          //  首付
          firstMoney: (1 - that.properties.info.loanP / 10) * that.properties.info.money,
          firstMonthMoney: obj.firstMonthMoney,
          lastMonthMoney: obj.lastMonthMoney,
          reduceMoney: obj.reduceMoney,
          sumLoan: that.properties.info.loanmoney,
          sumRate: obj.sumRate,
          sumMoney: obj.sumMoney,
          months: that.properties.info.time * 12,
          // 当前月
          index: 1,
          // 当月利息
          indexPayMoney: obj.indexPayMoney,
        })

      }


    },
    // --等额本金--- 查看某个月 要交的金额
    indexChange: function (e) {
      var that = this;
      // 等额本金
      var sumLoan = that.properties.info.loanmoney;
      var mon = that.properties.info.time * 12;
      var yearRate = that.properties.info.rate;
      // 初次index为 1： 首月
      var index = e.detail.value;

      console.log(e);
      console.log("222222" + e.detail.value + "3333");
      if (e.detail.value > 0 && e.detail.value <= mon) {

        var payMonthMoney = (sumLoan * 1.0) / mon;
        var monRate = yearRate / 12.0;
        //  前一个月的利息
        var perIndexRateMoney = 0;
        if (index > 1) {
          perIndexRateMoney = sumLoan * (1 - (index - 1) / (mon * 1.0)) * monRate;
        }
        // 当月月还款额 = 当月本金还款＋当月利息 
        //          = 总贷款数×（1÷还款次数＋（1－（还款月数 - 1）÷还款次数）×月利率）
        var indexPayMoney = sumLoan * (1.0 / mon + (1 - (index - 1) / (mon * 1.0)) * monRate);
        var reduceMoney = (perIndexRateMoney - indexPayMoney).toFixed(keepNum);
        that.setData({
          index: e.detail.value,
          indexPayMoney: indexPayMoney.toFixed(keepNum),
          reduceMoney: reduceMoney,
        })
      }
    }

  },
  lifetimes: {
    attached: function () {
      var that = this;
      if (that.properties.info.methods == 0) {
        // 等额本息

        var sumLoan = that.properties.info.loanmoney;
        var mon = that.properties.info.time * 12;
        var yearRate = that.properties.info.rate;

        var monRate = yearRate / 12.0;
        // 月还款额
        // Ｘ＝Ａ×Ｃ×（１＋Ｃ）^ Ｂ÷（（１＋Ｃ）^ Ｂ－１） 
        var payMoney = sumLoan * monRate * Math.pow(1 + monRate, mon) / (Math.pow(1 + monRate, mon) - 1);
        // 总利息＝总还款额－总贷款额＝Ｘ×Ｂ－Ａ 
        var sumRate = payMoney * mon - sumLoan;
        var sumMoney = sumRate + sumLoan;

        that.setData({
          //计算方式 
          method: that.properties.info.methods,
          //  首付
          firstMoney: ((1 - that.properties.info.loanP / 10) * that.properties.info.money).toFixed(keepNum),
          firstMonthMoney: payMoney.toFixed(keepNum),
          lastMonthMoney: payMoney.toFixed(keepNum),
          reduceMoney: 0,
          sumLoan: that.properties.info.loanmoney,
          sumRate: sumRate.toFixed(keepNum),
          sumMoney: sumMoney,
          months: that.properties.info.time * 12,

        })
      } else {
        // 等额本金
        var sumLoan = that.properties.info.loanmoney;
        var mon = that.properties.info.time * 12;
        var yearRate = that.properties.info.rate;
        // 初次index为 1： 首月
        var index = 1;

        var payMonthMoney = (sumLoan * 1.0) / mon;
        var monRate = yearRate / 12.0;
        // 当月利息 =总贷款数×（1－（还款月数-1）÷还款次数）×月利率
        var indexRateMoney = sumLoan * (1 - (index - 1) / (mon * 1.0)) * monRate;
        //  前一个月的利息
        var perIndexRateMoney = 0;
        if (index > 1) {
          perIndexRateMoney = sumLoan * (1 - (index - 1) / (mon * 1.0)) * monRate;
        }
        // 当月月还款额 = 当月本金还款＋当月利息 
        //          = 总贷款数×（1÷还款次数＋（1－（还款月数 - 1）÷还款次数）×月利率）
        var indexPayMoney = sumLoan * (1.0 / mon + (1 - (index - 1) / (mon * 1.0)) * monRate);
        var reduceMoney = perIndexRateMoney - indexPayMoney;
        // 总利息＝所有利息之和 
        //       =总贷款数×月利率×（还款次数＋1）÷2 
        var sumRate = sumLoan * monRate * (mon + 1) / 2.0;
        var firstMonthMoney = sumLoan * (1.0 / mon + monRate);
        var lastMonthMoney = sumLoan * (1.0 / mon + (1 - (mon - 1) / (mon * 1.0)) * monRate);
        var sumMoney = sumRate + sumLoan;

        that.setData({
          //计算方式 
          method: that.properties.info.methods,
          //  首付
          firstMoney: (1 - that.properties.info.loanP / 10) * that.properties.info.money,
          firstMonthMoney: firstMonthMoney.toFixed(keepNum),
          lastMonthMoney: lastMonthMoney.toFixed(keepNum),
          reduceMoney: reduceMoney.toFixed(keepNum),
          sumLoan: that.properties.info.loanmoney,
          sumRate: sumRate.toFixed(keepNum),
          sumMoney: sumMoney.toFixed(keepNum),
          months: that.properties.info.time * 12,
          // 当前月
          index: 1,
          // 当月利息
          indexPayMoney: indexPayMoney.toFixed(keepNum),
        })
      }
    }

  },

  // 四舍五入 保存n位
  getFloat: function (num, n) {
    n = n ? parseInt(n) : 0;
    if (n <= 0) {
      return Math.round(num);
    }
    //四舍五入
    num = Math.round(num * Math.pow(10, n)) / Math.pow(10, n);

    num = Number(num).toFixed(n); //补足位数
    return num;
  },

})