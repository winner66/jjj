// pages/dynamic/dynamic-menu.js
import regeneratorRuntime from '../../utils/runtime';
import api from '../../utils/api';
import apis from '../../utils/apis';
// import tip from '../../utils/tip';
var base64 = require('../../utils/base.js');
// var base64 = require('../../utils/base_64.js');

var path = 'http://49.234.199.223:9090';
const app = getApp();

Page({
  data: {
    inputShowed: false,
    searchKeyword: '', //需要搜索的字符 
    // isFromSearch: true, // 用于判断searchList数组是不是空数组，默认true，空的数组  
    searchPageNum: 1, // 设置加载的第几次，默认是第一次  
    callbackcount: 10, //返回数据的个数  
    isFromSearch: true, // 用于判断searchList数组是不是空数组，默认true，空的数组  
    searchLoading: false, //"上拉加载"的变量，默认false，隐藏  
    searchLoadingComplete: false, //“没有数据”的变量，默认false，隐藏  
    // 搜索列表
    searchList: [{
        title: "gthyj",
        time: 2019,
        src: "gthyj"
      },
      {
        title: "gthyj",
        time: 2502,
        src: "gthyj"
      },
      {
        title: "gthyj",
        time: 2019,
        src: "gthyj"
      },
      {
        title: "gthyj",
        time: 2019,
        src: "gthyj"
      },
      {
        title: "gthyj",
        time: 2502,
        src: "gthyj"
      },
      {
        title: "gthyj",
        time: 2019,
        src: "gthyj"
      },
      {
        title: "gthyj",
        time: 2019,
        src: "gthyj"
      },
      {
        title: "gthyj",
        time: 2502,
        src: "gthyj"
      },
      {
        title: "gthyj",
        time: 2019,
        src: "gthyj"
      },
      {
        title: "gthyj",
        time: 2019,
        src: "gthyj"
      },
      {
        title: "gthyj",
        time: 2502,
        src: "gthyj"
      },
      {
        title: "gthyj",
        time: 2019,
        src: "gthyj"
      },
      {
        title: "gthyj",
        time: 2019,
        src: "gthyj"
      },
      {
        title: "gthyj",
        time: 2502,
        src: "gthyj"
      },
      {
        title: "gthyj",
        time: 2019,
        src: "gthyj"
      }
    ],

    // 当前楼盘图片
    current_img: null,

    autoplay: true,
    // 自动切换时间间隔
    interval: 5000,
    // 滑动动画时长
    duration: 500,
    // 是否显示面板指示点
    indicatorDots: true,
    swiperCurrent:0,
    // image组件默认宽度300px、高度225px
    img_urls: ["../../assets/images/tarbar_cpt/h2.jpg", "../../assets/images/tarbar_cpt/h2.jpg", "../../assets/images/tarbar_cpt/h3.jpg"],

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
    // 渠道规则
    qudao: [{
      title: "gthyj",
      time: 2065,
      src: "gthyj"
    }, {
      title: "gthyj",
      time: 2021,
      src: "gthyj"
    }, {
      title: "gthyj",
      time: 2020,
      src: "gthyj"
    }]

  },

  showInput: function() {
    this.setData({
      inputShowed: true
    });
  },
  hideInput: function() {
    this.setData({
      searchKeyword: "",
      inputShowed: false
    });
  },
  clearInput: function() {
    this.setData({
      searchKeyword: ""
    });
  },
  inputTyping: function(e) {
    this.setData({
      searchKeyword: e.detail.value
    });
    console.log(e.detail.value)
  },
  startSearch: function(e) {
    console.log("  :" + JSON.stringify(e))
    var that = this;
    var value = e.detail.value
    // var name = e.detail.value['search - input'] ? e.detail.value['search - input'] : e.detail.value;
    if (value != '') {
      this.setData({
        searchPageNum: 1, //第一次加载，设置1  
        searchList: [], //放置返回数据的数组,设为空  
        isFromSearch: true, //第一次加载，设置true  
        searchLoading: true, //把"上拉加载"的变量设为true，显示  
        searchLoadingComplete: false //把“没有数据”设为false，隐藏  

      })
       this.search();    
     
    } else {
      wx.showModal({
        title: '提示',
        content: '请输入你要查询的楼盘名',
        showCancel: false,
        confirmText: "知道了",
      });
    }

  },
  // 点击图片事件 
  swipclick:function(e){
    let that=this;
    console.log(e)
    console.log(that.data.swiperCurrent);
    // 跳转到 tabBar 页面，并关闭其他所有非 tabBar 页面
    var id = that.data.img_urls[that.data.swiperCurrent].id
    console.log(that.data.swiperCurrent);
    wx.navigateTo({
      url: "/pages/houseDetail/index?houseId=" + id,
    })

  },
  //滚动到底部触发事件  
  searchScrollLower: function() {
    let that = this;
    if (that.data.searchLoading && !that.data.searchLoadingComplete) {
      that.setData({
        searchPageNum: that.data.searchPageNum + 1, //每次触发上拉事件，把searchPageNum+1  
        isFromSearch: false //触发到上拉事件，把isFromSearch设为为false  

      });
      that.search();    

    }
  },

  swiperchange: function (e) {
    this.setData({
      swiperCurrent: e.detail.current
    })
    console.log(this.data.swiperCurrent)
  },
  //点击指示点切换
  chuangEvent: function (e) {
    this.setData({
      swiperCurrent: e.currentTarget.id
    })
  },

  tosearchdetail: function(e) {
    // if (mLoading) return;
    var item = e.target.dataset.item;
    console.log(e);
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
          res.eventChannel.emit('item', {
            data: item
          })
        }

      })
    }
  },
  // 搜索
  search: async function() {
    // that.data.searchKeyword, that.data.callbackcount, that.data.searchPageNum
    let that = this;
    
    const json = await apis.serachBuild({
      data: {
        search: that.data.searchKeyword,
        limit: that.data.callbackcount,
        page: that.data.searchPageNum
        // search: that.data.searchKeyword,
        // limit:  5,
        // page: 1  
      }
    });
    console.log(JSON.stringify(json))
    // var data = json;
    // for (var i = 0; i < data.length; i++) {
    //   // 处理文章内容
    //   var base = base64.decode("'" + JSON.stringify(data[i].content) + "'")
    //   var base = base.replace(/<img [^>]*src=['"]([^'"]+)[^>]*>/gi, function (match, capture) {
    //     return '<img  src="' + (path + capture) + '"/>';
    //   });
    //   //处理图片宽度
    //   // alt，src，height，width  小程序 rich-text 不支持 section 标签的情况 +this.data.winWidth + 
    //   base = base.replace(/\<img/g, '<img alt="图片" style="width:100px;height:auto;display:block;margin-left:-10px;margin-right:-10px;"')
    //     .replace(/<section/g, '<div')
    //     .replace(/\/section>/g, '\div>');
    //   // console.log(basetext)
    //   data[i].content = base;
    //   console.log(base)
    //   // 处理封面
    //   var cover = apis.paths + "/" + data[i].cover
    // }
    // console.log(JSON.stringify(json))    //不需要将json数据转换为string  
    console.log(json);
    if (json.count <= 0) {
      that.setData({
        searchLoadingComplete: true ,  //把“没有数据”设为true，显示  
        searchLoading: false   //把"上拉加载"的变量设为false，隐藏 
      });
      //没有数据了，把“没有数据”显示，把“上拉加载”隐藏 
    } else {
      let searchList = [];
      //如果isFromSearch是true从data中取出数据，否则先从原来的数据继续添加  
      that.data.isFromSearch ? searchList = json.data : searchList = that.data.searchList.concat(json.data)
      that.setData({
        searchList: searchList, //获取数据数组           
        searchLoading: true   //把"上拉加载"的变量设为false，显示 
      });
    }       
    
    console.log("searchListjson :" + JSON.stringify(this.data.searchList))
  },
  getTuPaoJson: async function() {

    const json = await apis.landPage({
      data: {
        limit: 3,
        page: 1
      }
    });
    // getjson :{"code":0,"count":1,"data":[{"land_id":"1","title":"1-2日土地拍卖","content":"PHA+YXNkc2Fkc2FkPC9wPg==","cover":"20191230/20191230163640.png","time":"2020-01-02","createtime":"2020-01-02 20:09:16"}]}
    console.log(JSON.stringify(json))
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
      var base = base.replace(/<img [^>]*src=['"]([^'"]+)[^>]*>/gi, function(match, capture) {
        return '<img  src="' + (apis.imgSecPath+ capture) + '"/>';
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
      data[i].cover= apis.imgCoverPath + data[i].cover
    }
    // console.log(JSON.stringify(json)) //不需要将json数据转换为string    
    this.setData({
      tupai: data
    })

    //  JSON.parse(str);
    console.log("gettupaijson :" + JSON.stringify(this.data.tupai))

  },
  getqudaoJson: async function() {

    const json = await apis.canalsPage({
      data: {
        limit: 3,
        page: 1
      }
    });
    // { "count": 1, "data": [{ "build_qd_id": "1", "build_id": "4", "title": "买五送一 ", "content": "PHA+PGltZyBzcmM9Imh0dHA6Ly9pbWcuYmFpZHUuY29tL2hpL2p4Mi9qXzAwNjMuZ2lmIi8+PGltZyBzcmM9Imh0dHA6Ly9pbWcuYmFpZHUuY29tL2hpL2p4Mi9qXzAwNjMuZ2lmIi8+PGltZyBzcmM9Imh0dHA6Ly9pbWcuYmFpZHUuY29tL2hpL2p4Mi9qXzAwNjMuZ2lmIi8+PC9wPg==", "cover": "20200101/20200101200005.jpg", "createtime": "2020-01-02 20:08:03", "build_title": "英伦城邦 " }] }

    console.log(json)
    if (json.count <= 0) {
      // tip.error('json错误',true);
      console.log("没有获取到数据")
    } else {
      let data = [];
      data = json.data;
      for (var i = 0; i < data.length; i++) {
        // 处理文章内容
        var base = base64.decode("'" + JSON.stringify(data[i].content) + "'")
        var base = base.replace(/<img [^>]*src=['"]([^'"]+)[^>]*>/gi, function(match, capture) {
          return '<img  src="' + (apis.imgCoverPath + capture) + '"/>';
        });
        //处理图片宽度
        // alt，src，height，width  小程序 rich-text 不支持 section 标签的情况 +this.data.winWidth + 
        base = base.replace(/\<img/g, '<img alt="图片" style="width:100px;height:auto;display:block;margin-left:-10px;margin-right:-10px;"')
          .replace(/<section/g, '<div')
          .replace(/\/section>/g, '\div>');
        // console.log(basetext)
        let temStr = data[i].createtime;
        temStr = temStr.substring(0, 10);
        data[i].content = base;
        data[i].createtime = temStr;
        console.log(base)
        // 处理封面
        data[i].cover = apis.imgSecPath + data[i].cover
      }
      // console.log(JSON.stringify(json)) //不需要将json数据转换为string    
      this.setData({
        qudao: data
      })
    }
    //  JSON.parse(str);
    console.log("getqudaojson :" + JSON.stringify(this.data.qudao))

  },
  getImgsJson: async function () {

    const json = await apis.houseImgs({
      data: {      
      }
    });
    console.log(json);

    if (json == '') {
      // tip.error('json错误',true);
      console.log("没有获取到数据")
    } else {
      console.log(json)     
      let tem = [];
      // tem = json;
    
      for (var index in json) {
        var item={};
        item['imgs']= apis.imgCoverPath + json[index].imgs;
        item['id'] =  json[index].build_id;
        item['name'] = json[index].title;
        tem.push(item);
        console.log(index + ":   " + item)
      }
      console.log(":   " + tem)
      this.setData({
        img_urls: tem,
      })
    }
    console.log("getimgsjson :" + JSON.stringify(this.data.img_urls))
  },


    
  totupaiList: function(e) {
    var item = e.target.dataset.item;
    console.log(e);
    let that = this;
    wx.navigateTo({
      // + JSON.stringify(item)
      url: '/pages/tupai/list/index',
      // events: {
      //   // 为指定事件添加一个监听器，获取被打开页面传送到当前页面的数据
      //   acceptDataFromOpenedPage: function(data) {
      //     console.log(data)
      //   },
      //   someEvent: function(data) {
      //     console.log(data)
      //   }
      // },
      // success: function(res) {
      //   // 通过eventChannel向被打开页面传送数据        
      //   res.eventChannel.emit('tupaiList', {
      //     data: that.data.tupai
      //   })
      // }

    })
  },
  toqudaoList: function(e) {
    var item = e.target.dataset.item;
    console.log(e);
    let qudao = this.data.qudao;
    wx.navigateTo({
      // + JSON.stringify(item)
      url: '/pages/qudao/list/index',
      // events: {
      //   // 为指定事件添加一个监听器，获取被打开页面传送到当前页面的数据
      //   acceptDataFromOpenedPage: function(data) {
      //     console.log(data)
      //   },
      //   someEvent: function(data) {
      //     console.log(data)
      //   }
      // },
      // success: function(res) {
      //   // 通过eventChannel向被打开页面传送数据        
      //   res.eventChannel.emit('qudaoList', {
      //     data: qudao
      //   })
      // }

    })
  },
  toqudaodetail: function(e) {
    // if (mLoading) return;
    var item = e.target.dataset.item;
    console.log(e);
    // console.log(item);
    if (item) {
      wx.navigateTo({
        // + JSON.stringify(item)
        url: '/pages/qudao/index',
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
  totupaidetail: function(e) {
    // if (mLoading) return;
    var item = e.target.dataset.item;
    console.log(e);
    // console.log(item);

    if (item) {
      wx.navigateTo({
        // + JSON.stringify(item)
        url: '/pages/qudao/index',
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
  sellerChange: function(e) {
    let that = this;
    wx.navigateTo({
      url: '/pages/map/map',
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

        }
        res.eventChannel.emit('data', {
          data: commData
        })
      }
    })
  },
  buildchange: function(e) {
    let that = this;
    wx.navigateTo({
      url: '/pages/build/list/index',
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
  },
  housechange: function(e) {
    let that = this;
    wx.navigateTo({
      url: '/pages/houseActive/list/index',
    //   events: {
    //     // 为指定事件添加一个监听器，获取被打开页面传送到当前页面的数据
    //     acceptDataFromOpenedPage: function(data) {
    //       console.log(data)
    //     },
    //     someEvent: function(data) {
    //       console.log(data)
    //     }
    //   },
    //   success: function(res) {
    //     // 通过eventChannel向被打开页面传送数据
    //     var commData = {

    //     }
    //     res.eventChannel.emit('data', {
    //       data: commData
    //     })
    //   }
    })
  },
  tupaichange: function(e) {
    // 土拍定位
    let that = this;
    wx.navigateTo({
      url: '/pages/tupai/list/index',
    })
  },

  qudaochange: function(e) {
    // 渠道定位
    let that = this;
    wx.navigateTo({
      url: '/pages/qudao/list/index',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getTuPaoJson();
    this.getqudaoJson();
    this.getImgsJson();

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

  }
});