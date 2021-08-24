<template>
  <div class="lowcarbon">
    <Border title="中节能低碳园">
      <!-- 标题 -->
      <div class="top-title">
        <div class="top-title-left">园区概览</div>
        <div class="top-title-middle">设备状况</div>
        <div class="top-title-right">能耗统计</div>
      </div>
      <!--内容 -->
      <div class="content">
        <!-- 园区概览 -->
        <div class="content-left">
          <ul class="content-left-left">
            <li>
              <div class="title-header">园区企业数量</div>
              <div class="detail"><span>173</span> 家</div>
            </li>
            <li>
              <div class="title-header">园区占地</div>
              <div class="detail"><span>2000</span> 亩</div>
            </li>
            <li>
              <div class="title-header">园区车位数量</div>
              <div class="detail"><span>1094</span> 辆</div>
            </li>
            <li>
              <div class="title-header">园区车位数量</div>
              <div class="detail"><span>4719</span> 人</div>
            </li>
          </ul>
        </div>
        <!-- 设备状况 -->
        <div class="content-middle">
          <div :id="id1" :style="{}" />
        </div>
        <!-- 能耗统计 -->
        <div class="content-right">
          <!-- 标题 -->
          <div class="cost-title">
            <div class="left-title">近七天总数</div>
            <div class="right-action">
              <ul class="changeview">
                <li
                  v-for="(item, index) in soureceSummery"
                  :key="index"
                  :class="{ active: index == 0 }"
                >
                  {{ item.name
                  }}<span v-if="index !== soureceSummery.length - 1" />
                </li>
              </ul>
            </div>
          </div>
          <div :id="id2" />
        </div>
      </div>
    </Border>
  </div>
