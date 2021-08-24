<template>
  <!-- 事件告警 -->
  <div class="event-warning">
    <Border title="事件告警">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane
          v-for="tabItem in tabList"
          :key="tabItem.name"
          :label="tabItem.label"
          :name="tabItem.name"
        >
          <div ref="ranking-box" class="ranking-box">
            <div class="title width">
              <span class="rank">水厂</span>
              <span class="waterworks">告警类型</span>
              <span>报警时间</span>
              <span class="standard-rate">状态</span>
            </div>
            <div class="rank-con">
              <Scrolling :length="list.length">
                <ul ref="ul">
                  <li v-for="item in list" :key="item.rank" class="width">
                    <span class="rank">{{ item.waterworks }}</span>
                    <span class="waterworks">{{ item.alarmType }}</span>
                    <span class="alarm-time">{{ item.alarmTime }}</span>
                    <span
                      class="state"
                      :class="{ processing: item.state === '处理中' }"
                    >{{ item.state }}</span>
                  </li>
                </ul>
              </Scrolling>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </Border>
  </div>
</template>

<script>
import Border from '@/components/Border'
import Scrolling from '@/components/Scrolling'
export default {
  name: 'EventWarning',
  components: { Border, Scrolling },
  data() {
    return {
      activeName: 'first',
      tabList: [
        {
          name: 'first',
          label: '全部'
        },
        {
          name: 'second',
          label: '设备警告'
        },
        {
          name: 'third',
          label: '事件预警'
        }
      ],
      list: [
        {
          waterworks: '赣县工业污水处理厂',
          alarmType: '设备故障',
          alarmTime: '2021/05/07 16:07:10',
          state: '未处理'
        },
        {
          waterworks: '赣县工业污水处理厂',
          alarmType: '设备故障',
          alarmTime: '2021/05/07 16:07:10',
          state: '处理中'
        },
        {
          waterworks: '赣县工业污水处理厂',
          alarmType: '水质超标',
          alarmTime: '2021/05/07 16:07:10',
          state: '未处理'
        },
        {
          waterworks: '赣县工业污水处理厂',
          alarmType: '设备故障',
          alarmTime: '2021/05/07 16:07:10',
          state: '处理中'
        },
        {
          waterworks: '于都工业污水处理厂',
          alarmType: '设备故障',
          alarmTime: '2021/05/07 16:07:10',
          state: '未处理'
        },
        {
          waterworks: '赣县工业污水处理厂',
          alarmType: '设备故障',
          alarmTime: '2021/05/07 16:07:10',
          state: '处理中'
        }
      ]
    }
  },
  methods: {
    handleClick() {}
  }
}
</script>
<style lang="scss" scoped>
.event-warning {
  margin-top: 30px;
  width: 420px;
  height: 328px;
  ::v-deep.el-tabs {
    .el-tabs__header {
      margin: 0;
    }
    .el-tabs__nav-wrap {
      .el-tabs__nav {
        .el-tabs__active-bar {
          background-color: rgba(0, 235, 255, 1);
        }
        .el-tabs__item {
          height: 34px;
          font-size: 14px;
          line-height: 32px;
          color: #ffffff;
          text-align: center;
          padding: 0 20px;
        }
        .is-active {
          color: rgba(0, 231, 255, 1);
        }
      }
    }
    .el-tabs__nav-wrap::after {
      background-color: rgba(2, 97, 155, 0.7);
      height: 1px;
    }
  }

  .ranking-box {
    height: 100%;
    box-sizing: border-box;
    padding: 12px 8px 5px;
    display: flex;
    flex-direction: column;
    .title {
      height: 34px;
      background: rgba(0, 132, 162, 0.2);
      opacity: 0.8;
    }
    .rank-con {
      height: 190px;
      overflow: hidden;
      ul {
        width: 100%;
        padding: 2px 0 4px;
        li {
          width: 100%;
          padding: 6px 0;
          display: flex;
          align-items: center;
          span {
            line-height: 20px;
          }
        }
      }
    }
    .width {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      text-align: center;
      span {
        padding: 0 5px;
        line-height: 1;
        display: inline-block;
        font-size: 14px;
        font-weight: bold;
        color: #ffffff;
        width: 80px;
      }
      .rank {
        width: 140px;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
      }
      .alarm-time {
        font-family: 'BebasNeue';
        font-weight: 400;
      }
      .state {
        color: rgba(203, 37, 55, 1);
      }
      .processing {
        color: rgba(234, 206, 0, 1);
      }
    }
  }
  .ranking-box::-webkit-scrollbar {
    display: none;
  }
}
</style>
