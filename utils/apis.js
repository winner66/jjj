import {
  fetch
} from './pRequest';

// const apiMall = 'http://49.234.199.223:9090/hob/Api'
// const imgCoverPath ='http://49.234.199.223:9090/hob/Public/Imgs/'
// const imgSecPath = 'http://49.234.199.223:9090/hob/Public/Upload/'

const apiMall = 'http://jjrzj.top/hob/index.php/Api'
// 封面图片
const imgCoverPath ='http://jjrzj.top/hob/Public/Imgs/'
// 文章内部图片
const imgSecPath = 'http://jjrzj.top/hob/Public/Upload/'
// 视频
const videoPath = 'http://jjrzj.top/hob/Public/'

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
// 有更新
const registe = (params) => fetch(apiMall + '/Vip/register', "POST", "", params, true) 
const login = (params) => fetch(apiMall + '/Vip/login', "POST", "", params, true) 

// 置业计算首页图片
const cptImgs = (params) => fetch(apiMall + '/Other/getlunbo', "POST", "", params, true)
// 楼盘动态首页图片 和id
const houseImgs = (params) => fetch(apiMall + '/Build/getBuildlunbo', "POST", "", params, true)
// serachBuild --可能有错
const serachBuild = (params) => fetch(apiMall + '/Build/serachBuild', "POST", "", params, true)

// 2020-05-09---新增
// 获取二手房信息
const getErShou = (params) => fetch(apiMall + '/Ershou/getErShou', "POST", "", params, true)
// 二手房登记
const regErShou = (params) => fetch(apiMall + '/Ershou/reErShou', "POST", "", params, true)
// 搜索二手房
const serachErShou = (params) => fetch(apiMall + '/Ershou/serachErShou', "POST", "", params, true)

// 二手房分页
const erShouPage = (params) => fetch(apiMall + '/Ershou/ErShouPage', "POST", "", params, true)
// 2020-05-11经济课堂

//获取 经济课堂
const getStudy = (params) => fetch(apiMall + '/Essay/getStudy', "POST", "", params, true)

// 获取 经济课堂 分页
const studyPage = (params) => fetch(apiMall + '/Essay/studyPage', "POST", "", params, true)

//客源推荐(报备)
// 
const  getReport= (params) => fetch(apiMall + '/Vip/report', "POST", "", params, true)

// phone是否是 唯一   1没有用过
const isUniPhone = (params) => fetch(apiMall + '/Vip/can_phone', "POST", "", params, true)
// 获取某用户的所有的报备（by id）
const get_ReportById = (params) => fetch(apiMall + '/Vip/get_ReportById', "POST", "", params, true)

// 用户续费（传某用户的id）
const getXuFei = (params) => fetch(apiMall + '/Vip/XuFei', "POST", "", params, true)


// 回复贴删除 helprDelete
const helperDelete = (params) => fetch(apiMall + '/Essay/helprDelete', "POST", "", params, true)
// 获取某用户的所有回复贴 - get_helpr_user_all
const getRepHelpByUserid = (params) => fetch(apiMall + '/Essay/get_helpr_user_all', "POST", "", params, true)
// 获取某人全部 互助贴 -?分页 get_helpr_user
const getHelpByUserid = (params) => fetch(apiMall + '/Essay/get_helpr_user', "POST", "", params, true)
//  回复贴 分页 get_helpr
const getRepHelpPage = (params) => fetch(apiMall + '/Essay/get_helpr', "POST", "", params, true)
//  回复贴-发布 helprPublish
const regRepHelp = (params) => fetch(apiMall + '/Essay/helprPublish', "POST", "", params, true)
// 互助贴 修改 help_update
const updateHelp = (params) => fetch(apiMall + '/Essay/help_update', "POST", "", params, true)
// 互助贴- 删除 help_delete
const deleteHelp = (params) => fetch(apiMall + '/Essay/help_delete', "POST", "", params, true)
// 获取某人发布的互助贴 getByUserHelp
const getHelpByUser = (params) => fetch(apiMall + '/Essay/getByUserHelp', "POST", "", params, true)
// 某用户发布得 所有的互助贴 -分页加搜索 get_help_user
const getAllHelp = (params) => fetch(apiMall + '/Essay/get_help_user', "POST", "", params, true)
// 互助贴分页 get_help
const getHelpPage = (params) => fetch(apiMall + '/Essay/get_help', "POST", "", params, true)
// 发布互助贴 -helpPublish
const regHelp = (params) => fetch(apiMall + '/Essay/helpPublish', "POST", "", params, true)





// 


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
  // 回复贴删除 helprDelete
   helperDelete ,
// 获取某用户的所有回复贴 - get_helpr_user_all
 getRepHelpByUserid ,
// 获取某人全部 互助贴 -?分页 get_helpr_user
 getHelpByUserid ,
//  回复贴 分页 get_helpr
 getRepHelpPage ,
//  回复贴-发布 helprPublish
regRepHelp ,
// 互助贴 修改 help_update
updateHelp ,
// 互助贴- 删除 help_delete
 deleteHelp ,
// 获取某人发布的互助贴 getByUserHelp
  getHelpByUser ,
// 某用户发布得 所有的互助贴 -分页加搜索
 getAllHelp ,
// 互助贴分页 get_help
 getHelpPage ,
// 发布互助贴 -helpPublish
 regHelp ,

  // 获取二手房信息
   getErShou,
  // 二手房登记
   regErShou,
  // 搜索二手房
   serachErShou ,
  // 二手房分页
   erShouPage,
  //获取 经济课堂
  getStudy,
  // 客源推荐(报备)
  getReport,
  // phone是否是 唯一   1没有用过
  isUniPhone ,
  //  获取某用户的所有的报备（by id）
  get_ReportById,
  // 续费
  getXuFei,
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
  // 视频
  videoPath,
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
