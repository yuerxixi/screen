<template>
  <div class="water-cost">
    <Border title="车行信息">
      <CarPeopleCharts id="workCar" :datas="workArr" :color-arr="colorArr" />
    </Border>
  </div>
</template>
<script>
import Border from '@/components/Border'
import CarPeopleCharts from '@/components/Charts/carPeopleCharts'
export default {
  name: 'CarFlow',
  components: { Border, CarPeopleCharts },
  data() {
    return {
      workArr: [
        {
          name: '园区企业车辆',
          data: [100, 120, 130, 140, 150, 140, 150]
        },
        {
          name: '园区访客车辆',
          data: [100, 120, 130, 140, 150, 140, 150]
        },
        {
          name: '园区工作人员车辆',
          data: [100, 120, 130, 140, 150, 140, 150]
        }
      ],
      colorArr: [
        [
          { offset: 0, color: '#0ED4F8' },
          { offset: 0.5, color: '#0ED4F8' },
          { offset: 0.5, color: '#0493AD' },
          { offset: 1, color: '#0ED4F8' }
        ],
        [
          { offset: 0, color: '#465CFF' },
          { offset: 0.5, color: '#465CFF' },
          { offset: 0.5, color: '#273BD0' },
          { offset: 1, color: '#465CFF' }
        ],
        [
          { offset: 0, color: '#F041F0' },
          { offset: 0.5, color: '#F041F0' },
          { offset: 0.5, color: '#AF07AF' },
          { offset: 1, color: '#F041F0' }
        ]
      ]
    }
  },
  mounted() {},
  methods: {}
}
</script>
<style lang="scss" scoped>

#workCar{
 height: 200px;
}
</style>
