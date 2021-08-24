<template>
  <div class="water-cost">
    <Border title="用水统计">
      <div :id="id" />
    </Border>
  </div>
</template>
<script>
import Border from '@/components/Border'
import echarts from '@/lib/echarts'
import { fontSize12, fontSize14 } from '@/assets/js/echartsPx.js'
export default {
  name: 'WaterCostTotal',
  components: { Border },
  props: {
    datas: {
      type: Array,
      default: () => []
    },
    id: {
      type: String,
      default: 'chart'
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
      const yAxisData1 = this.datas.map(item => item.value1)
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
              color: 'rgba(11, 205, 255, 0.15)',
              type: 'dashed'
            }
          },
          axisLabel: {
            textStyle: {
              color: 'rgba(255, 255, 255, 0.6)',
              fontSize: fontSize12() // 12
            },
            interval: 0
            // margin: 10
            // rotate: 30
          },
          splitLine: {
            show: false
          },

          boundaryGap: false,
          data: xAxisData
        },
        yAxis: {
          name: '单位',
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
        series: [
          {
            name: '生活用水',
            type: 'line',

            data: yAxisData1,
            areaStyle: {
              color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
                {
                  offset: 0,
                  color: 'rgba(247, 181, 0,0)'
                },
                {
                  offset: 1,
                  color: 'rgba(247, 181, 0,0.8)'
                }
              ])
            }
          },
          {
            name: '工业用水',
            type: 'line',
            data: yAxisData2,
            areaStyle: {
              color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
                {
                  offset: 0,
                  color: 'rgba(11, 180, 255,0)'
                },
                {
                  offset: 1,
                  color: 'rgba(11, 180, 255,0.8)'
                }
              ])
            }
          }
        ]
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.water-cost {
  width: 432px;
  #left-water-cost,
  #right-water-cost {
    height: 210px;
  }
}
</style>
