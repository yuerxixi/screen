<template>
  <div class="operateSummery">
    <Border title="运营总览">
      <div class="operate-container">
        <PieRateCharts id="operateSummeryDeal" />
        <div class="detail-info">
          <div class="list">
            <div class="left-title">水厂总数</div>
            <div class="right-info">
              <span>38</span><span class="percent">家</span>
            </div>
          </div>
          <div class="list">
            <div class="left-title">累计处理量</div>
            <div class="right-info">
              <span>1335</span><span class="percent">万吨</span>
            </div>
          </div>
          <div class="list">
            <div class="left-title">本月计划处理量</div>
            <div class="right-info">
              <span>1780</span><span class="percent">万吨</span>
            </div>
          </div>
          <div class="list">
            <div class="left-title">月负载处理量</div>
            <div class="right-info">
              <span class="uni-over">2620</span><span class="percent">万吨</span>
            </div>
          </div>
        </div>
      </div>
    </Border>
  </div>
</template>
<script>
import Border from '@/components/Border'
import PieRateCharts from '@/components/Charts/pieRateCharts'
export default {
  name: 'OperateSummery',
  components: { Border, PieRateCharts },
  data() {
    return {}
  },
  mounted() {},
  methods: {}
}
</script>
<style lang="scss" scoped>
.operateSummery {
  width: 444px;
  #operateSummeryDeal {
    height: 194px;
  }
  .operate-container {
    display: flex;
    > div {
      flex: 0 0 50%;
    }
    .detail-info {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: flex-start;
      padding-left: 10px;
      padding-right: 20px;
      color: #fff;
      .list {
        width: 100%;
        display: flex;
        font-weight: 700;
        align-items: center;
        justify-content: space-between;
        color: #fff;
        .left-title {
          font-size: 14px;
        }
        span {
          display: inline-block;
          font-size: 28px;
          font-family: BebasNeue;
          color: #fff;
          margin-right: 4px;
          // vertical-align: sub;
          &.uni-over {
            color: #ff0200;
          }
          &.percent {
            vertical-align: text-bottom;
            font-size: 12px;
            font-weight: bold;
            color: rgba(#fff, 0.6);
          }
        }
      }
    }
  }
}
@media screen and (max-width: 1920px) {
  .operateSummery .operate-container .detail-info {
    padding-right: 4px;
    padding-left: 0;
    font-size: 12px;
    .list {
      font-weight: normal;
      span {
        font-size: 22px;
        font-weight: normal;
        &.percent {
          vertical-align: bottom;
          font-weight: normal;
        }
      }
    }
  }
}
</style>
