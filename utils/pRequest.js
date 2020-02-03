// 当前host
const url_host ="http://49.234.199.223:9090/hob/Api"
// 当前版本
const currentVersion = require('util.js').currentVersion
// 当前路径
import { currentPagePath } from 'util.js'

// 调用fetch方法，然后依次链式传入
// url, method, header, data, loading(是否显示loading) 

function fetch(url, method={}, header={}, data={}, loading=true) {
  // 判断给服务端传递undefined的问题
  let fetchP = new Promise(function (resolve, reject) {
    if (loading) {
      wx.showLoading({
        icon: 'loading'
      })
    }
    if (data && data.unionId && typeof data.unionId === "undefined") {
      wx.hideLoading()
      return reject({
        ok: false,
        error: 'unionId -> ' + typeof data.unionId
      });
    }
    console.log("fetch:" + JSON.stringify(data) + data);
    console.log("fetch:" + JSON.stringify(data.data) + data.data );
    wx.request({
      url: url,
      method: method ? method : 'GET',
      header: {
        // 'content-type': 'application/json', // 默认值 
  'content-type': 'application/x-www-form-urlencoded',
        // 'version': currentVersion,
        // 'pagePath': currentPagePath()
      },
      //  data.data
      data:data.data,
      // console.log("fetch:" + JSON.stringify(data));
      success: function (res) {
        if (res.statusCode < 500) {
          resolve(res.data)
        } else {
          showError()
          reject(res.data)
        }
      },
      fail: function (err) {
        showError()
        reject(err)
      },
      complete: function (comp) {
        if (loading) {
          wx.hideLoading()
        }
      }
    })
  })
  return fetchP
}

// 服务器开小差了
function showError() {
  wx.hideLoading()
  // 获取头文件路径
  wx.navigateTo({
    url: '/pages/serverError/serverError',
  })
}

module.exports = {
  fetch
}