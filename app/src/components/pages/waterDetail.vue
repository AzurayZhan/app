<template>
  <div class="box">
    <div class="header">
      <van-nav-bar title="详细" left-arrow @click-left="toBack()"></van-nav-bar>
    </div>
    <div class="main">
      <div class="det-head">
        <img v-lazy="detail.img" alt />
        <div class="det-des">
          <h3>{{detail.name}}</h3>
          <div class="det-score">
            <van-rate v-model="detail.score" :count="5" readonly />
            <span>月售{{detail.count}}桶</span>
          </div>
          <h2>￥{{detail.price}}</h2>
          <p class="det-num">
            <span>点赞:{{detail.likeNum}}</span>
            <span>浏览数:{{detail.readNum}}</span>
          </p>
        </div>
      </div>
      <div class="address">
        <div class="adr-l">
          <p>
            <van-icon name="location" />
            <span>{{detail.len}}</span>
          </p>
          <p>{{detail.address}}</p>
        </div>
        <div class="adr-r">
          <a :href="'tel:'+detail.tel">
            <van-icon name="phone-o" />
          </a>
        </div>
      </div>
      <div class="info">
        <h2>商家信息</h2>
        <p>{{detail.des}}</p>
      </div>
      <div class="comment">
        <h2>
          TA们都在说
          <span @touchstart="toCommon(detail.id)">写评论</span>
        </h2>
        <ul class="com-dt">
          <li v-for="item in comments" :key="item.id">
            <div class="com-l">
              <img
                src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1566557283076&di=968e9fc5dbf0eae92d848be9c68ad54b&imgtype=jpg&src=http%3A%2F%2Fimg1.imgtn.bdimg.com%2Fit%2Fu%3D101023911%2C1072357512%26fm%3D214%26gp%3D0.jpg"
                alt
              />
            </div>
            <div class="com-r">
              <h3>
                {{item.userId}}
                <span>{{item.time|timeChange}}</span>
              </h3>
              <p>{{item.content}}</p>
            </div>
          </li>
        </ul>
      </div>
      <div class="more text-center">
        <van-button class="share" color="#fc6800" plain>分享</van-button>
        <van-button class="callme" color="#fc6800">与我联系</van-button>
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
      detail: {
        id: ""
      },
      comments: {
        waterId: ""
      }
    };
  },
  methods: {
    init() {},
    toBack() {
      this.$router.go(-1);
    },
    toCommon(id) {
      this.$router.push("/waterComment?id=" + id);
    }
  },
  components: {},
  watch: {
    // $route() {
    //   if (this.$route.path == "/waterDetail") {
    //     this.init();
    //   }
    // }
  },
  computed: {},
  mounted() {
    // this.init();
    this.detail.id = this.$route.query.id;
    ajax(
      this,
      API.findWater,
      "get",
      { id: this.detail.id },
      d => {
        // console.log(d);
        this.detail = d.data.data[0];
        this.detail.score = parseInt(this.detail.score);
      },
      err => {
        this.$dialog.alert({
          message: err.data.info
          // on close
        });
      }
    );
    // this.detail.id = this.$route.query.id;
    ajax(
      this,
      API.findComment,
      "get",
      { waterId: this.detail.id },
      d => {
        console.log(d);
        this.comments = d.data.data;
      },
      err => {
        this.$dialog.alert({
          message: err.data.info
          // on close
        });
      }
    );
  },
  beforeRouteLeave(to, from, next) {
    this.$destroy();
    next();
  }
};
</script>
<style lang="stylus" scoped>
@import '../../common/stylus/index.styl';

.van-field__label {
  width: 0.9rem;
}

.van-nav-bar, .van-nav-bar__title {
  background: $primary-color;
  color: $font-color;
}

.van-icon {
  color: $font-color;
}

.van-dropdown-menu {
  background: $font-color4;
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
    width: 6.2rem;
    background: $font-color4;
    padding: 0.1rem 0.1rem;

    .det-head {
      background: $font-color;
      width: 100%;
      height: 1.9rem;
      margin-top: 0.1rem;

      img {
        float: left;
        width: 1.96rem;
        height: 1.8rem;
      }

      .det-des {
        width: 4.1rem;
        height: 1.9rem;
        padding-left: 0.1rem;
        float: left;

        h3 {
          font-size: 0.4rem;
        }

        .det-score {
          width: 100%;
          height: 0.3rem;
          padding: 0.1rem 0;
        }

        h2 {
          height: 0.3rem;
          padding: 0.1rem 0;
          font-size: 0.3rem;
          font-weight: bold;
          color: $font-color6;
        }

        .det-num {
          width: 2.8rem;
          height: 0.45rem;
          line-height: 0.45rem;
          float: right;
          font-size: 0.2rem;
          color: $font-color3;

          span {
            padding-left: 0.2rem;
          }
        }
      }

      .van-rate {
        display: inline-block;
        margin-right: 0.4rem;
      }

      .van-rate__icon {
        display: block;
        width: 0.8em;
        font-size: 15px;
      }
    }

    .address {
      display: flex;
      width: 100%;
      height: 1rem;
      background: $font-color;
      margin: 0.1rem 0;

      .van-icon {
        color: $font-color3;
      }

      .adr-l {
        width: 5.2rem;

        p {
          height: 0.4rem;
          line-height: 0.4rem;
        }
      }

      .adr-r {
        flex: 1;
        height: 0.8rem;
        margin: 0.1rem 0;
        border-left: 0.02rem solid $font-color4;

        a {
          display: block;

          .van-icon {
            color: $font-color6;
            font-size: 0.6rem;
            padding: 0.1rem 0 0 0.15rem;
          }
        }
      }
    }

    .info {
      widows: 100%;
      height: 2.56rem;
      background: $font-color;

      h2 {
        height: 0.54rem;
        font-size: 0.32rem;
        line-height: 0.54rem;
        border-bottom: 1px solid $font-color4;
      }

      p {
        color: $font-color2;
      }
    }

    .comment {
      width: 100%;
      background: $font-color;
      margin-top: 0.1rem;
      overflow: hidden;

      h2 {
        height: 0.54rem;
        font-size: 0.32rem;
        line-height: 0.54rem;
        border-bottom: 1px solid $font-color4;

        span {
          float: right;
          padding-right: 0.3rem;
          font-size: 0.26rem;
          color: $font-color3;
        }
      }

      .com-dt {
        width: 100%;
        overflow-y: auto;

        li {
          width: 100%;
          height: 1.28rem;

          .com-l {
            width: 1.1rem;
            height: 1.28rem;
            float: left;

            img {
              width: 1rem;
              height: 1rem;
              border-radius: 50%;
            }
          }

          .com-r {
            float: left;
            width: 5.1rem;
            border-top: 1px solid $font-color4;

            h3 {
              height: 0.4rem;
              margin-top: 0.2rem;
              line-height: 0.4rem;
              font-size: 0.26rem;

              span {
                float: right;
                padding-right: 0.3rem;
                font-size: 0.26rem;
                color: $font-color3;
              }
            }
          }
        }
      }
    }

    .more {
      width: 100%;
      padding: 0.1rem 0;
      margin-top: 0.4rem;
      background: $font-color;

      .share {
        width: 1.9rem;
        /* .van-button__text {
          color: $font-color1;
        } */
      }

      .callme {
        width: 4rem;
      }
    }
  }
}
</style>