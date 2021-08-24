<template>
  <div class="sewage-deal-container">
    <!-- 头部 -->
    <Header title="中节能智慧环保管家综合监测平台" />
    <!-- 背景 -->
    <Background />
    <!-- 地图 -->
    <sewage-map />
    <!-- 左边区域 -->
    <div class="sewage-deal sewage-deal-left">
      <div class="left-part-zone">
        <!-- 运营总览 -->
        <OperateSummery />
        <!-- 月度运营成本分析 -->
        <MonthOperateAnalysis />
        <!-- 污水处理量趋势分析 -->
        <TendencyAnalysis />
      </div>
      <div class="right-part-zone">
        <!-- 月度运营计划分析 -->
        <MonthPlanAnalysis />
        <!-- 月度污水处理完成效率排名 -->
        <sewage-treatment-ranking />
      </div>
    </div>
    <!-- 右边区域 -->
    <div class="sewage-deal sewage-deal-right">
      <div class="left-part-zone">
        <!-- 综合考核排名 -->
        <ComprehensiveRanking />
        <!-- 事件告警 -->
        <EventWarning />
      </div>
      <div class="right-part-zone">
        <!-- 月度出水达标率分析 -->
        <MonthWatweAnalysis />
        <!-- 重点生产设备完好率 -->
        <ImportantRate />
        <!-- 视频监控 -->
        <VideoSurveillance />
      </div>
    </div>
  </div>
</template>
<script>
import Header from '@/components/Header'
import Background from '@/components/Background'
import SewageTreatmentRanking from './components/sewageTreatmentRanking.vue'
import OperateSummery from './components/OperateSummery'
import ImportantRate from './components/ImportantRate'
import MonthWatweAnalysis from './components/MonthWatweAnalysis'
import TendencyAnalysis from './components/TendencyAnalysis'
import MonthPlanAnalysis from './components/MonthPlanAnalysis'
import MonthOperateAnalysis from './components/MonthOperateAnalysis'
import SewageMap from './components/SewageMap'
import VideoSurveillance from './components/videoSurveillance.vue'
import EventWarning from './components/eventWarning.vue'
import ComprehensiveRanking from './components/comprehensiveRanking.vue'
export default {
  name: 'SewageDeal',
  components: {
    SewageMap,
    Header,
    Background,
    SewageTreatmentRanking,
    OperateSummery,
    ImportantRate,
    MonthWatweAnalysis,
    TendencyAnalysis,
    MonthPlanAnalysis,
    MonthOperateAnalysis,
    VideoSurveillance,
    EventWarning,
    ComprehensiveRanking
  }
}
</script>
<style lang="scss" scoped>
.sewage-deal {
  position: absolute;
  top: 64px;
  z-index: 17;
  &.sewage-deal-left {
    left: 40px;
    width: 900px;
    display: flex;
    .right-part-zone {
      margin-left: 30px;
    }
  }
  &.sewage-deal-right {
    right: 40px;
    width: 900px;
    display: flex;
    .right-part-zone {
      margin-left: 30px;
    }
  }
}
</style>
