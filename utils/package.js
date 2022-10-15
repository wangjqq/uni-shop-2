// 封装弹框的方法
uni.$showMsg = function(title = '数据请求失败,请检查网络!', duration = 1500) {
  uni.showToast({
    title,
    duration,
    icon: 'none'
  })
}
