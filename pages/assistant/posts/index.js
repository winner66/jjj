//answer.js
import apis from '../../../utils/apis';
import regeneratorRuntime from '../../../utils/runtime.js';

var touchDot = 0;//触摸时的原点 
var time = 0;// 时间记录，用于滑动时且时间小于1s则执行左右滑动 
var interval = "";// 记录/清理时间记录 
var app = getApp();
var num = 0;

Page({
  data: {
    motto: '二手房',
    userInfo: {},
    item: {},
    viewBg: 'green',
    like_click_num: 0,
    img_urls:[],

    // 
      // 当前楼盘图片
    current_img: null,

    autoplay: true,
    // 自动切换时间间隔
    interval: 5000,
    // 滑动动画时长
    duration: 500,
    // 是否显示面板指示点
    indicatorDots: true,
    swiperCurrent: 0,
    // image组件默认宽度300px、高度225px
    img_urls: ["../../../assets/images/tarbar_cpt/h2.jpg", "../../../assets/images/tarbar_cpt/h2.jpg", "../../../assets/images/tarbar_cpt/h3.jpg"],
    //数据
    //  装修/ 电梯
    isOrNo: [{ id: 0, name: "是" }, { id: 1, name: "否" }],
    // 出租
    leaseArray: [{ id: 0, name: "出租" }, { id: 1, name: "出售" }],
    yearArray: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40],
    bNatureArray: [{ id: 0, name: "住宅" }, { id: 1, name: "车库" }, { id: 2, name: "商业" }, { id: 3, name: "商住" }, { id: 4, name: "非住宅" }],
    lNatureArray: [{ id: 0, name: "出让" }, { id: 1, name: "纯划拨" }, { id: 2, name: "房改划拨" }],
    trustArray: [{ id: 0, name: "委托" }, { id: 1, name: "不委托" }],
    isFiveArray: [{ id: 0, name: "不满两年" }, { id: 1, name: "满两年" }, { id: 2, name: "满五唯一" }],
    provinceCode: 0,
    cityCode: 0,
    countyCode: 0, 
    er_name: null,
    // 默认南充市顺庆区
    province_id: 510000,
    city_id: 511300,
    area_id: 511302,
    // 街道
    street: null,
    address: null,
    // 年
    year: 4,
    // 二手房面积
    area: 90,
    // 土地分摊面积
    landArea: 0,
    // 楼层
    houseF: null,
    // 朝向
    face: null,
    // 是否装修 0/1 是/不是
    is_fit: 1,
    // 0/1 有/没有
    have_ele: 0,
    // 报价
    sell: 0,
    //  0/1 出租/ 出售
    is_lease: 0,
    // 比如 1988
    build_age: 2000,
    // 建筑性质 0/1/3/4  住宅/车库/ 商业/商住/ 非住宅
    build_nature: 0,
    // 使用目的
    use: null,
    // 土地性质 0/1/2 出让/ 纯划拨/ 房改划拨
    land_nature: 0,
    // 报价
    money: null,
    // 是否委托 0/1 委托/不委托
    is_trust: 0,
    // 电话号码
    phone: null,
    //  0/ 1/ 2  不满2 /满不唯一/ 满唯一
    is_five: 2,
    // 备注，
    explain: null,

  },
  //点击指示点切换
  chuangEvent: function (e) {
    this.setData({
      swiperCurrent: e.currentTarget.id
    })
  },
  //点击图片触发事件
  swipclick: function (e) {
    console.log(this.data.swiperCurrent);
    // 跳转到 tabBar 页面，并关闭其他所有非 tabBar 页面
    wx.switchTab({
      url: this.data.links[this.data.swiperCurrent]

    })
  },
  //事件处理函数
  onLoad: function (options) {
    
  },

  onShow: function (options) {

    var that = this;
    const eventChannel = this.getOpenerEventChannel();

    eventChannel.on('data', function (data) {

      let temdata = data.data;

      let img = data.data.imgs;

      // let item_value = JSON.parse(options.jsonstr);
      that.setData({
        item: temdata,
        img_urls: imgs
      });
    }),
      console.log(that.data.item);
    console.log('onLoad');

    //调用应用实例的方法获取全局数据
    // app.getUserInfo(function (userInfo) {
    //   //更新数据
    //   that.setData({
    //     userInfo: userInfo
    //   })
    // })
    that.list = [{
      ///'author': 'xiongcf',
      //'info': 'just for example praise list item.',
      //'praise': 0,
      'hasChange': false
    }];
    that.setData({
      list: this.list
    });
    
    // var db = wx.cloud.database();
    // db.collection('posts').doc(that.data.item._id).get({
    //   success(res) {
    //     console.log('follow-res', res);
    //     // res.data 包含该记录的数据
    //     that.setData({ item: res.data });
    //   }
    // });
    // if (that.data.like_click_num % 2 == 0) {
    //   this.setData({
    //     viewBg: 'green'
    //   });
    // } else {
    //   this.setData({
    //     viewBg: 'gray'
    //   });
    // }

    // console.log('onShow');
    // console.log('num: ', num);
    // console.log('data-click-num', that.data.like_click_num);
  },

  tapName: function (event) {
    console.log(event)
  },

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
    if (touchMove - touchDot <= -40 && time < 20) {
      wx.switchTab({
        url: '../posts/index'
      });
    }
    // 向右滑动 
    if (touchMove - touchDot >= 40 && time < 20) {
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

  ////////////////////////////关注按钮事件///////////////////////////////////////////
  add_like: function (e) {
    ///点赞
    var that = this;
    var num = that.data.like_click_num;
    that.setData({ like_click_num: num + 1 });
    num = num + 1;
    var result = num / 2;
    var itemc = this.data.item;
    var that = this;
    var db = wx.cloud.database();
    if (num % 2 == 0) {
      //希望添加取消关注的数据库操作///
      wx.cloud.callFunction({
        // 云函数名称
        name: 'rm_post_like',
        // 传给云函数的参数
        data: {
          item_cloud: itemc
        },
        success(res) {
          // console.log('old-rm-like-cnt', itemc.like_count);
          itemc.like_count = itemc.like_count - 1;
          that.setData({ item: itemc });
          // console.log('rm-like-cnt', that.data.item.like_count);
        },
        fail: console.error
      });
      this.setData({
        viewBg: 'green',
      })
    } else {
      ///////////////////////////////////////////////////////////////////
      wx.cloud.callFunction({
        // 云函数名称
        name: 'update_post_like',
        // 传给云函数的参数
        data: {
          item_cloud: itemc
        },
        success(res) {
          itemc.like_count = itemc.like_count + 1;
          that.setData({ item: itemc });
          // console.log('res', res);
        },
        fail: console.error
      });
      // 向数据库添加我点赞过的帖子
      var posts_agreed = that.data.item;
      delete posts_agreed._id;
      delete posts_agreed._openid;
      wx.getUserInfo({
        success(res) {
          const userInfo = res.userInfo
          const nickName = userInfo.nickName
          posts_agreed.owner = nickName;
          db.collection('person').add({
            // data 字段表示需新增的 JSON 数据
            data: posts_agreed,
            success: res => {
              // res 是一个对象，其中有 _id 字段标记刚创建的记录的 id
              console.log(res);
            },
            fail(res) {
              console.log(res);
            }
          });
        }
      });
      //////////////////////////////////////////////////////////////////////////////////
      this.setData({
        viewBg: 'gray'
      })
    }

  },
  // 跟帖按钮事件
  add_follow: function (event) {
    var itemc = this.data.item;
    // var dateString = JSON.stringify(itemc.)
    var that = this;
    var db = wx.cloud.database();
    wx.cloud.callFunction({
      // 云函数名称
      name: 'update_post_follow',
      // 传给云函数的参数
      data: {
        item_cloud: itemc
      },
      success(res) {
        // console.log('res', res);
        db.collection('posts').doc(itemc._id).get({
          success(res) {
            console.log('follow-res', res);
            // res.data 包含该记录的数据
            that.setData({ item: res.data });
          }
        });
        var type = "follow";
        var str = JSON.stringify(itemc);
        wx.navigateTo({
          url: '../release/release?type=' + type + '&item=' + str,
          success: function (res) { },
          fail: function (res) { },
          complete: function (res) { },
        })

      },
      fail: console.error
    });
  },
  changeBg() {
    num++;
    var result = num / 2;
    if (num % 2 == 0) {
      this.setData({
        viewBg: 'green'
      })
    } else {
      this.setData({
        viewBg: 'blue'
      })
    }
    console.log(num)
    console.log(result)
  }



})
