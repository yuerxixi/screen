<template>
  <div class="monthRateAnalysis">
    <Border title="月度运营成本分析">
      <RingCharts
        id="monthOperate"
        :datas="datas"
        :color-charts="colorCharts"
      />
    </Border>
  </div>
</template>
<script>
import Border from '@/components/Border'
import RingCharts from '@/components/Charts/ringCharts'
export default {
  name: 'MonthRateAnalysis',
  components: { Border, RingCharts },
  data() {
    return {
      // 暂定表格数据
      datas: [
        { name: '处理水量', value: 30 },
        { name: '电耗', value: 10 },
        { name: '水耗', value: 30 },
        { name: '药耗', value: 10 },
        { name: '污水处理量', value: 10 }
      ],
      colorCharts: ['#02FC83', '#3BABFF', '#FF9902', '#F54455', '#6236FF']
    }
  },
  mounted() {},
  methods: {}
}
</script>
<style lang="scss" scoped>
.monthRateAnalysis {
  margin: 28px 0;
  #monthOperate {
    height: 193px;
  }
}
</style>
