import {
  config
} from '../config.js'

const http = (url,params) => {
  return new Promise(function (resolve, reject) {
    wx.request({
      url: url,
      method: params.method || 'GET',
      data: data,
      header: {
        'content-type': 'application/x-www-form-urlencoded', // 默认值
        // 自定义请求头
        'access-token': app.globalData.access_token, // 访问令牌
        'user-token': app.globalData.user_token, // 登录令牌
        'version': 'v1.0' // 版本号
      },
      success: function (res) {
        if (res.statusCode != 200) {
          reject({ error: '服务器忙，请稍后重试', code: 500 });
          return;
        }
        resolve(res.data);
      },
      fail: function (res) {
        // fail调用接口失败
        reject({ error: '网络错误', code: 0 });
      },
      complete: function (res) {
        // complete
      }
    })
  })
}

module.exports = http