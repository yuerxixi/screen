<template>
  <div>
    <div class="map-bg-pic" :class="'maplevel' + (toggleIndex + 1)">
      <Market
        :options="options"
        :back-url="toggleUrl[toggleIndex]"
        @mouseleave="mouseleave"
        @submit="submit"
        @singleClick="singleClick"
        @mouseenter="mouseenter"
      >
        <template v-slot:default="slotProps">
          <div
            v-if="slotProps.item.type === 'air-monitoring-station'"
            class="describe"
            :style="{
              background:
                airMonitoringBack[setAirMonitoringStation(slotProps.item)]
            }"
          >
            <img
              :src="
                airMonitoringLeftImg[setAirMonitoringStation(slotProps.item)]
              "
              alt=""
            >
            <span class="text">{{ slotProps.item.name }}</span>
            <span
              class="number"
              :style="{
                background:
                  airMonitoringColor[setAirMonitoringStation(slotProps.item)]
              }"
            >{{ slotProps.item.airQuality }}</span>
          </div>
        </template>
      </Market>
    </div>

    <!-- 右下角多选样式 -->
    <div class="map-select-wrap">
      <el-checkbox-group v-model="mapSelect" @change="changeMapPoint">
        <el-checkbox
          v-for="(item, index) in legendData"
          :key="index"
          :label="item.label"
          checked
        >
          <img class="select-icon" :src="item.url" alt="">
          <span class="title">{{ item.text }}</span>
        </el-checkbox>
      </el-checkbox-group>
    </div>

    <div class="toggle-view-bg" @click="toggleViews">
      {{ toggleView[toggleIndex] }}
    </div>

    <!-- 地图底部切换-->
    <Footer :page-num="1" />

    <go-home class="gohome" />

    <!-- 空气监测站弹框-->
    <map-air-dialog
      :visible.sync="airInfoVisible"
      :marker-info-data="airMarkerInfoData"
    />
  </div>
</template>

