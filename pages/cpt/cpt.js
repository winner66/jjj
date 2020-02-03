// pages/cpt/cpt.js
import commFormSubmit from '../../service/cpt.js'
import {
  loanrates,
  loanrate,
  gloanrates,
  gloanrate
} from '../../assets/comm/rate.js'

import regeneratorRuntime from '../../utils/runtime';
import api from '../../utils/api';
import tip from '../../utils/tip';
import apis from '../../utils/apis';
var base64 = require('../../utils/base.js');
// var base64 = require('../../utils/base_64.js');
var path = 'http://49.234.199.223:9090';
const app = getApp();
Page({


  data: {
    //判断页面上下滚动
    scrollTop: 0,
    banks: [],
    // banks:[{ id: "001", name: "建设银行" }, { id: "002", name: "农行银行" }],
    banksindex: 0,

    banksF: [{
      id: "001",
      name: "示例1",
      local: "顺庆区XXXXX",
      houseAge: "15",
      maxAge: "男55女50"
    }, {
      id: "001",
      name: "示例2",
      local: "顺庆区XXXXX",
      houseAge: "16",
      maxAge: "男55女50"
    }],
    banksFindex: 0,

    local: null,
    houseAge: 15,
    maxAge: "男55女50",
    // 银行推荐 (商贷 )
    bankLPR: 4,
    bankBasePoint: 4,
    // 银行推荐公积金 利率
    bankGrate: 4,

    scales: [{
        id: 1,
        name: '一成'
      },
      {
        id: 2,
        name: '二成'
      },
      {
        id: 3,
        name: '三成'
      },
      {
        id: 4,
        name: '四成'
      },
      {
        id: 5,
        name: '五成'
      },
      {
        id: 6,
        name: '六成'
      },
      {
        id: 7,
        name: '七成'
      },
      {
        id: 8,
        name: '八成'
      },
      {
        id: 9,
        name: '九成'
      },
      {
        id: 10,
        name: '十成'
      }
    ],
    scale: ['一成', '二成', '三成', '四成', '五成', '六成', '七成', '八成', '九成', '十成'],
    scaleindex: 1,
    loantimes: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40],
    // 数据从 comm/rate.js公用文件里导入，
    loanrates: loanrates,
    loanrate: loanrate,


    rateindex: 1,
    area: null,
    areaprice: null,
    //  商业贷款金额 公积金贷款金额
    loanmoney: null,

    timeindex: 4,

    gloanrates: gloanrates,
    gloanrate: gloanrate,
    // 公积金利率    
    // LPR
    lpr:4.85,


    lprs: [],
    lprIndex: 1,

    // 基点
    basePoints: [],
    basePointIndex: 1,
    // 用户自己输入基点
    basePoint:0,
    // LPR+basePoint
    rate:4.85,


    // cpt_2_methods 还款方式 cpt_1_methods 计算方式    
    // 组合贷利率
    zcrateindex: 1,
    zgrateindex: 1,

    // 组合贷金额
    zcloanmoney: null,
    zgloanmoney: null,

    //在商业贷款和公积金 里 判断是否按面积计算 
    cptAreaFlag: 1,
    // 计算方式 标签
    cptmethodFlag: 1,

    // 当前计算类型-商业贷 税贷。。。标签
    currentTab: 0,
    // 宽高
    winWidth: 0,
    winHeight: 0

  },
  onShareAppMessage: function() {
    return {
      title: 'title ',
      desc: 'desc',
      path: ''
    }

  },
  // 
  currentChange: function(e) {
    console.log(e)
    this.setData({
      currentTab: e.detail.current
    })
    // console.log('this:', this.data)
    console.log('currentTab:', this.data.currentTab)

  },
  // 单价改变
  areapriceChange: function(e) {

    this.setData({
      areaprince: e.detail.value
    })
    // console.log('this:', this.data)
    console.log('areaprice :', this.data.areaprince)

  },
  // 面积改变
  areaChange: function(e) {

    this.setData({
      area: e.detail.value
    })
    console.log('area:', this.data.area)

  },
  // 首付比例
  scalePickerChange: function(e) {


    this.setData({
      scaleindex: e.detail.value,

    })
    console.log('scale :', this.data.scaleindex)
  },
  // 按揭时间
  timePickerChange: function(e) {


    this.setData({
      timeindex: e.detail.value,

    })
    console.log('time :', this.data.timeindex)
  },
  // 商业贷款 -利率
  ratePickerChange: function(e) {

    this.setData({
      rateindex: e.detail.value,

    })
    console.log('rate :', this.data.rateindex)
  },

  itemClick(e) {
    // 1.设置最新的index
    this.setData({
      currentIndex: e.currentTarget.dataset.index
    })

    // 2.发出时间
    const data = {
      index: this.data.currentIndex
    }
    this.triggerEvent("tabclick", data, {})
  },
  setCurrentIndex(index) {

    this.setData({
      currentIndex: index
    })
    console.log(this.data.currentIndex)
  },
  // 商业贷-贷款金额改变
  loanChange: function(e) {
    this.setData({
      loanmoney: e.detail.value,

    })
    console.log('loanmoney :', this.data.grateindex)
  },
  // 商业贷款-根据按面积按贷款额度-得出贷款的总金额
  loan_money: function() {
    let money = null;
    let that = this.data;
    if (that.cptAreaFlag == 1) {
      var tem = that.scales[that.scaleindex].id;

      money = parseFloat(this.data.areaprince) * parseFloat(this.data.area) * parseFloat(0.1) * parseFloat(tem);
      console.log("mon1 ：" + money);
    } else {

      money = parseFloat(this.data.loanmoney);
      console.log("mon2：" + money);
    };
    return money;
  },
  // 计算商业贷 reset form
  commFormReset: function(e) {

  },
  //计算商业贷  submit form
  commFormSubmit: function(e) {
    // if(){};
    console.log(e);
    let that = this;
    wx.navigateTo({
      url: '/pages/cpt-comm-result/cpt-comm-result?tag=0',
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

        var commData = {

          // 首付比例
          // scale: that.data.scales[that.data.scaleindex].id,
          // 金额
          money: that.loan_money(),
          //时间 
          time: that.data.timeindex,
          // 利率
          rate: that.data.loanrates[that.data.rateindex].id,
          // 还款方式
          methods: that.data.cptmethodFlag


        }
        res.eventChannel.emit('data', {
          data: commData
        })
        //商业贷        
        res.eventChannel.emit('tab', {
          tab: 0
        })
      }
    })
  },
  // 获取南充市银行 json
  getbanksJson: async function() {

    const json = await api.getBankType({
      query: {
        // 南充
        proId: "001",
        cityId: "001",
      }
    });
    if (json == "") {
      console.log("没有获取到数据")
    } else {
      // let banks=this.data.banks ;
      let banks = [];
      console.log(json);

      for (var i = 0; i < json.length; i++) {
        var item = {};
        item.id = json[i].bank_type_id,
        item.name = json[i].bank_type_name
        banks.push(item);

      }
      console.log("getbankjson 1:" + JSON.stringify(banks))
      this.setData({
        banks: banks
      })
    }
    console.log("getbankjson 2:" + JSON.stringify(this.data.banks))
  },
  // 获取银行网点列表 json
  getListJson: async function(id) {
    let that=this;
    console.log(id)
    const json = await apis.getBank({
      data: {
        type: id,
      }
    });
    console.log(json)
    if (json == "") {
      console.log("没有获取到数据")
    } else {      
      // let banks = this.data.bankF;
      let banks = [];
      for (var i = 0; i < json.length; i++) {
        var item = {};
        item.id = json[i].bank_id,
          item.name = json[i].bank_name,
          item.local = json[i].address,
          item.houseAge = json[i].ershou,
          item.maxAge = json[i].age,
          // 银行推荐 (商贷 )
          // item.bankLPR: 4,
          // item.bankBasePoint: 4,
         banks.push(item);
      }
      console.log("getF 1:" + JSON.stringify(banks))
      that.setData({
        banksF: banks
      })
    }
    console.log("getF 2:" + JSON.stringify(that.data.banksF))
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var page = this;

    wx.getSystemInfo({

      success: function(systemInfo) {

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
        page.setData({
          winWidth: systemInfo.windowWidth
        });
        page.setData({
          winHeight: ktxWindowHeight
        });
      }
    })
    // let that=this;
    // that.test();
    // // 网络请求 ?1
    // this.test1();
    // console.log("get" + this.data.banks);
    // console.log("get" + JSON.stringify(this.data.banks));
    this.getbanksJson().then(res => console.log("res " + res)).catch(v => console.log("v " + v));



    // console.log("h:" + this.data.winHeight + "w:" + this.data.winWidth) 
    // console.log("getbankjson 3:" + JSON.stringify(this.data.banks)) 
  },
  test1: function() {
    this.getbanksJson().then(res => console.log("res " + res)).catch(v => console.log("v " + v));
    console.log('onload after')
    this.getbanksJson().then(res => console.log("res " + res)).catch(v => console.log("v " + v));
  },
  test: function(e) {
    var tem;
    var data = apis.fetch("/Bank/getBankType").then(function(resData) {
      console.log(resData);
      // let banks = this.data.banks;

      // for (var i = 0; i < json.length; i++) {
      //   var item = {};
      //   item.id = resData[i].bank_type_id,
      //     item.name = resData[i].bank_type_name
      //   banks.push(item);

      // }
      console.log("getbankjson 1:" + JSON.stringify(resData))
    })
    var data = apis.fetch("/Bank/getBankType").then(function(resData) {
      // console.log(resData);
      // let banks = this.data.banks;

      // for (var i = 0; i < json.length; i++) {
      //   var item = {};
      //   item.id = resData[i].bank_type_id,
      //     item.name = resData[i].bank_type_name
      //   banks.push(item);

      // }
      console.log("get 1:" + JSON.stringify(resData))
    })
    this.setData({
      banks: tem
    })
    console.log("getbankjson 2:" + JSON.stringify(this.data.banks))
  },
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


  // 贷款导航
  switchNav: function(e) {
    var page = this;
    if (this.data.currentTab == e.target.dataset.current) {
      return false;
    } else {
      page.setData({
        currentTab: e.target.dataset.current
      });
    }
  },
  // 计算方式-按面积- 按贷款额度
  cpt_radioChange_1: function(e) {
    console.log('radio1:', e.detail.value);
    var page = this;
    this.setData({
      cptAreaFlag: e.detail.value
    })
    console.log(page.data.cptAreaFlag);

  },
  // 还款方式 - 1等额
  cpt_radioChange_2: function(e) {
    console.log('radio2:', e.detail.value);
    var page = this;
    this.setData({
      cptmethodFlag: e.detail.value
    })

  },
  // 选择银行
  banksPickerChange: function(e) {
    var page = this;
    console.log('banks:', e.detail.value);
    // 网络请求  
    var id = page.data.banks[e.detail.value].id;
    console.log('id:', id );
    this.setData({
      banksindex : e.detail.value
    }) 
    this.getListJson(id).then(res => console.log("res " + res)).catch(v => console.log("v " + v));
    // var id = page.data.banks[e.detail.value].id;
    // var page = this;  
    

 
  },
  // 选择网点
  banksFPickerChange: function(e) {
    console.log('e:', e.detail.value);
    var page = this;
    this.setData({
      banksFindex: e.detail.value,
      local: page.data.banksF[e.detail.value].local,
      houseAge: page.data.banksF[e.detail.value].houseAge,
      maxAge: page.data.banksF[e.detail.value].maxAge,
    })
    console.log(page.data.local + "   " + page.data.banksFindex);
  },
  // 公积金贷款利率
  gratePickerChange: function(e) {
    this.setData({
      grateindex: e.detail.value,
    })
    console.log('grate :', this.data.grateindex)
  },
  // 基点2
  basePointsChange: function(e) {
    let that=this;
    let tem = e.detail.value;
    console.log(tem);
    console.log(tem/10);

    this.setData({
      basePoint: e.detail.value,
      rate:that.data.lpr+tem/10/10,
    })
  },
  // 基点-不用了
  basePointPickerChange: function(e) {
    this.setData({
      basePointIndex: e.detail.value,
    })
    console.log('basePointindex :', this.data.basePointIndex)
  },
  // LPR
  lprPickerChange: function(e) {
    this.setData({
      lprIndex: e.detail.value,
    })
    console.log('lprindex :', this.data.lprIndex)
  },
  // 公积金重置
  gFormReset: function(e) {},
  // 公积金计算
  gFormSubmit: function(e) {
    let that = this;
    console.log(e);
    wx.navigateTo({
      url: '/pages/cpt-comm-result/cpt-comm-result?tag=2',
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

        var commData = {


          // // 金额
          // money: that.loan_money(),
          // //时间 
          // time: that.data.timeindex,
          // // 利率
          // rate: that.data.gloanrates[that.data.grateindex].id,
          // // 还款方式
          // methods: that.data.cptmethodFlag,

        }
        res.eventChannel.emit('data', {
          data: commData
        })
        //商业贷        
        res.eventChannel.emit('tab', {
          tab: 2
        })
      }
    })
  },
  // zc组合贷-商贷款利率
  zcratePickerChange: function(e) {
    this.setData({
      zcrateindex: e.detail.value,

    })
    console.log('rate :', this.data.zcrateindex)
  },
  // zg组合贷-公积金贷款利率
  zgratePickerChange: function(e) {
    this.setData({
      zgrateindex: e.detail.value,

    })
    console.log('rate :', this.data.zgrateindex)
  },
  // zc组合贷-商贷款
  zcpriceChange: function(e) {
    this.setData({
      zcloanmoney: e.detail.value,

    })
    console.log('rate :', this.data.zcloanmoney)
  },
  // zg组合贷-公积金贷款
  zgpriceChange: function(e) {
    this.setData({
      zgloanmoney: e.detail.value,

    })
    console.log('rate :', this.data.zgloanmoney)
  },
  // 组合贷重置
  zFormReset: function(e) {

  },


  // 组合贷计算
  zFormSubmit: function(e) {
    // if(){};
    let that = this;
    wx.navigateTo({
      url: '/pages/cpt-comm-result/cpt-comm-result?tag=3',
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

        var commData = {


          //时间 
          time: that.data.timeindex,
          //公积金 利率
          gloanmoney: that.data.gloanmoney,
          rate: that.data.gloanrates[that.data.grateindex].id,

          //商业 利率
          loanmoney: that.data.loanmoney,
          rate: that.data.loanrates[that.data.rateindex].id,
          // 还款方式
          methods: that.data.cptmethodFlag,

        }
        res.eventChannel.emit('data', {
          data: commData
        })
        //商业贷        
        res.eventChannel.emit('tab', {
          tab: 3
        })
      }
    })
  },


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  //监听屏幕滚动 判断上下滚动  判断页面上下滚动
  onPageScroll: function(ev) {
    var _this = this;
    //当滚动的top值最大或最小时，为什么要做这一步是因为在手机实测小程序的时候会发生滚动条回弹，所以为了处理回弹，设置默认最大最小值
    if (ev.scrollTop <= 0) {
      ev.scrollTop = 0;
    } else if (ev.scrollTop > wx.getSystemInfoSync().windowHeight) {
      ev.scrollTop = wx.getSystemInfoSync().windowHeight;
    }
    //判断浏览器滚动条上下滚动
    if (ev.scrollTop > this.data.scrollTop || ev.scrollTop == wx.getSystemInfoSync().windowHeight) {
      //向下滚动
    } else {
      //向上滚动
    }
    //给scrollTop重新赋值
    setTimeout(function() {
      _this.setData({
        scrollTop: ev.scrollTop
      })
    }, 0)
  }

})