import regeneratorRuntime from '../../utils/runtime';
import api from '../../utils/api';
import tip from '../../utils/tip';
var base64 = require('../../utils/base.js');
// var base64 = require('../../utils/base_64.js');

var path = 'http://49.234.199.223:9090';
const app=getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    lists: [{
      title: "123",
      content: "sdfdsfsd",
      des: "sdfs"
    }, {
      title: "456",
      content: "sdfdsfsd",
      des: "sdfs"
    }, {
      title: "789",
      content: "sdfdsfsd",
      des: "sdfs"
    }],

    
    rulesList:[],
    viewList:[],
    analyList:[],

    // 当前。。标签
    currentTab: 0,
    // 宽高
    winWidth: null,
    winHeight: null,

  },
  // 获取制度json
  getRulesJson: async function () {
    console.log('jjson before')
    const json = await api.getRuler({
      query: {     
        
      }
    });
    console.log(' jjson after')
    if (json == "") {
      // tip.error('json错误',true);
      console.log("没有获取到数据")
    } else {
      // var jsontem = JSON.stringify(json);
      // var temlists=[];
      console.log(json.length)
      console.log(json)

      for (var i = 0; i < json.length;i++)
      {
        console.log(i + " : " + json[i].content)
        var base = base64.decode("'" + JSON.stringify(json[i].content)+"'")
        // var str = "'" + JSON.stringify(json[i].content) + "'"        
        // console.log(i + "  " + str.toBase64())
        var base = base.replace(/<img [^>]*src=['"]([^'"]+)[^>]*>/gi, function (match, capture) {
          console.log(capture);
          return '<img  src="' + (path + capture) + '"/>';

        });
        console.log(base);

        //处理图片宽度
        // alt，src，height，width  小程序 rich-text 不支持 section 标签的情况 +this.data.winWidth + 
        base = base.replace(/\<img/g, '<img alt="图片" style="width:100px;height:auto;display:block;margin-left:-10px;margin-right:-10px;"')
          .replace(/<section/g, '<div')
          .replace(/\/section>/g, '\div>');
        // console.log(basetext)
        json[i].content = base;
     
      }
      // console.log(JSON.stringify(json)) //不需要将json数据转换为string

      this.setData({
        rulesList: json
      })
    }
    //  JSON.parse(str);
    console.log("getRulesjson :"+this.data.rulesList[1].title)
   
  },
  // 获取楼盘分析  
  getAnalyJson: async function () {

    console.log('Analyjjson before')
    const json = await api.getAnaly({
      query: {
      }
    });
    console.log(' Analyjjson after')
    if (json == "") {     
      console.log("没有获取到数据")
    } else {      

      for (var i = 0; i < json.length; i++) {
        console.log(i + " : " + json[i].content)
        var base = base64.decode("'" + JSON.stringify(json[i].content) + "'")
        var base = base.replace(/<img [^>]*src=['"]([^'"]+)[^>]*>/gi, function (match, capture) {
          console.log(capture);
          return '<img  src="' + (path + capture) + '"/>';

        });
        console.log(base);

        //处理图片宽度
        // alt，src，height，width  小程序 rich-text 不支持 section 标签的情况
        base = base.replace(/\<img/g, '<img alt="图片" style="width:' + this.data.winWidth + 'px;height:auto;display:block;margin-left:-10px;margin-right:-10px;"')
          .replace(/<section/g, '<div')
          .replace(/\/section>/g, '\div>');
        // console.log(basetext)
        json[i].content = base;
      }
     
      this.setData({
       analyList: json
      })
    }  
    console.log("getAnalyjson :" + this.data.analyList[1].title)

  },
  // 楼盘见解  
  getViewJson: async function () {

    console.log('Viewjjson before')
    const json = await api.getRuler({
      query: {

      }
    });
    console.log(' Viewjjson after')
    if (json == "") {
     
      console.log("没有获取到数据")
    } else {     
   
      for (var i = 0; i < json.length; i++) {
        console.log(i + " : " + json[i].content)
        var base = base64.decode("'" + JSON.stringify(json[i].content) + "'")
      
        var base = base.replace(/<img [^>]*src=['"]([^'"]+)[^>]*>/gi, function (match, capture) {
          console.log(capture);
          return '<img  src="' + (path + capture) + '"/>';

        });
        console.log(base);

        //处理图片宽度
        // alt，src，height，width  小程序 rich-text 不支持 section 标签的情况
        base = base.replace(/\<img/g, '<img alt="图片" style="width:' + this.data.winWidth + 'rpx;height:auto;display:block;margin-left:-10px;margin-right:-10px;"')
          .replace(/<section/g, '<div')
          .replace(/\/section>/g, '\div>');
        json[i].content = base;
      }   

      
      this.setData({
        viewList: json
      })
    }
    //  JSON.parse(str);
    console.log("getviewjson :" + this.data.viewList[1].title)

  },


  gotoDetail: function(e) {
    // if (mLoading) return;
    var item = e.target.dataset.item;
    // console.log(e);
    // console.log(item);

    if (item) {
      wx.navigateTo({
        // + JSON.stringify(item)
        url: '/pages/tools/detail' ,
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
          res.eventChannel.emit('item', { data: item })         
        }
      
      })
    }
  },
  // 获取文章的简介 
  // strSub: function (a) {

  //   var strsub = a;
  //   if (strsub.length > 17) {
  //     strsub = strsub.substring(0, 17) + "..."
  //   }
  //   return strsub
  //   // return a.split(".")[0] + '.' + str;

  // },


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
    // console.log("ready"+this.html)
    console.log('onload before')
    this.getRulesJson().then(res => console.log(res)).catch(v => console.log(v))
    console.log('onload after')
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