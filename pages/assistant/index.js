// pages/assistant/index.js
// 二手
import regeneratorRuntime from '../../utils/runtime';
import apis from '../../utils/apis';
import tip from '../../utils/tip';
var base64 = require('../../utils/base.js');
// var base64 = require('../../utils/base_64.js');

// var path = 'http://49.234.199.223:9090';
var path = "http://118.24.1.237";
const app = getApp();


Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 使用说明显示标签
    isTipTrue: true,
    categories: [{
      name: "二手",
      id: 0,
      active: true,
    }, {
      name: "互助",
      id: 1,
      active: false,
    }, 
    ],
    img: "../../assets/images/tarbar_cpt/h1.jpg",
    // categoryData: {},
    currentIndex: 0,
    childcateList: [],
    helpList: [],
    erShouList:[],

    // 宽高
    winWidth: 0,
    winHeight: 0,
    // 分页
    page:1,
    limit:20,
  },
  // 点击弹窗之后- 隐藏
  tipAgree: function () {
    this.setData({
      isTipTrue: false
    })
  },
  // 获取二手帖子
  getErShouJson: async function () {
    var that = this;
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

      var temp = json;

      for (var i = 0; i < json.length; i++) {
        // var tempimg = apis.imgCoverPath + json[i].img;
        // console.log(tempimg); 
        temp[i].img = tempimg;
        var imgs = [];
        for (var j = 0; j < json[i].imgs.length; j++) {
          var tem = apis.imgCoverPath + json[i].imgs[j];
          imgs.push(tem);
        }
        temp[i].imgs = imgs;
        var tempimg = "";
        if (json[i].imgs.length > 0) {
          tempimg = imgs[0];
        }
        temp[i].img = tempimg;
      }
      that.setData({
        erShouList: temp,
        childcateList:temp,
      })
      console.log(temp);
    }
  },
  // 获取帖子
  getHelpJson: async function (page,limit) {
    var that = this;
    const json = await apis.getHelpPage({
      data: {
        page:1,
        limit:20,
      }
    });
    console.log(json);
    if (json == '') {
      console.log("没有获取到数据")
    } else {
      var tem = json.data;
      console.log(json);
      that.setData({
        helpList: tem,
        childcateList: tem,
      })
    }
  },

  _getCategory() {
    const categoryData = {
      // rulesList:[],
      // analyList:[],
      // viewList:[],
    };
    for(var i = 0; i< 3; i++) {
  categoryData[i] = []
    }


// 4.请求第一个类别的数据
this.getHelpJson();
this.getErShouJson();  
    // 3.修改data中的数据
    this.setData({
      categoryData: categoryData,
      childcateList: this.data.erShouList,
    })

},
    changeCate: function (e) {
    // 1.改变当前的currentIndex
    console.log(e)
    let that = this;

    var currentIndex = e.currentTarget.dataset.code;
    that.setData({
      currentIndex: e.currentTarget.dataset.code
    })
    if (e.currentTarget.dataset.code == 1) {
      if (this.data.helpList == undefined || this.data.helpList == []) {
        this.getHelpJson();
      } else {
        let tem = this.data.helpList
        this.setData({
          childcateList: tem
        })
      }
    }else if (e.currentTarget.dataset.code == 0) {
      if (this.data.erShouList == undefined || this.data.erShouList == []) {
        this.getErShouJson();
      } else {
        this.setData({
          childcateList: this.data.erShouList
        })
      }
    }
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
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
    var tag = this.data.currentIndex;
    if(tag==0){
      // 二手
      wx.navigateTo({
        url: './search/search?searchValue=' + keyword,
      });
    }else{
      // 帖子搜索
      wx.navigateTo({
        url: './search/searchPost?searchValue=' + keyword,
      });
    }
   
  },
  //获取标题
  getTitle: function (e) {
    this.setData({
      title: e.detail.value
    });
  },
  //获取文本内容
  getTextarea: function (e) {
    this.setData({
      textarea: e.detail.value
    });
  },

  //发帖
  onPostClick: function (e) {
    var type = "new";
    var tag=this.data.currentIndex;
    wx.navigateTo({
      url: './release/release?type=' + type+"&tag="+tag,
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
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
    // 弹窗
    var that = this;

    that.setData({
      isTipTrue: true
    })
    var page = this;

    wx.getSystemInfo({

      success: function (res) {

        console.log(res);

        page.setData({ winWidth: res.windowWidth });
        page.setData({ winHeight: res.windowHeight });
      }
    })
    // 1.请求分类数据
    this._getCategory()
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