<template>
  <div class="box">
    <div class="header">
      <van-nav-bar title="详细" left-arrow @click-left="toBack()"></van-nav-bar>
    </div>
    <div class="main">
      <div class="det-head">
        <div class="det-tit">
          <h2>
            {{detail.name}}
            <van-rate v-model="detail.score" :count="5" readonly />
          </h2>
        </div>
        <div class="address">
          <div class="adr-l">
            <p>
              <van-icon name="location" />
              <span>距你{{detail.len}}</span>
            </p>
            <p>{{detail.address}}</p>
            <p>营业时间：9:00-18:00</p>
            <div>
              <van-button type="primary" size="small">关注</van-button>
              <van-button type="primary" size="small" color="#007af5">向Ta提问</van-button>
            </div>
          </div>
          <div class="adr-r">
            <a :href="'tel:'+detail.tel">
              <van-icon name="phone-o" />
            </a>
          </div>
        </div>
        <p class="det-num">
          <span>关注:{{detail.likeNum}}</span>
          <span>好评:{{detail.readNum}}</span>
        </p>
      </div>
      <div class="info">
        <h2>商家信息</h2>
        <p>{{detail.info}}</p>
      </div>
      <div class="comment">
        <h2>
          TA们都在说
          <span @touchstart="toComment(detail.id)">写评论</span>
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
    toBack() {
      this.$router.go(-1);
    },
    toComment(id) {
      this.$router.push("/repairComment?id=" + id);
    }
  },
  components: {},
  watch: {},
  computed: {},
  mounted() {
    this.detail.id = this.$route.query.id;
    ajax(
      this,
      API.findRepair,
      "get",
      { id: this.detail.id },
      d => {
        console.log(d);
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
    ajax(
      this,
      API.findRepairComment,
      "get",
      { waterId: this.detail.id },
      d => {
        // console.log(d);
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
      width: 100%;
      height: 3.04rem;
      background: $font-color;

      .det-tit {
        width: 100%;
        height: 0.79rem;
        border-bottom: 1px solid $font-color4;

        h2 {
          height: 0.79rem;
          font-size: 0.3rem;
          line-height: 0.79rem;
          font-weight: bold;
          color: $font-color2;
        }

        .van-rate {
          display: inline-block;
          float: right;
          padding-right: 0.36rem;
        }

        .van-rate__icon {
          display: block;
          width: 0.8em;
          font-size: 15px;
        }
      }

      .address {
        width: 100%;
        height: 1.86rem;
        padding-left: 0.2rem;
        color: $font-color3;
        display: flex;

        .van-icon {
          color: $font-color3;
        }

        p {
          height: 0.4rem;
          line-height: 0.4rem;
        }

        .adr-l {
          width: 4.95rem;
          height: 1.86rem;
        }

        .adr-r {
          flex: 1;

          a {
            display: block;

            .van-icon {
              color: $font-color6;
              font-size: 0.8rem;
              margin: 0.4rem 0.3rem;
              border-radius: 50%;
              background: $font-color4;
            }
          }
        }
      }

      .det-num {
        height: 0.4rem;
        text-align: right;
        line-height: 0.4rem;
        margin-right: 0.1rem;

        span {
          padding-left: 0.1rem;
          color: $font-color3;
        }
      }
    }

    .info {
      widows: 100%;
      height: 2.56rem;
      background: $font-color;
      margin-top: 0.1rem;

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