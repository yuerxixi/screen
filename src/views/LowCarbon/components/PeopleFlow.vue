<template>
  <div class="water-cost">
    <Border title="人行信息">
      <CarPeopleCharts
        id="workpersion"
        :datas="workArr"
        :color-arr="colorArr"
      />
    </Border>
  </div>
</template>
<script>
import Border from '@/components/Border'
import CarPeopleCharts from '@/components/Charts/carPeopleCharts'
export default {
  name: 'PeopleFlow',
  components: { Border, CarPeopleCharts },
  data() {
    return {
      workArr: [
        {
          name: '园区内企业人员',
          data: [100, 120, 130, 140, 150, 140, 150]
        },
        {
          name: '园区访客',
          data: [100, 120, 130, 140, 150, 140, 150]
        },
        {
          name: '园区工作人员',

          data: [100, 120, 130, 140, 150, 140, 150]
        }
      ],
      colorArr: [
        [
          { offset: 0, color: '#0BCDFF' },
          { offset: 0.5, color: '#0BCDFF' },
          { offset: 0.5, color: '#0093AD' },
          { offset: 1, color: '#0BCDFF' }
        ],
        [
          { offset: 0, color: '#FFC400' },
          { offset: 0.5, color: '#FFC400' },
          { offset: 0.5, color: '#BE9200' },
          { offset: 1, color: '#FFC400' }
        ],
        [
          { offset: 0, color: '#FF8327' },
          { offset: 0.5, color: '#FF8327' },
          { offset: 0.5, color: '#C45300' },
          { offset: 1, color: '#FF8327' }
        ]
      ]
    }
  },
  mounted() {},
  methods: {}
}
</script>
<style lang="scss" scoped>
#workpersion {
  height: 200px;
}
</style>
