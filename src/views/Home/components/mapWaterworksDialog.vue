<template>
  <div v-if="dialogVisible" class="map-waterworks-info-dialog">
    <div class="header">
      <div class="h-name">
        <span class="name">{{ markerInfoData.name }}</span>
        <img
          class="icon-video"
          src="../../../assets/img/map/map-info-icon1.png"
          alt="map-info-icon1"
          @click="showVideoDialog"
        >
      </div>
      <img
        class="icon-close"
        src="../../../assets/img/map/map-close.png"
        alt="close"
        @click="closeInfoDialog"
      >
    </div>
    <div class="content">
      <div class="waterworks-data-wrap">
        <div class="waterworks-wrap1">
          <div id="ichart1" />
          <div class="num-wrap">
            <span class="num">98</span>
            <span class="dw">分</span>
          </div>
          <div class="title-wrap">综合考核</div>
        </div>
        <div class="waterworks-wrap2">
          <div class="row">
            <span class="name">出厂水质达标率</span>
            <span class="num">77</span>
            <span class="dw">%</span>
          </div>
          <div class="row">
            <span class="name">设备利用率</span>
            <span class="num">92</span>
            <span class="dw">%</span>
          </div>
          <div class="row">
            <span class="name">实时处理水量</span>
            <span class="num">300</span>
            <span class="dw">吨</span>
          </div>
          <div class="row">
            <span class="name">当月水耗</span>
            <span class="num">2</span>
            <span class="dw">吨</span>
          </div>
          <div class="row">
            <span class="name">当月电耗</span>
            <span class="num">6261</span>
            <span class="dw">KWH</span>
          </div>
        </div>
        <div class="waterworks-wrap3">
          <div class="title">当月药耗</div>
          <div class="data-wrap">
            <div class="row">
              <div class="block">
                <span class="name">Y-001</span>
                <div class="num-wrap">
                  <span class="num">2000</span>
                  <span class="dw">kg</span>
                </div>
              </div>
              <div class="block">
                <span class="name">Y-002</span>
                <div class="num-wrap">
                  <span class="num">3200</span>
                  <span class="dw">kg</span>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="block">
                <span class="name">Y-003</span>
                <div class="num-wrap">
                  <span class="num">3200</span>
                  <span class="dw">kg</span>
                </div>
              </div>
              <div class="block">
                <span class="name">Y-004</span>
                <div class="num-wrap">
                  <span class="num">1600</span>
                  <span class="dw">kg</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="gj-title">实时告警</div>
      <div class="alarm-wrap">
        <div class="t-header">
          <span class="col1">报警类型</span>
          <span class="col2">报警内容</span>
          <span class="col3">报警时间</span>
          <span class="col4">状态</span>
        </div>
        <div class="t-body">
          <div v-for="item in waterworksAlarmData" :key="item.id" class="row">
            <span class="col1">{{ item.alarmType }}</span>
            <span class="col2">{{ item.alarmText }}</span>
            <span class="col3">{{ item.alarmDate }}</span>
            <span class="col4" :class="{ red: item.alarmState === '未处理' }">{{
              item.alarmState
            }}</span>
          </div>
        </div>
      </div>
    </div>
    <VideoFull :is-show.sync="isShow" src="" />
  </div>
</template>

<script>
import VideoFull from '@/components/VideoFull'
export default {
  name: 'MapWaterworksDialog',
  components: {
    VideoFull
  },
  props: {
    visible: {
      type: Boolean,
      required: true
    },
    markerInfoData: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      waterworksAlarmData: [
        {
          id: '1',
          alarmType: '设备故障',
          alarmText: '抽水泵设备故障',
          alarmDate: '2021-05-07 16:07:10',
          alarmState: '未处理'
        },
        {
          id: '2',
          alarmType: '设备故障',
          alarmText: 'xx抽水泵设备故障',
          alarmDate: '2021-05-07 16:07:10',
          alarmState: '已处理'
        },
        {
          id: '3',
          alarmType: '设备故障',
          alarmText: '抽水泵设备故障',
          alarmDate: '2021-05-07 16:07:10',
          alarmState: '已处理'
        },
        {
          id: '4',
          alarmType: '设备故障',
          alarmText: 'xx抽水泵设备故障',
          alarmDate: '2021-05-07 16:07:10',
          alarmState: '已处理'
        },
        {
          id: '5',
          alarmType: '设备故障',
          alarmText: '抽水泵设备故障',
          alarmDate: '2021-05-07 16:07:10',
          alarmState: '已处理'
        }
      ], // 水厂弹窗报警数据
      dialogVisible: false,
      isShow: false
    }
  },
  watch: {
    visible(val) {
      this.dialogVisible = val
      if (val) {
        this.$nextTick(() => {
          this.loadChart1()
        })
      }
    }
  },
  methods: {
    // 加载水厂弹框echarts图标
    loadChart1() {
      const iChart = this.$echarts.init(document.getElementById('ichart1'))
      const option = {
        series: [
          {
            name: '综合考核',
            type: 'pie',
            radius: ['46%', '60%'],
            center: ['50%', '42%'],
            hoverAnimation: false,
            itemStyle: {
              normal: {
                color: '#39ff68',
                shadowColor: '#39ff68',
                shadowBlur: 0,
                label: {
                  show: false
                },
                labelLine: {
                  show: false
                },
                borderRadius: 5
              }
            },
            clockWise: false,
            data: [
              {
                value: 98
              },
              {
                value: 2,
                name: 'invisible',
                itemStyle: {
                  normal: {
                    color: '#465b60'
                  },
                  emphasis: {
                    color: '#465b60'
                  }
                }
              }
            ]
          }
        ]
      }
      iChart.setOption(option)
    },
    // 关闭弹窗
    closeInfoDialog() {
      this.dialogVisible = false
      this.$emit('update:visible', this.dialogVisible)
    },
    // 显示视频弹框
    showVideoDialog() {
      this.isShow = true
    }
  }
}
</script>

