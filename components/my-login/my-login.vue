<template>
  <view class="login-container">
    <uni-icons type="contact-filled" size="100" color="#AFAFAF"></uni-icons>
    <button type="primary" class="btn-login" @click="getUserProfile">一键登录</button>
    <view class="tips-text">
      登陆后尽享更多权益
    </view>
  </view>
</template>

<script>
  import {
    mapMutations,
    mapState
  } from 'vuex'

  export default {
    name: "my-login",
    data() {
      return {

      };
    },
    computed: {
      ...mapState('m_user', ['redirectInfo'])
    },
    methods: {
      ...mapMutations('m_user', ['updateUserInfo', 'updateToken', 'updateRedirectInfo']),
      getUserProfile(e) {
        // if (e.detail.errMsg === 'getUserInfo:fail auth deny') return uni.$showMsg('您取消了登录授权!')
        // console.log(e);
        uni.getUserProfile({
          desc: '用于登录',
          success: (res) => {
            this.updateUserInfo(res.userInfo)
            this.getToken(res)
          },
          fail: (res) => {
            uni.$showMsg('您取消了登录授权!')
          }
        })
      },
      getToken(info) {
        uni.login({
          success: (res) => {
            const query = {
              code: res.code,
              encryptedData: info.encryptedData,
              iv: info.iv,
              rawData: info.rawData,
              signature: info.signature
            };
            console.log(query);
            const {
              data: loginResult
            } = uni.$http.post('/api/public/v1/users/wxlogin', query);
            console.log(loginResult);
            this.updateToken('3543541341535')
            uni.$showMsg('登陆成功')
            this.navigateBack()
          },
          fail: (res) => {
            uni.$showMsg('获取token失败!')
          }
        })
      },
      navigateBack() {
        if (this.redirectInfo && this.redirectInfo.openType === 'switchTab') {
          uni.switchTab({
            url: this.redirectInfo.from,
            complete: () => {
              this.updateRedirectInfo(null)
            }
          })
        }
      }
    }
  }
</script>

<style lang="scss">
  .login-container {
    height: 750rpx;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #f8f8f8;
    position: relative;
    overflow: hidden;

    &::after {
      content: '';
      display: block;
      width: 100%;
      height: 40px;
      background-color: white;
      position: absolute;
      bottom: 0;
      left: 0;
      border-radius: 100%;
      transform: translateY(50%);
    }

    .btn-login {
      width: 90%;
      border-radius: 100px;
      margin: 15px 0;
      background-color: #007AFF;
    }

    .tips-text {
      font-size: 12px;
      color: gray;
    }
  }
</style>
