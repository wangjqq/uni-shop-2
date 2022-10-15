// 导入网络请求的包
import {
  $http
} from '@escook/request-miniprogram'

uni.$http = $http
$http.baseUrl = 'https://api-ugo-web.itheima.net'

$http.beforeRequest = function(options) {
  uni.showLoading({
    title: '数据加载中'
  })
}

$http.afterRequest = function(data) {
  if (data.data.meta.status !== 200) return uni.$showMsg()
  uni.hideLoading()
}
