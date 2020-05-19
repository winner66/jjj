// pages/tupai/list/index.js
import regeneratorRuntime from '../../../utils/runtime';
import api from '../../../utils/api';
import apis from '../../../utils/apis';
// import tip from '../../utils/tip';
var base64 = require('../../../utils/base.js');
// var base64 = require('../../utils/base_64.js');
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 土拍
    tupai: [{
      title: "gthyj",
      time: 2019,
      src: "gthyj"
    }, {
      title: "gthyj",
      time: 2502,
      src: "gthyj"
    }, {
      title: "gthyj",
      time: 2019,
      src: "gthyj"
    }],
    pageLimit: 10,
    page: 1,
    winWidth: null,
    winHeight: null,
    isList: true, // 用于判断数组是不是空数组，默认true，空的数组  
    searchLoading: false, //"上拉加载"的变量，默认false，隐藏  
    searchLoadingComplete: false, //“没有数据”的变量，默认false，隐藏  

  },
  gotoDetail: function(e) {
    // if (mLoading) return;
    var item = e.currentTarget.dataset.item;
    // console.log(e);
    // console.log(item);

    if (item) {
      wx.navigateTo({
        // + JSON.stringify(item)
        url: '/pages/tupai/index',
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
  getTuPaoJson: async function() {
    const that=this;
    const json = await apis.landPage({
      data: {
        limit: that.data.pageLimit,
        page: that.data.page,
      }
    });   
    console.log("tupai:"+JSON.stringify(json))
    // [{"land_id":"1","title":"1-2日土地拍卖","content":"PHA+YXNkc2Fkc2FkPC9wPg==","cover":"20191230/20191230163640.png","time":"2020-01-02","createtime":"2020-01-02 20:09:16"}]  //改了

    // if (json.count <= 0) {
    //   // tip.error('json错误',true);
    //   console.log("没有获取到数据")
    // } else if(json.code!=0)
    // { 
    // }
    // else {
    var data = json;
    for (var i = 0; i < data.length; i++) {
      // 处理文章内容
      var base = base64.decode("'" + JSON.stringify(data[i].content) + "'")
      var base = base.replace(/<img [^>]*src=['"]([^'"]+)[^>]*>/gi, function (match, capture) {
        return '<img  src="' + (apis.imgSecPath + capture) + '"/>';
      });
      //处理图片宽度
      // alt，src，height，width  小程序 rich-text 不支持 section 标签的情况 +this.data.winWidth + 
      base = base.replace(/\<img/g, '<img alt="图片" style="width:100px;height:auto;display:block;margin-left:-10px;margin-right:-10px;"')
        .replace(/<section/g, '<div')
        .replace(/\/section>/g, '\div>');
      // console.log(basetext)
      data[i].content = base;
      console.log(base)
      // 处理封面
      data[i].cover = apis.imgCoverPath+ data[i].cover
    }
    console.log(JSON.stringify(data)) //不需要将json数据转换为string    
    this.setData({
      tupai: data,
      searchLoading: true 
    })

    // if (json.count <= 0) {
    //   // tip.error('json错误',true);
    //   that.setData({
    //     searchLoadingComplete: true,  //把“没有数据”设为true，显示  
    //     searchLoading: false   //把"上拉加载"的变量设为false，隐藏 
    //   });
    //   console.log("没有获取到数据")
    // }  else {
    //   // json=json.data;
    //   console.log("json" + JSON.stringify(json))
    //   for (var i = 0; i < json.length; i++) {
    //     // 处理文章内容
    //     var base = base64.decode("'" + JSON.stringify(json.data[i].content) + "'")
    //     var base = base.replace(/<img [^>]*src=['"]([^'"]+)[^>]*>/gi, function(match, capture) {
    //       return '<img  src="' + (apis.imgSecPath + capture) + '"/>';
    //     });
    //     //处理图片宽度
    //     // alt，src，height，width  小程序 rich-text 不支持 section 标签的情况 +this.data.winWidth + 
    //     base = base.replace(/\<img/g, '<img alt="图片" style="width:100px;height:auto;display:block;margin-left:-10px;margin-right:-10px;"')
    //       .replace(/<section/g, '<div')
    //       .replace(/\/section>/g, '\div>');
    //     // console.log(basetext)
    //     json.data[i].content = base;
    //     console.log(base)
    //     // 处理封面
    //     var cover = apis.imgCoverPath  + json.data[i].cover
    //   }
    //   // console.log(JSON.stringify(json)) //不需要将json数据转换为string    
    //   let searchList = [];
    //   //如果isFromSearch是true从data中取出数据，否则先从原来的数据继续添加  
    //   that.data.isList ? searchList = json.data : searchList = that.data.tupai.concat(json.data)
    //   that.setData({
    //     tupai: searchList, //获取数据数组           
    //     searchLoading: true   //把"上拉加载"的变量设为false，显示 
    //   });
    // }
    // //  JSON.parse(str);
    // console.log("getjson :" + JSON.stringify(this.data.tupai))

  },
  //滚动到底部触发事件
  scrollLower: function(e) {
    let that = this;
    if (that.data.searchLoading && !that.data.searchLoadingComplete) {
      that.setData({
        page: that.data.page + 1, //每次触发上拉事件，把searchPageNum+1  
        isList: false //触发到上拉事件，把isFromSearch设为为false  

      });
      that.getTuPaoJson();
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
   
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

    const that = this;
    this.getTuPaoJson(that.data.pageLimit, that.data.page)
    that.setData({
      winWidth: app.globalData.winWidth,
      winHeight: app.globalData.winHeight,
    })

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