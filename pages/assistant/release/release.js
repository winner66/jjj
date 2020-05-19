//index.js
import apis from '../../../utils/apis';
import regeneratorRuntime from '../../../utils/runtime.js';

var tcity = require("../../../utils/citys.js");
const app = getApp()

Page({
  data: {
    title: "",
    textarea: "",
    tag: [],
    tag_num: [1],
    hiddenmodalput: true,
    //可以通过hidden是否掩藏弹出框的属性，来指定那个弹出框
    clear_input: "",
    imagesList: [],
    // jktian-add

    type: '',
    major_item: {},
    follow_item: {},
    user_name: '',
    src:null,
    //  装修/ 电梯
    isOrNo:[{id:0,name:"是"},{id:1,name:"否"}],
    // 出租
  leaseArray:[{id:0,name:"出租"},{id:1,name:"出售"}],
    yearArray: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40],
    bNatureArray: [{ id: 0, name: "住宅"},{ id: 1, name: "车库"}, { id: 2, name: "商业"}, { id: 3, name: "商住"}, { id: 4, name: "非住宅"}],
    lNatureArray: [{ id: 0, name: "出让"}, { id: 1, name: "纯划拨"}, { id: 2, name: "房改划拨"}],
    trustArray: [{ id: 0, name: "委托"}, { id: 1, name: "不委托"}],
    isFiveArray: [{ id: 0, name: "不满两年"}, { id: 1, name: "满两年"}, { id: 2, name: "满五唯一"}],
    // 省市区
    provinces: [],
    province: "",
    citys: [],
    city: "",
    countys: [],
    county: '',
    provinceCode:0,
    cityCode: 0 ,
    countyCode:0 ,

    value: [0, 0, 0],
    values: [0, 0, 0],
    condition: false,
    // 

    er_name:null,
          // 默认南充市顺庆区
    province_id:510000,
    city_id:511300,
    area_id:511302,
    // 街道
    street:null,
    address:null,
    // 年
    year:4,
    // 二手房面积
    area:90,
    // 土地分摊面积
    landArea:0,
    // 楼层
    houseF:null,
    // 朝向
    face:null,
    // 是否装修 0/1 是/不是
    is_fit:1,
    // 0/1 有/没有
    have_ele:0,
    // 报价
    sell:null,
    //  0/1 出租/ 出售
    is_lease:0,
    // 比如 1988
    build_age:2000,
    // 建筑性质 0/1/3/4  住宅/车库/ 商业/商住/ 非住宅
    build_nature:0,
    // 使用目的
    use:null,
    // 土地性质 0/1/2 出让/ 纯划拨/ 房改划拨
    land_nature:0,
  
    // 是否委托 0/1 委托/不委托
    is_trust:0,
    // 电话号码
    phone:null,
    //  0/ 1/ 2  不满2 /满不唯一/ 满唯一
    is_five:2,
    // 备注，
    explain:null,
    // 图片地址
    // 
    imgList:[],
    imgURL:null, 

    // 
    // 当前计算类型-商业贷 税贷。。。标签
    currentTab: 0,
    // 宽高
    winWidth: 0,
    winHeight: 0,
    // -----------------------互助-------------
    title: "",
    textarea: "",
    imageList: [],

  },
  onShareAppMessage: function () {
    return {
      title: 'title ',
      desc: 'desc',
      path: ''
    }

  },
  // 
  currentChange: function (e) {
    console.log(e)
    this.setData({
      currentTab: e.detail.current
    })
    // console.log('this:', this.data)
    console.log('currentTab:', this.data.currentTab)

  },

  itemClick(e) {
    // 1.设置最新的index
    this.setData({
      currentIndex: e.currentTarget.dataset.index
    })

    // 2.发出时间
    const data = {
      index: this.data.currentIndex
    }
    this.triggerEvent("tabclick", data, {})
  },
  setCurrentIndex(index) {

    this.setData({
      currentIndex: index
    })
    console.log(this.data.currentIndex)
  },
  

  onLoad: function (options) {
   
  },
  onShow:function(options){
    var that = this;
    let type_trans = options.type;
    let tag = options.tag;
    this.setData({
      type: type_trans,
      currentTab: tag
    });
    // type is not  new
    if (type_trans != "new") {
      let item_value = JSON.parse(options.item);
      this.setData({ major_item: item_value });
      console.log('major-post', that.data.major_item);
    }
    var page = this;

    wx.getSystemInfo({

      success: function (systemInfo) {
        console.log(systemInfo);
        // px转换到rpx的比例
        let pxToRpxScale = 750 / systemInfo.windowWidth;
        // 状态栏的高度
        let ktxStatusHeight = systemInfo.statusBarHeight * pxToRpxScale
        // 导航栏的高度
        let navigationHeight = 44 * pxToRpxScale
        // window的高度
        let ktxWindowHeight = systemInfo.windowHeight * pxToRpxScale
        // window的宽度
        let ktxWindowWidth = systemInfo.windowWidth * pxToRpxScale
        // 屏幕的高度
        let ktxScreentHeight = systemInfo.screenHeight * pxToRpxScale
        // 底部tabBar的高度
        let tabBarHeight = ktxScreentHeight - ktxStatusHeight - navigationHeight - ktxWindowHeight
        page.setData({
          winWidth: systemInfo.windowWidth,
          winHeight: ktxWindowHeight
        });
      }
    })

    // 初始化省市区
    tcity.init(that);

    var cityData = that.data.cityData;


    const provinces = [];
    const citys = [];
    const countys = [];

    for (let i = 0; i < cityData.length; i++) {
      provinces.push(cityData[i].name);
    }
    console.log('省份完成');
    for (let i = 0; i < cityData[0].sub.length; i++) {
      citys.push(cityData[0].sub[i].name)
    }
    console.log('city完成');
    for (let i = 0; i < cityData[0].sub[0].sub.length; i++) {
      countys.push(cityData[0].sub[0].sub[i].name)
    }

    that.setData({
      'provinces': provinces,
      'citys': citys,
      'countys': countys,
      'province': cityData[0].name,
      'city': cityData[0].sub[0].name,
      'county': cityData[0].sub[0].sub[0].name,
      'provinceCode': cityData[0].code,
      'cityCode': cityData[0].sub[0].code,
      'countyCode': cityData[0].sub[0].sub[0].code
    })
    console.log('初始化完成');
  },
  // 贷款导航
  switchNav: function (e) {
    var page = this;
    if (this.data.currentTab == e.target.dataset.current) {
      return false;
    } else {
      page.setData({
        currentTab: e.target.dataset.current
      });
    }
  },
  bindChange: function (e) {
    //console.log(e);
    var val = e.detail.value
    var t = this.data.values;
    var cityData = this.data.cityData;

    if (val[0] != t[0]) {
      console.log('province no ');
      const citys = [];
      const countys = [];

      for (let i = 0; i < cityData[val[0]].sub.length; i++) {
        citys.push(cityData[val[0]].sub[i].name)
      }
      for (let i = 0; i < cityData[val[0]].sub[0].sub.length; i++) {
        countys.push(cityData[val[0]].sub[0].sub[i].name)
      }

      this.setData({
        province: this.data.provinces[val[0]],
        provinceCode: cityData[val[0]].code,
        city: cityData[val[0]].sub[0].name,
        cityCode: cityData[val[0]].sub[0].code,
        citys: citys,
        county: cityData[val[0]].sub[0].sub[0].name,
        countyCode: cityData[val[0]].sub[0].sub[0].code,
        countys: countys,
        values: val,
        value: [val[0], 0, 0]
      })

      return;
    }
    if (val[1] != t[1]) {
      console.log('city no');
      const countys = [];
      for (let i = 0; i < cityData[val[0]].sub[val[1]].sub.length; i++) {
        countys.push(cityData[val[0]].sub[val[1]].sub[i].name)
      }
      this.setData({
        city: this.data.citys[val[1]],
        cityCode: cityData[val[0]].sub[val[1]].code,
        county: cityData[val[0]].sub[val[1]].sub[0].name,
        countyCode: cityData[val[0]].sub[val[1]].sub[0].code,
        countys: countys,
        values: val,
        value: [val[0], val[1], 0]
      })
      return;
    }
    if (val[2] != t[2]) {
      console.log('county no');
      this.setData({
        county: this.data.countys[val[2]],
        countyCode: cityData[val[0]].sub[val[1]].sub[val[2]].code,
        values: val
      })
      return;
    }
  },
  open: function () {
    this.setData({
      condition: !this.data.condition
    })
  },
  // 赋值
  getTitle:function(e){
// 
  },
  bindErNameInput: function (e) {
    this.setData({
      er_name: e.detail.value
    })
  },
  addressChange: function (e) {
    this.setData({
      address: e.detail.value
    })
  },
  buildAreaChange: function (e) {
    this.setData({
      area: e.detail.value
    })
  },
  landAreaChange: function (e) {
    this.setData({
      landArea: e.detail.value
    })
  },
  faceChange: function (e) {
    this.setData({
      face: e.detail.value
    })
  },
  houseFChange: function (e) {
    this.setData({
      houseF: e.detail.value
    })
  },
  houseOrigChange: function (e) {
    this.setData({
      use: e.detail.value
    })
  },
  moneyChange: function (e) {
    this.setData({
      sell: e.detail.value
    })
  },
  phoneChange: function (e) {
    this.setData({
     phone: e.detail.value
    })
  },
  //获取文本内容
  getExplain: function (e) {
    this.setData({
      explain: e.detail.value
    });
  }, 

  // 移除图片
  removeImage(e) {
    const idx = e.target.dataset.idx
    this.data.imagesList.splice(idx, 1)
    // $digest(this)   //？
  },

  // end page
// 预览图片
  handleImagePreview(e) {
    const idx = e.target.dataset.idx
    const images = this.data.imagesList
    wx.previewImage({
      current: images[idx],  //当前预览的图片
      urls: images,  //所有要预览的图片
    })
  },
  //跳转到发送
  Next: function (e) {

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
 
  
  uploadPhoto: function () {
    var that = this;
    var imagesList= that.data.imagesList;
    wx.chooseImage({
      count: 9, // 默认9
      sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths;
        // this.upload(that, tempFilePaths);
        var tempFiles = tempFilePaths;
        var imges= that.data.imageList;

        if(tempFilePaths.length<9){
          for (var i = 0; i < (9 - tempFilePaths.length);i++) {
            // tempFiles[i]['upload_percent'] = 0
            // tempFiles[i]['path_server'] = ''
            tempFiles.push(imges[i])
          }
        }
        
        console.log(tempFiles);
        //显示
        that.setData({
          imagesList: tempFiles,
        })
        this.upload();
      }
    })
  },

  upload: function () {
    var that = this;
    var imagesList = that.data.imagesList;
    wx.showToast({
      icon: "loading",
      title: "正在上传"
    })
    var uploadImgCount = 0;
    for (var j in imagesList) {     
        upload_file_server(page, imagesList, j)
      
    }
    // for (var i = 0, h = path.length; i < h; i++) {  
    //   wx.uploadFile({
    //     url: apis  ,  //?
    //     filePath: path[i],
    //     name: 'upload_file',
    //     header: { "Content-Type": "multipart/form-data" },
    //     formData: {
    //       //和服务器约定的token, 一般也可以放在header中
    //       'imgIndex' :i,
    //       'session_token': wx.getStorageSync('session_token')
    //     },
    //     success: function (res) {
    //       console.log(res);
    //       uploadImgCount++;
    //       if (res.statusCode != 200) {
    //         wx.showModal({
    //           title: '提示',
    //           content: '上传失败',
    //           showCancel: false
    //         })
    //         return;
    //       }
    //       var data = JSON.parse(res.data);
          //服务器返回格式: { "Catalog": "testFolder", "FileName": "1.jpg", "Url": "https://test.com/1.jpg" }  
          // var productInfo = that.data.productInfo;
          // if (productInfo.bannerInfo == null) {
          //   productInfo.bannerInfo = [];
          // }
          // productInfo.bannerInfo.push({
          //   "catalog": data.Catalog,
          //   "fileName": data.FileName,
          //   "url": data.Url
          // });
          // that.setData({
          //   productInfo: productInfo
          // });  
    //       var data = res.data
    //       page.setData({  //上传成功修改显示头像
    //         src: path[i]
    //       })
    //       //如果是最后一张,则隐藏等待中  
    //       if (uploadImgCount == tempFilePaths.length) {
    //         wx.hideToast();
    //       }  
    //     },
    //     fail: function (e) {
    //       console.log(e);
    //       wx.hideToast();  //隐藏Toast
    //       wx.showModal({
    //         title: '提示',
    //         content: '上传失败',
    //         showCancel: false
    //       })
    //     },
      
    //   })
    // }
  },
  /* 帖子----点击发送按钮，上传数据*/
  insert_post2: async function (e) {
    var that = this;
    var mname = that.data.user_name; 
    var userId = that.data.user_id; 
    if (!that.data.title) {
      wx.showModal({
        title: '请填写帖子标题',
        confirmText: '确定',
        cancelText: '取消',
      })

    }
    else if (!that.data.textarea) {
      wx.showModal({
        title: '请填写内容',
        confirmText: '确定',
        cancelText: '取消',
      })

    }else{
      var createTime= new Date();
      var data_item = {
        // _id: 'todo-identifiant-aleatoire', // 可选自定义 _id，在此处场景下用数据库自动分配的就可以了
       title: that.data.title,
       user_id:userId,
        content: that.data.textarea,

        img: that.data.imageList,
        createtime:"",
      };


      if (that.data.type == "new") {
        // 新建   
        const json = await apis.regHelp({
          data: data_item
        })
        console.log(json);
        if (json == 1) {
          wx.showToast({
            title: '发布成功',
            duration: 2000,
          })
        }
      } else {
        // 修改      
        console.log("111");
      }
    }    
  },

  /* 二手------点击发送按钮，上传数据*/
  insert_post: async function (e) {
    var that = this;
    var mname = that.data.user_name; 
    console.log(that.data.er_name);
    if (!that.data.er_name) {
      wx.showModal({
        title: '请填写二手房楼盘名',
        confirmText: '确定',
        cancelText: '取消',
      })

    } 
   else  if (!that.data.area) {
      wx.showModal({
        title: '请填写建筑面积',
        confirmText: '确定',
        cancelText: '取消',
      })

    }
    else if (!that.data.address) {
      wx.showModal({
        title: '请填写详细地址',
        confirmText: '确定',
        cancelText: '取消',
      })

    }
    else if (!that.data.sell) {
      wx.showModal({
        title: '请填写报价',
        confirmText: '确定',
        cancelText: '取消',
      })

    }
    else if (!that.data.face) {
      wx.showModal({
        title: '请填写朝向',
        confirmText: '确定',
        cancelText: '取消',
      })

    }
    else if (!that.data.houseF) {
      wx.showModal({
        title: '请填写楼层',
        confirmText: '确定',
        cancelText: '取消',
      })

    }
    else if (!that.data.phone) {
      wx.showModal({
        title: '请填写联系方式',
        confirmText: '确定',
        cancelText: '取消',
      })

    }
   else  if (!that.data.explain) {
      wx.showModal({
        title: '请填写附加说明',
        confirmText: '确定',
        cancelText: '取消',
      })

    }else{

   
    var data_item = {
      // _id: 'todo-identifiant-aleatoire', // 可选自定义 _id，在此处场景下用数据库自动分配的就可以了
      er_name : that.data.er_name,
      province_id: 510000,
      city_id: 511300,
      area_id: 511302,
      street: that.data.street,
      address: that.data.address,
      area: that.data.area,
      is_fit: that.data.is_fit,
      have_ele: that.data.have_ele,
      // 报价
      sell: that.data.sell,
      is_lease: that.data.is_lease,
      // 比如 1988
      build_age: that.data.build_age,
      // 建筑性质 0/1/3/4  住宅/车库/ 商业/商住/ 非住宅
      build_nature: that.data.build_nature,
      land_nature:that.data.land_nature,
      is_trust: 0,
      // 电话号码
      phone: that.data.phone,
      //  0/ 1/ 2  不满2 /满不唯一/ 满唯一
      is_five: that.data.is_five,
      // 备注，
      explain: that.data.explain,
      img: that.data.imgList,
    };
   
   
    if(that.data.type=="new"){
      // 新建   
      const json = await apis.regErShou({
        data:data_item
      })
     if(json==1){
       wx.showToast({
         title: '发布成功',
         duration:2000,
       })
     }
    }else{
      // 修改      
    }
  }
  },

})

