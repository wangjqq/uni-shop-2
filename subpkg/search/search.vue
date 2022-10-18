<template>
  <view>
    <view class="search-box">
      <uni-search-bar @input="input" :radius="100" placeholder="请输入搜索内容" cancelButton="none" :focus="true">
      </uni-search-bar>
    </view>

    <!-- 搜索建议列表 -->
    <view class="sugg-list">
      <view class="sugg-item" v-for="(item,i) in searchResults" :key="i" @click="gotoDetail(item)">
        <view class="goods-name">{{item.goods_name}}</view>
        <uni-icons type="arrowright" size="16"></uni-icons>
      </view>
    </view>

    <!-- 搜索历史 -->
    <view class="history-box" v-if="searchResults.length===0">
      <view class="history-title">
        <text>搜索历史</text>
        <uni-icons type="trash" size="17" @click="clean"></uni-icons>
      </view>
      <view class="history-list">
        <uni-tag :text="item" v-for="(item,i) in histories" :key="i" @click="gotoGoodsList(item)"></uni-tag>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        timer: null, //延时器的timerId
        kw: '', //搜索关键词
        searchResults: [], //搜索的结果列表
        historyList: ['a', 'app', 'apple'] //搜索关键词的历史记录
      };
    },
    computed: {
      histories() {
        return [...this.historyList].reverse()
      }
    },
    onLoad() {
      this.historyList = JSON.parse(uni.getStorageSync('kw') || '[]')
    },
    methods: {
      // 输入事件
      input(e) {
        // 清除timer对应的延时器
        clearTimeout(this.timer)

        // 重新启动一个延时器,并把timerId赋值给this.timer
        this.timer = setTimeout(() => {
          this.kw = e
          this.getSearchList()
        }, 500)
      },
      // 获取搜索结果
      async getSearchList() {
        if (this.kw.length === 0) {
          this.searchResults = []
          return
        }

        const {
          data: res
        } = await uni.$http.get('/api/public/v1/goods/qsearch', {
          query: this.kw
        })
        this.searchResults = res.message

        this.saveSearchHistory()
      },
      gotoDetail({
        goods_id
      }) {
        uni.navigateTo({
          url: '/subpkg/goods_detail/goods_detail?goods_id=' + goods_id
        })
      },
      // 保存历史
      saveSearchHistory() {
        // this.historyList.push(this.kw)

        const set = new Set(this.historyList)
        set.delete(this.kw)
        set.add(this.kw)
        this.historyList = Array.from(set)
        // 持久化存储
        uni.setStorageSync('kw', JSON.stringify(this.historyList))
      },
      // 清空历史
      clean() {
        this.historyList = []
        uni.setStorageSync('kw', '[]')
      },
      // 点击历史
      gotoGoodsList(kw) {
        uni.navigateTo({
          url: '/subpkg/goods_list/goods_list?query=' + kw
        })
      }
    }
  }
</script>

<style lang="scss">
  .search-box {
    position: sticky;
    top: 0;
    z-index: 999;
  }

  .sugg-list {
    padding: 0 5px;

    .sugg-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 12px;
      padding: 13px 0;
      border-bottom: 1px solid #efefef;

      .goods-name {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
  }

  .history-box {
    padding: 0 5px;

    .history-title {
      display: flex;
      justify-content: space-between;
      height: 40px;
      align-items: center;
      font-size: 13px;
      border-bottom: 1px solid #efefef;
    }

    .history-list {
      display: flex;
      flex-wrap: wrap;

      .uni-tag {
        margin-top: 5px;
        margin-right: 5px;
      }
    }
  }
</style>