</template>
<script>
import echarts from '@/lib/echarts'
import Border from '@/components/Border'
import { fontSize, fontSize12 } from '@/assets/js/echartsPx.js'
export default {
  name: 'Lowcarbon',
  components: { Border },
  data() {
    return {
      chart: null,
      chartCost: null,
      id1: 'equipDetail',
      height1: '195px',
      id2: 'costSummery',
      height2: '180px',
      soureceSummery: [{ name: '电耗' }, { name: '水耗' }]
    }
  },
  mounted() {
    // 设备状况
    this.initChart()
    // 能耗统计
    this.initCostChart()
  },
  methods: {
    initChart() {
      this.chart = echarts.init(document.getElementById(this.id1))
      this.chart.setOption({
        tooltip: {
          // 提示框组件
          trigger: 'axis'
        },
        grid: {
          left: '2%',
          right: '2%',
          bottom: '5%',
          top: '25%',
          containLabel: true
        },
        legend: {
          // 图例组件，颜色和名字
          right: '10%',
          top: '5%',
          // itemGap: 16,
          itemWidth: fontSize() * 0.0256410256410256, // 8
          itemHeight: fontSize() * 0.0256410256410256, // 8
          selectedMode: false,
          data: [
            {
              name: '在线率'
            },
            {
              name: '离线率'
            },
            {
              name: '故障率'
            }
          ],
          textStyle: {
            color: '#fff',
            fontStyle: '700',
            fontFamily: '微软雅黑',
            fontSize: fontSize12() // 12px
          }
        },
        xAxis: [
          {
            type: 'category',
            //	boundaryGap: true,//坐标轴两边留白
            data: ['合杆', '水表', '电闸', '道闸'],
            axisLabel: {
              // 坐标轴刻度标签的相关设置。
              interval: 0, // 设置为 1，表示『隔一个标签显示一个标签』
              //	margin:15,
              textStyle: {
                color: 'rgba(255,255,255,0.8)',
                fontStyle: '700',
                // fontFamily: 'BebasNeue',
                fontSize: fontSize12() // 12
              }
              // rotate: 25
            },
            axisTick: {
              // 坐标轴刻度相关设置。
              show: false
            },
            axisLine: {
              // 坐标轴轴线相关设置
              lineStyle: {
                color: 'rgba(255,255,255,0.4)',
                opacity: 0.4
              }
            },
            splitLine: {
              // 坐标轴在 grid 区域中的分隔线。
              show: false
            }
          }
        ],
        yAxis: [
          {
            type: 'value',
            name: '%',
            splitNumber: 5,
            nameTextStyle: {
              color: '#fff',
              align: 'right',
              fontSize: fontSize12() // 12
            },
            axisLabel: {
              textStyle: {
                color: 'rgba(255,255,255,0.8)',
                fontStyle: 'normal',
                fontFamily: 'BebasNeue',
                fontSize: fontSize12() // 12
              }
            },
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            splitLine: {
              show: true,
              lineStyle: {
                color: ['#fff'],
                opacity: 0.06
              }
            }
          }
        ],
        series: [
          {
            name: '离线率', // 头部
            type: 'bar',
            symbolSize: [20, 10],
            barWidth: fontSize12(),
            stack: '1',
            symbolPosition: 'end',
            itemStyle: {
              color: '#ffbb3b',
              opacity: 1
            },
            label: {
              normal: {
                offset: [-10, 0],
                show: false,
                position: 'top',
                // "formatter": "{c}%",
                fontSize: 15,
                fontWeight: 'bold',
                color: '#ffbb3b'
              }
            },
            data: [80, 80, 60, 90]
          },
          {
            name: '在线率',
            type: 'bar',
            stack: '1',
            data: [20, 20, 40, 10],
            barWidth: fontSize12(),
            z: 12,
            // barGap: '2%', // 柱间距离
            itemStyle: {
              normal: {
                show: true,
                color: '#0bebff'
              }
            },
            label: {
              normal: {
                show: false
              }
            }
          },

          {
            name: '故障率',
            type: 'bar',
            // stack: '1',
            barWidth: fontSize12(),
            z: 0,
            itemStyle: {
              normal: {
                color: '#ff3b3b'
              }
            },
            data: [50, 90, 30, 45]
          }
        ]
      })
    },
    initCostChart() {
      this.chartCost = echarts.init(document.getElementById(this.id2))
      this.chartCost.setOption({
        tooltip: {
          // 提示框组件
          trigger: 'axis'
        },
        // barWidth: 15,
        grid: {
          left: '-5%',
          right: '2%',
          bottom: '15%',
          top: '5%',
          containLabel: true
        },
        xAxis: {
          type: 'value',
          splitLine: {
            interval: 0,
            lineStyle: {
              color: '#0c5079',
              type: 'dashed'
            }
          },
          axisTick: {
            show: false
          },
          axisLine: {
            show: false
          },
          axisLabel: {
            //  改变x轴字体颜色和大小
            textStyle: {
              color: 'rgba(255,255,255,0.8)',
              fontSize: fontSize12(), // 12
              fontFamily: 'BebasNeue'
            }
          }
        },
        yAxis: {
          type: 'category',
          data: ['05-01', '05-02', '05-03', '05-04', '05-05', '05-06', '05-07'],
          splitLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          axisLine: {
            show: false,
            //  改变y轴颜色
            lineStyle: {
              color: '#2c4054'
            }
          },
          axisLabel: {
            //  改变y轴字体颜色和大小
            interval: 0, // 设置为 1，表示『隔一个标签显示一个标签』
            // formatter: '{value} m³ ', //  给y轴添加单位
            textStyle: {
              color: 'rgba(255,255,255,0.8)',
              fontSize: fontSize12(), // 12
              fontFamily: 'BebasNeue'
            }
          }
        },
        series: [
          {
            type: 'bar',
            name: '电耗',
            barWidth: fontSize12(),
            itemStyle: {
              normal: {
                label: {
                  show: false, // 开启显示
                  position: 'insideRight', // 在上方显示
                  textStyle: {
                    color: '#FFF',
                    fontSize: fontSize12(), // 12
                    fontWeight: 600
                  }
                },
                color: new echarts.graphic.LinearGradient(1, 0, 0, 0, [
                  {
                    offset: 0,
                    color: '#0bebff'
                  },
                  {
                    offset: 1,
                    color: '#0b3755'
                  }
                ])
                // barBorderRadius: 15
              }
            },
            data: [19, 29, 39, 81, 29, 39, 45]
          }
        ]
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.lowcarbon {
  .top-title {
    display: flex;
    border-bottom: 1px solid #02619b;
    > div {
      flex: 1;
      font-weight: 700;
      color: #fff;
      font-size: 16px;
      line-height: 34px;
      text-align: center;
      &:nth-child(2) {
        flex: 0 0 37%;
      }
      &:nth-child(3) {
        flex: 0 0 33.333%;
      }
    }
  }
  .content {
    display: flex;
    > div {
      flex: 1;
      height: 195px;
    }
    .content-left {
      display: flex;
      align-items: center;
      justify-content: center;
      border-right: 1px solid #02619b;
      .content-left-left {
        display: flex;
        width: 100%;
        flex-wrap: wrap;
        li {
          flex: 0 0 50%;
          text-align: center;
          .title-header {
            font-weight: 700;
            color: #fff;
            font-size: 14px;
            line-height: 22px;
          }
          &:nth-child(1),
          &:nth-child(2) {
            margin-bottom: 25px;
          }
          .detail {
            font-weight: 700;
            color: rgba(255, 255, 255, 0.6);
            font-size: 16px;
            line-height: 32px;
            span {
              font-family: BebasNeue;
              color: #0bebff;
              font-size: 28px;
              line-height: 32px;
            }
          }
        }
      }
    }
    .content-middle {
      display: flex;
      flex: 0 0 37%;
      border-right: 1px solid #02619b;
      #equipDetail {
        height: 195px;
        width: 100%;
      }
    }
    .content-right {
      padding: 10px 20px 20px;
      flex: 0 0 33.333%;
      #costSummery {
        height: 180px;
      }
      .cost-title {
        display: flex;
        justify-content: space-between;
        .left-title {
          font-weight: 700;
          color: rgba(255, 255, 255, 0.6);
          font-size: 14px;
          line-height: 22px;
        }
        .right-action {
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
        }
      }
    }
  }
}
</style>
