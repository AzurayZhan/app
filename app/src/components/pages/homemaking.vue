<template>
  <div class="box">
    <div class="header">
      <van-nav-bar title="找家政" @click-left="toBack()">
        <van-icon name="arrow-left" slot="left"  />
        <van-icon name="user-o" slot="right" />
      </van-nav-bar>
    </div>
    <div class="main">
      <van-search v-model="value" placeholder="请输入搜索关键词" show-action @search="onSearch()">
        <div class="search" slot="action" @click="onSearch()">我要发布</div>
      </van-search>
      <div class="swipe">
        <van-swipe :autoplay="3000">
          <van-swipe-item v-for="item in images" :key="item.image">
            <img v-lazy="item.img" />
          </van-swipe-item>
        </van-swipe>
      </div>
      <ul class="nav-list">
        <li>
          <a href>
            <img src="../../assets/images/3.png" alt />
            <p class="serve text-center">钟点工</p>
          </a>
        </li>
        <li>
          <a href>
            <img src="../../assets/images/1.png" alt />
            <p class="serve text-center">保姆</p>
          </a>
        </li>
        <li>
          <a href>
            <img src="../../assets/images/5.png" alt />
            <p class="serve text-center">月嫂</p>
          </a>
        </li>
        <li>
          <a href>
            <img src="../../assets/images/4.png" alt />
            <p class="serve text-center">保洁</p>
          </a>
        </li>
        <li>
          <a href>
            <img src="../../assets/images/2.png" alt />
            <p class="serve text-center">家电清洗</p>
          </a>
        </li>
        <li>
          <a href>
            <img src="../../assets/images/1.png" alt />
            <p class="serve text-center">家居保养</p>
          </a>
        </li>
        <li>
          <a href>
            <img src="../../assets/images/3.png" alt />
            <p class="serve text-center">家居开荒</p>
          </a>
        </li>
        <li>
          <a href>
            <img src="../../assets/images/6.png" alt />
            <p class="serve text-center">更多服务</p>
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import API from "../../common/js/api";
import ajax from "../../common/js/ajax";
export default {
  data() {
    return {
      value: "",
      images: [],
      show: false
    };
  },
  methods: {
    onSearch() {},
    toBack(){
          this.$router.go(-1)
      }
  },
  components: {},
  watch: {},
  computed: {},
  mounted() {
    ajax(
      this,
      API.homeBanner,
      "get",
      {},
      d => {
        // console.log(d.data.data);
        this.images = d.data.data;
      },
      err => {
        console.log(err);
      }
    );
  }
};
</script>
<style lang="stylus" scoped>
@import '../../common/stylus/index.styl';

.box >>> .van-field__label {
  width: 0.9rem;
}

.box >>> .van-nav-bar, .van-nav-bar__title, .van-icon {
  background: $primary-color;
  color: $font-color;
}

.box {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;

  // margin-left 3.75rem
  .header {
    width: 100vw;
    height: 0.9rem;
  }

  .main {
    flex: 1;
    width: 100%;

    // background: $font-color4;
    .search {
      background: $primary-color;
      color: $font-color;
      border-radius: 0.1rem;
    }

    .swipe {
      width: 100%;
      height: 3.18rem;
      margin-top: 0.15rem;

      img {
        width: 100%;
        height: 3.18rem;
      }
    }

    .nav-list {
      width: 100%;
      margin-left: -0.02rem;

      li {
        float: left;
        width: 24.8%;
        height: 2rem;
        border-bottom: 0.01rem solid $font-color5;
        border-left: 0.01rem solid $font-color5;

        a {
          display: block;
          width: 100%;

          img {
            margin: 0.2rem 0.3rem;
            width: 1rem;
            height: 1rem;
          }
        }
      }
    }
  }
}
</style>