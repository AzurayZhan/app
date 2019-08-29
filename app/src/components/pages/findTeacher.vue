<template>
  <div class="box">
    <div class="header">
      <van-nav-bar title="找家教" @click-left="toBack()">
        <van-icon name="arrow-left" slot="left" />
        <van-icon name="location-o" slot="right">北京</van-icon>
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
        <div class="teacher">
          <h3>周边老师</h3>
          <p>发现身边好老师</p>
        </div>
        <div class="question">
          <h3>我要提问</h3>
          <p>难题名师帮你解</p>
        </div>
      </div>
      <ul class="nav-list">
        <li v-for="item in types" :key="item.type">
          <a href>
            <img v-lazy="item.img" alt />
            <p class="text-center">{{item.type}}</p>
          </a>
        </li>
      </ul>
      <van-divider>top排行榜</van-divider>
      <ul class="tops">
        <li v-for="item in tops" :key="item.type">
          <a href>
            <img class="cont" v-lazy="item.img" alt />
          </a>
          <p style="color:#666666">已报名{{item.num}}人</p>
          <p class="icon">
            <img v-lazy="item.teacherImg" alt />
          </p>
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
      types: [],
      tops: []
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
      API.teacherBanner,
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
    ajax(
      this,
      API.teacherType,
      "get",
      {},
      d => {
        console.log(d.data.data);
        this.types = d.data.data;
      },
      err => {
        console.log(err);
      }
    );
    ajax(
      this,
      API.teacherTop,
      "get",
      {},
      d => {
        // console.log(d.data.data);
        this.tops = d.data.data;
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
  display: flex;
  flex-direction: column;

  .header {
    width: 100vw;
    height: 0.9rem;
  }

  .main {
    flex: 1;
    width: 100%;
    overflow-y auto
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

    .info {
      width: 100%;
      height: 1.06rem;
      // background: $font-color4;
      color: $font-color2;
      // line-height: 0.3rem;
      border-bottom: 0.02rem solid $font-color5;

      h3 {
        height: 0.2rem;
        line-height: 0.2rem;
        font-size: 0.3rem;
        padding: 0.15rem 0;
      }

      .teacher {
        // background: url('../../assets/images/weather.png') no-repeat left center;
        float: left;
        height: 1.06rem;

        p {
          font-size: 0.18rem;
        }
      }

      .question {
        float: right;
        height: 1.06rem;

        p {
          font-size: 0.18rem;
        }
      }
    }

    .nav-list {
      width: 100%;
      height: 2rem;
      overflow: hidden;

      li {
        float: left;
        width: 25%;
        height: 2rem;

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

    .van-divider {
      border-color: $font-color3;
      color: $font-color1;
    }

    .tops {
      width: 100%;
      height: 4rem;
      padding-bottom: 1rem;
      background $font-color4
      li {
        position: relative;
        float: left;
        width: 2.88rem;
        margin: 0 0 0.22rem 0.22rem;

        a {
          display: block;
        }

        .cont {
          width: 2.88rem;
          height: 1.62rem;
        }

        .icon {
          position: absolute;
          width: 0.75rem;
          height: 0.75rem;
          right: 0;
          bottom: 0;

          img {
            width: 0.75rem;
            height: 0.75rem;
            border-radius 50%
          }
        }
      }
    }
  }
}
</style>