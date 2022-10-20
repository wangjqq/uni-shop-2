<template>
  <view class="goods-item">
    <view class="goods-item-left">
      <radio v-if="showRadio" :checked="goods.goods_state" color="#007AFF" @click="radioClickHandler"></radio>
      <image :src="goods.goods_small_logo || defaultPic" class="goods-pic"></image>
    </view>
    <view class="goods-item-right">
      <view class="goods-name">
        {{goods.goods_name}}
      </view>
      <view class="goods-info-box">
        <view class="goods-price">
          ￥{{goods.goods_price|tofixed}}
        </view>
        <uni-number-box v-if="showRadio" :min="1" :value="goods.goods_count" @change="numChangeHandler">
        </uni-number-box>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    name: "my-goods",
    data() {
      return {

      };
    },
    props: {
      // 商品信息对象
      goods: {
        type: Object,
        default: {}
      },
      // 是否展示图片左侧的radio
      showRadio: {
        type: Boolean,
        default: false
      }
    },
    filters: {
      tofixed(num) {
        return Number(num).toFixed(2)
      }
    },
    methods: {
      // radio组件点击事件处理函数
      radioClickHandler() {
        this.$emit('radio-change', {
          goods_id: this.goods.goods_id,
          goods_state: !this.goods.goods_state
        })
      },
      numChangeHandler(val) {
        this.$emit('num-change', {
          goods_id: this.goods.goods_id,
          goods_count: val - 0
        })
      }
    }
  }
</script>

<style lang="scss">
  .goods-item {
    width: 750rpx;
    box-sizing: border-box;
    display: flex;
    padding: 10px 5px;
    border-bottom: 1px solid #f0f0f0;

    .goods-item-left {
      margin-right: 5px;
      display: flex;
      justify-content: space-between;
      align-items: center;

      .goods-pic {
        width: 100px;
        height: 100px;
        display: block;
      }
    }

    .goods-item-right {
      display: flex;
      flex: 1;
      flex-direction: column;
      justify-content: space-between;

      .goods-name {
        font-size: 13px;
      }



      .goods-info-box {
        display: flex;
        align-items: center;
        justify-content: space-between;

        .goods-price {
          color: #c00000;
          font-size: 16px;
        }
      }
    }

  }
</style>
