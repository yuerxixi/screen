<template>
  <div :class="{ 'waterworks-label-wrap': mapSelect.indexOf('1') !== -1 }">
    <div id="container" />
    <div class="legend-wrap">
      <div v-if="mapSelect.indexOf('2') !== -1" class="l-air-wrap">
        <div class="air-row">
          <span class="air-color air-color1" />
          <span class="title">优</span>
        </div>
        <div class="air-row">
          <span class="air-color air-color2" />
          <span class="title">良</span>
        </div>
        <div class="air-row">
          <span class="air-color air-color3" />
          <span class="title">轻度污染</span>
        </div>
        <div class="air-row">
          <span class="air-color air-color4" />
          <span class="title">中度污染</span>
        </div>
        <div class="air-row">
          <span class="air-color air-color5" />
          <span class="title">重度污染</span>
        </div>
        <div class="air-row">
          <span class="air-color air-color6" />
          <span class="title">严重污染</span>
        </div>
      </div>
      <div v-if="mapSelect.indexOf('1') !== -1" class="l-waterworks-wrap">
        <span class="title">出水指标</span>
        <div class="row">
          <div class="legend normal">达标</div>
          <div class="legend more-norm">超标</div>
        </div>
      </div>
    </div>
    <div class="map-select-wrap">
      <el-checkbox-group v-model="mapSelect" @change="changeMapPoint">
        <el-checkbox label="1">
          <img
            class="select-icon"
            src="../../../assets/img/map/map-icon4.png"
            alt="1"
          >
          <span class="title">水厂排水口</span>
        </el-checkbox>
        <el-checkbox label="2">
          <img
            class="select-icon"
            src="../../../assets/img/map/map-icon5.png"
            alt="2"
          >
          <span>空气监测站</span>
        </el-checkbox>
      </el-checkbox-group>
    </div>
    <!-- 地图底部切换-->
    <Footer />
    <!-- 污水处理厂弹框-->
    <map-waterworks-dialog
      :visible.sync="waterworksInfoVisible"
      :marker-info-data="waterworksMarkerInfoData"
    />
    <!-- 空气监测站弹框-->
    <map-air-dialog
      :visible.sync="airInfoVisible"
      :marker-info-data="airMarkerInfoData"
    />
  </div>
</template>

<script>
import AMapLoader from '@amap/amap-jsapi-loader'
import mapBg1 from '@/assets/img/map/map-bg1.png'
import mapBg2 from '@/assets/img/map/map-bg2.png'
import mapWaterworksPoint1 from '@/assets/img/map/map-waterworks-point1.png'
import mapWaterworksPoint2 from '@/assets/img/map/map-waterworks-point2.png'
import mapAirPoint1 from '@/assets/img/map/map-air-point1.png'
import mapAirPoint2 from '@/assets/img/map/map-air-point2.png'
import mapAirPoint3 from '@/assets/img/map/map-air-point3.png'
import mapAirPoint4 from '@/assets/img/map/map-air-point4.png'
import mapAirPoint5 from '@/assets/img/map/map-air-point5.png'
import mapAirPoint6 from '@/assets/img/map/map-air-point6.png'
import Footer from '@/components/Footer'
import MapWaterworksDialog from './mapWaterworksDialog'
import MapAirDialog from './mapAirDialog'

