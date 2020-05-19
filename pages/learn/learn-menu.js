// pages/learn/learn-menu.js 

import regeneratorRuntime from '../../utils/runtime';
import apis from '../../utils/apis';
import tip from '../../utils/tip';
var base64 = require('../../utils/base.js');
// var base64 = require('../../utils/base_64.js');

// var path = 'http://49.234.199.223:9090';
var path ="http://118.24.1.237";
const app = getApp();


Page({
  data: {
    categories: [{
      name: "制度汇总",
      id: 0,
      active: true,
    }, {
      name: "重点解析",
      id: 1,
      active: false,
    }, {
      name: "经纪课堂",
      id: 2,
      active:false,
    }],
    img:"../../assets/images/tarbar_cpt/h1.jpg",
    // categoryData: {},
    currentIndex: 0,
    childcateList: [],
    rulerList: [],
    viewList: [],
    anayList: [],

    // 宽高
    winWidth: 0,
    winHeight: 0

  },
  onLoad: function(options) {
  
  },

  _getCategory() {
    const categoryData = {
      // rulesList:[],
      // analyList:[],
      // viewList:[],
    };
    for (var i = 0; i < 3; i++) {
      categoryData[i] = []
    }

    // 3.修改data中的数据
    this.setData({
      categoryData: categoryData
    })
    // 4.请求第一个类别的数据
    // this.getRulesJson();
    // this.getViewJson();
    this.getStudyJson();
    this.getAnalyJson();
    this.getRulesJson();

  },

  changeCate:function(e) {
    // 1.改变当前的currentIndex
    console.log(e)
    let that=this;

    var currentIndex = e.currentTarget.dataset.code;
    that.setData({
      currentIndex: e.currentTarget.dataset.code
    })
    if (e.currentTarget.dataset.code == 1) {
      if (this.data.anayList == undefined || this.data.anayList== []) { 
        this.getAnalyJson();
      } else {
        let tem = this.data.anayList
        this.setData({
          childcateList: tem
        })
      }
    } else if (e.currentTarget.dataset.code== 2) {
      if (this.data.viewList == undefined || this.data.viewList == []) {  
        // this.getViewJson();
        this.getStudyJson();
      } else {
        this.setData({
          childcateList: this.data.viewList          
        })
      }
    } else if (e.currentTarget.dataset.code == 0) {
      if (this.data.rulerList == undefined || this.data.rulerList ==[]) {
        this.getRulerJson();
      } else {
        this.setData({
          childcateList: this.data.rulerList
        })
      }    
    }
  },
  // 获取制度json
  getRulesJson: async function() {


    const json = await apis.getRuler({
      data: {}
    });

    if (json == "") {
      // tip.error('json错误',true);
      console.log("没有获取到数据")
    } else {


      for (var i = 0; i < json.length; i++) {
        // 处理文章内容
        var base = base64.decode("'" + JSON.stringify(json[i].content) + "'")
        var base = base.replace(/<img [^>]*src=['"]([^'"]+)[^>]*>/gi, function(match, capture) {
          return '<img  src="' + (path + capture) + '"/>';
        });
        //处理图片宽度
        // alt，src，height，width  小程序 rich-text 不支持 section 标签的情况 +this.data.winWidth + 
        base = base.replace(/\<img/g, '<img alt="图片" style="width:100px;height:auto;display:block;margin-left:-10px;margin-right:-10px;"')
          .replace(/<section/g, '<div')
          .replace(/\/section>/g, '\div>');
        // console.log(basetext)
        json[i].content = base;
        console.log(base)
        // 处理封面
        json[i].cover = apis.imgCoverPath + json[i].cover;


      }
      // console.log(JSON.stringify(json)) //不需要将json数据转换为string
      var categoryData = this.data.categoryData;
      categoryData[0] = json
      this.setData({
        categoryData: categoryData,
        childcateList: json,
        rulerList: json
      })
    }
    //  JSON.parse(str);
    console.log("getRulesjson :" + this.data.rulerList)
    console.log("getRulesjson :" + this.data.childcateList[0].title)

  },
  // 获取楼盘分析  
  getAnalyJson: async function() {


    const json = await apis.getAnaly({
      query: {}
    });

    if (json == "") {
      console.log("没有获取到数据")
    } else {

      for (var i = 0; i < json.length; i++) {

        var base = base64.decode("'" + JSON.stringify(json[i].content) + "'")
        var base = base.replace(/<img [^>]*src=['"]([^'"]+)[^>]*>/gi, function(match, capture) { 
         
          return '<img  src="' + (path + capture) + '"/>';
        });    



        //处理图片宽度
        // alt，src，height，width  小程序 rich-text 不支持 section 标签的情况
        base = base.replace(/\<img/g, '<img alt="图片" style="width:' + this.data.winWidth + 'px;height:auto;display:block;margin-left:-10px;margin-right:-10px;"')
          .replace(/<section/g, '<div')
          .replace(/\/section>/g, '\div>');
        // console.log(basetext)
        json[i].content = base;
        json[i].cover = apis.imgCoverPath + json[i].cover;
      }

      var categoryData = this.data.categoryData;
      categoryData[1] = json
      this.setData({
        categoryData: categoryData,
        childcateList: json,
        anayList:json
      })
    }
    //  JSON.parse(str);
    console.log("getRulesjson :" + this.data.anayList)
    console.log("getRulesjson :" + this.data.childcateList[1].title)
  },
  // 楼盘见解  
  getViewJson: async function() {

    const json = await apis.getView({
      query: {
      }
    });

    if (json == "") {
      console.log("没有获取到数据")
    } else {

      for (var i = 0; i < json.length; i++) {
        var base = base64.decode("'" + JSON.stringify(json[i].content) + "'")
        var base = base.replace(/<img [^>]*src=['"]([^'"]+)[^>]*>/gi, function(match, capture) {
         
          return '<img  src="' + (path + capture) + '"/>';
        });
        base = base.replace(/\<img/g, '<img alt="图片" style="width:' + this.data.winWidth + 'rpx;height:auto;display:block;margin-left:-10px;margin-right:-10px;"')
          .replace(/<section/g, '<div')
          .replace(/\/section>/g, '\div>');
        json[i].content = base;

        // 封面
        json[i].cover = apis.imgCoverPath + json[i].cover;

      }
      let  categoryData = this.data.categoryData;
      categoryData[2] = json
      this.setData({
        categoryData: categoryData,
        childcateList: json,
        viewList:json
      })
    }
    //  JSON.parse(str);
    console.log("getRulesjson :" + this.data.viewList)
    console.log("getRulesjson :" + this.data.childcateList[0].title)
  },
  // 获取经纪课堂json
  getStudyJson: async function () {

    const json = await apis.getStudy({
      data: {}
    });
    // console.log(json);
    if (json == "") {
      // tip.error('json错误',true);
      console.log("没有获取到数据")
    } else {
      console.log(json);
      for (var i = 0; i < json.length; i++) {
        // 处理文章内容
        var base = base64.decode("'" + JSON.stringify(json[i].content) + "'")
        var base = base.replace(/<img [^>]*src=['"]([^'"]+)[^>]*>/gi, function (match, capture) {
          return '<img  src="' + (path + capture) + '"/>';
        });
        //处理图片宽度
        // alt，src，height，width  小程序 rich-text 不支持 section 标签的情况 +this.data.winWidth + 
        base = base.replace(/\<img/g, '<img alt="图片" style="width:100px;height:auto;display:block;margin-left:-10px;margin-right:-10px;"')
          .replace(/<section/g, '<div')
          .replace(/\/section>/g, '\div>');
        // console.log(basetext)
        json[i].content = base;
        console.log(base)
        // 处理封面
        json[i].cover = apis.imgCoverPath + json[i].cover;


      }
      // console.log(JSON.stringify(json)) //不需要将json数据转换为string
      var categoryData = this.data.categoryData;
      categoryData[0] = json
      this.setData({
        categoryData: categoryData,
        childcateList: json,
        viewList: json
      })
    }
    //  JSON.parse(str);
    console.log("getstudyjson :" + this.data.viewList)
    console.log("getstudyjson :" + this.data.childcateList[0].title)

  },
  gotoDetail: function(e) {
    // if (mLoading) return;
    var item = e.currentTarget.dataset.item;
    console.log(item);
    // console.log("learn"+JSON.stringify(e));

    if (item) {
      wx.navigateTo({
        // + JSON.stringify(item)
        url: '/pages/learn/index',
        
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
          res.eventChannel.emit('data', {
            data: item
          })
        }

      })
    }
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
    var page = this;
    wx.getSystemInfo({
      success: function (res) {
        console.log(res);
        page.setData({ winWidth: res.windowWidth });
        page.setData({ winHeight: res.windowHeight });
      }
    })
    // 1.请求分类数据
    this._getCategory()

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

  }

})