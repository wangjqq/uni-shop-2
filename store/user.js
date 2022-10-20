export default {
  namespaced: true,

  state: () => ({
    address: JSON.parse(uni.getStorageSync('address') || '{}') // 收货地址
  }),

  mutations: {
    updateAddress(state, address) {
      state.address = address

      this.commit('m_user/saveAddressToStorage')
    },
    saveAddressToStorage(state) {
      uni.setStorageSync('address', JSON.stringify(state.address))
    }
  },

  getters: {
    addstr(state) {
      if (!state.address.provinceName) return ''
      return state.address.provinceName + state.address.cityName + state.address.countyName + state.address.detailInfo
    }
  }
}
