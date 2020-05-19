//index.js
import apis from '../../../utils/apis';
import regeneratorRuntime from '../../../utils/runtime.js';

var app = getApp()

var touchDot = 0;//触摸时的原点 
var time = 0;// 时间记录，用于滑动时且时间小于1s则执行左右滑动 
var interval = "";// 记录/清理时间记录 

Page({
  data: {
    // posts: [],
    feed: [],
    feed_length: 0,
    searchValue: '',
  },

  onLoad: function (options) {

    // if (!wx.cloud) {
    //   wx.redirectTo({
    //     url: '../chooseLib/chooseLib',
    //   })
    //   return
    // }
    console.log('onLoad');
    var that = this;
    //调用应用实例的方法获取全局数据
    // this.getData();

    var content_array = new Array();
    var keyword = options.searchValue;
    this.setData({ searchValue: keyword });

    var content_array = [];
    var search_res_list = [];

    this.searchErShouJson(keyword);

  },



  upper: function () {
    wx.showNavigationBarLoading()
    this.refresh();
    console.log("upper");
    setTimeout(function () { wx.hideNavigationBarLoading(); wx.stopPullDownRefresh(); }, 2000);
  },
  lower: function (e) {
    wx.showNavigationBarLoading();
    var that = this;
    setTimeout(function () { wx.hideNavigationBarLoading(); that.nextLoad(); }, 1000);
    console.log("lower")
  },
  // 搜索
  searchErShouJson: async function (keyword) {
    let that = this;
    const json = await apis.serachErShou({
      data: {
        name: keyword
      }
    });
    console.log(json);
    if (json == '') {
      console.log("没有获取到数据")
    } else {
      var tem = json.data;
      var tempimg = apis.imgCoverPath;
      var temp = json.data;

      for (var i = 0; i < json.count; i++) {
        var tempimg = apis.imgCoverPath + tem[i].img;
        console.log(tempimg);
        temp[i].img = tempimg;
      }
      that.setData({
        feed: temp,
      })
      console.log(temp);
    }

  },

  /*方案一：跳转到comment
  bindItemTap: function () {
     wx.navigateTo({
       url: '../comment/comment'
     })
  },*/
  /*方案二：跳转到posts*/
  bindItemTap: function (event) {
    let str = event.currentTarget.dataset.item;
    wx.navigateTo({
      url: '../posts/index',
      events: {
        // 为指定事件添加一个监听器，获取被打开页面传送到当前页面的数据
        // acceptDataFromOpenedPage: function (data) {
        //   console.log(data)
        // },
        // someEvent: function (data) {
        //   console.log(data)
        // }
      },
      success: function (res) {
        // 通过eventChannel向被打开页面传送数据        
        res.eventChannel.emit('data', { data: str })
      }
    })
  },

  //网络请求数据, 实现首页刷新
  refresh0: function () {
    var index_api = '';
    util.getData(index_api)
      .then(function (data) {
        //this.setData({
        //
        //});
        console.log(data);
      });
  },

  //使用本地 fake 数据实现刷新效果
  getData: function () {
    var feed = util.getData2();
    console.log("loaddata");
    var feed_data = feed.data;
    this.setData({
      feed: feed_data,
      feed_length: feed_data.length
    });
  },
  refresh: function () {
    wx.showToast({
      title: '刷新中',
      icon: 'loading',
      duration: 2000
    });
    var feed = util.getData2();
    console.log("loaddata");
    var feed_data = feed.data;
    this.setData({
      feed: feed_data,
      feed_length: feed_data.length
    });
    setTimeout(function () {
      wx.showToast({
        title: '刷新成功',
        icon: 'success',
        duration: 2000
      })
    }, 3000)

  },

  //使用本地 fake 数据实现继续加载效果
  nextLoad: function () {
    wx.showToast({
      title: '加载中',
      icon: 'loading',
      duration: 3000
    })
    var next = util.getNext();
    console.log("continueload");
    var next_data = next.data;
    this.setData({
      feed: this.data.feed.concat(next_data),
      feed_length: this.data.feed_length + next_data.length
    });
    setTimeout(function () {
      wx.showToast({
        title: '加载成功',
        icon: 'success',
        duration: 2000
      })
    }, 3000)
  },





  /////////////手势操作/////////
  touchStart: function (e) {
    touchDot = e.touches[0].pageX; // 获取触摸时的原点 
    // 使用js计时器记录时间  
    interval = setInterval(function () {
      time++;
    }, 100);
  },
  // 触摸移动事件 
  touchMove: function (e) {
    var touchMove = e.touches[0].pageX;
    console.log("touchMove:" + touchMove + " touchDot:" + touchDot + " diff:" + (touchMove - touchDot));
    // 向左滑动  
    if (touchMove - touchDot <= -40 && time < 10) {
      wx.switchTab({
        url: '../material/material'
      });
    }
    // 向右滑动 
    if (touchMove - touchDot >= 40 && time < 10) {
      console.log('向右滑动');
      wx.switchTab({
        url: '../index/index'
      });
    }
  },
  // 触摸结束事件 
  touchEnd: function (e) {
    clearInterval(interval); // 清除setInterval 
    time = 0;
  },

  searchValueInput: function (e) {
    var value = e.detail.value;
    this.setData({
      searchValue: value,
    });
  },

  start_search: function (e) {
    var keyword = this.data.searchValue;
    var list = this.data.list;
    for (var index in list) {
      var t = list[index];
      if (t.indexOf(keyword) >= 0) {
        console.log('success' + t);
        this.setData({
          res: t,
        });
      } else {
        console.log("fail");
      }
    }
  },

  start_search_db: function (e) {
    var keyword = this.data.searchValue;
    wx.navigateTo({
      url: '/pages/search/searchPost?searchValue=' + keyword
    });
  }

})