export default {
  name: 'HomeMap',
  components: {
    MapAirDialog,
    MapWaterworksDialog,
    Footer
  },
  data() {
    return {
      AMap: null,
      map: null, // 地图
      mapSelect: ['1'], // 水厂和空气站切换
      mapFooterSel: null, // 地图底部切换
      waterworksInfoWindow: null, // 水厂名称
      waterworksMarkerInfoData: {}, // 水厂弹窗数据
      waterworksMapData: [
        {
          name: '赣州经济技术开发区工业污水处理厂',
          lng: '114.920541',
          lat: '25.893361'
        },
        {
          name: '赣州水西工业污水处理厂',
          lng: '114.924967',
          lat: '25.920139'
        },
        {
          name: '赣县工业污水处理厂',
          lng: '115.03372',
          lat: '25.878386'
        },
        {
          name: '上犹工业污水处理厂',
          lng: '114.580309',
          lat: '25.775821'
        },
        {
          name: '瑞金工业污水处理厂',
          lng: '116.011241',
          lat: '25.835958'
        },
        {
          name: '于都工业污水处理厂',
          lng: '115.382221',
          lat: '25.945829'
        },
        {
          name: '兴国工业污水处理厂',
          lng: '115.37855',
          lat: '26.294355'
        },
        {
          name: '信丰工业污水处理厂',
          lng: '114.922011',
          lat: '25.429639'
        },
        {
          name: '龙南工业污水处理厂',
          lng: '114.809366',
          lat: '24.861893'
        },
        {
          name: '大余工业污水处理厂',
          lng: '114.358073',
          lat: '25.383188'
        },
        {
          name: '定南工业污水处理厂',
          lng: '115.057733',
          lat: '24.771674'
        },
        {
          name: '青原工业污水处理厂',
          lng: '115.161862',
          lat: '26.98831'
        },
        {
          name: '泰和工业污水处理厂',
          lng: '114.941348',
          lat: '26.827623'
        },
        {
          name: '井冈山工业污水处理厂',
          lng: '115.323105',
          lat: '27.578978'
        },
        {
          name: '抚北工业污水处理厂',
          lng: '116.286817',
          lat: '28.01334'
        },
        {
          name: '南丰工业污水处理厂',
          lng: '116.534802',
          lat: '27.245852'
        },
        {
          name: '南城工业园区污水处理厂',
          lng: '116.334349',
          lat: '27.994054'
        },
        {
          name: '上饶县工业污水处理厂',
          lng: '117.887163',
          lat: '28.353865'
        },
        {
          name: '鹰潭龙岗工业污水处理厂',
          lng: '117.000095',
          lat: '28.215526'
        },
        {
          name: '余干工业污水处理厂',
          lng: '116.839926',
          lat: '28.461554'
        },
        {
          name: '中童污水处理厂',
          lng: '116.977909',
          lat: '28.293759'
        },
        {
          name: '锦江污水处理厂',
          lng: '116.915211',
          lat: '28.39954'
        },
        {
          name: '潢溪污水处理厂',
          lng: '116.931543',
          lat: '28.339521'
        },
        {
          name: '虎山工业污水处理厂',
          lng: '116.799934',
          lat: '28.215397'
        },
        {
          name: '袁州机电基地污水处理厂',
          lng: '114.552594',
          lat: '27.78892'
        },
        {
          name: '上高工业园区污水处理厂',
          lng: '115.013814',
          lat: '28.28272'
        },
        {
          name: '高安建陶基地污水处理厂',
          lng: '115.482908',
          lat: '28.075816'
        },
        {
          name: '宜丰工业污水处理厂',
          lng: '114.840624',
          lat: '28.32154'
        },
        {
          name: '上高工业园区五里岭污水处理厂',
          lng: '114.959661',
          lat: '28.25368'
        },
        {
          name: '庐山工业污水处理厂',
          lng: '116.04506',
          lat: '29.448128'
        },
        {
          name: '安义工业园区污水处理厂',
          lng: '115.612107',
          lat: '28.848'
        },
        {
          name: '德安工业污水处理厂',
          lng: '115.790825',
          lat: '29.307294'
        },
        {
          name: '武宁工业污水处理厂',
          lng: '115.138113',
          lat: '29.2314'
        },
        {
          name: '荆门工业污水处理厂',
          lng: '118.400608',
          lat: '25.169383'
        }
      ], // 水厂地图坐标点数据
      waterworksMapMarkers: [], // 水厂地图坐标点
      airMarkerInfoData: {}, // 空气监测站弹窗数据
      airMapData: [
        {
          name: 'KC001空气监测站',
          lng: '114.437025',
          lat: '27.373705',
          airQualityIndex: 22
        },
        {
          name: 'KC002空气监测站',
          lng: '115.231992',
          lat: '28.810026',
          airQualityIndex: 78
        },
        {
          name: 'KC003空气监测站',
          lng: '117.288754',
          lat: '28.810026',
          airQualityIndex: 124
        },
        {
          name: 'KC004空气监测站',
          lng: '116.131502',
          lat: '27.148001',
          airQualityIndex: 45
        },
        {
          name: 'KC005空气监测站',
          lng: '114.927368',
          lat: '25.075067',
          airQualityIndex: 144
        },
        {
          name: 'KC006空气监测站',
          lng: '115.723709',
          lat: '26.047432',
          airQualityIndex: 77
        }
      ], // 空气监测站坐标点数据
      airMapMarkers: [], // 空气监测站坐标点
      airMapTexts: [], // 空气监测站text点数据
      mapZoomData: {
        '1920': {
          lng: '115.857963',
          lat: '24.73016',
          zoom: '7.1'
        },
        '3120': {
          lng: '115.857963',
          lat: '26.63016',
          zoom: '7.5'
        }
      }, // 地图中心点和层级适配
      waterworksInfoVisible: false, // 污水处理厂是否弹框
      airInfoVisible: false // 空气监测站是否弹框
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      AMapLoader.load({
        key: 'db315280d0e2846c9377850248784804', // 申请好的Web端开发者Key，首次调用 load 时必填
        version: '2.0', // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
        plugins: [], // 需要使用的的插件列表，如比例尺'AMap.Scale'等
        AMapUI: {
          // 是否加载 AMapUI，缺省不加载
          version: '1.1', // AMapUI 缺省 1.1
          plugins: [] // 需要加载的 AMapUI ui插件
        },
        Loca: {
          // 是否加载 Loca， 缺省不加载
          version: '2.0' // Loca 版本，缺省 1.3.2
        }
      })
        .then(AMap => {
          this.AMap = AMap
          // 江西图层
          const imageLayer = new AMap.ImageLayer({
            url: mapBg1,
            bounds: new AMap.Bounds(
              [113.036601, 31.139386],
              [119.005107, 23.572352]
            ),
            zooms: [3, 18]
          })
          // 荆门图层
          const imageLayer2 = new AMap.ImageLayer({
            url: mapBg2,
            bounds: new AMap.Bounds(
              [117.855107, 25.672352],
              [119.017824, 24.68702]
            ),
            zooms: [3, 18]
          })
          // 创建地图
          const windowWidth = window.innerWidth
          const mapzoom =
            this.mapZoomData[windowWidth] === undefined
              ? this.mapZoomData['1920']
              : this.mapZoomData[windowWidth]
          this.map = new AMap.Map('container', {
            center: [mapzoom.lng, mapzoom.lat],
            zoom: mapzoom.zoom,
            mapStyle: 'amap://styles/7a40947ea269d1d72bdd0ad91ce59d71', // 设置地图的显示样式
            layers: [AMap.createDefaultLayer(), imageLayer, imageLayer2],
            pitch: 30,
            viewMode: '3D'
          })
          // 添加污水处理厂坐标点
          this.addWaterworkMarkers()
          // this.addAirMarkers()
          // 地图点击事件
          var clickHandler = function(e) {
            console.log(
              '您在[ ' +
                e.lnglat.getLng() +
                ',' +
                e.lnglat.getLat() +
                ' ]的位置点击了地图！'
            )
          }
          this.map.on('click', clickHandler)
        })
        .catch(e => {
          console.log(e)
        })
    },
    changeMapPoint(value) {
      // 污水处理厂坐标点设置
      if (value.indexOf('1') !== -1) {
        // 包含污水处理厂
        if (this.waterworksMapMarkers.length === 0) {
          // 添加坐标点
          this.addWaterworkMarkers()
        }
      } else {
        this.clearWaterworkMarkers()
      }
      // 空气监测站坐标点设置
      if (value.indexOf('2') !== -1) {
        if (this.airMapMarkers.length === 0) {
          // 添加坐标点
          this.addAirMarkers()
        }
      } else {
        this.clearAirMarkers()
      }
    },
    // 添加污水处理厂坐标点
    addWaterworkMarkers() {
      // 设置地图图标点
      const icon1 = new this.AMap.Icon({
        size: new this.AMap.Size(28, 38), // 图标尺寸
        image: mapWaterworksPoint1, // Icon的图像
        imageOffset: new this.AMap.Pixel(0, 0), // 图像相对展示区域的偏移量，适于雪碧图等
        imageSize: new this.AMap.Size(28, 38) // 根据所设置的大小拉伸或压缩图片
      })
      const icon2 = new this.AMap.Icon({
        size: new this.AMap.Size(28, 38), // 图标尺寸
        image: mapWaterworksPoint2, // Icon的图像
        imageOffset: new this.AMap.Pixel(0, 0), // 图像相对展示区域的偏移量，适于雪碧图等
        imageSize: new this.AMap.Size(28, 38) // 根据所设置的大小拉伸或压缩图片
      })
      // 添加污水处理厂
      this.waterworksMapData.forEach(item => {
        // 创建点
        let icon = icon1
        if (
          item.name === '于都工业污水处理厂' ||
          item.name === '袁州机电基地污水处理厂' ||
          item.name === '南丰工业污水处理厂'
        ) {
          icon = icon2
        }
        const marker = new this.AMap.Marker({
          position: [item.lng, item.lat],
          icon: icon,
          offset: new this.AMap.Pixel(-14, -38)
        })
        // 添加点
        this.map.add(marker)
        this.waterworksMapMarkers.push(marker)
        // 绑定事件(鼠标移入移出事件，点击事件)
        marker
          .on('mouseover', e => {
            // 信息窗体的内容
            const content = `<div class="waterworks-info">${item.name}</div>`
            this.waterworksInfoWindow = new this.AMap.InfoWindow({
              content: content,
              isCustom: true,
              offset: new this.AMap.Pixel(0, -40)
            })
            this.waterworksInfoWindow.open(this.map, [item.lng, item.lat])
          })
          .on('mouseout', e => {
            this.waterworksInfoWindow.close()
          })
          .on('click', e => {
            this.waterworksInfoVisible = true
            this.waterworksMarkerInfoData = item
          })
      })
      // 湖北荆门文本
      const content = '<div style="color: #0BEBFF;width: 70px;">湖北荆门</div>'
      const markerJM = new this.AMap.Marker({
        content: content, // 自定义点标记覆盖物内容
        position: [118.589409, 24.852618], // 基点位置
        offset: new this.AMap.Pixel(0, 0) // 相对于基点的偏移位置
      })
      this.map.add(markerJM)
      this.waterworksMapMarkers.push(markerJM)
    },
    // 清除污水处理厂坐标点
    clearWaterworkMarkers() {
      this.waterworksMapMarkers.forEach(item => {
        this.map.remove(item)
      })
      this.waterworksMapMarkers = []
    },
    // 添加空气监测站坐标点
    addAirMarkers() {
      // 设置地图图标点
      const icon1 = new this.AMap.Icon({
        size: new this.AMap.Size(44, 56), // 图标尺寸
        image: mapAirPoint1, // Icon的图像
        imageOffset: new this.AMap.Pixel(0, 0), // 图像相对展示区域的偏移量，适于雪碧图等
        imageSize: new this.AMap.Size(44, 56) // 根据所设置的大小拉伸或压缩图片
      })
      const icon2 = new this.AMap.Icon({
        size: new this.AMap.Size(44, 56), // 图标尺寸
        image: mapAirPoint2, // Icon的图像
        imageOffset: new this.AMap.Pixel(0, 0), // 图像相对展示区域的偏移量，适于雪碧图等
        imageSize: new this.AMap.Size(44, 56) // 根据所设置的大小拉伸或压缩图片
      })
      const icon3 = new this.AMap.Icon({
        size: new this.AMap.Size(44, 56), // 图标尺寸
        image: mapAirPoint3, // Icon的图像
        imageOffset: new this.AMap.Pixel(0, 0), // 图像相对展示区域的偏移量，适于雪碧图等
        imageSize: new this.AMap.Size(44, 56) // 根据所设置的大小拉伸或压缩图片
      })
      const icon4 = new this.AMap.Icon({
        size: new this.AMap.Size(44, 56), // 图标尺寸
        image: mapAirPoint4, // Icon的图像
        imageOffset: new this.AMap.Pixel(0, 0), // 图像相对展示区域的偏移量，适于雪碧图等
        imageSize: new this.AMap.Size(44, 56) // 根据所设置的大小拉伸或压缩图片
      })
      const icon5 = new this.AMap.Icon({
        size: new this.AMap.Size(44, 56), // 图标尺寸
        image: mapAirPoint5, // Icon的图像
        imageOffset: new this.AMap.Pixel(0, 0), // 图像相对展示区域的偏移量，适于雪碧图等
        imageSize: new this.AMap.Size(44, 56) // 根据所设置的大小拉伸或压缩图片
      })
      const icon6 = new this.AMap.Icon({
        size: new this.AMap.Size(44, 56), // 图标尺寸
        image: mapAirPoint6, // Icon的图像
        imageOffset: new this.AMap.Pixel(0, 0), // 图像相对展示区域的偏移量，适于雪碧图等
        imageSize: new this.AMap.Size(44, 56) // 根据所设置的大小拉伸或压缩图片
      })
      this.airMapData.forEach(item => {
        let icon = null
        let color = null
        if (item.airQualityIndex <= 50) {
          icon = icon1
          color = 'color1'
        } else if (item.airQualityIndex <= 100) {
          icon = icon2
          color = 'color2'
        } else if (item.airQualityIndex <= 150) {
          icon = icon3
          color = 'color3'
        } else if (item.airQualityIndex <= 200) {
          icon = icon4
          color = 'color4'
        } else if (item.airQualityIndex <= 300) {
          icon = icon5
          color = 'color5'
        } else {
          icon = icon6
          color = 'color6'
        }
        item.aqicolor = color
        const marker = new this.AMap.Marker({
          position: [item.lng, item.lat],
          icon: icon,
          offset: new this.AMap.Pixel(-22, -56)
        })
        // 添加点
        this.map.add(marker)
        this.airMapMarkers.push(marker)
        marker.on('click', () => {
          this.airInfoVisible = true
          this.airMarkerInfoData = item
        })
        // 添加text名称
        const text = new this.AMap.Text({
          position: new this.AMap.LngLat(item.lng, item.lat),
          anchor: 'bottom-center',
          text: `
                <div class="air-label ${color}">
                  <span class="air-icon"></span>
                  <div class="air-content">
                    <span class="air-name">${item.name}</span>
                    <span class="air-num">${item.airQualityIndex}</span>
                  </div>
                </div>`,
          offset: new this.AMap.Pixel(0, -60)
        })
        this.map.add(text)
        this.airMapTexts.push(text)
      })
    },
    // 清除空气监测站坐标点
    clearAirMarkers() {
      this.airMapMarkers.forEach(item => {
        this.map.remove(item)
      })
      this.airMapMarkers = []
      this.airMapTexts.forEach(item => {
        this.map.remove(item)
      })
      this.airMapTexts = []
    }
  }
}
</script>

