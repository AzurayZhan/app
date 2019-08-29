<template>
  <div>
    <div class="box">
      <div class="header">
        <van-nav-bar title="评论" left-arrow @click-left="toBack()"></van-nav-bar>
      </div>
      <div class="main">
        <van-field v-model="info.content" type="textarea" placeholder="评论留言..." />
        <van-button type="info" @touchstart="submit()">提交</van-button>
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
      info: {
        name: "",
       repairId: "",
        content: "",
        time: ""
      }
    };
  },
  methods: {
    toBack() {
      this.$router.go(-1);
    },
    submit() {
      ajax(
        this,
        API.addRepairComment,
        "get",
        this.info,
        d => {
            this.$router.replace("/repairDetail?id="+this.info.repairId)
        },
        err => {
          this.$dialog.alert({
            message: err.data.info
            // on close
          });
        }
      );
    }
  },
  components: {},
  watch: {},
  computed: {},
  mounted() {
    (this.info.name = sessionStorage.getItem("user")),
      (this.info.repairId = this.$route.query.id),
      (this.info.time = Date.now());
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

.van-button {
  float: right;
  margin: 0.2rem;
}
</style>