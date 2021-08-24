<template>
  <div class="real-time-summery">
    <Border title="实时概况总览">
      <div class="outline">
        <!-- 左侧得分 -->
        <div class="left-score">
          <div class="score-title">
            实时AQI
          </div>
          <div class="score-detail">
            <div
              v-if="intimeData"
              class="score"
              :class="'level' + (levelIndex + 1)"
            >
              {{ intimeData.score }}
            </div>
            <div class="score-symbol" :class="'level' + (levelIndex + 1)">
              {{ levelArr[levelIndex] }}
            </div>
          </div>
          <div class="time">{{ nowTime }}</div>
        </div>
        <!-- 具体细节 -->
        <div v-if="intimeData" class="right-mount">
          <div class="list">
            <div class="left-icon">
              <img
                :src="require('@/assets/images/ico/icon-water-cost.png')"
                alt="水耗"
              >
            </div>
            <div class="right-detail">
              <div class="name">水耗</div>
              <div class="mount">
                <span class="mount-span">{{ intimeData.waterCost }}</span> 吨
              </div>
            </div>
          </div>
          <div class="list">
            <div class="left-icon">
              <img
                :src="require('@/assets/images/ico/icon-electron.png')"
                alt="电耗"
              >
            </div>
            <div class="right-detail">
              <div class="name">电耗</div>
              <div class="mount mount-kwh">
                <span class="mount-span">{{ intimeData.electricCost }}</span>
                KWH
              </div>
            </div>
          </div>
          <div class="list">
            <div class="left-icon">
              <img
                :src="require('@/assets/images/ico/icon-persion.png')"
                alt="行人"
              >
            </div>
            <div class="right-detail">
              <div class="name">行人</div>
              <div class="mount">
                <span class="mount-span">{{ intimeData.peopleMount }}</span> 人
              </div>
            </div>
          </div>
          <div class="list">
            <div class="left-icon">
              <img
                :src="require('@/assets/images/ico/icon-car.png')"
                alt="车辆"
              >
            </div>
            <div class="right-detail">
              <div class="name">车辆</div>
              <div class="mount">
                <span class="mount-span">{{ intimeData.carMount }}</span> 辆
              </div>
            </div>
          </div>
        </div>
      </div>
    </Border>
  </div>
</template>
<script>
import Border from '@/components/Border'
export default {
  name: 'RealTimeSummery',
  components: { Border },
  props: {
    // 得分信息
    intimeData: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      levelArr: ['优', '良', '轻度污染', '中度污染', '重度污染', '严重污染'],
      levelIndex: 0,
      nowTime: '' // 当前时间
    }
  },
  mounted() {
    this.getCurrentTime() // 先获取当前时间，解决一秒的延迟
    this.currentTime()
  },
  // 销毁定时器
  beforeDestroy() {
    if (this.getCurrentTime) {
      clearInterval(this.getCurrentTime) // 在Vue实例销毁前，清除时间定时器
    }
  },
  methods: {
    // 当前时间的计时器
    currentTime() {
      setInterval(this.getCurrentTime, 1000)
    },
    // 获取当前时间并打印
    getCurrentTime() {
      const yy = new Date().getFullYear()
      const mm = new Date().getMonth() + 1
      const dd = new Date().getDate()
      const hh = new Date().getHours()
      const mf =
        new Date().getMinutes() < 10
          ? '0' + new Date().getMinutes()
          : new Date().getMinutes()
      const ss =
        new Date().getSeconds() < 10
          ? '0' + new Date().getSeconds()
          : new Date().getSeconds()
      this.nowTime = yy + '/' + mm + '/' + dd + ' ' + hh + ':' + mf + ':' + ss
    },
    // 根据制定规则将分数转化为得分的等级
    transformScore(key) {
      // if (key > 90) {
      // } else if (key > 80) {
      // } else {
      // }
    }
  }
}
</script>
<style lang="scss" scoped>
.real-time-summery {
  width: 432px;
  .outline {
    padding: 12px;
    display: flex;
    .left-score {
      background: rgba(83, 222, 255, 0.1);
      border-radius: 4px;
      padding: 11px;
      width: 140px;
      .score-title {
        padding-left: 8px;
        color: #fff;
        font-size: 12px;
      }
      .score-detail {
        margin: 20px 0 15px 0;
        text-align: center;
        .score {
          line-height: 60px;
          font-family: 'BebasNeue';
          font-size: 56px;
          margin-bottom: 2px;
          &.level1 {
            color: #30d385;
          }
          &.level2 {
            color: #ffd50b;
          }
          &.level3 {
            color: #ff9902;
          }
          &.level4 {
            color: #ff2624;
          }
          &.level5 {
            color: #e500e5;
          }
          &.level6 {
            color: #c70000;
          }
        }
        .score-symbol {
          display: inline-block;
          height: 28px;
          line-height: 28px;
          min-width: 56px;
          padding: 0 8px;
          margin: 0 auto;
          font-size: 12px;
          color: #fff;
          border-radius: 4px;
          &.level1 {
            background: linear-gradient(180deg, #30d385 0%, #0e8049 100%);
          }
          &.level2 {
            background: linear-gradient(180deg, #ffd50b 0%, #d6b100 100%);
          }
          &.level3 {
            background: linear-gradient(180deg, #ff9902 0%, #d17d00 100%);
          }
          &.level4 {
            background: linear-gradient(180deg, #ff2624 0%, #eb0200 100%);
          }
          &.level5 {
            background: linear-gradient(180deg, #e500e5 0%, #930193 100%);
          }
          &.level6 {
            background: linear-gradient(180deg, #c70000 0%, #8d0000 100%);
          }
        }
      }
      .time {
        font-size: 12px;
        color: #fff;
        margin: 0 -10px;
        text-align: center;
      }
    }
    .right-mount {
      background: rgba(83, 222, 255, 0.1);
      display: flex;
      flex: 1;
      margin-left: 12px;
      border-radius: 4px;
      flex-wrap: wrap;
      .list {
        width: 50%;
        padding: 23px 0 12px 12px;
        display: flex;
        .left-icon {
          img {
            width: 36px;
            height: 36px;
          }
        }
        .right-detail {
          display: flex;
          flex-direction: column;
          padding-left: 6px;
          .name {
            font-size: 14px;
            color: #fff;
            font-weight: bold;
          }
          .mount {
            color: rgba(255, 255, 255, 0.6);
            font-size: 14px;
            &.mount-kwh {
              font-family: 'BebasNeue';
            }
            .mount-span {
              font-size: 32px;
              font-family: 'BebasNeue';
              color: #02fafd;
              opacity: 1;
            }
          }
        }
      }
    }
  }
}
</style>
