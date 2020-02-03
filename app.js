//app.js
App({
  onLaunch: function () {
    // // 展示本地存储能力
    // var logs = wx.getStorageSync('logs') || []
    // logs.unshift(Date.now())
    // wx.setStorageSync('logs', logs)
    let that=this;
    wx.getSystemInfo({

      success: function (systemInfo) {

        console.log(systemInfo);
        // px转换到rpx的比例
        let pxToRpxScale = 750 / systemInfo.windowWidth;
        // 状态栏的高度
        let ktxStatusHeight = systemInfo.statusBarHeight * pxToRpxScale;
        // 导航栏的高度
        let navigationHeight = 44 * pxToRpxScale;
        // window的高度
        let ktxWindowHeight = systemInfo.windowHeight * pxToRpxScale;
        // window的宽度
        let ktxWindowWidth = systemInfo.windowWidth * pxToRpxScale;
        // 屏幕的高度
        let ktxScreentHeight = systemInfo.screenHeight * pxToRpxScale;
        // 底部tabBar的高度
        let tabBarHeight = ktxScreentHeight - ktxStatusHeight - navigationHeight - ktxWindowHeight;
        that.globalData.winHeight = ktxWindowHeight;
        that.globalData.winWidth = ktxWindowWidth;
      },
    })
    console.log(that.globalData.winHeight + "  " + that.globalData.winWidth)
  },
  globalData: {
    userInfo: null,
    access_token: null, // 访问令牌
    user_token: null, // 登录令牌
    // 宽高(屏幕有tabBar)
    winWidth: null,
    winHeight: null,
  }
    // // 登录
    // wx.login({
    //   success: res => {
    //     // 发送 res.code 到后台换取 openId, sessionKey, unionId
    //     console.log(res)
    //   }
    // })
    // // 获取用户信息
    // wx.getSetting({
    //   success: res => {
    //     if (res.authSetting['scope.userInfo']) {
    //       // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
    //       wx.getUserInfo({
    //         success: res => {
    //           // 可以将 res 发送给后台解码出 unionId
    //           this.globalData.userInfo = res.userInfo
    //           console.log(res)

    //           // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
    //           // 所以此处加入 callback 以防止这种情况
    //           if (this.userInfoReadyCallback) {
    //             this.userInfoReadyCallback(res)
    //           }
    //         }
    //       })
    //     }
    //   }
    // })
 
  
})