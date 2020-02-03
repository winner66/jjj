// 计算商业贷 reset form
export function commFormReset(e) {

}
//计算商业贷  submit form
export function commFormSubmit(e) {

  wx.navigateTo({
    url: '/pages/cpt-comm-result/cpt-comm-result?tag=1',
    events: {
      // 为指定事件添加一个监听器，获取被打开页面传送到当前页面的数据
      acceptDataFromOpenedPage: function (data) {
        console.log(data)
      },
      someEvent: function (data) {
        console.log(data)
      }

    },
    success: function (res) {
      // 通过eventChannel向被打开页面传送数据
      res.eventChannel.emit('acceptDataFromOpenerPage', { data: 'test' })
    }
  })
}
