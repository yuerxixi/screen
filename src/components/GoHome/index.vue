<template>
  <div class="go-home-wrap" @click="goHome">
    <img class="img-go-home" src="../../assets/img/map/go-home.png" />
    <span class="title">返回主页</span>
  </div>
</template>

<script>
export default {
  name: 'Index',
  methods: {
    goHome() {
      this.$router.push('/')
    }
  }
}
</script>

<style lang="scss" scoped>
.go-home-wrap{
  position: absolute;
  top: 62px;
  left: 955px;
  z-index: 6;
  cursor: pointer;
  .img-go-home{
    width: 214px;
    height: 48px;
  }
  .title{
    position: absolute;
    left: 84px;
    top: 11px;
    font-size: 24px;
    font-family: 'titlePlus';
    letter-spacing: 1px;
    font-style: italic;
    color: #FFF;
    text-shadow: 0 1px 6px #0C8C98;
  }
}
</style>
