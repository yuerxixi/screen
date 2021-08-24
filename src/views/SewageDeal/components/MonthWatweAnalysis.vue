<template>
  <div class="monthWatweAnalysis">
    <Border title="月度出水达标率分析">
      <RingCharts id="monthRate" :datas="datas" />
    </Border>
  </div>
</template>
<script>
import Border from '@/components/Border'
import RingCharts from '@/components/Charts/ringCharts'
export default {
  name: 'MonthWatweAnalysis',
  components: { Border, RingCharts },
  data() {
    return {
      // 暂定表格数据
      datas: [
        { name: '出水达标率', value: 30 },
        { name: '出水超标率', value: 10 }
      ]
    }
  },
  mounted() {},
  methods: {}
}
</script>
<style lang="scss" scoped>
.monthWatweAnalysis {
  width: 444px;
  #monthRate {
    height: 184px;
  }
}
</style>
