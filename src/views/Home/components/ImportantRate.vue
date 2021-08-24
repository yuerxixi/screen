<template>
  <div class="equipment-rate">
    <Border title="重点生产设备完好率">
      <PieCharts id="chart" :datas="data" :height="chartHeight" />
    </Border>
  </div>
</template>

<script>
import Border from '@/components/Border'
import PieCharts from '@/components/Charts/pieCharts'
export default {
  name: 'EquipmentRate',
  components: { Border, PieCharts },
  data() {
    return {
      chartHeight: 280,
      data: [
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

<style scoped lang="scss">
.equipment-rate {
  #chart {
    height: 222px;
  }
}
@media screen and (max-width: 1920px) {
  .equipment-rate #chart {
    height: 220px;
  }
}
</style>
