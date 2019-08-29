<template>
  <div class="login">
    <div class="header">
      <van-nav-bar title="登录" left-arrow></van-nav-bar>
    </div>
    <div class="main">
      <div class="lg-in">
        <van-cell-group>
          <van-field
            v-model="user.name"
            left-icon="manager"
            clearable
            label="账号"
            placeholder="邮箱/手机号"
          />
          <van-field
            v-model="user.pass"
            type="password"
            label="密码"
            left-icon="lock"
            placeholder="密码"
          />
        </van-cell-group>
        <van-button type="info" @touchstart="login()">登录</van-button>
        <p class="forget">忘记密码？</p>
        <h4 class="text-center">
          <span @touchstart="toregister()">注册</span>
        </h4>
        <van-divider>或者</van-divider>
        <p class="text-center">社交账号快速登录</p>
        <ul class="more text-center">
          <li>
            <img src="../../assets/images/wechat.png" alt />
          </li>
          <li><img src="../../assets/images/sina.png" alt=""></li>
          <li><img src="../../assets/images/qq.png" alt=""></li>
        </ul>
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
      user: {
        type: 2,
        name: "",
        pass: ""
      }
    };
  },
  methods: {
    login() {
      ajax(
        this,
        API.login,
        "post",
        this.user,
        d => {
          sessionStorage.setItem("user", this.user.name);
          this.$router.replace("/index");
        },
        err => {
          this.$dialog.alert({
            message: err.data.info
            // on close
          });
        }
      );
    },
    toregister() {
      this.$router.replace("/register");
    }
  },
  components: {},
  watch: {},
  computed: {},
  mounted() {}
};
</script>
<style lang="stylus" scoped>
@import '../../common/stylus/index.styl';

.login >>> .van-field__label {
  width: 0.9rem;
}

.login >>> .van-nav-bar, .van-nav-bar__title, .van-icon {
  background: $primary-color;
  color: $font-color;
}

.login {
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
    background: $font-color4;

    .lg-in {
      width: 90%;
      margin: 0.4rem auto;

      .van-button {
        margin-top: 0.4rem;
        width: 100%;
      }

      .forget {
        margin: 0.2rem 0;
        text-align: right;
        font-size: 0.3rem;
        color: $font-color3;
      }

      h4 {
        height: 0.4rem;
        padding: 0.4rem 0;
        line-height: 0.4rem;
        font-weight: bold;
        color: $font-color2;
      }

      .van-divider {
        border-color: $font-color3;
      }

      p {
        color: $font-color3;
      }
    }

    .more {
      padding-top: 0.6rem;
      width: 100%;

      li {
        float: left;
        width: 1.2rem;
        height: 1.2rem;
        border-radius: 50%;
        background: #fff;
        margin: 0.35rem;

        img {
          width: 1.2rem;
          // height: 1.2rem;
          border-radius: 50%;
        }
      }
    }
  }
}
</style>