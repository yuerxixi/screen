<template>
  <div class="common-header">
    <img
      class="common-header-background"
      src="@/assets/img/header-back.png"
      alt=""
    >
    <div class="header-con">
      <!-- 返回键暂时还没样式 -->
      <span v-if="setBack()" class="header-back" @click="back">返回</span>
      <span class="header-title">
        {{ title }}
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Header',
  props: {
    title: {
      type: String,
      default: ''
    }
  },
  methods: {
    setBack() {
      // return this.$route.name !== 'Home'
      return false
    },
    back() {
      this.$router.push('/home')
    }
  }
}
</script>

<style scoped lang="scss">
.common-header {
  position: fixed;
  width: 100%;
  height: 94px;
  top: 0;
  left: 0;
  z-index: 5;
  .common-header-background {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
  }
  .header-con {
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    padding-top: 14px;
    .header-back {
      position: absolute;
      left: 0;
      top: 0;
    }
    .header-title {
      display: inline-block;
      font-family: 'titlePlus';
      line-height: 48px;
      text-shadow: 0px 6px 11px #08b0ce;
      color: #ffffff;
      font-size: 40px;
      letter-spacing: 5px;
    }
  }
}
</style>
