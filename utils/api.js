import {
  wxRequest
} from './wxRequest';
// 此js 废弃 用apis.js
// /118.24.1.237
// const apiMall = 'http://49.234.199.223:9090/hob/Api';
// const paths = 'http://49.234.199.223:9090/hob/Api';
const apiMall = 'http://118.24.1.237:9090/hob/Api';
const paths = 'http://118.24.1.237:9090/hob/Api';

const getDiscoverList = (params) => wxRequest(params, apiMall + '/emall/goods/list?cateidOne=1&cateidTwo=0&price=0&sales=2');

//微信的jscode换取sessionKey
const wxJsCode2Session = (params) => wxRequest(params, apiMall + "/emall/api/wechat/jscode2session");
const user2session = (params) => wxRequest(params, apiMall + "/emall/api/wechat/user2session?jsoncallback=?");
//测试
const getjson = (params) => wxRequest(params, apiMall+"/demo/superadmin/getareabyid");
// 获取楼盘信息
const getHouse = (params) => wxRequest(params, apiMall + "/demo/superadmin/getareabyid");

// 制度
const getRuler=(params) => wxRequest(params, apiMall + "/Essay/getRuler");
// 楼盘见解
const getView = (params) => wxRequest(params, apiMall + "/Essay/getView");
// 重点制度分析
const getAnaly = (params) => wxRequest(params, apiMall + "/Essay/getAnaly");
// 制度        -分页
const rulerPage = (params) => wxRequest(params, apiMall + "/Essay/rulerPage");
// 楼盘见解     -分页
const viewPage = (params) => wxRequest(params, apiMall + "/Essay/viewPage");
// 重点制度分析   -分页
const analyPage = (params) => wxRequest(params, apiMall + "/Essay/analyPage");

// 获取银行类别
const getBankType = (params) => wxRequest(params, apiMall + "/Bank/getBankType");
// 获取对应类别下的银行 POST type(int)
const getBank = (params) => wxRequest(params, apiMall + "/Bank/getBank");
// 获取监管信息
const getjg = (params) => wxRequest(params, apiMall + "/Bank/getjg");


// 获取楼盘信息-分页
const buildPage = (params) => wxRequest(params, apiMall + "/Build/buildPage");

// 获取楼盘信息-
const getBuild = (params) => wxRequest(params, apiMall + "/Build/getBuild");

// 获取楼盘渠道 -分页
const canalsPage = (params) => wxRequest(params, apiMall + "/Build/canalsPage");

// 获取楼盘渠道
const getCanals = (params) => wxRequest(params, apiMall + "/Build/getCanals");
// http://118.24.1.237/hob/Api/Ershou
// 获取二手房
const getErshou = (params) => wxRequest(params, apiMall + "/Ershou");



// 获取楼盘活动
const getActivity = (params) => wxRequest(params, apiMall + "/Build/getActivity");

// 获取楼盘活动-分页
const activityPage = (params) => wxRequest(params, apiMall + "/Build/activityPage");

// 获取建设进度
const getSchedule = (params) => wxRequest(params, apiMall + "/Build/getSchedule");

// 获取建设进度-分页
const schedulePage = (params) => wxRequest(params, apiMall + "/Build/schedulePage");

// 获取土拍信息
const getLand = (params) => wxRequest(params, apiMall + "/Build/getLand");

// 获取土拍信息-分页
const landPage = (params) => wxRequest(params, apiMall + "/Build/landPage");


// 获取申请代办
const apply = (params) => wxRequest(params, apiMall + "/Vip/apply");

// 获取显示所有楼盘的
const getLouPan = (params) => wxRequest(params, apiMall + "/Vip/loupan");
// 获取用户的所有信息
const getUserInfo = (params) => wxRequest(params, apiMall + "/Vip/getuser");

// 用户名是否能用
const userNameOnly = (params) => wxRequest(params, apiMall + "/Vip/can_use");
// 用户注册
const registe = (params) => wxRequest(params, apiMall + "/Vip/registe");

//商品接口---end
//用户相关信息--begin
//用户的当天签到信息
const userSginInfo = (params) => wxRequest(params, apiMall + '/emall/api/userSign/signInfo');

// 用户注册
// const registe = (params) => wxRequest(params, apiMall + "/Vip/registe");

export default {
  // hostGoodsList,
  getjson,
  getHouse,
  
  // 会员
  registe,
  userNameOnly,
  getUserInfo,
  // 所有楼盘
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
  paths,
}


 