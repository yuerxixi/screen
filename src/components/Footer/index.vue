<template>
  <div class="footer">
    <div class="block-wrap block-wrap1" @click="changePage(1)">
      <div v-if="pageNum !== 1" class="footer-noclick-bg">
        <img
          class="img-dty"
          src="../../assets/img/map/map-dty-noclick.png"
          alt="低碳园/中节能国际中心"
        >
      </div>
      <div v-else class="map-svg-wrap">
        <svg-icon icon-class="map-footer-bg" class-name="map-footer-icon" />
        <img
          class="img-dty"
          src="../../assets/img/map/map-dty-click.png"
          alt="低碳园/中节能国际中心"
        >
      </div>
      <span
        class="title"
        :class="{ 'title-sel': pageNum === 1 }"
      >低碳园/中节能国际中心</span>
    </div>
    <div class="block-wrap block-wrap2" @click="changePage(2)">
      <div v-if="pageNum !== 2" class="footer-noclick-bg">
        <img
          class="img-dty"
          src="../../assets/img/map/map-wsclc-noclick.png"
          alt="污水处理厂总览"
        >
      </div>
      <div v-else class="map-svg-wrap">
        <svg-icon icon-class="map-footer-bg" class-name="map-footer-icon" />
        <img
          class="img-dty"
          src="../../assets/img/map/map-wsclc-click.png"
          alt="污水处理厂总览"
        >
      </div>
      <span
        class="title"
        :class="{ 'title-sel': pageNum === 2 }"
      >污水处理厂总览</span>
    </div>
    <div class="block-wrap block-wrap3" @click="changePage(3)">
      <div v-if="pageNum !== 3" class="footer-noclick-bg">
        <img
          class="img-dty"
          src="../../assets/img/map/map-sf-noclick.png"
          alt="三废概览"
        >
      </div>
      <div v-else class="map-svg-wrap">
        <svg-icon icon-class="map-footer-bg" class-name="map-footer-icon" />
        <img
          class="img-dty"
          src="../../assets/img/map/map-sf-click.png"
          alt="三废概览"
        >
      </div>
      <span
        class="title"
        :class="{ 'title-sel': pageNum === 3 }"
      >三废概览</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Index',
  props: {
    pageNum: {
      type: Number,
      default: 0
    }
  },
  methods: {
    // 地图底部按钮切换事件
    changePage(value) {
      if (value === this.pageNum) {
        return
      }
      if (value === 1) {
        this.$router.push('lowCarbon')
      } else if (value === 2) {
        this.$router.push('sewageDeal')
      } else if (value === 3) {
        // this.$router.push('sewageDeal')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.map-footer-icon {
  width: 110px;
  height: 92px;
}
.footer {
  width: 2000px;
  height: 140px;
  background: url('../../assets/img/map/map-footer1.png') no-repeat;
  background-size: 100% 100%;
  position: absolute;
  top: calc(30.57vw - 160px);
  left: 571px;
  z-index: 6;
  display: flex;
  .block-wrap {
    position: absolute;
    top: 55px;
    display: flex;
    cursor: pointer;
    .footer-noclick-bg {
      width: 100px;
      height: 77px;
      cursor: pointer;
      background: url('../../assets/img/map/map-footer-noclick.png') no-repeat;
      background-size: 100% 100%;
      display: flex;
      justify-content: center;
    }
    .map-svg-wrap {
      cursor: pointer;
      position: relative;
      margin: -17px -4px 0 -6px;
      .img-dty {
        position: absolute;
        //left: 22px;
        //top: 17px;
      }
    }
    .title {
      font-size: 20px;
      color: #36e8ff;
      font-family: 'titlePlus';
      padding-top: 40px;
      margin-left: 8px;
    }
    .title-sel {
      color: #ffffff;
      text-shadow: 0px 2px 4px #00ebff;
    }
  }
  .block-wrap1 {
    left: 502px;
    .img-dty {
      width: 62px;
      height: 61px;
      left: 25px;
      top: 17px;
    }
  }
  .block-wrap2 {
    left: 860px;
    .img-dty {
      width: 65px;
      height: 60px;
      left: 23px;
      top: 17px;
    }
  }
  .block-wrap3 {
    left: 1240px;
    .img-dty {
      width: 56px;
      height: 66px;
      left: 28px;
      top: 17px;
    }
  }
}
</style>
