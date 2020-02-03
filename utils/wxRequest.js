import regeneratorRuntime from './runtime';
import util from './util';
import md5 from './md5';
import tip from './tip';
// import promise from './promise.js';
// import basepath from './config'

const API_SECRET_KEY = 'homeofbrokers'

const wxRequest = async(params = {}, url) => {
  console.log(url)
  tip.loading();
  // header={
  //     'content-type':'application/application/json', 
  //     // 自定义请求头
  //   'access-token': 'app.globalData.access_token', // 访问令牌
  //   'user-token': 'app.globalData.user_token', // 登录令牌
  //   'version': 'v1.0' // 版本号
  //   };
  // var method=params.method;
  // var data=params.data;
  // var header=params.header; 
  var method = params.method;
  var data = params.data;
  var header = params.header;

  // let data = params.query || {};   
  // console.log(url)  
  let res = await px_https(url);


  tip.loaded();
  return res;
};
// method = 'GET', data = {}, header = { 'content-type': 'application/json' }
function px_https(url, method = 'GET', data = {}, header = {
  'content-type': 'application/json'
}) {
  var timer;
  console.log('https:' + url)

  return new Promise(function(resolve, reject) {
      timer = setTimeout(() => {
        reject(showError("网络连接超时"));
      }, 3000)
      wx.request({
        url: url,
        // method: method,  
        // data:data,    
        // header: header,
        success: function(res) {
          if (res.statusCode != 200) {
            reject({ error: '服务器忙，请稍后重试', code: 500 });
            return;
          }
          resolve(res.data);
        },
        fail: function(res) {
          // fail调用接口失败
          reject({
            error: '网络错误',
            code: 0
          });
         
        },
        // complete: function (res) {
        //   // complete
        // }
      })
    })
    .then(res => {
      timer && clearTimeout(timer);
      tip.success('加载成功');
      return res;
    }).catch(err => {
      timer && clearTimeout(timer);
      tip.error('加载失败', tip.loaded());
      return Promise.reject(err);
    })
}

module.exports = {
  wxRequest
}