
import regeneratorRuntime from '../../utils/runtime';
import apis from '../../utils/apis';
import tip from '../../utils/tip';
var base64 = require('../../utils/base.js');
// var base64 = require('../../utils/base_64.js');

var path = 'http://49.234.199.223:9090';
const app = getApp();


Page({
  data: {
    categories: [{
      name: "制度汇总",
      id: 0,
      active: true,
      banks: [],
    }, {
      name: "重点解析",
      id: 1,
      active: false,
        banks: [],
    }, {
      name: "楼市见解",
      id: 2,
      active: false,
      banks:[],
    }],
    img: "../../assets/images/tarbar_cpt/h1.jpg",
    // categoryData: {},
    currentIndex: 0,
    childcateList: [],  

    // 宽高
    winWidth: 0,
    winHeight: 0

  },
  onLoad: function (options) {
    var page = this;

    wx.getSystemInfo({
      success: function (res) {
        console.log(res);
        page.setData({ winWidth: res.windowWidth });
        page.setData({ winHeight: res.windowHeight });
      }
    })
    // 1.请求分类数据
    this.getjgJson();
    //  JSON.parse(str);
    console.log("getjg-jsonload :" + JSON.stringify(this.data.categories))
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
      tem[0].active=true;
      this.setData({
        categories: tem,
        // itemName:tem[0]
        currentIndex: 0,
        childcateList: tem[0].banks,  
      })
    }
    //  JSON.parse(str);
    console.log("getjg-json :"+ this.data.categories )
  },


  changeCate: function (e) {
    // 1.改变当前的currentIndex
    console.log(e)
    let that = this;
    var currentIndex = e.currentTarget.dataset.code;
    let jg = this.data.categories;
    let tem=[];
    for (var item in jg) {
      var t = 'true';
      var f = 'false';
      console.log("item.id:" + jg[item].id);
      // console.log("e.currentTarget.dataset.item.id:" + e.currentTarget.dataset.item.id);
      if (item == e.currentTarget.dataset.code) {
        // 选中
        jg[item].active = true;
        tem=jg[item].banks;
      } else {
        jg[item].active = false;

      }
    }
    this.setData({
      categories: jg,
      currentIndex: currentIndex,
      childcateList: tem,
    })
   
    
  },
  gotoDetail: function (e) {
    // if (mLoading) return;
    // var item = e.target.dataset.item;
    var item = e.currentTarget.dataset.item;
    // console.log(e.currentTarget.dataset.item);

    if (item) {
      wx.navigateTo({
        // + JSON.stringify(item)
        url: '/pages/computer/index',
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
          res.eventChannel.emit('data', {
            data: item
          })
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