function upload_file_server(that, upload_picture_list, j) {
  var time = new Date()
  var userId="111"
  var datetime = tt.formatTime(time)//获取时间 防止命名重复
  var date = datetime.substring(0, 8)//获取日期 分日期 文件夹存储
  console.log("开始上传" + j + "图片到服务器：")
  //上传返回值
  var upload_task = wx.uploadFile({
    url: 'http://118.24.1.237/hob/Api/Essay/upload_img',//需要用HTTPS，同时在微信公众平台后台添加服务器地址  
    filePath: upload_picture_list[j], //上传的文件本地地址    
    name: 'file',
    formData: {
      'num': j,
      'datetime': datetime,
      'date': date,
      'user': userId
    },
    //附近数据，这里为路径    
    success: function (res) {
      console.log(res.data)
      var data = JSON.parse(res.data)
      //字符串转化为JSON  
      if (data.Success == true) {
        console.log('OK')
        //var filename = "http://127.0.0.1:8095/" + data.file//存储地址 显示
        var filename = data.file//存储地址 显示
        upload_picture_list[j]['path_server'] = filename
      } else {
        var filename = "http://127.0.0.1:8095/xx.png" //错误图片 显示
        upload_picture_list[j]['path_server'] = filename
      }
      that.setData({
        imagesList: upload_picture_list
      })
    }
  })

//上传 进度方法
upload_task.onProgressUpdate((res) => {
  upload_picture_list[j]['upload_percent'] = res.progress
  //console.log('第' + j + '个图片上传进度：' + upload_picture_list[j]['upload_percent'])
  //console.log(upload_picture_list)
  that.setData({ imagesList: upload_picture_list })
})
}