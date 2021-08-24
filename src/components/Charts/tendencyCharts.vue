<template>
  <div :id="id" :style="{ height: height, width: '100%' }" />
</template>
<script>
import echarts from '@/lib/echarts'
import { fontSize12, fontSize14 } from '@/assets/js/echartsPx.js'
export default {
  name: 'RingCharts',
  props: {
    id: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '200'
    },
    height: {
      type: Number,
      default: 200
    },
    datas: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      chart: null
    }
  },
  mounted() {
    this.initChart()
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    initChart() {
      this.chartRate = echarts.init(document.getElementById(this.id))
      const xAxisData = this.datas.map(item => item.name)
      // const yAxisData1 = this.datas.map(item => item.value1)
      const yAxisData2 = this.datas.map(item => item.value2)
      this.chartRate.setOption({
        color: ['#F7B500', '#0BB4FF'],
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          top: '3%',
          // right: '',
          textAlign: 'center',
          textStyle: {
            color: '#fff',
            fontSize: fontSize14() // 14
          }
        },

        grid: {
          top: window.screen.width < 3120 ? '30%' : '22%',
          left: '2%',
          right: '8%',
          bottom: '4%',
          containLabel: true
        },
        xAxis: {
          axisTick: 'none',
          // type: 'category',
          axisLine: {
            lineStyle: {
              color: '#11406B'
            }
          },
          axisLabel: {
            textStyle: {
              color: 'rgba(255, 255, 255, 0.6)',
              fontFamily: 'BebasNeue',
              fontSize: fontSize12() // 12
            },
            interval: 0
            // margin: 10
            // rotate: 30
          },
          splitLine: {
            interval: 0,
            show: true,
            lineStyle: {
              color: 'rgba(26, 86, 137, 0.9)',
              type: 'dashed'
            }
          },
          boundaryGap: false,
          data: xAxisData
        },
        yAxis: {
          name: '万吨',
          axisTick: 'none',
          axisLine: 'none',
          // axisLine: {
          //   lineStyle: {
          //     color: '#11406B'
          //   },
          //   nameLocation: 'middle'
          // },
          offset: '0',

          splitLine: {
            show: false
          },
          nameTextStyle: {
            color: 'rgba(255, 255, 255, 0.6)',
            fontFamily: 'Arial',
            fontSize: fontSize12(), // 12
            verticalAlign: 'middle',
            align: 'right'
          },
          axisLabel: {
            textStyle: {
              color: 'rgba(255, 255, 255, 0.6)',
              fontFamily: 'BebasNeue',
              fontSize: fontSize12() // 12
            }
          },
          type: 'value'
        },
        series: [
          {
            name: '处理规模',
            type: 'line',

            data: yAxisData2
          },
          {
            name: '实际污水处理量',
            type: 'line',
            markLine: {
              symbol: ['none', 'none'], // 去掉箭头
              itemStyle: {
                normal: {
                  lineStyle: { type: 'solid', color: '#F7B500', width: 2 },
                  label: { show: false, position: 'left' }
                },
                emphasis: {
                  lineStyle: { type: 'solid', color: '#F7B500', width: 2 }
                }
              },
              emphasis: {
                show: false
              },
              data: [
                {
                  name: 'Y 轴值为 100 的水平线',
                  yAxis: 3000
                  // valueDim: 'close'
                }
              ]
            },
            emphasis: {
              show: false
            },
            data: yAxisData2
          }
        ]
      })
    }
  }
}
</script>
