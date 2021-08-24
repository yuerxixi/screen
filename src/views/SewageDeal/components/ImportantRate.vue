<template>
  <div class="importantRate">
    <Border title="重点生产设备完好率">
      <PieCharts id="chart-rate" :datas="echartsData" />
    </Border>
  </div>
</template>
<script>
import Border from '@/components/Border'
import PieCharts from '@/components/Charts/pieCharts'
export default {
  name: 'MonthWatweAnalysis',
  components: { Border, PieCharts },
  data() {
    return {
      echartsData: [
        // echarts表格需要的数据
        {
          name: '泵',
          value: 96
        },
        {
          name: '气压计',
          value: 95
        },
        {
          name: '风机',
          value: 97
        },
        {
          name: '曝气机',
          value: 94
        },
        {
          name: '搅拌设备',
          value: 92
        },
        {
          name: '推进器',
          value: 91
        }
      ]
    }
  },
  mounted() {},
  methods: {}
}
</script>
<style lang="scss" scoped>
.importantRate {
  margin: 28px 0;
  #chart-rate {
    height: 194px;
  }
}
</style>
