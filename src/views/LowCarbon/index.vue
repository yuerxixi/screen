<template>
  <div class="lowcarbon-container">
    <!-- 头部 -->
    <Header title="中节能智慧环保管家综合监测平台" />
    <!-- 背景 -->
    <Background style="background:#0C2338" />
    <lowcarbon-map />
    <!-- 左边区域 -->
    <div class="lowcarbon lowcarbon-left">
      <div class="top-title-carbon">
        <div class="title">中节能江西低碳园</div>
      </div>
      <div class="zone-container">
        <div class="left-part-zone">
          <!-- 实时概况总览 -->
          <RealTimeSummery :intime-data="intimeLeft" />
          <!-- 报警详情 -->
          <WarnDetail
            :title-top="lefttitleTop"
            direction="left"
            :list="leftWrnList[leftWarnIndex]"
            :warn-index="leftWarnIndex"
            @changeWarnIndex="changeWarnIndex"
          />
          <!-- 人行信息 -->
          <PeopleFlow />
        </div>
        <div class="right-part-zone">
          <!-- 用水统计 -->
          <WaterCostTotal id="left-water-cost" :datas="echartData" />
          <!-- 能耗统计 -->
          <EnergyCostSummery id="left-energy-cost" :datas="echartDataEnergy" />
          <!-- 车行信息 -->
          <CarFlow />
        </div>
      </div>
    </div>
    <!-- 右边区域 -->
    <div class="lowcarbon lowcarbon-right">
      <div class="top-title-carbon">
        <div class="title">中节能国际中心</div>
      </div>
      <div class="zone-container">
        <div class="left-part-zone">
          <!-- 实时概况总览 -->
          <RealTimeSummery :intime-data="intimeRight" />
          <!-- 报警详情 -->
          <WarnDetail
            :title-top="lefttitleTop"
            direction="right"
            :list="rightWrnList[rightWarnIndex]"
            :warn-index="rightWarnIndex"
            @changeWarnIndex="changeWarnIndex"
          />
        </div>
        <div class="right-part-zone">
          <!-- 用水统计 -->
          <WaterCostTotal id="right-water-cost" :datas="echartDataRight" />
          <!-- 能耗统计 -->
          <EnergyCostSummery
            id="right-energy-cost"
            :datas="echartDataRightEnergy"
          />
        </div>
      </div>
      <RightCarFlow />
    </div>
  </div>
</template>