<script>
import Footer from '@/components/Footer'
import GoHome from '@/components/GoHome'
import MapAirDialog from '@/views/Home/components//mapAirDialog'
export default {
  name: 'LowcarbonMap',
  components: {
    Footer,
    GoHome,
    MapAirDialog
  },
  data() {
    return {
      airInfoVisible: false, // 空气监测站弹窗
      airMarkerInfoData: {}, // 空气监测站弹窗数据
      mapSelect: [], // 右下角监控选中值
      select: [], // 中节能江西低碳园和中节能国际中心分别选中的值
      toggleView: ['中节能江西低碳园', '中节能国际中心'],
      toggleIndex: 0,
      mapFooterSel: null, // 地图底部切换
      options: {
        // 配置信息
        fontUrl: [
          // market小图标图片地址
          require('@/assets/images/img/camera.png'),
          require('@/assets/images/img/closing-rod.png'),
          require('@/assets/images/img/road-gate.png'),
          require('@/assets/images/img/water-meter.png'),
          require('@/assets/images/img/watt-hour-meter.png'),
          require('@/assets/img/map/map-air-point1.png')
        ], // market标记图标地址
        fontCustomClassName: 'custom-name', // 自定义类名 String
        open: false, // true代表开发模式 功能可用 false代表生产模式只展示
        coordinate: [], // 坐标 对象数组{
        //   customClassName:'',//自定义类名
        //   isDesc:false, //当鼠标放在market图标上时 是否显示自定义描述
        //   x:'',//x轴坐标
        //   y:'',//y轴坐标
        //   type:""//当有不同的小图标时 type是不同图标的类型  名称自己取 备注 不能重复
        //   url:"" //小图标地址 不是必须的
        // }
        typeArray: [
          // 当前标记的类型数组，名自几取 不能重复 如果是自定义模板 key后面要加上 -000
          {
            key: 'camera',
            name: '摄像头'
          },
          {
            key: 'closing-rod',
            name: '合杆'
          },
          {
            key: 'road-gate',
            name: '道闸'
          },
          {
            key: 'water-meter',
            name: '水表'
          },
          {
            key: 'watt-hour-meter',
            name: '电表'
          },
          {
            key: 'air-monitoring-station',
            name: '空气监测站',
            class: 'air-monitoring'
          }
        ]
      },
      toggleUrl: [
        // 背景地图数组
        require('@/assets/images/img/internal-map.png'),
        require('@/assets/images/img/guard-map.png')
      ],
      legendData: [
        // 右下角监控样式数据数组
        {
          url: require('@/assets/images/img/legend-camera.png'),
          text: '摄像头',
          label: 'camera'
        },
        {
          url: require('@/assets/images/img/legend-closing-rod.png'),
          text: '合杆',
          label: 'closing-rod'
        },
        {
          url: require('@/assets/images/img/legend-road-gate.png'),
          text: '道闸',
          label: 'road-gate'
        },
        {
          url: require('@/assets/images/img/legend-water-meter.png'),
          text: '水表',
          label: 'water-meter'
        },
        {
          url: require('@/assets/images/img/legend-watt-hour-meter.png'),
          text: '电表',
          label: 'watt-hour-meter'
        },
        {
          url: require('@/assets/images/img/legend-air-monitoring-station.png'),
          text: '空气监测站',
          label: 'air-monitoring-station'
        }
      ],
      coordinateMapCopy: [], // 坐标数组
      coordinateMap: [
        // 坐标数组
        [
          // 中节能国际中心坐标
          {
            type: 'closing-rod',
            x: '40.62078272604588',
            y: '50.602409638554214'
          },
          { type: 'camera', x: '38.73144399460189', y: '61.2736660929432' },
          { type: 'camera', x: '44.80431848852901', y: '59.20826161790017' },
          { type: 'camera', x: '71.65991902834008', y: '48.02065404475043' },
          { type: 'camera', x: '59.51417004048582', y: '64.54388984509465' },
          {
            type: 'closing-rod',
            x: '59.24426450742241',
            y: '50.77452667814114'
          },
          {
            type: 'closing-rod',
            x: '47.908232118758434',
            y: '67.12564543889845'
          },
          { type: 'road-gate', x: '42.7800269905533', y: '69.01893287435456' },
          {
            customClassName: 'air-monitoring',
            isDesc: true,
            type: 'air-monitoring-station',
            x: '62.05733558178752',
            y: '49.67741935483871',
            name: 'KC006空气监测站',
            airQuality: '31' // 自定义的空气质量状况
          },
          {
            customClassName: 'air-monitoring',
            isDesc: true,
            type: 'air-monitoring-station',
            x: '44.01349072512647',
            y: '45.376344086021504',
            name: 'KC004空气监测站',
            airQuality: '68' // 自定义的空气质量状况
          }
        ],
        [
          // 中节能江西低碳园坐标
          { type: 'camera', x: '29.68960863697706', y: '44.922547332185886' },
          { type: 'camera', x: '24.156545209176787', y: '66.7814113597246' },
          { type: 'camera', x: '61.1336032388664', y: '62.47848537005164' },
          { type: 'camera', x: '83.40080971659918', y: '49.74182444061962' },
          {
            type: 'closing-rod',
            x: '39.40620782726046',
            y: '53.184165232358005'
          },
          {
            type: 'closing-rod',
            x: '32.388663967611336',
            y: '73.8382099827883'
          },
          {
            type: 'closing-rod',
            x: '47.77327935222672',
            y: '73.8382099827883'
          },
          {
            type: 'closing-rod',
            x: '57.14285714285714',
            y: '55.49828178694158'
          },
          {
            type: 'closing-rod',
            x: '66.44204851752022',
            y: '46.391752577319586'
          },
          {
            type: 'closing-rod',
            x: '71.15902964959568',
            y: '38.48797250859107'
          },
          {
            type: 'closing-rod',
            x: '93.53099730458221',
            y: '43.470790378006875'
          },
          {
            type: 'road-gate',
            x: '11.859838274932615',
            y: '50.171821305841924'
          },
          { type: 'road-gate', x: '76.01078167115904', y: '66.49484536082474' },
          {
            customClassName: 'air-monitoring',
            isDesc: true,
            type: 'air-monitoring-station',
            x: '53.03234501347709',
            y: '64.43298969072166',
            name: 'KC004空气监测站',
            airQuality: '31' // 自定义的空气质量状况
          },
          {
            customClassName: 'air-monitoring',
            isDesc: true,
            type: 'air-monitoring-station',
            x: '37.3989218328841',
            y: '63.230240549828174',
            name: 'KC006空气监测站',
            airQuality: '68' // 自定义的空气质量状况
          }
        ]
      ],
      airMonitoringColor: [
        '#30d385',
        '#ffd300',
        '#ff9902',
        '#ff0200',
        '#990099',
        '#990000'
      ],
      airMonitoringBack: [
        '#25A267',
        '#B29508',
        '#BC7814',
        '#B21A19',
        '#711071',
        '#6C0D0D'
      ],
      airMonitoringLeftImg: [
        require('@/assets/img/map/map-air-icon1.png'),
        require('@/assets/img/map/map-air-icon2.png'),
        require('@/assets/img/map/map-air-icon3.png'),
        require('@/assets/img/map/map-air-icon4.png'),
        require('@/assets/img/map/map-air-icon5.png'),
        require('@/assets/img/map/map-air-icon6.png')
      ],
      airMonitoringImg: [
        require('@/assets/img/map/map-air-point1.png'),
        require('@/assets/img/map/map-air-point2.png'),
        require('@/assets/img/map/map-air-point3.png'),
        require('@/assets/img/map/map-air-point4.png'),
        require('@/assets/img/map/map-air-point5.png'),
        require('@/assets/img/map/map-air-point6.png')
      ]
    }
  },
  created() {
    this.setData()
  },
  mounted() {
    this.select[0] = this.mapSelect // 中节能江西低碳园
    this.select[1] = this.mapSelect // 中节能国际中心
  },
  methods: {
    setData() {
      // 挂载前的数据处理
      this.coordinateMap[0].map(item => {
        item.url = this.airMonitoringImg[this.setAirMonitoringStation(item)]
      })
      this.coordinateMap[1].map(item => {
        item.url = this.airMonitoringImg[this.setAirMonitoringStation(item)]
      })
      this.options.coordinate = this.coordinateMap[0] // 坐标传递
      this.coordinateMapCopy = JSON.parse(JSON.stringify(this.coordinateMap))
    },
    setAirMonitoringStation(item) {
      // 空气监测站数据更改
      if (item.type === 'air-monitoring-station') {
        const airQuality = Number(item.airQuality)
        switch (true) {
          case airQuality <= 50:
            return 0
          case airQuality > 50 && airQuality <= 100:
            return 1
          case airQuality > 101 && airQuality <= 150:
            return 2
          case airQuality > 151 && airQuality <= 200:
            return 3
          case airQuality > 201 && airQuality <= 300:
            return 4
          case airQuality > 300:
            return 5
        }
      }
    },
    changeMapPoint(value) {
      // 各种监控和空气监测站切换
      let count = ''
      const arr = this.select[this.toggleIndex]
      const bool = arr.length > value.length
      if (bool) {
        // 清除坐标
        arr.map(item => {
          if (value.indexOf(item) === -1) {
            count = item
          }
        })

        this.coordinateMap[this.toggleIndex] = this.coordinateMap[
          this.toggleIndex
        ].filter(item => item.type !== count)
      } else {
        // 添加坐标
        this.mapSelect.map(item => {
          if (arr.indexOf(item) === -1) {
            count = item
          }
        })

        this.coordinateMapCopy[this.toggleIndex].map(item => {
          if (item.type === count) {
            this.coordinateMap[this.toggleIndex].push(item)
          }
        })
      }
      this.select[this.toggleIndex] = this.mapSelect
      this.options.coordinate = this.coordinateMap[this.toggleIndex]
    },
    toggleViews() {
      // 切换地图
      if (this.toggleIndex === 0) {
        this.toggleIndex = 1
      } else {
        this.toggleIndex = 0
      }
      this.mapSelect = this.select[this.toggleIndex]
      this.options.coordinate = this.coordinateMap[this.toggleIndex]
    },
    submit(data) {
      // 坐标回调
      let str = ''
      for (let i = 0; i < data.length; i++) {
        let string = ''
        Object.keys(data[i]).map(item => {
          if (item !== 'url') {
            string = string + `${item}:'${data[i][item]}',`
          }
        })
        str = str + `{${string}},`
      }
      console.log(str)
    },
    singleClick(data) {
      this.airMarkerInfoData = data
      this.airInfoVisible = true
      // 单击展示弹窗
    },
    mouseleave() {
      // 鼠标移出小图标
    },
    mouseenter() {
      // 鼠标移动到小图标
    }
  }
}
</script>

