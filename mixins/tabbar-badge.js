import {
  mapGetters
} from 'vuex'

export default {
  computed: {
    ...mapGetters('m_cart', ['total']),
  },
  watch: {
    total() {
      this.setBadge()
    }
  },
  onShow() {
    this.setBadge()
  },
  methods: {
    setBadge() {
      uni.setTabBarBadge({
        index: 2, //索引
        text: this.total + '' //text必须是字符串
      })
    }
  }
}
