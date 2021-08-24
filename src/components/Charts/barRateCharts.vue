<template>
  <div :id="id" :style="{ height: height, width: '100%' }" />
</template>
<script>
import echarts from '@/lib/echarts'
export default {
  name: 'BarRateCharts',
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
    from: {
      type: String,
      default: ''
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
      const data = this.datas.map(item => {
        return item.value
      })
      const className = this.datas.map(item => {
        return item.title
      })
      var defaultData = this.datas.map(item => {
        return item.fullValue
      })
      this.chart.setOption({
        grid: {
          left: '8%',
          right: '10%',
          bottom: '-8%',
          top: '8%',
          containLabel: true
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'none'
          },
          formatter: function(params) {
            return (
              params[0].name +
              '<br/>' +
              "<span style='display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:rgba(36,207,233,0.9)'></span>" +
              params[0].seriesName +
              ' : ' +
              params[0].value
            )
          }
        },
        xAxis: {
          show: false,
          type: 'value'
        },
        yAxis: [
          {
            type: 'category',
            inverse: true,
            axisLabel: {
              show: true,
              interval: 0, // 设置为 1，表示『隔一个标签显示一个标签』
              textStyle: {
                color: '#fff',
                fontWeight: 700
              }
            },
            splitLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            axisLine: {
              show: false
            },
            data: className
          },
          {
            type: 'category',
            inverse: true,
            axisTick: 'none',
            axisLine: 'none',
            show: true,
            axisLabel: {
              interval: 0, // 设置为 1，表示『隔一个标签显示一个标签』
              textStyle: {
                color: '#ffffff',
                fontSize: '12'
              },
              formatter: function(value, index) {
                return (
                  '{a|' +
                  value +
                  '}' +
                  '{b|' +
                  '/' +
                  defaultData[index] +
                  '}' +
                  '{c|吨}'
                )
              },
              rich: {
                a: {
                  color: '#0bebff',
                  fontSize: 18,
                  fontWeight: 'bold',
                  fontFamily: 'BebasNeue'
                },
                b: {
                  color: '#fff',
                  fontSize: 14,
                  marginLeft: 10,
                  fontFamily: 'BebasNeue'
                },
                c: {
                  color: 'rgba(255,255,255,0.8)',
                  fontSize: 14,
                  marginLeft: 10
                }
              }
            },
            data: data
          }
        ],
        series: [
          {
            name: '消耗率',
            type: 'bar',
            zlevel: 1,
            itemStyle: {
              normal: {
                barBorderRadius: 0,
                color: '#0bebff'
              }
            },
            barWidth: '8',
            data: data
          },
          {
            name: '背景',
            type: 'bar',
            barWidth: '8',
            barGap: '-100%',
            data: defaultData,
            itemStyle: {
              normal: {
                color: '#465b60',
                barBorderRadius: 0
              }
            }
          }
        ]
      })
    }
  }
}
</script>
