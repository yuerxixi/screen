<template>
  <div class="threewasteDeal">
    <Border title="三废专题">
      <template v-slot:right>
        <ul class="changeview">
          <li
            v-for="(item, index) in titleTop"
            :key="index"
            :class="{ active: index == 0 }"
          >
            {{ item.name }}<span v-if="index !== titleTop.length - 1" />
          </li>
        </ul>
      </template>
      <!-- 标题 -->
      <div class="top-title">
        <div class="top-title-left">运营总览</div>
        <div class="top-title-right">月度出水达标率分析</div>
      </div>
      <!--内容 -->
      <div class="content">
        <!-- 运营总览 -->
        <div class="content-left">
          <div class="seperate-container">
            <PieRateCharts id="operateSummery" :height="height2" />
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
        </div>
        <!-- 月度出水达标率分析 -->
        <div class="content-right">
          <RingCharts id="monthRate" :datas="datas" :height="height2" />
        </div>
      </div>
    </Border>
  </div>
</template>
<script>
import Border from '@/components/Border'
import RingCharts from '@/components/Charts/ringCharts'
import PieRateCharts from '@/components/Charts/pieRateCharts'
export default {
  name: 'ThreewasteDeal',
  components: { Border, RingCharts, PieRateCharts },
  data() {
    return {
      height1: 172,
      height2: 172,
      titleTop: [
        // 头部标题
        {
          name: '废水'
        },
        {
          name: '废气'
        },
        {
          name: '固废'
        }
      ],
      // 暂定表格数据
      datas: [
        { name: '出水达标率', value: 30 },
        { name: '出水超标率', value: 10 }
      ]
    }
  },
  mounted() {},
  methods: {}
}
</script>
<style lang="scss" scoped>
.threewasteDeal {
  .changeview {
    li {
      display: inline-flex;
      font-size: 14px;
      font-weight: 700;
      align-items: center;
      color: rgba(255, 255, 255, 0.6);
      span {
        display: inline-block;
        width: 1px;
        padding: 0 !important;
        height: 15px;
        margin: 0 8px;
        vertical-align: middle;
        border-right: 1px solid #0bcdff;
      }
      &.active {
        color: #0ac4d8;
      }
    }
  }
  margin-top: 25px;
  .top-title {
    display: flex;
    border-bottom: 1px solid #02619b;
    > div {
      flex: 1;
      text-align: center;
      font-weight: 700;
      color: #fff;
      font-size: 16px;
      line-height: 34px;
    }
  }
  #operateSummery,
  #monthRate {
    height: 172px;
  }
  .content {
    display: flex;
    > div {
      flex: 1;
      height: 172px;
    }
    .content-left {
      border-right: 1px solid #02619b;
      .seperate-container {
        display: flex;
        > div {
          flex: 0 0 50%;
        }
        .detail-info {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: flex-start;
          padding-right: 30px;
          color: #fff;
          .list {
            width: 100%;
            display: flex;
            font-weight: 700;
            align-items: center;
            justify-content: space-between;
            color: #fff;
            .left-title{
             font-size: 14px;
            }
            span {
              display: inline-block;
              font-size: 28px;
              font-family: BebasNeue;
              color: #fff;
              margin-right: 4px;
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
  }
}
@media screen and (max-width: 1920px) {
  .threewasteDeal .content .content-left .seperate-container .detail-info {
    padding-right: 4px;
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
