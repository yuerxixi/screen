<template>
  <div :id="id" :style="{ height: height, width: '100%' }" />
</template>
<script>
import echarts from '@/lib/echarts'
import { fontSize, fontSize12, fontSize14 } from '@/assets/js/echartsPx.js'
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
    },
    colorArr: {
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
      // const barWidth = '30%'
      const xAxisData = [
        '星期一',
        '星期二',
        '星期三',
        '星期四',
        '星期五',
        '星期六',
        '星期日'
      ]

      // 头部菱形
      console.log()
      const diamondData = this.datas.reduce((pre, cur, index) => {
        pre[index] = cur.data.map(
          (el, id) => el + (pre[index - 1] ? pre[index - 1][id] : 0)
        )
        return pre
      }, [])
      const color = this.colorArr
      // series
      const series = this.datas.reduce((p, c, i, array) => {
        p.push(
          {
            z: i + 1,
            stack: '总量',
            type: 'bar',
            name: c.name,
            barGap: '30%',
            barWidth: fontSize14(),
            data: c.data,
            itemStyle: {
              color: {
                type: 'linear',
                x: 0,
                x2: 1,
                y: 0,
                y2: 0,
                colorStops: color[i]
              }
            }
          },
          {
            z: i + 10,
            type: 'pictorialBar',
            symbolPosition: 'end',
            symbol: 'diamond',
            symbolOffset: [0, '-50%'],
            symbolSize: [fontSize14(), fontSize14() / 2],
            data: diamondData[i],
            itemStyle: {
              color: {
                type: 'linear',
                x: 0,
                x2: 1,
                y: 0,
                y2: 0,
                colorStops: [
                  {
                    offset: 0,
                    color: color[i][0].color // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: color[i][0].color // 100% 处的颜色
                  }
                ]
              }
            },
            tooltip: { show: false }
          },
          {
            z: 30,
            type: 'pictorialBar',
            symbolPosition: 'start',
            data: this.datas[0].data,
            symbol: 'diamond',
            symbolOffset: ['0%', '50%'],
            symbolSize: [fontSize14(), fontSize14() / 2],
            itemStyle: {
              color: {
                type: 'linear',
                x: 0,
                x2: 1,
                y: 0,
                y2: 0,
                colorStops: [
                  {
                    offset: 0,
                    color: color[0][0].color // 0% 处的颜色
                  },
                  {
                    offset: 0.5,
                    color: color[0][1].color // 100% 处的颜色
                  },
                  {
                    offset: 0.5,
                    color: color[0][2].color // 100% 处的颜色
                  },
                  {
                    offset: 1,
                    color: color[0][3].color // 100% 处的颜色
                  }
                ]
              }
            },
            tooltip: { show: false }
          }
        )
        // 是否最后一个了？
        // if (p.length === array.length * 2) {
        //   p.push({
        //     z: 30,
        //     type: 'pictorialBar',
        //     symbolPosition: 'start',
        //     data: this.datas[0].data,
        //     symbol: 'diamond',
        //     symbolOffset: ['0%', '50%'],
        //     symbolSize: [fontSize14(), fontSize14() / 2],
        //     itemStyle: {
        //       color: {
        //         type: 'linear',
        //         x: 0,
        //         x2: 1,
        //         y: 0,
        //         y2: 0,
        //         colorStops: [
        //           {
        //             offset: 0,
        //             color: color[0][0].color // 0% 处的颜色
        //           },
        //           {
        //             offset: 0.5,
        //             color: color[0][1].color // 100% 处的颜色
        //           },
        //           {
        //             offset: 0.5,
        //             color: color[0][2].color // 100% 处的颜色
        //           },
        //           {
        //             offset: 1,
        //             color: color[0][3].color // 100% 处的颜色
        //           }
        //         ]
        //       }
        //     },
        //     tooltip: { show: false }
        //   })
        //   return p
        // }

        return p
      }, [])
      this.chartRate.setOption({
        color: ['#F7B500', '#0BB4FF'],
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          top: '3%',
          // right: '',
          textAlign: 'center',
          itemWidth: fontSize() * 0.0320512820512821, // 10
          itemHeight: fontSize() * 0.0320512820512821, // 10
          textStyle: {
            color: '#fff',
            fontSize: fontSize14(), // 14
            verticalAlign: 'center',
            padding: [0, 6, 0, 0]
          }
        },
        grid: {
          top: window.screen.width < 3120 ? '30%' : '22%',
          left: '2%',
          right: '2%',
          bottom: '4%',
          containLabel: true
        },
        xAxis: {
          axisTick: 'none',
          type: 'category',
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
            show: false
          },
          boundaryGap: true,
          data: xAxisData
        },
        yAxis: {
          name: '人',
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
            interval: 0,
            show: true,
            lineStyle: {
              color: 'rgba(11, 205, 255, 0.15)',
              type: 'dashed'
            }
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
        series: series
      })
    }
  }
}
</script>
