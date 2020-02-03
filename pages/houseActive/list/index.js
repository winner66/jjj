// pages/houseActive/list/index.js
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
    activity:[],
    winWidth: null,
    winHeight: null,
    isList: true, // 用于判断数组是不是空数组，默认true，空的数组  
    searchLoading: false, //"上拉加载"的变量，默认false，隐藏  
    searchLoadingComplete: false, //“没有数据”的变量，默认false，隐藏  
    pageLimit: 10,
    page: 1,
  },
  getHouseActivityJson: async function (id) {
    let that = this;
    const json = await apis.acvivityByBuild({
      data: {
       build_id:id,
      }
    });
    // {"count":1,"data":[{"build_ac_id":"5","title":"\u8d85\u7ea7\u5927\u51cf\u4ef7","content":"PHA+YWFhYWFhYWFhYWFhYWFhYWFhYWFhYWE8L3A+PHA+ZGRkZGRkZGRkZGRkZDwvcD48cD5zc3Nzc3Nzc3Nzc3NzPC9wPjxwPnd3d3d3d3d3dzwvcD4=","validity":"aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa","cover":"20191229\/20191229171722.png","build_id":"5","date_start":"2019-12-04","date_end":"2019-12-18","createtime":"2020-01-02 20:08:22","build_title":"\u6c34\u5cb8\u6674\u5929 "}]}
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
      that.data.isList ? searchList = data : searchList = that.data.activity.concat(data)
      that.setData({
        activity: searchList, //获取数据数组           
        searchLoading: true   //把"上拉加载"的变量设为false，显示 
      });
    }
    //  JSON.parse(str);
    console.log("gethouseActivityjson :" + JSON.stringify(this.data.activity))
  },
  getActivityJson: async function () {
    let that = this;
    const json = await apis.activityPage({
      data: {
        limit: that.data.pageLimit,
        page: that.data.page,
      }
    });
    // {"count":1,"data":[{"build_ac_id":"5","title":"\u8d85\u7ea7\u5927\u51cf\u4ef7","content":"PHA+YWFhYWFhYWFhYWFhYWFhYWFhYWFhYWE8L3A+PHA+ZGRkZGRkZGRkZGRkZDwvcD48cD5zc3Nzc3Nzc3Nzc3NzPC9wPjxwPnd3d3d3d3d3dzwvcD4=","validity":"aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa","cover":"20191229\/20191229171722.png","build_id":"5","date_start":"2019-12-04","date_end":"2019-12-18","createtime":"2020-01-02 20:08:22","build_title":"\u6c34\u5cb8\u6674\u5929 "}]}
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
      that.data.isList ? searchList = data : searchList = that.data.activity.concat(data)
      that.setData({
        activity: searchList, //获取数据数组           
        searchLoading: true   //把"上拉加载"的变量设为false，显示 
      });
    }
    //  JSON.parse(str);
    console.log("getActivityjson :" + JSON.stringify(this.data.activity))
  },
  //滚动到底部触发事件
  scrollLower: function (e) {
    let that = this;
    if (that.data.searchLoading && !that.data.searchLoadingComplete) {
      that.setData({
        page: that.data.page + 1, //每次触发上拉事件，把searchPageNum+1  
        isList: false //触发到上拉事件，把isFromSearch设为为false 
      });
      that.getActivityJson();
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  // 1所有的楼盘   2 单个楼盘-》houseId
  onLoad: function (options) {
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
      that.getActivityJson();
    } else {
      that.getHouseActivityJson(options.houseId)
    }

    
    that.setData({
      winWidth: app.globalData.winWidth,
      winHeight: app.globalData.winHeight,
    })
  },
  gotoDetail(e) {
    // if (mLoading) return;
    var item = e.currentTarget.dataset.item;
    // console.log(e);
    console.log(item);
    if (item) {
      wx.navigateTo({
        // + JSON.stringify(item)
        url: '/pages/houseActive/index',
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