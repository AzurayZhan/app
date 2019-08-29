<template>
  <div style="overflow:hidden">
    <div class="box">
      <div class="header">
        <van-nav-bar title="龙山家园">
          <van-icon name="wap-nav" slot="left" @touchend.stop="change()" />
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
        <div class="info">
          <div class="weather">
            <p>多云/小雨 27/30℃</p>
            <p>3-4级/4-5级风</p>
          </div>
          <div class="time">
            <p>星期一</p>
            <p>18：00</p>
          </div>
        </div>
        <ul class="nav-list">
          <li>
            <a href="http://localhost:8080/#/teacher">
              <img src="../../assets/images/1.png" alt />
              <p class="serve text-center">找家教</p>
            </a>
          </li>
          <li>
            <a href="http://localhost:8080/#/water">
              <img src="../../assets/images/2.png" alt />
              <p class="serve text-center">送水到家</p>
            </a>
          </li>
          <li>
            <a href="http://localhost:8080/#/repair">
              <img src="../../assets/images/3.png" alt />
              <p class="serve text-center">维修服务</p>
            </a>
          </li>
          <li>
            <a href="http://localhost:8080/#/homemaking">
              <img src="../../assets/images/4.png" alt />
              <p class="serve text-center">家政</p>
            </a>
          </li>
          <li>
            <a href>
              <img src="../../assets/images/5.png" alt />
              <p class="serve text-center">社区服务</p>
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
      <div class="nav">
        <div class="user">
          <img
            src="https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=101023911,1072357512&fm=26&gp=0.jpg"
            alt
          />
          <p>userName</p>
        </div>
        <div class="list">
          <router-link to="/teacher" active-class="select">
            <i></i>
            <span>找家教</span>
          </router-link>
          <router-link to="/water">
            <i></i>
            <span>送水到家</span>
          </router-link>
          <router-link to>
            <i></i>
            <span>维修服务</span>
          </router-link>
          <router-link to>
            <i></i>
            <span>家政服务</span>
          </router-link>
          <router-link to>
            <i></i>
            <span>社区互动</span>
          </router-link>
          <router-link to>
            <i></i>
            <span>消息中心</span>
          </router-link>
          <router-link to>
            <i></i>
            <span>我的收藏</span>
          </router-link>
          <router-link to>
            <i></i>
            <span>我的发布</span>
          </router-link>
          <router-link to>
            <i></i>
            <span>账号设置</span>
          </router-link>
          <router-link to>
            <i></i>
            <span>退出登录</span>
          </router-link>
        </div>
      </div>
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
    change() {
      this.show = !this.show;
      if (this.show) {
        $(".nav").animate({ left: "0rem" });
        $(".box").animate({ marginLeft: "3.75rem" });
      } else {
        $(".nav").animate({ left: "-3.75rem" });
        $(".box").animate({ marginLeft: "0rem" });
      }
    }
  },
  components: {},
  watch: {},
  computed: {},
  mounted() {
    ajax(
      this,
      API.banner,
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
    var startx, endx;
    $(".box").on("touchstart", e => {
      // console.log(e)
      startx = e.originalEvent.changedTouches[0].clientX;
      endx = 0;
    });
    $(".box").on("touchmove", e => {
      // console.log(e)
      endx = e.originalEvent.changedTouches[0].clientX;
    });
    $(".box").on("touchend", e => {
      if (endx == 0) {
        $(".nav").animate({ left: "-3.75rem" });
        $(".box").animate({ marginLeft: "0rem" });
        return;
      }
      if (startx + 30 <= endx) {
        $(".nav").animate({ left: "0rem" });
        $(".box").animate({ marginLeft: "3.75rem" });
        return;
      }
      if (endx + 30 <= startx) {
        $(".nav").animate({ left: "-3.75rem" });
        $(".box").animate({ marginLeft: "0rem" });
      }
    });
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
    // width: 100%;
    overflow: hidden;

    // background: $font-color4;
    .search {
      background: $primary-color;
      color: $font-color;
      border-radius: 0.1rem;
    }
  
    .swipe {
      width: 100%;
      height 2rem
      margin-top: 0.2rem;

      img {
        width: 100%;
        height: 2rem;
      }
    }

    .info {
      width: 100%;
      height: 1.2rem;
      background: $font-color4;
      color: $font-color2;
      line-height: 0.3rem;
      border-bottom: 0.02rem solid $font-color5;

      .weather {
        background: url('../../assets/images/weather.png') no-repeat left center;
        padding: 0.3rem 0 0 1.2rem;
        float: left;
      }

      .time {
        padding-top: 0.3rem;
        margin-right: 0.2rem;
        float: right;
      }
    }

    .nav-list {
      width: 100%;
      margin-left: -0.02rem;

      li {
        float: left;
        width: 33.17%;
        height: 2rem;
        border-bottom: 0.01rem solid $font-color5;
        border-left: 0.01rem solid $font-color5;

        a {
          display: block;
          width: 100%;

          img {
            margin: 0.2rem 0.54rem;
            width: 1rem;
            height: 1rem;
          }
        }
      }
    }
  }
}

.nav {
  position: fixed;
  left: -3.75rem;
  // left 0
  top: 0;
  z-index: 2;
  width: 3.75rem;
  height: 100vh;
  background: $primary-color;
  display: flex;
  flex-direction: column;
  overflow: hidden;

  // display none
  .user {
    width: 3.31rem;
    height: 1.2rem;
    margin: 0.4rem 0 0 0.44rem;

    img {
      width: 1.2rem;
      height: 1.2rem;
      border-radius: 50%;
    }

    p {
      float: right;
      font-size: 0.4rem;
      line-height: 1.2rem;
      color: $font-color1;
    }
  }

  .list {
    flex: 1;
    margin-left: 0.3rem;

    a {
      display: block;
      width: 3.25rem;
      height: 0.6rem;
      line-height: 0.6rem;
      border-radius: 0.3rem;
      margin-top: 0.28rem;
      text-align: left;
      color: $font-color;

      /* &:hover {
        background: #1e4ba0;
      } */
      span {
        padding-left: 0.9rem;
      }
    }

    .select {
      background: #1e4ba0;
    }
  }
}
</style>