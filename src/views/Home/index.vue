<template>
  <div class="home">
    <!-- 头部 -->
    <Header title="中节能智慧环保管家综合监测平台" />
    <!-- 背景 -->
    <Background />

    <home-map />
    <div class="home-con home-con-left">
      <!-- 视频监控 -->
      <VideoSurveillance />
      <div class="margin-left">
        <!-- 异常报错 -->
        <AbnormalAlarm />
        <!-- 重点生产设备完好率 -->
        <ImportantRate />
      </div>
    </div>
    <div class="home-con home-con-right">
      <div class="right-box">
        <!-- 中节能低碳园 -->
        <LowCarbon />
        <!-- 污水处理厂 -->
        <SewageDeal />
        <!-- 三废专题 -->
        <ThreewasteDeal />
      </div>
    </div>
  </div>
</template>

<script>
import Header from '@/components/Header'
import Background from '@/components/Background'
import AbnormalAlarm from './components/abnormalAlarm'
import VideoSurveillance from './components/videoSurveillance.vue'
import ImportantRate from './components/ImportantRate'
import LowCarbon from './components/LowCarbon'
import SewageDeal from './components/SewageDeal'
import ThreewasteDeal from './components/ThreewasteDeal'
import HomeMap from './components/HomeMap'
export default {
  name: 'Home',
  components: {
    HomeMap,
    Header,
    Background,
    AbnormalAlarm,
    VideoSurveillance,
    ImportantRate,
    LowCarbon,
    SewageDeal,
    ThreewasteDeal
  },
  methods: {}
}
</script>
<style lang="scss" scoped>
.home-con {
  position: absolute;
  top: 64px;
  //height: 30.57vw;
  z-index: 7;
}
.home-con-left {
  left: 40px;
  width: 900px;
  display: flex;
  .margin-left {
    margin-left: 24px;
  }
}
.home-con-right {
  right: 40px;
  width: 900px;
  display: flex;
  flex-direction: column;
}
.home-con-center {
  z-index: 8;
  left: 0;
  right: 0;
  margin: 0 auto;
  margin-top: -30px;
  display: flex;
  justify-content: space-between;
}
</style>
