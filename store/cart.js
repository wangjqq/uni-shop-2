export default {
  namespaced: true,
  state: () => ({
    // {goods_id,goods_name,goods_price,goods_count,goods_small_logo,goods_state}
    cart: JSON.parse(uni.getStorageSync('cart') || '[]')
  }),
  mutations: {
    // 加入购物车
    addToCart(state, goods) {
      // 查询提交的id购物车中是否存在这件商品
      // 如果不存在,则findResult为undefined;否则为查到的商品信息对象
      const findResult = state.cart.find((x) => x.goods_id === goods.goods_id)
      console.log(findResult);
      if (!findResult) {
        state.cart.push(goods)
      } else {
        findResult.goods_count++
      }
      this.commit('m_cart/saveToStorage')
    },
    // 保存到Storage
    saveToStorage(state) {
      uni.setStorageSync('cart', JSON.stringify(state.cart))
    },
    // 更新购物车商品的勾选状态
    updateGoodsState(state, goods) {
      const findResult = state.cart.find(x => x.goods_id === goods.goods_id)

      if (findResult) {
        findResult.goods_state = goods.goods_state
        // 持久化存储到本地
        this.commit('m_cart/saveToStorage')
      }
    },
    // 更新购物车中商品的数量
    updateGoodsCount(state, goods) {
      const findResult = state.cart.find(x => x.goods_id === goods.goods_id)

      if (findResult) {
        findResult.goods_count = goods.goods_count
        this.commit('m_cart/saveToStorage')
      }
    },
    // 根据Id从购物车中删除对应的商品信息
    removeGoodsById(state, goods_id) {
      state.cart = state.cart.filter(x => x.goods_id !== goods_id)

      this.commit('m_cart/saveToStorage')
    },
    // 购物车全选/反选
    updateAllGoodsState(state, newState) {
      state.cart.forEach(x => x.goods_state = newState)

      this.commit('m_cart/saveToStorage')
    }
  },
  getters: {
    // 统计购物车中商品的总数量
    total(state) {
      // let c = 0
      // // 循环统计商品的数量,累加到变量c中
      // state.cart.forEach(goods => c += goods.goods_count)
      // return c
      return state.cart.reduce((total, item) => total += item.goods_count, 0)
    },
    // 勾选商品的总数量
    checkedCount(state) {
      return state.cart.filter(x => x.goods_state).reduce((total, item) => total += item.goods_count, 0)
    },
    // 已勾选商品的总价格
    checkedGoodsAmount(state) {
      return state.cart.filter(x => x.goods_state).reduce((total, item) => total += item.goods_count * item.goods_price,
        0).toFixed(2)
    }
  }
}
