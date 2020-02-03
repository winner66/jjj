import {
  fetch
} from './pRequest';

const apiMall = 'http://49.234.199.223:9090/hob/Api'
const imgCoverPath ='http://49.234.199.223:9090/hob/Public/Imgs/'
const imgSecPath = 'http://49.234.199.223:9090/hob/Public/Upload/'

const getDiscoverList = (params) => pRequest(params, apiMall + '/emall/goods/list?cateidOne=1&cateidTwo=0&price=0&sales=2');
// // fetch(url, method = {}, header = {}, data = {}, loading = true)
// const landPage = (params) => fetch(apiMall + '/Build/landPage',"POST", "", params, true)
// 监管
const getjgJson  = (params) => fetch(apiMall + '/Build/landPage', "POST", "", params, true)
//  // 获取loupan轮播图URL
// const getURLs = (params) => fetch(apiMall + '/Build/getBuildlunbo', "POST", "", params, true)
// 11111111111111111
// 获取楼盘信息
//测试
const getjson = (params) => fetch(apiMall + '/demo/superadmin/getareabyid', "POST", "", params, true)
// 获取楼盘信息
const getHouse = (params) => fetch(apiMall + '/demo/superadmin/getareabyid', "POST", "", params, true)


// 制度
const getRuler = (params) => fetch(apiMall + '/Essay/getRuler', "POST", "", params, true)
// 楼盘见解
const getView = (params) => fetch(apiMall + '/Essay/getView', "POST", "", params, true) 
// 重点制度分析
const getAnaly = (params) => fetch(apiMall + '/Essay/getAnaly', "POST", "", params, true) 
// 制度        -分页
const rulerPage = (params) => fetch(apiMall + '/Essay/rulerPage', "POST", "", params, true) 
// 楼盘见解     -分页
const viewPage = (params) => fetch(apiMall + '/Essay/viewPage', "POST", "", params, true) 
// 重点制度分析   -分页
const analyPage = (params) => fetch(apiMall + '/Essay/analyPage', "POST", "", params, true) 

// 获取银行类别
const getBankType = (params) => fetch(apiMall + '/Bank/getBankType', "POST", "", params, true) 
// 获取对应类别下的银行 POST type(int)
const getBank = (params) => fetch(apiMall + '/Bank/getBank', "POST", "", params, true) 
// 获取监管信息
const getjg = (params) => fetch(apiMall + '/Bank/getjg', "POST", "", params, true) 


// 获取楼盘信息-分页
const buildPage = (params) => fetch(apiMall + '/Build/buildPage', "POST", "", params, true) 

// 获取楼盘信息-
const getBuild = (params) => fetch(apiMall + '/Build/getBuild', "POST", "", params, true) 

// 获取楼盘渠道 -分页
const canalsPage = (params) => fetch(apiMall + '/Build/canalsPage', "POST", "", params, true) 
// 获取楼盘渠道
const getCanals = (params) => fetch(apiMall + '/Build/getCanals', "POST", "", params, true) 
// 根据楼盘名获取渠道
const canaleByBuild = (params) => fetch(apiMall + '/Build/getCanaleByBuild', "POST", "", params, true)



// 获取楼盘活动
const getActivity = (params) => fetch(apiMall + '/Build/getActivity', "POST", "", params, true) 
// 获取楼盘活动-分页
const activityPage = (params) => fetch(apiMall + '/Build/activityPage', "POST", "", params, true) 
// 根据楼盘名获取活动
const acvivityByBuild = (params) => fetch(apiMall + '/Build/getAcvivityByBuild', "POST", "", params, true)

// 获取建设进度
const getSchedule = (params) => fetch(apiMall + '/Build/getSchedule', "POST", "", params, true) 

// 获取建设进度-分页
const schedulePage = (params) => fetch(apiMall + '/Build/schedulePage', "POST", "", params, true) 
// 根据楼盘名获取建设进度
const scheduleByBuild = (params) => fetch(apiMall + '/Build/getScheduleByBuild', "POST", "", params, true)

// 获取土拍信息
const getLand = (params) => fetch(apiMall + '/Build/getLand', "POST", "", params, true)  

// 获取土拍信息-分页
const landPage = (params) => fetch(apiMall + '/Build/getLand', "POST", "", params, true) 

// 获取申请代办
const apply = (params) => fetch(apiMall + '/Vip/apply', "POST", "", params, true)  

// 获取显示所有楼盘的
const getLouPan = (params) => fetch(apiMall + '/Vip/loupan', "POST", "", params, true)  
// 获取用户的所有信息
const getUserInfo = (params) => fetch(apiMall + '/Vip/getuser', "POST", "", params, true)  

// 用户名是否能用
const userNameOnly = (params) => fetch(apiMall + '/Vip/can_use', "POST", "", params, true) 
const registe = (params) => fetch(apiMall + '/Vip/register', "POST", "", params, true) 
const login = (params) => fetch(apiMall + '/Vip/login', "POST", "", params, true) 

// 置业计算首页图片
const cptImgs = (params) => fetch(apiMall + '/Other/getlunbo', "POST", "", params, true)
// 楼盘动态首页图片 和id
const houseImgs = (params) => fetch(apiMall + '/Build/getBuildlunbo', "POST", "", params, true)

// 
const serachBuild = (params) => fetch(apiMall + '/Build/serachBuild', "POST", "", params, true)
// test
const test1 = (params) => fetch(apiMall + '/Other/test', "POST", "", params, true) 
// test
const test2 = (params) => fetch(apiMall + '/Other/testint', "POST", "", params, true) 
// test
const test3 = (params) => fetch(apiMall + '/Other/testchange', "POST", "", params, true) 
// test
const test4 = (params) => fetch(apiMall + '/Other/testchange', "POST", "", params, true) 

//商品接口---end
//用户相关信息--begin
//用户的当天签到信息
// const userSginInfo = (params) => fetch(apiMall + '/Essay/getView', "POST", "", params, true)  + '/emall/api/userSign/signInfo');

export default {
  test1,
  test2,
  test3,
  // 根据楼盘id查 建设进度 优惠活动 渠道
  canaleByBuild,
  acvivityByBuild,
  scheduleByBuild,
  // 置业计算首页图片
  cptImgs,
  // 封面图片
  imgCoverPath,
  // 文章图片
  imgSecPath,
  landPage,
  // 监管
  getjgJson,
  // 获取轮播图URL
  // getURLs,
  houseImgs,
  // 路径
  // paths,
  
  // 1111111111111111111
  // hostGoodsList,
  getjson,
  getHouse,
  // 会员
  login,
  registe,
  userNameOnly,
  getUserInfo,
  // 所有楼盘vip
  getLouPan,
  // 代办
  apply,

  // 制度解析
  getAnaly,
  analyPage,
  // 制度
  getRuler,
  rulerPage,
  // 楼市见解
  getView,
  viewPage,


  // 楼盘
  buildPage,
  getBuild,
  // 楼盘渠道
  canalsPage,
  getCanals,
  // 土拍
  landPage,
  getLand,
  // 建筑进度
  schedulePage,
  getSchedule,
  // 楼盘活动
  getActivity,
  activityPage,

  // 银行
  getBankType,
  getBank,
  getjg,
  serachBuild, 
  
}
