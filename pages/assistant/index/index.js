//index.js
import apis from '../../../utils/apis.js';
import regeneratorRuntime from '../../../utils/runtime.js';
var base64 = require('../../../utils/base.js');
const app = getApp();

var touchDot = 0;//触摸时的原点 
var time = 0;// 时间记录，用于滑动时且时间小于1s则执行左右滑动 
var interval = "";// 记录/清理时间记录 

Page({
  data: {
    // posts: [],
    // 反馈信息  
    feed: [],
    feed_length: 0,
    searchValue: '',
    search_res: '',
    list: [],
  },

  onLoad: function () {
    // wx.cloud.init();
    // console.log('onLoad');
    this.getErShouJson()

  },
  // 获取二手帖子
  getErShouJson: async function () {
    var that=this;
    const json = await apis.getErShou({
      data: {
      }
    });
    console.log(json);
    if (json == '') {
      console.log("没有获取到数据")
    } else {
      var tem = json; 
      console.log(json); 
      
      var temp= json;
     
      for(var i=0;i<json.length;i++){
        // var tempimg = apis.imgCoverPath + json[i].img;
        // console.log(tempimg); 
        temp[i].img= tempimg;
        var imgs=[];
        for (var j = 0; j < json[i].imgs.length;j++){
          var tem = apis.imgCoverPath+json[i].imgs[j];
            imgs.push(tem);
        }
        temp[i].imgs=imgs;
        var tempimg="";
        if (json[i].imgs.length>0){
          tempimg=imgs[0];
        }
        temp[i].img = tempimg;
      }
       that.setData({
         feed:temp,
       })
       console.log(temp);
    }
  },

  onShow: function () {
    var that = this;
    //调用应用实例的方法获取全局数据
    // this.getData();
    // //获取数据json
    // const db = wx.cloud.database();
    // var content_array = new Array();
    // // var posts_array = [];
    // db.collection('posts').get().then(res => {
    //   // res.data 是一个包含集合中有权限访问的所有记录的数据，不超过 20 条
    //   content_array = res.data;
    //   this.setData({
    //     feed: content_array,
    //   });
    // });
    var content_array = [{
      "user_id": 2,
      "user_name": "jk.tian",
      "user_head": "../../images/icon1.jpeg",
      "post_brief": "考研的时候怎么查找资料",
      "post_content": "给学姐学长发红包",
      "post_tags": ["红包", "资料", "方法"],
      "like_count": 3,
      "follow_count": 2,
      "follow_posts": [
        { "user_id": 1, "user_name": "wangZY", "user_head": "../../images/icon1.jpeg", "follow_content": "+1" },
        { "user_id": 2, "user_name": "wangZY", "user_head": "../../images/icon1.jpeg", "follow_content": "朱门酒肉臭路有冻死骨" }
      ]
    },
{
        "user_id": 2,
        "user_name": "zy.wang",
        "user_head": "../../images/icon8.jpeg",
        "post_brief": "三跨 二战 考研 工作？",
        "post_content": "我可能应该写一个更具有爆点的题目，比如三跨、双非、三本之类的。然而很可惜的是，我所有条件都具备，我今年仍然没有上岸。",
        "post_tags": ["选择", "工作"],
        "like_count": 100,
        "follow_count": 3,
        "follow_posts": [
          { "user_id": 1, "user_name": "wangZY", "user_head": "../../images/icon1.jpeg", "follow_content": "工作去吧，考研这种应试，不值得的" },
          { "user_id": 2, "user_name": "wangZY", "user_head": "../../images/icon1.jpeg", "follow_content": "学会自己承担后果，自己为自己的选择负责" },
          { "user_id": 2, "user_name": "wangZY", "user_head": "../../images/icon1.jpeg", "follow_content": "火钳刘明" }
        ]
      }]
    this.setData({
        feed:content_array,
      });
    console.log('onShow');
  },

 

/*方案一：跳转到comment
bindItemTap: function () {
   wx.navigateTo({
     url: '../comment/comment'
   })
},*/
/*方案二：跳转到posts*/
bindItemTap: function (event) {
  // console.log(event);
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
    // // 向左滑动  
    // if (touchMove - touchDot <= -40 && time < 10) {
    //   wx.switchTab({
    //     url: '../material/material'
    //   });
    // }
    // // 向右滑动 
    // if (touchMove - touchDot >= 40 && time < 10) {
    //   console.log('向右滑动');
    //   wx.switchTab({
    //     url: '../index/index'
    //   });
    // }
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


  start_search_db: function (e) {
    // 关键字？
    var keyword = this.data.searchValue;
    wx.navigateTo({
      url: '../search/search?searchValue=' + keyword,
    });
  },

  //发帖
  onPostClick: function (e) {
    var type = "new";
    wx.navigateTo({
      url: '../release/release?type='+ type,
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  }

})
