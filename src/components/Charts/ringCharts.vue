<template>
  <div :id="id" :style="{ height: height, width: '100%' }" />
</template>
<script>
import echarts from '@/lib/echarts'
import resize from './mixins/resize'
import { fontSize, fontSize12 } from '@/assets/js/echartsPx.js'
export default {
  name: 'RingCharts',
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
    },
    colorCharts: {
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
      const color = this.colorCharts.length
        ? this.colorCharts
        : ['#02FC83', '#F54455']
      const seriesData = this.datas
      let total = 0
      for (let index = 0; index < seriesData.length; index++) {
        total += seriesData[index].value
      }
      this.chartRate.setOption({
        color: color,
        grid: {
          top: '0',
          left: 0,
          right: '1%',
          bottom: '0',
          containLabel: true
        },
        tooltip: {
          show: true
        },
        legend: {
          orient: 'vertical',
          type: window.screen.width < 3120 ? 'scroll' : '',
          pageIconColor: '#0BEBFF', // 翻页下一页的三角按钮颜色
          pageIconInactiveColor: '#aaa', // 翻页（即翻页到头时）
          pageIconSize: 11, // 翻页按钮大小
          pageTextStyle: {
            color: '#fff'
          },
          // pageFormatter: '', // 隐藏翻页的数字
          // pageButtonItemGap: -6, // 翻页按钮的两个之间的间距
          top: 'center',
          right: window.screen.width < 3120 ? '4%' : '12%',
          itemWidth: fontSize() * 0.0320512820512821, // 10
          itemHeight: fontSize() * 0.0320512820512821, // 10
          textStyle: {
            align: 'left',
            verticalAlign: 'middle',
            color: '#fff',
            fontSize: fontSize12(), // 12
            rich: {
              name: {
                fontSize: fontSize12(), // 12
                color: 'rgba(255,255,255,0.8)',
                fontWeight: 'bold',
                verticalAlign: 'middle'
                // width: window.screen.width < 3120 ? 80 : 80
              },
              value: {
                color: '#0bebff',
                fontFamily: 'BebasNeue',
                fontSize: window.screen.width < 3120 ? 14 : 24
              },
              rate: {
                color: 'rgba(255,255,255,0.9)',
                fontSize: fontSize() * 0.0641025641025641, // 20
                padding: [0, 3],
                verticalAlign: 'middle',
                fontFamily: 'BebasNeue'
              },
              infointro: {
                color: 'rgba(255, 255, 255, 0.6)',
                fontSize: window.screen.width < 3120 ? 12 : 14,
                fontWeight: 700
              }
            }
          },
          data: this.datas.map(item => {
            return item.name
          }),
          formatter: name => {
            if (seriesData.length) {
              const item = seriesData.filter(item => item.name === name)[0]
              return `{name|${name}：}{rate| ${(
                (item.value / total) *
                100
              ).toFixed(0)}%}`
            }
          }
        },
        series: [
          {
            name: '月度出水达标率分析',
            type: 'pie',
            center:
              window.screen.width < 3120 ? ['28%', '50%'] : ['35%', '50%'],
            radius: ['50%', '68%'],
            label: {
              normal: {
                show: false,
                position: 'center',
                formatter: '{value|{c}}\n{label|{b}}',
                rich: {
                  value: {
                    padding: 5,
                    align: 'center',
                    verticalAlign: 'middle',
                    fontSize: 32
                  },
                  label: {
                    align: 'center',
                    verticalAlign: 'middle',
                    fontSize: 16
                  }
                }
              },
              emphasis: {
                show: false,
                textStyle: {
                  fontSize: '12'
                }
              }
            },
            labelLine: {
              show: false,
              length: 0,
              length2: 0
            },
            data: seriesData
          }
        ]
      })
    }
  }
}
</script>
