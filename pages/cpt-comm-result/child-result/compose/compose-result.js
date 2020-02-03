// pages/cpt-comm-result/child-result/compose/compose-result.js
Component({
  /**
   * 组件的属性列表
   *  //时间
          time: that.data.timeindex,
          //公积金 利率
          gloanmoney: that.data.gloanmoney,
          rate: that.data.gloanrates[that.data.grateindex].id,

          //商业 利率
          loanmoney: that.data.loanmoney,
          rate: that.data.loanrates[that.data.rateindex].id,
          // 还款方式
          methods: that.data.cptmethodFlag,
   */
  properties: {
    info: {
      type: Object,
      value: {}
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
