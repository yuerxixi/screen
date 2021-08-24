<template>
  <div :id="id" :style="{ height: height, width: '100%' }" />
</template>
<script>
import echarts from '@/lib/echarts'
import resize from './mixins/resize'
import { fontSize, fontSize14 } from '@/assets/js/echartsPx.js'
export default {
  name: 'PieCharts',
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
      var titleArr = []
      var seriesArr = []
      const colors = [
        ['#39ff68', '#465b60'],
        ['#39ff68', '#465b60'],
        ['#39ff68', '#465b60'],
        ['#39ff68', '#465b60'],
        ['#39ff68', '#465b60'],
        ['#39ff68', '#465b60']
      ]
      this.datas.forEach(function(item, index) {
        titleArr.push({
          text: item.name,
          left: index < 3 ? index * 30 + 19 + '%' : (index - 3) * 30 + 19 + '%',
          top: index < 3 ? '37%' : '85%',
          textAlign: 'center',
          textStyle: {
            fontWeight: 700,
            // fontSize: window.screen.width < 3120 ? '12' : '14',
            fontSize: fontSize14() * 1.1, // 14
            color: '#fff',
            textAlign: 'center'
          }
        })
        seriesArr.push({
          name: item.name,
          type: 'pie',
          clockWise: false,
          radius:
            window.screen.width < 3120
              ? [
                  fontSize() * 0.0780769230769231,
                  fontSize() * 0.0941025641025641
                ]
              : [
                  fontSize() * 0.0801282051282051,
                  fontSize() * 0.0961538461538462
                ],
          itemStyle: {
            normal: {
              color: colors[index][0],
              shadowColor: colors[index][0],
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
          hoverAnimation: false,
          center: [
            index < 3 ? index * 30 + 20 + '%' : (index - 3) * 30 + 20 + '%',
            index < 3 ? '20%' : '68%'
          ],
          data: [
            {
              value: item.value,
              label: {
                normal: {
                  formatter: function(params) {
                    return params.value + '%'
                  },
                  position: 'center',
                  show: true,
                  textStyle: {
                    fontSize: fontSize() * 0.0769230769230769,
                    fontWeight: 'bold',
                    fontFamily: 'BebasNeue',
                    color: colors[index][0]
                  }
                }
              }
            },
            {
              value: 100 - item.value,
              name: 'invisible',
              itemStyle: {
                normal: {
                  color: colors[index][1]
                },
                emphasis: {
                  color: colors[index][1]
                }
              }
            }
          ]
        })
      })
      this.chart.setOption({
        title: titleArr,
        series: seriesArr
      })
    }
  }
}
</script>
