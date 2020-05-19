// pages/build/list/index.js
import regeneratorRuntime from '../../../utils/runtime';
import api from '../../../utils/api';
import apis from '../../../utils/apis';
// import tip from '../../utils/tip';

// var base64 = require('../../utils/base_64.js');
const app=getApp();
var base64 = require('../../../utils/base.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    schedule:[],
    winWidth: null,
    winHeight: null,
    isList: true, // 用于判断数组是不是空数组，默认true，空的数组  
    searchLoading: false, //"上拉加载"的变量，默认false，隐藏  
    searchLoadingComplete: false, //“没有数据”的变量，默认false，隐藏  
    pageLimit: 10,
    page: 1,

    // 
    imgs:"../../../assets/images/tarbar_cpt/h2.jpg",

  },
  getScheduleJson: async function () {
    let that=this;
    const json = await apis.schedulePage({
      data: {
        limit: that.data.pageLimit,
        page: that.data.page,
      }
    });
    console.log(json)
    if (json.count <= 0) {
      // tip.error('json错误',true);
      that.setData({
        searchLoadingComplete: true,  //把“没有数据”设为true，显示  
        searchLoading: false   //把"上拉加载"的变量设为false，隐藏 
      });
      console.log("没有获取到数据")
    } else {
      let data = [];
      data = json.data;
      for (var i = 0; i < data.length; i++) {
        // 处理文章内容
        var base = base64.decode("'" + JSON.stringify(data[i].content) + "'")
        var base = base.replace(/<img [^>]*src=['"]([^'"]+)[^>]*>/gi, function (match, capture) {
          return '<img  src="' + (api.imgSecPath + capture) + '"/>';
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
        data[i].cover = apis.imgCoverPath + "/" + data[i].cover
      }
      // console.log(JSON.stringify(json)) //不需要将json数据转换为string    
      let searchList = [];
      //如果isFromSearch是true从data中取出数据，否则先从原来的数据继续添加  
      that.data.isList ? searchList = json.data : searchList = that.data.schedule.concat(json.data)
      that.setData({
        schedule: searchList, //获取数据数组           
        searchLoading: true   //把"上拉加载"的变量设为false，显示 
      });
    }
    //  JSON.parse(str);
    console.log("getbuildjson :" + JSON.stringify(this.data.schedule))
  },

  getHouseScheduleJson: async function (id) {
    let that = this;
    // 
    const json = await apis.scheduleByBuild({
      data: {
        build_id: '1',       
      }
    });
    console.log(json)
    if (json.count <= 0) {
      // tip.error('json错误',true);
      that.setData({
        searchLoadingComplete: true,  //把“没有数据”设为true，显示  
        searchLoading: false   //把"上拉加载"的变量设为false，隐藏 
      });
      console.log("没有获取到数据")
    } else {
      let data = [];
      data = json.data;
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
        data[i].cover = apis.imgCoverPath + "/" + data[i].cover
      }
      // console.log(JSON.stringify(json)) //不需要将json数据转换为string    
      let searchList = [];
      //如果isFromSearch是true从data中取出数据，否则先从原来的数据继续添加  
      that.data.isList ? searchList =data : searchList = that.data.schedule.concat(data)
      that.setData({
        schedule: searchList, //获取数据数组           
        searchLoading: true   //把"上拉加载"的变量设为false，显示 
      });
    }
    //  JSON.parse(str);
    console.log("getHouseSchedulejson :" + JSON.stringify(this.data.schedule))
  },
  //滚动到底部触发事件
  scrollLower: function (e) {
    let that = this;
    if (that.data.searchLoading && !that.data.searchLoadingComplete) {
      that.setData({
        page: that.data.page + 1, //每次触发上拉事件，把searchPageNum+1  
        isList: false //触发到上拉事件，把isFromSearch设为为false 
      });
      that.getScheduleJson();
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  // 建设进度列表 传item 2-》houseId
  onLoad: function (options) {
   
  },
  gotoDetail:function(e) {
    // if (mLoading) return;
    var item = e.currentTarget.dataset.item;
    // console.log(e);
    console.log(item);

    if (item) {
      wx.navigateTo({
        // + JSON.stringify(item)
        url: '/pages/build/index',
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
          res.eventChannel.emit('data', { data: item })
        }

      })
    }
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
    let that = this;
    // const eventChannel = this.getOpenerEventChannel();
    // eventChannel.emit('acceptDataFromOpenedPage', { data: 'cpt_result' });
    // eventChannel.emit('someEvent', { data: 'cpt_result2' });
    // // 监听acceptDataFromOpenerPage事件，获取上一页面通过eventChannel传送到当前页面的数据
    // eventChannel.on('qudaoList', function (data) {
    //   let temdata = data.data;
    //   console.log(data);
    //   that.setData({
    //     qudao: temdata
    //   })
    //   console.log("qudaoList:"+that.data.qudao);
    // })
    console.log(options.houseId + "   " + options);

    var tem = JSON.stringify(options)
    console.log(tem);
    if (tem == "{}" || options.houseId == 'undefined' || options.houseId == "") {
      that.getScheduleJson();
    } else {
      that.getHouseScheduleJson(options.houseId)
    }

    that.setData({
      winWidth: app.globalData.winWidth,
      winHeight: app.globalData.winHeight,
    })

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