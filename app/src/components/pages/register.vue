<template>
  <div class="register">
    <div class="header">
      <van-nav-bar title="注册" left-arrow></van-nav-bar>
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
            v-model="user.tel"
            left-icon="phone-circle"
            clearable
            label="电话"
            placeholder="手机号"
          />
          <van-field
            v-model="user.pass"
            type="password"
            label="密码"
            left-icon="lock"
            placeholder="密码"
          />
        </van-cell-group>
        <van-button type="info" @touchstart="register()">注册</van-button>
      </div>
    </div>
  </div>
</template>
<script>
import API from "../../common/js/api"
export default {
  data() {
    return {
      user: {
        name: "",
        pass: "",
        tel:""
      },
    };
  },
  methods: {
    register(){
      this.$http({
        url:API.addUser,
        method:"post",
        data:this.$qs.stringify(this.user)
      }).then(d=>{
          console.log(d)
      })
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

.register >>> .van-field__label {
  width: 0.9rem;
}

.register >>> .van-nav-bar, .van-nav-bar__title, .van-icon {
  background: $primary-color;
  color: $font-color;
}

.register {
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
    }
  }
}
</style>