<style lang="scss" scoped>
// 污水处理厂弹框
.map-waterworks-info-dialog {
  width: 748px;
  height: 554px;
  position: absolute;
  left: 1180px;
  top: 180px;
  border: 2px solid rgba(119, 215, 250, 0.6);
  backdrop-filter: blur(10px);
  border-radius: 8px;
  background: rgba(12, 20, 38, 0.85);
  z-index: 10;
  .header {
    width: 100%;
    height: 48px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: rgba(0, 233, 255, 0.08);
    border-radius: 8px 8px 0 0;
    .h-name {
      padding-left: 16px;
      display: flex;
      align-items: center;
      .name {
        height: 21px;
        font-size: 16px;
        font-weight: bold;
        line-height: 22px;
        color: #ffffff;
        margin-right: 14px;
      }
      .icon-video {
        width: 33px;
        height: 32px;
        margin-top: 6px;
        cursor: pointer;
      }
    }
    .icon-close {
      width: 24px;
      height: 24px;
      margin-right: 20px;
      cursor: pointer;
    }
  }
  .content {
    width: 100%;
    height: 502px;
    padding: 16px;
    color: #fff;
    .waterworks-data-wrap {
      width: 100%;
      height: 187px;
      display: flex;
      .waterworks-wrap1 {
        width: 228px;
        height: 187px;
        background: rgba(255, 255, 255, 0.06);
        border-radius: 8px;
        margin-right: 16px;
        position: relative;
        #ichart1 {
          width: 100%;
          height: 100%;
        }
        .num-wrap {
          position: absolute;
          left: 0;
          top: 30%;
          width: 100%;
          text-align: center;
          .num {
            font-size: 32px;
            color: #38ff67;
          }
          .dw {
            font-size: 16px;
            color: rgba(255, 255, 255, 0.6);
            margin-left: 4px;
          }
        }
        .title-wrap {
          position: absolute;
          left: 0;
          top: 80%;
          width: 100%;
          text-align: center;
          font-size: 14px;
        }
      }
      .waterworks-wrap2 {
        width: 228px;
        height: 187px;
        background: rgba(255, 255, 255, 0.06);
        border-radius: 8px;
        margin-right: 16px;
        .row {
          display: flex;
          align-items: center;
          margin-top: 6px;
          .name {
            font-size: 12px;
            color: #ffffff;
            margin-left: 23px;
            flex: 0 0 95px;
          }
          .num {
            font-size: 24px;
            font-family: BebasNeue;
            color: #0bebff;
            flex: 0 0 62px;
            text-align: right;
          }
          .dw {
            font-size: 12px;
            color: #ffffff;
            opacity: 0.6;
            margin-left: 9px;
          }
        }
      }
      .waterworks-wrap3 {
        width: 228px;
        height: 187px;
        background: rgba(255, 255, 255, 0.06);
        border-radius: 8px;
        .title {
          width: 100%;
          height: 44px;
          font-size: 14px;
          color: #ffffff;
          opacity: 0.8;
          text-align: center;
          line-height: 44px;
        }
        .data-wrap {
          width: 100%;
          height: 143px;
          padding-top: 8px;
          .row {
            width: 100%;
            height: 50%;
            display: flex;
            .block {
              display: flex;
              flex-direction: column;
              flex: 1 1 50%;
              padding-left: 32px;
              .name {
                font-size: 14px;
              }
              .num-wrap {
                margin-top: 4px;
                .num {
                  font-size: 20px;
                  color: #0bebff;
                }
                .dw {
                  font-size: 14px;
                  opacity: 0.6;
                  margin-left: 4px;
                }
              }
            }
          }
        }
      }
    }
    .gj-title {
      font-size: 14px;
      opacity: 0.8;
      margin: 16px 0 12px 0;
    }
    .alarm-wrap {
      width: 716px;
      height: 240px;
      background: rgba(255, 255, 255, 0.06);
      border-radius: 8px;
      padding: 0 20px;
      font-size: 14px;
      .t-header {
        width: 100%;
        height: 42px;
        border-bottom: 1px solid rgba(255, 255, 255, 0.2);
        padding-top: 6px;
        display: flex;
        align-items: center;
        text-align: center;
        span {
          color: rgba(255, 255, 255, 0.6);
        }
      }
      .col1 {
        flex: 0 0 80px;
      }
      .col2 {
        flex: 0 0 250px;
      }
      .col3 {
        flex: 0 0 240px;
      }
      .col4 {
        flex: 0 0 106px;
      }
      .red {
        color: #e12234;
      }
      .t-body {
        width: 100%;
        height: 198px;
        text-align: center;
        padding-top: 16px;
        .row {
          display: flex;
          margin-bottom: 18px;
        }
      }
    }
  }
}
</style>