<style lang="scss" scoped>
.toggle-view-bg {
  position: absolute;
  top: 90px;
  right: 953px;
  z-index: 6;
  cursor: pointer;
  width: 157px;
  height: 36px;
  padding-left: 25px;
  line-height: 40px;
  background: url(../../../assets/images/ico/icon-tab.png);
  background-size: cover;
  color: #fff;
  font-family: 'titlePlus';
  font-size: 16px;
}
.map-bg-pic {
  position: absolute;
  top: 0;
  left: 50%;
  width: 1205px;
  height: 945px;
  transform: translateX(-50%);
  ::v-deep.custom-name {
    width: 46px;
    height: 90px;
  }
  ::v-deep.air-monitoring {
    width: 44px;
    height: 56px;
  }
  .describe {
    position: relative;
    display: flex;
    align-items: center;
    height: 20px;
    img {
      width: 24px;
      height: 20px;
      margin-left: -12px;
      position: absolute;
    }
    span {
      height: 20px;
      display: inline-block;
      font-size: 12px;
      line-height: 20px;
      color: #ffffff;
      word-break: keep-all;
      white-space: nowrap;
    }
    .text {
      font-size: 12px;
      padding-left: 14px;
      padding-right: 2px;
    }
    .number {
      font-size: 12px;
      padding: 0 5px;
    }
  }
}
.gohome {
  top: 90px;
}
// 右下角多选样式
.map-select-wrap {
  position: absolute;
  left: 1950px;
  top: 584px;
  z-index: 7;
  // width: 188px;
  background: rgba(15, 51, 83, 0.8);
  border: 2px solid rgba(119, 215, 250, 0.3137254901960784);
  padding: 12px 10px 0 10px;
  ::v-deep .el-checkbox {
    margin-right: 0;
    margin-bottom: 13px;
    display: flex;
    align-items: center;
    .el-checkbox__label {
      display: flex;
      align-items: center;
      padding-left: 12px;
      font-size: 12px;
      font-weight: bold;
      color: #ffffff;
      opacity: 0.8;
      .select-icon {
        margin-right: 8px;
        width: 16px;
        height: 16px;
      }
      .title {
        font-size: 12px;
      }
    }
  }
  ::v-deep .el-checkbox__input.is-checked .el-checkbox__inner,
  .el-checkbox__input.is-indeterminate .el-checkbox__inner {
    background-color: #0bebff !important;
    border-color: #0bebff !important;
  }
}
</style>
