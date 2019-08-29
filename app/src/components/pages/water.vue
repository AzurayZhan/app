<template>
  <div class="box">
    <div class="header">
      <van-nav-bar title="送水到家" @click-left="toBack()">
        <van-icon name="arrow-left" slot="left" />
      </van-nav-bar>
      <van-dropdown-menu>
        <van-dropdown-item v-model="value1" :options="option1" />
        <van-dropdown-item v-model="value2" :options="option2" />
        <van-dropdown-item v-model="value3" :options="option3" />
      </van-dropdown-menu>
    </div>
    <div class="main">
      <div class="list">
        <router-link :to="'/waterDetail?id='+item.id" v-for="item in waters" :key="item.id">
          <img v-lazy="item.img" alt />
          <div class="des">
            <h2>
              <span>{{item.name}}</span>
              <van-rate v-model="item.score" :count="5" readonly />
            </h2>
            <p>{{item.des}}</p>
            <p class="address">{{item.address}}</p>
          </div>
          <div class="tel">
            <a :href="'tel:'+item.tel">
              <van-icon name="phone-o" />
            </a>
            <h2>{{item.len}}</h2>
          </div>
        </router-link>
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
      waters: [],
      value1: 0,
      value2: "a",
      value3: "x",
      option1: [
        { text: "全部水站", value: 0 },
        { text: "南站", value: 1 },
        { text: "北站", value: 2 }
      ],
      option2: [
        { text: "默认排序", value: "a" },
        { text: "距离最远", value: "b" },
        { text: "距离最近", value: "c" }
      ],
      option3: [
        { text: "智能排序", value: "x" },
        { text: "好评排序", value: "y" },
        { text: "销量排序", value: "z" }
      ],
      star: 0
    };
  },
  methods: {
    toBack() {
      this.$router.go(-1);
    }
  },
  components: {},
  watch: {},
  computed: {},
  mounted() {
    ajax(
      this,
      API.findWater,
      "get",
      {},
      d => {
        console.log(d);
        this.waters = d.data.data;
        this.waters.map(item => {
          item.score = parseInt(item.score);
        });
      },
      err => {
        this.$dialog.alert({
          message: err.data.info
          // on close
        });
      }
    );
  }
};
</script>
<style lang="stylus" scoped>
@import '../../common/stylus/index.styl';

.header >>> .van-field__label {
  width: 0.9rem;
}

.header >>> .van-nav-bar, .van-nav-bar__title {
  background: $primary-color;
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
    position: fixed;
    z-index: 2;
    width: 100vw;

    // height: 0.9rem;
    .van-icon {
      color: $font-color;
    }
  }

  .main {
    flex: 1;
    width: 100%;
    margin-top: 1.92rem;

    .list {
      margin: 0 0.12rem;
      overflow-y: auto;

      a {
        width: 100%;
        height: 1.27rem;
        display: block;
        padding: 0.15rem 0;
        border-bottom: 1px solid $font-color4;

        img {
          float: left;
          width: 1.72rem;
          height: 1.27rem;
        }
      }

      .des {
        float: left;
        width: 3rem;
        margin-left: 0.2rem;
        height: 1.26rem;

        // background: #000;
        h2 {
          height: 0.4rem;
          font-weight: bold;

          span {
            float: left;
          }
        }

        .van-rate {
          float: left;
        }

        .van-rate__icon {
          display: block;
          width: 0.8em;
          font-size: 15px;
        }

        .address {
          margin-top: 0.26rem;
        }
      }

      .tel {
        width: 1.2rem;
        height: 1.26rem;
        float: left;

        a {
          width: 0.6rem;
          height: 0.6rem;
          margin: 0 0.3rem;
        }

        .van-icon {
          font-size: 0.6rem;
        }

        h2 {
          padding-left: 0.3rem;
        }
      }
    }
  }
}
</style>