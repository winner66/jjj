// pages/map/map.js
import regeneratorRuntime from '../../utils/runtime';
import apis from '../../utils/apis';
import tip from '../../utils/tip';
var base64 = require('../../utils/base.js');
const app = getApp();

Page({
  /**
   * 页面的初始数据
   */
  data: {
    centerX: null,
    centerY: null,
    houseData: [],
    loading: true,
    winWidth: null,
    winHeight: null,
    scale: 13,
    latitude: 30.8432970000,
    longitude: 106.1172390000,

    markers: [{
        iconPath: "/assets/images/common/location.png",
        id: 0,
        latitude: 30.8432970000,
        longitude: 106.1172390000,
        width: 50,
        height: 50,
        name: "1",
        title: "11",
        callout: {
          content: "呵呵",
          fontSize: 14,
          bgColor: "#FFF",
          borderWidth: 1,
          borderColor: "#CCC",
          padding: 4,
          display: "ALWAYS",
          textAlign: "center"
        },
        // label: {
        //   x: 24,
        //   y: 26,
        //   content: "ooo"
        // }
      },
      {
        iconPath: "/assets/images/common/plus.png",
        id: 1,
        latitude: 30.2432960000,
        longitude: 106.1172810000,
        width: 50,
        height: 50,
        callout: "ppp"
      },
      {
        iconPath: "/assets/images/common/subtract.png",
        id: 2,
        latitude: 30.4432950000,
        longitude: 106.1272610000,
        width: 50,
        height: 50,
        label: "123",
        callout: "hhh"

      },
    ],
    // controls: [{
    //   id: 1,
    //   iconPath: '/assets/images/common/plus.png',
    //   position: {
    //     left: 250,
    //     top: 100,
    //     width: 60,
    //     height: 60
    //   },
    //   clickable: true
    // }, {
    //     id: 2,
    //     iconPath: '/assets/images/common/subtract.png',
    //     position: {
    //       left: 250,
    //       top: 160,
    //       width: 60,
    //       height: 60
    //     },
    //     clickable: true
    //   }],
  
    // 当前选择的楼盘 index
    markerindex: 1,
    // 地图上下文
    mapCtx:null,
    // 当前的楼盘信息：
    house:{
      name:null,
    },
    // incluepoint: [{
    //   latitude: 30.8432970000,
    //   longitude: 106.1172310000
    // },
    // {
    //   latitude: 30.8432970000,
    //   longitude: 106.1172310000
    // }
    // ],
    // polyline: [{
    //   points: [{
    //       latitude: 30.8432970000,
    //       longitude: 106.1172310000
    //     },
    //     {
    //       latitude: 30.8432970000,
    //       longitude: 106.1172310000
    //     }
    //   ],
    //   color: "#FF0000DD",
    //   width: 2,
    //   dottedLine: true
    // }],
    // controls: [{
    //   id: 1,
    //   iconPath: '/assets/images/tabbar/map.png',
    //   position: {
    //     left: 0,
    //     top: 300 - 50,
    //     width: 50,
    //     height: 50
    //   },
    //   clickable: true
    // }]
  },
  // setControls:function(e){
  //   that.setData({
  //     controls: [{
  //       id: 1,
  //       iconPath: '../../img/center-location.png',
  //       position: {
  //         left: (windowWidth - controlsWidth) / 2,
  //         top: (windowHeight - bottomHeight) / 2 - controlsHeight * 3 / 4,
  //         width: controlsWidth,
  //         height: controlsHeight
  //       },
  //       clickable: true
  //     }]
  //   })
  // }


  /**
   * 拖动地图回调
   */
  regionChange: function(res) {
    var that = this;
    console.log(e.type)
    // 改变中心点位置  
    if (res.type == "end") {
      that.getCenterLocation();
    }
  },
  markertap(e) {
    console.log(e.markerId)
    let that=this;
  //  更新当前选中的楼盘信息
    this.setData({
      markerindex: e.markerId,
      // house:{
      //   name: that.data.houseData[e.markerId].name
      // }  
    })
  },
  controltap(e) {
    // 放大缩小
    var that = this;
    console.log("scale===" + this.data.scale)
    if (e.controlId === 1) {
      that.setData({
        scale: --this.data.scale
      })
    } else {
      that.setData({
        scale: ++this.data.scale
      })
    }   
    console.log(e.controlId)
    this.moveToLocation()
  },
  // toDetail:function(e){
  //   wx.navigateTo({
  //     url: '/pages/houseDetail/index?tag=1',
  //     events: {
  //       // 为指定事件添加一个监听器，获取被打开页面传送到当前页面的数据
  //       acceptDataFromOpenedPage: function (data) {
  //         console.log(data)
  //       },
  //       someEvent: function (data) {
  //         console.log(data)
  //       }
  //     },
  //     success: function (res) {
  //       // 通过eventChannel向被打开页面传送数据
  //       var commData = { 
  //         house:"house"
  //       }
  //       res.eventChannel.emit('data', { data: commData })       
  //     }
  //   })
  // },

  /**
       * 获取楼盘标识
       */
  getHouseMarkers() {
    let markers = [];
    for (let item of this.data.houseData) {
      let marker = this.createMarker(item);
      markers.push(marker)
      console.log("market===========", marker)
    }
    return markers;
  },
  /**
   * 移动到自己位置
   */
  moveToLocation: function() {
    this.mapCtx.moveToLocation()
  },
  /**
   * 还有地图标识，可以在name上面动手
   */
  createMarker(point) {
    let latitude = point.lat;
    let longitude = point.lng;
    let marker = {
      iconPath: "/assets/images/common/location.png",
      id: point.build_id || 0,
      name: point.title || '',
      latitude: latitude+'0000',
      longitude: longitude +'0000',
      width: 20,
      height: 20,
      callout: {
        content: point.title || '',
        fontSize: 10,
        bgColor: "#b2b2b2",
        borderWidth: 1,
        borderColor: "#CCC",
        padding: 4,
        display: "ALWAYS",
        textAlign: "center"
      },
      // label: {
      //   x: -24,
      //   y: -26,
      //   content: point.name || ''
      // }
    };
    return marker;
  },
  // 头上文字被点击
  bindcallouttap: function(e) {
    let that=this;
    console.log(e.markerId)
    this.setData({
      markerindex: e.markerId
    })
    let item= null;
    for (var i in that.data.houseData)
    {
      if (e.markerId == that.data.houseData[i].build_id){      
        item = that.data.houseData[i];
      }
    }
    if(item!=null){
      console.log("头上文字被点击", e)
      wx.navigateTo({
        url: '/pages/houseDetail/index',
        success: function (res) {
          // 通过eventChannel向被打开页面传送数据        
          res.eventChannel.emit('data', { data:item  })
        },
        fail: function (res) { },
        complete: function (res) { },
      })
    }
    
    
  },
  // 楼盘
  getHouseJson: async function () {
    const that = this;
    const json = await apis.getBuild({
      data: { }
    });
    //  [{"build_id":"5","province_id":"1","city_id":"1","area_id":"8","title":"水岸晴天 ","content":"<p>安定</p>","lng":"106.255498","lat":"30.915078","bulid_img":"20191229/20191229184633.png,20191229/20191229184635.jpg","is_sell":"1","createtime":"2020-01-02 20:07:32","address":"四川省南充市营山县","sell":"不在售","cover":"http://49.234.199.223:9090/hob/Public/Imgs/undefined"},]

    console.log(json)  
      let data = [];
      data = json;
      for (var i = 0; i<data.length; i++) {
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
        // 处理楼盘轮播图片
        var imgs = [],
          imgs = data[i].imgs;
        for (var j in imgs) {
          imgs[j] = apis.imgCoverPath + imgs[j]
        }
        data[i].imgs = imgs;
        // 处理封面
        if (data[i].cover == '') {
          // 取轮播图的第一张图片
          data[i].cover = imgs[0]
        } else {
          data[i].cover = apis.imgCoverPath + data[i].cover
        }
      }    
      that.setData({
        houseData: data, //获取数据数组       
       
      });
      //  JSON.parse(str);
      console.log("getHouseMapjson :" + JSON.stringify(this.data.houseData))
      let markers=this.getHouseMarkers();
    that.setData({
      markers: markers, //获取数据数组       

    });
      //  JSON.parse(str);
      console.log("makes :" + JSON.stringify(this.data.markers))

    
  
  },
  // 获取文章的简介 
  strSub: function(a) {
    var strsub = a;
    if (strsub.length > 17) {
      strsub = strsub.substring(0, 17) + "..."
    }
    return strsub
    // return a.split(".")[0] + '.' + str;
  },
  /**
   * 得到中心点坐标
   */
  getCenterLocation: function() {
    var that = this;
    //mapId 就是你在 map 标签中定义的 id
    var mapCtx = wx.createMapContext(mapId);
    mapCtx.getCenterLocation({
      success: function(res) {
        console.log('getCenterLocation----------------------->');
        console.log(res);
        that.updateCenterLocation(res.latitude, res.longitude);
        that.regeocodingAddress();
        that.queryMarkerInfo();
      }
    })
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
    this.mapCtx = wx.createMapContext('myMap')

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

    console.log('地图定位！')
    let that = this
    wx.getLocation({
      type: 'gcj02', //返回可以用于wx.openLocation的经纬度
      success: (res) => {
        let latitude = res.latitude;
        let longitude = res.longitude;

        let marker = this.createMarker(res);
        this.setData({
          centerX: longitude,
          centerY: latitude,
          markers: this.getHouseMarkers()
        })
      }
    });

    that.setData({
      winWidth: app.globalData.winWidth,
      winHeight: app.globalData.winHeight,
    })
    console.log(this.data.winHeight)
    that.getHouseJson();  

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