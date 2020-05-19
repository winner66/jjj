// pages/computer/computer-menu.js
// pages/dynamic/dynamic-menu.js
import regeneratorRuntime from '../../utils/runtime';
import apis from '../../utils/apis';


const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 使用说明显示标签
    isTipTrue:true,

    autoplay: true,
    // 自动切换时间间隔
    interval: 5000,
    // 滑动动画时长
    duration: 500,
    // 是否显示面板指示点
    indicatorDots: true,
    swiperCurrent: null,

    // image组件默认宽度300px、高度225px
    img_urls: ["../../assets/images/tarbar_cpt/h2.jpg", "../../assets/images/tarbar_cpt/h2.jpg", "../../assets/images/tarbar_cpt/h3.jpg"],
    // 图片对应的链接
    links: [
      '../user/user',
      '../user/user',
      '../user/user'
    ],
    // 
    // secFlag:0 ,
    // 区域  0 未选中当前地区 1：未选中
    jgArea: [{
        id: "001",
        areaName: "顺庆",
        active: "true",
        banks: [{
            bankname: "建设银行",
            accountname: "多少是多少",
            account: "324",
            cun: "存入网点1",
            zhi: "支出网点1",
          },
          {
            bankname: "建设银行",
            accountname: "多少是多少",
            account: "324",
            cun: "存入网点2",
            zhi: "支出网点2",

          },
          {
            bankname: "农业银行",
            accountname: "多少是多少",
            account: "324",
            cun: "存入网点3",
            zhi: "支出网点3",

          }
        ]
      },
      {
        id: "002",
        areaName: "嘉琳",
        active: "false",
        banks: [{
          bankname: "建设银行",
          accountname: "多少是多少",
          account: "324",
          cun: "存入网点1",
          zhi: "支出网点1",

        }, {
          bankname: "建设银行",
          accountname: "多少是多少",
          account: "324",
          cun: "存入网点2",
          zhi: "支出网点2",

        }, {
          bankname: "农业银行",
          accountname: "多少是多少",
          account: "324",
          cun: "存入网点3",
          zhi: "支出网点3",

        }]
      },
      {
        id: "003",
        areaName: "高坪",
        active: "false",
        banks: [{
          bankname: "建设银行",
          accountname: "多少是多少",
          account: "324",
          cun: "存入网点1",
          zhi: "支出网点1",

        }, {
          bankname: "建设银行",
          accountname: "多少是多少",
          account: "324",
          cun: "存入网点2",
          zhi: "支出网点2",

        }]
      }
    ]
  },
  // 某区域的银行列表
  itemName: [{
    id: "003",
    areaName: "高坪",
    active: "ture",
    banks: [{
      bankname: "建设银行",
      accountname: "多少是多少",
      account: "324",
      cun: "存入网点1",
      zhi: "支出网点1",

    }, {
      bankname: "建设银行",
      accountname: "多少是多少",
      account: "324",
      cun: "存入网点2",
      zhi: "支出网点2",

    }]
  }],

  // 点击地区的事件
  areaChange: function(e) {
   
    let jg=this.data.jgArea;
    for(var item in jg){
      var t='true';
      var f ='false';
      console.log("item.id:" + jg[item].id);
      console.log("e.currentTarget.dataset.item.id:" + e.currentTarget.dataset.item.id);
      if (jg[item].id == e.currentTarget.dataset.item.id){
        // 选中
        jg[item].active= t;
      }else{
        jg[item].active = f;
      }
    }
    this.setData({
      itemName: e.currentTarget.dataset.item,
      jgArea:jg
    })
  },
  swiperchange: function(e) {
    this.setData({
      swiperCurrent: e.detail.current
    })
  },
  //点击指示点切换
  chuangEvent: function(e) {
    this.setData({
      swiperCurrent: e.currentTarget.id
    })
  },
  //点击图片触发事件
  swipclick: function(e) {
    console.log(this.data.swiperCurrent);
    // 跳转到 tabBar 页面，并关闭其他所有非 tabBar 页面
    wx.switchTab({
      url: this.data.links[this.data.swiperCurrent]

    })
  },
  // 房贷
  cptchange: function(e) {
    let that = this;
    wx.navigateTo({
      url: '/pages/cpt/cpt',
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
  taxchange: function(e) {
    let that = this;
    wx.navigateTo({
      url: '/pages/tAX/index',
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
  // 置业单
  housechange: function(e) {
    // // 判断是否是会员
    // if (app.globalData.user_token == null || app.globalData.user_token == '') {
    //   wx.showToast({

    //     title: "请注册会员",

    //     duration: 3000, //提示的延迟时间，单位毫秒，默认：1500 

    //     mask: false, //是否显示透明蒙层，防止触摸穿透，默认：false        

    //   })
    // } else { }
      let that = this;
      wx.navigateTo({
        url: '/pages/house/index?tag=0',
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
  // 评税建议
  ptaxchange:function(e){
    let that = this;
    wx.navigateTo({
      url: '/pages/ptax/index'     
    })
  },
  gotoDetail: function(e) {
    let that = this;
    console.log(e);
    var item = e.currentTarget.dataset.item;
    console.log(item);
    wx.navigateTo({
      url: '/pages/computer/index',
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
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  
   

  },
 
  // 获取轮播图URL
  getURLs: async function () {

    const json = await apis.cptImgs({
        data: {        }
      });
  //      // // // image组件默认宽度300px、高度225px
  // // img_urls: ["../../assets/images/tarbar_cpt/h2.jpg", "../../assets/images/tarbar_cpt/h2.jpg", "../../assets/images/tarbar_cpt/h3.jpg"],
  // // // 图片对应的链接
 
      if (json == '') {
        // tip.error('json错误',true);
        console.log("没有获取到数据")
      } else {
        console.log(json)
        console.log(json[0])
        let tem =[];
        tem = json[0].imgs;
        // for (var i = 0; i < tem.length; i) {
        //   tem[index] = apis.imgCoverPath + tem[index];
        //   console.log(i, tem[i]);
        // }
        for (var index in tem){
          tem[index] = apis.imgCoverPath + tem[index];
          console.log(index + ":   " + tem[index])
        }   
        console.log( ":   " + tem)   
        this.setData({
          img_urls: tem,          
        })
      }  
    console.log("getcompter-json :" + JSON.stringify(this.data.img_urls))

    },
  // 获取监管
  getjgJson: async function () {

    const json = await apis.getjg({
      data: {       
      }
    });   
    console.log(json);
    if (json == '') {
      console.log("没有获取到数据")
    } else {  
      var tem = json;  
   
      var temp = [];
       
      for(var i=0;i<tem.length;i++){
        if(tem[i].banks.length>0){
          var temitem = {};
          temitem["id"] = tem[i].id;
          temitem["active"]=tem[i].active;
          temitem["areaName"] = tem[i].areaName;
          temitem["area_id"] = tem[i].area_id;
          temitem["area_name"] = tem[i].area_name;
          temitem["banks"] = tem[i].banks;
          temp.push(temitem)
        }        
      }    
      this.setData({
        jgArea:temp,
        // itemName:tem[0]
      })
    }
    //  JSON.parse(str);
    console.log("getjg-json :" + JSON.stringify(this.data.jgArea))

    // if (json=='') {
     
    //   console.log("没有获取到数据")
    // }   else {    
    //   var tem = json; 
    //   tem[0].active='true';
    //   this.setData({
    //     jgArea:tem,
    //     itemName:tem[0]
    //   })
    // }
    // //  JSON.parse(str);
    // console.log("getjg-json :" + JSON.stringify(this.data.jgArea))

  },
  jgchange:function(e){
    let that = this;
    wx.navigateTo({
      url: '/pages/jg/index',
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
        var commData = {
        }
        res.eventChannel.emit('data', {
          data: commData
        })
      }
    })
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
    // // 轮播
    this.getURLs()
    // // 监管
    this.getjgJson()

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