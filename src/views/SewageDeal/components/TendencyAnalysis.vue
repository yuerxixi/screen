<template>
  <div class="tendencyAnalysis">
    <Border title="污水处理量趋势分析">
      <TendencyCharts id="tendencyCharts" :datas="echartData" />
    </Border>
  </div>
</template>
<script>
import Border from '@/components/Border'
import TendencyCharts from '@/components/Charts/tendencyCharts'
export default {
  name: 'TendencyAnalysis',
  components: { Border, TendencyCharts },
  data() {
    return {
      // echarts 暂时的数据模拟
      echartData: [
        {
          name: '07.01',
          value1: 3000,
          value2: 3100
        },
        {
          name: '07.05',
          value1: 3000,
          value2: 2800
        },
        {
          name: '07.09',
          value1: 3000,
          value2: 3500
        },
        {
          name: '07.13',
          value1: 3000,
          value2: 2600
        },
        {
          name: '07.07',
          value1: 3000,
          value2: 3200
        },
        {
          name: '07.21',
          value1: 3000,
          value2: 2800
        },
        {
          name: '07.25',
          value1: 3000,
          value2: 3300
        },
        {
          name: '07.29',
          value1: 3000,
          value2: 2900
        }
      ]
    }
  },
  mounted() {},
  methods: {}
}
</script>
<style lang="scss" scoped>
.tendencyAnalysis {
  #tendencyCharts {
    height: 274px;
  }
}
</style>