<script>
import Header from '@/components/Header'
import Background from '@/components/Background'
import LowcarbonMap from './components/LowcarbonMap'
import RealTimeSummery from './components/RealTimeSummery'
import WaterCostTotal from './components/WaterCostTotal'
import WarnDetail from './components/WarnDetail'
import PeopleFlow from './components/PeopleFlow'
import EnergyCostSummery from './components/EnergyCostSummery'
import CarFlow from './components/CarFlow'
import RightCarFlow from './components/RightCarFlow'
export default {
  name: 'Lowcarbon',
  components: {
    Header,
    Background,
    LowcarbonMap,
    RealTimeSummery,
    WaterCostTotal,
    WarnDetail,
    PeopleFlow,
    EnergyCostSummery,
    CarFlow,
    RightCarFlow
  },
  data() {
    return {
      // 左侧的实时概况总览
      intimeLeft: {
        score: 39, // 得分
        waterCost: 30, // 水耗
        electricCost: 60,
        peopleMount: 1257, // 行人数量
        carMount: 306 // 车辆数量
      },
      // 右侧的实时概况总览
      intimeRight: {
        score: 39, // 得分
        waterCost: 36, // 水耗
        electricCost: 80,
        peopleMount: 1357, // 行人数量
        carMount: 606 // 车辆数量
      },
      // 左侧的用水统计（江西低碳园）
      echartData: [
        {
          name: '星期一',
          value1: 280,
          value2: 310
        },
        {
          name: '星期二',
          value1: 300,
          value2: 280
        },
        {
          name: '星期三',
          value1: 260,
          value2: 350
        },
        {
          name: '星期四',
          value1: 300,
          value2: 260
        },
        {
          name: '星期五',
          value1: 180,
          value2: 320
        },
        {
          name: '星期六',
          value1: 300,
          value2: 280
        },
        {
          name: '星期日',
          value1: 330,
          value2: 330
        }
      ],
      // 右侧的用水统计（国际中心）
      echartDataRight: [
        {
          name: '星期一',
          value1: 290,
          value2: 310
        },
        {
          name: '星期二',
          value1: 320,
          value2: 280
        },
        {
          name: '星期三',
          value1: 280,
          value2: 350
        },
        {
          name: '星期四',
          value1: 330,
          value2: 260
        },
        {
          name: '星期五',
          value1: 230,
          value2: 320
        },
        {
          name: '星期六',
          value1: 350,
          value2: 280
        },
        {
          name: '星期日',
          value1: 300,
          value2: 330
        }
      ],
      // 左侧的能耗统计（江西低碳园）
      echartDataEnergy: [
        {
          name: '星期一',
          value1: 150
        },
        {
          name: '星期二',
          value1: 120
        },
        {
          name: '星期三',
          value1: 130
        },
        {
          name: '星期四',
          value1: 140
        },
        {
          name: '星期五',
          value1: 120
        },
        {
          name: '星期六',
          value1: 110
        },
        {
          name: '星期日',
          value1: 160
        }
      ],
      // 右侧的能耗统计（国际中心）
      echartDataRightEnergy: [
        {
          name: '星期一',
          value1: 120
        },
        {
          name: '星期二',
          value1: 140
        },
        {
          name: '星期三',
          value1: 160
        },
        {
          name: '星期四',
          value1: 180
        },
        {
          name: '星期五',
          value1: 150
        },
        {
          name: '星期六',
          value1: 130
        },
        {
          name: '星期日',
          value1: 160
        }
      ],
      // 左侧报警详情
      lefttitleTop: [
        // 头部标题
        {
          name: '事件报警'
        },
        {
          name: '设备报警'
        }
      ],
      // 左侧报警详情选中的索引值
      leftWarnIndex: 0,
      // 右侧报警详情选中的索引值
      rightWarnIndex: 0,
      // 左侧的报警信息详情
      leftWrnList: [
        [
          {
            equipment: 'ZJ001',
            alarmLocation: '围墙南侧点位',
            alarmTime: '2021/05/07 16:07:10',
            type: '闯入',
            content: '异常闯入'
          },
          {
            equipment: 'ZJ002',
            alarmLocation: '围墙南侧点位',
            alarmTime: '2021/05/07 16:07:10',
            type: '监测',
            content: '超标'
          },
          {
            equipment: 'ZJ003',
            alarmLocation: '围墙南侧点位',
            alarmTime: '2021/05/07 16:07:10',
            type: '人员',
            content: '黑名单'
          },
          {
            equipment: 'ZJ004',
            alarmLocation: '围墙南侧点位',
            alarmTime: '2021/05/07 16:07:10',
            type: '监测',
            content: '超标'
          },
          {
            equipment: 'ZJ003',
            alarmLocation: '围墙南侧点位',
            alarmTime: '2021/05/07 16:07:10',
            type: '人员',
            content: '黑名单'
          },
          {
            equipment: 'ZJ004',
            alarmLocation: '围墙南侧点位',
            alarmTime: '2021/05/07 16:07:10',
            type: '监测',
            content: '超标'
          }
        ],
        [
          {
            equipment: 'KQ003',
            alarmLocation: '3#空气监测位',
            alarmTime: '2021/05/07 16:07:10',
            type: '离线',
            content: '未处理'
          },
          {
            equipment: 'YY002',
            alarmLocation: '中央高楼',
            alarmTime: '2021/05/07 16:07:10',
            type: '故障',
            content: '未处理'
          },
          {
            equipment: 'CZ004',
            alarmLocation: '南入口',
            alarmTime: '2021/05/07 16:07:10',
            type: '故障',
            content: '未处理'
          }
        ]
      ],
      // 右侧的报警信息详情
      rightWrnList: [
        [
          {
            equipment: 'ZJ001',
            alarmLocation: '围墙南侧点位',
            alarmTime: '2021/05/07 16:07:10',
            type: '闯入',
            content: '异常闯入'
          },
          {
            equipment: 'ZJ002',
            alarmLocation: '围墙南侧点位',
            alarmTime: '2021/05/07 16:07:10',
            type: '监测',
            content: '超标'
          },
          {
            equipment: 'ZJ003',
            alarmLocation: '围墙南侧点位',
            alarmTime: '2021/05/07 16:07:10',
            type: '人员',
            content: '黑名单'
          },
          {
            equipment: 'ZJ004',
            alarmLocation: '围墙南侧点位',
            alarmTime: '2021/05/07 16:07:10',
            type: '监测',
            content: '超标'
          },
          {
            equipment: 'ZJ004',
            alarmLocation: '围墙南侧点位',
            alarmTime: '2021/05/07 16:07:10',
            type: '监测',
            content: '超标'
          }
        ],
        [
          {
            equipment: 'KQ003',
            alarmLocation: '3#空气监测位',
            alarmTime: '2021/05/07 16:07:10',
            type: '离线',
            content: '未处理'
          },
          {
            equipment: 'YY002',
            alarmLocation: '中央高楼',
            alarmTime: '2021/05/07 16:07:10',
            type: '故障',
            content: '未处理'
          },
          {
            equipment: 'CZ005',
            alarmLocation: '南入口',
            alarmTime: '2021/05/07 16:07:10',
            type: '故障',
            content: '未处理'
          }
        ]
      ]
    }
  },
  methods: {
    changeWarnIndex(index, direction) {
      if (direction === 'left') {
        this.leftWarnIndex = index
      } else {
        this.rightWarnIndex = index
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.lowcarbon {
  position: absolute;
  top: 28px;
  z-index: 17;
  &.lowcarbon-left {
    left: 40px;
    width: 900px;
    .zone-container {
      display: flex;
      margin-top: 20px;
      .right-part-zone {
        margin-left: 30px;
      }
    }
  }
  &.lowcarbon-right {
    right: 40px;
    width: 900px;
    .zone-container {
      display: flex;
      margin-top: 20px;
      .right-part-zone {
        margin-left: 30px;
      }
    }
  }
  .top-title-carbon {
    display: flex;
    align-items: center;
    justify-content: center;
    .title {
      width: 280px;
      height: 48px;
      background: url(../../assets/images/img/title-bg.png);
      font-size: 24px;
      line-height: 58px;
      background-size: cover;
      text-align: center;
      color: #fff;
      text-shadow: 0px 1px 3px #0c8c98;
      font-family: titlePlus;
    }
  }
}
</style>
