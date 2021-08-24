<template>
  <div class="right-people-flow">
    <Border title="车行信息">
      <div :id="id" />
    </Border>
  </div>
</template>
<script>
import Border from '@/components/Border'
import echarts from '@/lib/echarts'
import { fontSize, fontSize12, fontSize14 } from '@/assets/js/echartsPx.js'
export default {
  name: 'RightCarFlow',
  components: { Border },
  data() {
    return {
      chart: null,
      id: 'carflowinfo',
      datas: [
        {
          name: '园区企业车辆',
          data: [100, 120, 130, 140, 150, 140, 150]
        },
        {
          name: '园区访客车辆',
          data: [100, 120, 130, 140, 150, 140, 150]
        },
        {
          name: '园区工作人员车辆',
          data: [100, 120, 130, 140, 150, 140, 150]
        }
      ],
      colorArr: [
        [
          { offset: 0, color: '#0ED4F8' },
          { offset: 0.5, color: '#0ED4F8' },
          { offset: 0.5, color: '#0493AD' },
          { offset: 1, color: '#0ED4F8' }
        ],
        [
          { offset: 0, color: '#465CFF' },
          { offset: 0.5, color: '#465CFF' },
          { offset: 0.5, color: '#273BD0' },
          { offset: 1, color: '#465CFF' }
        ],
        [
          { offset: 0, color: '#F041F0' },
          { offset: 0.5, color: '#F041F0' },
          { offset: 0.5, color: '#AF07AF' },
          { offset: 1, color: '#F041F0' }
        ]
      ]
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

      const color = this.colorArr
      // series
      const series = this.datas.reduce((p, c, i, array) => {
        p.push(
          {
            // z: 1,
            // stack: '总量',
            type: 'bar',
            name: c.name,
            barGap: '80%',
            barWidth: fontSize12(),
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
            z: 10 + i,
            type: 'pictorialBar',
            symbolPosition: 'end',
            symbol: 'diamond',
            symbolOffset: [
              -fontSize() * 0.0705128205128205 +
                i * fontSize() * 0.0705128205128205,
              '-50%'
            ], // 22
            symbolSize: [fontSize12(), fontSize12() / 2],
            data: c.data,
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
            z: 11 + i,
            type: 'pictorialBar',
            symbolPosition: 'start',
            data: c.data,
            symbol: 'diamond',
            symbolOffset: [
              -fontSize() * 0.0705128205128205 +
                i * fontSize() * 0.0705128205128205,
              '50%'
            ],
            symbolSize: [fontSize12(), fontSize12() / 2],
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
            z: 11 + i,
            type: 'pictorialBar',
            symbolPosition: 'start',
            data: c.data,
            symbol: 'diamond',
            symbolOffset: [
              -fontSize() * 0.0705128205128205 +
                i * fontSize() * 0.0705128205128205,
              '50%'
            ],
            symbolSize: [fontSize12(), fontSize12() / 2],
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
                    offset: 0.5,
                    color: color[i][1].color
                  },
                  {
                    offset: 0.5,
                    color: color[i][2].color
                  },
                  {
                    offset: 1,
                    color: color[i][3].color // 100% 处的颜色
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
        //     z: 11 + i,
        //     type: 'pictorialBar',
        //     symbolPosition: 'start',
        //     data: c.data,
        //     symbol: 'diamond',
        //     symbolOffset: [
        //       -fontSize() * 0.0705128205128205 +
        //         i * fontSize() * 0.0705128205128205,
        //       '50%'
        //     ],
        //     symbolSize: [fontSize12(), fontSize12() / 2],
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
        //             color: color[i][0].color // 0% 处的颜色
        //           },
        //           {
        //             offset: 0.5,
        //             color: color[i][1].color
        //           },
        //           {
        //             offset: 0.5,
        //             color: color[i][2].color
        //           },
        //           {
        //             offset: 1,
        //             color: color[i][3].color // 100% 处的颜色
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
          right: '3%',
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
<style lang="scss" scoped>
.right-people-flow {
  width: 894px;
  #carflowinfo {
    height: 200px;
  }
}
</style>
