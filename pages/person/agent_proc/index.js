// pages/person/agent_proc/index.js
Page({

  data: {
    name: null,
    phone: null,

    mortgages: null,
    housename: null,
    // 付款方式
    methods: "全款",
    // 当前状态
    condition: "取证",
    // 刻度条
    progess: null,
    // 当前在 刻度条的位置
    p: null,
    width:null,

    allPro: [{
        progess: 0,
        name: "申请",
        status: false,
      },
      {
        progess: 15,
        name: "审核",
        status: false,
      },
      {
        progess: 30,
        name: "接件",
        status: false,
      },
      {
        progess: 45,
        name: "网签监管",
        status: false,
      },
      {
        progess: 60,
        name: "过户",
        status: false,
      },
      {
        progess: 80,
        name: "取证",
        status: false,
      },
      {
        progess: 100,
        name: "取监管",
        status: false,
      },
    ],

    commPro: [{
        progess: 0,
        name: "申请",
        status: false,
      },
      {
        progess: 10,
        name: "审核",
        status: false,
      },
      {
        progess: 20,
        name: "接件",
        status: false,
      },
      {
        progess: 30,
        name: "网签监管",
        status: false,
      },
      {
        progess: 40,
        name: "银行预审",
        status: false,
      },
      {
        progess: 50,
        name: "预审通过",
        status: false,
      },
      {
        progess: 60,
        name: "过户",
        status: false,
      },
      {
        progess: 70,
        name: "取证",
        status: false,
      },
      {
        progess: 80,
        name: "取监管",
        status: false,
      },
      {
        progess: 90,
        name: "抵押",
        status: false,
      },
      {
        progess: 100,
        name: "放款",
        status: false,
      }
    ],

    gPro: [{
        progess: 0,
        name: "申请",
        status: false,
      },
      {
        progess: 5,
        name: "审核",
        status: false,
      },
      {
        progess: 10,
        name: "接件",
        status: false,
      },
      {
        progess: 20,
        name: "网签监管",
        status: false,
      },
      {
        progess: 30,
        name: "银行预审",
        status: false,
      },
      {
        progess: 40,
        name: "预审通过",
        status: false,
      },
      {
        progess: 50,
        name: "过户",
        status: false,
      },
      {
        progess: 60,
        name: "取证",
        status: false,
      },
      {
        progess: 70,
        name: "取监管",
        status: false,
      },
      {
        progess: 80,
        name: "银行复审",
        status: false,
      },
      {
        progess: 90,
        name: "抵押",
        status: false,
      },
      {
        progess: 100,
        name: "放款",
        status: false,
      }
    ],
  },

 
  // 刻度条
  jindutiao: function(methods) {
    var that = this;
    let jindutiao =["dfdsf"];

    if (methods == "全款") {
      // 赋值未成功
      jindutiao = that.data.allpro;
      var tmp = JSON.stringify(that.data.allpro);
      console.log(tmp);
   

    } else if (methods == "商贷") {
      jindutiao = that.data.commPro;
    } else {
      jindutiao = that.data.gPro;
    }


    var num = that.data.condition;
    var p = 0;
    for (var i = 0; i < jindutiao.length; i++) {
      if (jindutiao[i].name == num) {
        p = i;
        break;
      }
    }
    if (i == jindutiao.length) {
      p = i;
    }
    for (var j = 0; j < p; j++) {
      jindutiao[j].status = true;
    }
    // if (p == 0) {
    //   num = 0.5 / jindutiao.length * 100;

    // } else if (jindutiao[p - 1].num < num) {
    //   num = (p + 0.5) / jindutiao.length * 100;
    //   //毕竟不是当前进度等分，所以让他在等于8，7，6的时候也能在中间。就加0.5
    // } else {
    //   num = p / jindutiao.length * 100;
    //   //当前黄色进度长度就是当前人数除以总人数乘以100，就是进度条宽度的百分比。
    // }
    that.setData({
      width: jindutiao[p].progess,
      p: p,
      progess: jindutiao
    })
    var tmp = JSON.stringify(this.data.progess);
    console.log(tmp);
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
    // this.jindutiao(this.data.methods);
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
})