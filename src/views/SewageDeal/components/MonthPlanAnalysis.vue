<template>
  <div class="monthPlanAnalysis">
    <Border title="月度运营计划分析">
      <!-- <BarRateMonthCharts id="monthDeal" :datas="monthData" /> -->
      <ul id="monthDeal">
        <li v-for="(item, index) in monthData" :key="index">
          <div class="name-left">{{ item.title }}</div>
          <div class="progress">
            <el-progress
              :stroke-width="8"
              :show-text="false"
              color="#0BEBFF"
              :percentage="(item.value / item.fullValue) * 100"
              stroke-linecap="butt"
            />
          </div>
          <div class="right-mount">
            <span class="mount">{{ item.value }}</span>
            <span class="allMount">&nbsp;/{{ item.fullValue }}</span>
            <span
              class="mount-per"
            >&nbsp;{{ index === 1 ? 'KWH' : '吨' }}</span>
          </div>
        </li>
      </ul>
      <div class="title-separate">
        药耗
      </div>
      <div />
      <ul id="monthDeal" class="medicalData">
        <li v-for="(item, index) in medicalData" :key="index">
          <div class="name-left">{{ item.title }}</div>
          <div class="progress">
            <el-progress
              :stroke-width="8"
              :show-text="false"
              color="#0BEBFF"
              :percentage="(item.value / item.fullValue) * 100"
              stroke-linecap="butt"
            />
          </div>
          <div class="right-mount">
            <span class="mount">{{ item.value }}</span>
            <span class="allMount">&nbsp;/{{ item.fullValue }}</span>
            <span class="mount-per">&nbsp;吨</span>
          </div>
        </li>
      </ul>
      <!-- <BarRateCharts id="monthAnalysis" from="waste" :datas="medicalData" /> -->
    </Border>
  </div>
</template>
<script>
import Border from '@/components/Border'
// import BarRateCharts from '@/components/Charts/barRateCharts'
// import BarRateMonthCharts from '@/components/Charts/barRateMonthCharts'
export default {
  name: 'MonthPlanAnalysis',
  components: { Border },
  data() {
    return {
      monthData: [
        {
          value: 1335,
          title: '处理水量',
          fullValue: 1780
        },
        {
          value: 6261,
          title: '电耗',
          fullValue: 8200
        },
        {
          value: 6731,
          title: '水耗',
          fullValue: 8200
        }
      ],
      // 药耗的表格数据格式暂定
      medicalData: [
        {
          value: 50,
          title: 'Y-001',
          fullValue: 100
        },
        {
          value: 60,
          title: 'Y-002',
          fullValue: 100
        },
        {
          value: 70,
          title: 'Y-003',
          fullValue: 100
        },
        {
          value: 20,
          title: 'Y-004',
          fullValue: 100
        },
        {
          value: 30,
          title: 'Y-005',
          fullValue: 100
        },
        {
          value: 10,
          title: 'Y-006',
          fullValue: 100
        }
      ]
    }
  },
  mounted() {},
  methods: {}
}
</script>
<style lang="scss" scoped>
.monthPlanAnalysis {
  width: 420px;
  #monthDeal {
    height: 170px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    li {
      display: flex;
      padding: 10px 0;
      align-items: center;
      //justify-content: space-between;
      color: #fff;
      .name-left {
        width: 65px;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        font-size: 14px;
        font-family: 'BebasNeue';
      }
      .progress {
        width: 188px;
        margin-right: 16px;
        ::v-deep.el-progress-bar__outer {
          border-radius: 0;
          background: #465b60;
          height: 10px !important;
          .el-progress-bar__inner {
            border-radius: 0;
            height: 10px !important;
          }
        }
      }
      .right-mount {
        width: 100px;
        .mount {
          color: #0bebff;
          font-size: 20px;
          font-family: 'BebasNeue';
          margin-right: 4px;
        }
        .allMount {
          font-family: 'BebasNeue';
          font-size: 16px;
          color: rgba(255, 255, 255, 0.8);
        }
        .mount-per {
          color: rgba(255, 255, 255, 0.6);
          font-size: 14px;
        }
      }
    }
    &.medicalData {
      height: 250px;
      li {
        padding: 6px 0;
      }
    }
  }
  .title-separate {
    line-height: 42px;
    margin: 0 23px;
    padding-left: 10px;
    color: #00ebff;
    font-size: 16px;
    font-family: 'titlePlus';
    border-bottom: 1px solid rgba(2, 97, 155, 0.7);
  }
}
@media screen and (max-width: 1920px) {
  .monthPlanAnalysis #monthDeal li {
    .name-left {
      width: 65px;
    }
    .progress {
      width: 160px;
    }
  }
}
</style>
