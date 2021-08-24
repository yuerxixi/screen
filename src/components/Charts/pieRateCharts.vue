<template>
  <div :id="id" :style="{ height: height, width: '100%' }" />
</template>
<script>
import echarts from '@/lib/echarts'
import resize from './mixins/resize'
import { fontSize, fontSize14 } from '@/assets/js/echartsPx.js'
export default {
  name: 'PieRateCharts',
  mixins: [resize],
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
      this.chart = echarts.init(document.getElementById(this.id))
      const percantage = 67.94
      this.chart.setOption({
        title: {
          text: ['{a|占比}', '{b|' + percantage + '%}'].join(''),
          textStyle: {
            color: '#fff',
            fontSize: fontSize14(),
            fontWeight: 'bold',
            rich: {
              a: {
                color: '#fff',
                fontSize: fontSize14(),
                marginRight: 0,
                padding: [0, 20, 0, 0]
              },
              b: {
                color: '#0bebff',
                fontSize: fontSize() * 0.0769230769230769,
                fontFamily: 'BebasNeue',
                paddingLeft: 10
              }
            }
          },
          left: 'center',
          // top: '10%',
          bottom: '6%'
          // itemGap: 150
        },
        tooltip: {
          show: false
        },
        color: ['#01dadc', '#23cea7', '#5096e0'],
        legend: {
          orient: 'vertical',
          x: 690,
          y: 120,
          data: ['危急', '严重', '一般']
        },
        grid: {
          left: '0',
          right: '0',
          bottom: '0',
          top: '0',
          containLabel: true
        },
        series: [
          {
            name: '一般',
            type: 'pie',
            // 起始刻度的角度，默认为 90 度，即圆心的正上方。0 度为圆心的正右方。
            startAngle: 0,
            hoverAnimation: false,
            tooltip: {},
            radius: ['85%', '100%'],
            center: ['50%', '65%'],
            label: {
              normal: {
                show: false,
                position: 'center',
                color: '#fff',
                formatter: function(params) {
                  return params.value
                }
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: [
              {
                value: 300,
                itemStyle: {
                  normal: {
                    color: 'rgba(80,150,224,0)'
                  }
                }
              },
              {
                value: 270,
                itemStyle: {
                  normal: {
                    color: '#0bebff'
                  }
                }
              },
              {
                value: 30,
                itemStyle: {
                  normal: {
                    color: '#ff0200'
                  }
                }
              }
            ]
          }
        ]
      })
    }
  }
}
</script>