<style lang="scss" scoped>
// 污水处理厂infoWindow信息样式
::v-deep .waterworks-info {
  height: 40px;
  padding: 6px 12px;
  font-size: 16px;
  font-weight: bold;
  background: url('../../../assets/img/map/map-info-bg1.png') no-repeat;
  background-size: 100% 100%;
  color: #fff;
  display: flex;
  justify-content: center;
  line-height: 24px;
}
// 空气监测站信息样式
::v-deep .amap-overlay-text-container {
  .air-label {
    display: flex;
    align-items: center;
    height: 20px;
    color: #ffffff;
    .air-icon {
      position: absolute;
      z-index: 2;
      left: -80px;
      width: 24px;
      height: 20px;
    }
    .air-content {
      position: absolute;
      z-index: 1;
      left: -68px;
      padding-left: 12px;
      .air-name {
        height: 20px;
        font-size: 12px;
        line-height: 18px;
        padding-right: 6px;
      }
      .air-num {
        height: 20px;
        font-size: 12px;
        font-weight: 500;
        line-height: 18px;
        padding: 0 7px;
      }
    }
  }
  .color1 {
    .air-icon {
      background: url('../../../assets/img/map/map-air-icon1.png') no-repeat;
      background-size: 100% 100%;
    }
    .air-content {
      border: 1px solid #c2fadf;
      background: #25a267;
      .air-num {
        background: #30d385;
      }
    }
  }
  .color2 {
    .air-icon {
      background: url('../../../assets/img/map/map-air-icon2.png') no-repeat;
      background-size: 100% 100%;
    }
    .air-content {
      border: 1px solid #fff1ad;
      background: #b29508;
      .air-num {
        background: #eac30c;
      }
    }
  }
  .color3 {
    .air-icon {
      background: url('../../../assets/img/map/map-air-icon3.png') no-repeat;
      background-size: 100% 100%;
    }
    .air-content {
      border: 1px solid #ffe3b9;
      background: #bc7814;
      .air-num {
        background: #ff9902;
      }
    }
  }
}
#container {
  width: 100vw;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
}
//左下角图例样式
.legend-wrap {
  position: absolute;
  left: 956px;
  top: 640px;
  z-index: 10;
  height: 216px;
  display: flex;
  flex-flow: column-reverse;
  .l-waterworks-wrap {
    width: 128px;
    height: 50px;
    display: flex;
    flex-direction: column;
    .title {
      font-size: 12px;
      font-weight: bold;
      color: #ffffff;
      opacity: 0.8;
      margin-bottom: 8px;
    }
    .row {
      display: flex;
      .legend {
        width: 64px;
        height: 24px;
        opacity: 1;
        font-size: 14px;
        color: #fff;
        font-weight: bold;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .normal {
        background: rgba(56, 255, 103, 0.85);
        border-radius: 12px 0 0 12px;
      }
      .more-norm {
        background: #e12234;
        border-radius: 0 16px 16px 0;
      }
    }
  }
  .l-air-wrap {
    width: 96px;
    height: 154px;
    background: rgba(15, 51, 83, 0.8);
    border: 2px dotted rgba(119, 215, 250, 0.3137254901960784);
    color: #fff;
    padding-top: 10px;
    margin-top: 12px;
    .air-row {
      display: flex;
      align-items: center;
      margin-top: 5px;
      .air-color {
        width: 10px;
        height: 10px;
        margin: 0 8px 0 16px;
      }
      .title {
        font-size: 12px;
        font-weight: bold;
        opacity: 0.8;
      }
      .air-color1 {
        background: #30d385;
      }
      .air-color2 {
        background: #ffd300;
      }
      .air-color3 {
        background: #ff9902;
      }
      .air-color4 {
        background: #ff0200;
      }
      .air-color5 {
        background: #990099;
      }
      .air-color6 {
        background: #990000;
      }
    }
  }
}

// 右下角多选样式
.map-select-wrap {
  position: absolute;
  left: 2020px;
  top: 784px;
  z-index: 7;
  width: 134px;
  height: 76px;
  background: rgba(15, 51, 83, 0.8);
  border: 2px dotted rgba(119, 215, 250, 0.3137254901960784);
  padding: 12px 0 15px 10px;
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
      }
    }
  }
  ::v-deep .el-checkbox__input.is-checked .el-checkbox__inner,
  .el-checkbox__input.is-indeterminate .el-checkbox__inner {
    background-color: #0bebff !important;
    border-color: #0bebff !important;
  }
}
// 清除高德地图的logo和版权信息
::v-deep .amap-container {
  .amap-logo,
  .amap-copyright {
    display: none !important;
  }
}
</style>
