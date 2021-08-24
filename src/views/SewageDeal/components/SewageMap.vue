<template>
  <div>
    <div id="container" />
    <div class="legend-wrap">
      <div class="l-waterworks-wrap">
        <span class="title">出水指标</span>
        <div class="row">
          <div class="legend normal">达标</div>
          <div class="legend more-norm">超标</div>
        </div>
      </div>
    </div>
    <!-- 地图底部切换-->
    <Footer
      :page-num="2"
    />
    <!-- 污水处理厂弹框-->
    <map-waterworks-dialog
      :visible.sync="waterworksInfoVisible"
      :marker-info-data="waterworksMarkerInfoData"
    />
    <go-home></go-home>
  </div>
</template>

<script>
import AMapLoader from '@amap/amap-jsapi-loader'
import mapBg1 from '@/assets/img/map/map-bg1.png'
import mapBg2 from '@/assets/img/map/map-bg2.png'
import mapWaterworksPoint1 from '@/assets/img/map/map-waterworks-point1.png'
import mapWaterworksPoint2 from '@/assets/img/map/map-waterworks-point2.png'
import Footer from '@/components/Footer'
import GoHome from '@/components/GoHome'
import MapWaterworksDialog from './../../Home/components/mapWaterworksDialog'

export default {
  name: 'SewageMap',
  components: {
    MapWaterworksDialog,
    Footer,
    GoHome
  },
  data() {
    return {
      AMap: null,
      map: null, // 地图
      mapFooterSel: null, // 地图底部切换
      waterworksInfoWindow: null, // 水厂名称
      waterworksMarkerInfoData: {}, // 水厂弹窗数据
      waterworksMapData: [
        {
          name: '赣州经济技术开发区工业污水处理厂',
          lng: '114.920541',
          lat: '25.893361',
          kpiIndex: 87
        },
        {
          name: '赣州水西工业污水处理厂',
          lng: '114.924967',
          lat: '25.920139',
          kpiIndex: 82
        },
        {
          name: '赣县工业污水处理厂',
          lng: '115.03372',
          lat: '25.878386',
          kpiIndex: 55
        },
        {
          name: '上犹工业污水处理厂',
          lng: '114.580309',
          lat: '25.775821',
          kpiIndex: 58
        },
        {
          name: '瑞金工业污水处理厂',
          lng: '116.011241',
          lat: '25.835958',
          kpiIndex: 81
        },
        {
          name: '于都工业污水处理厂',
          lng: '115.382221',
          lat: '25.945829',
          kpiIndex: 84
        },
        {
          name: '兴国工业污水处理厂',
          lng: '115.37855',
          lat: '26.294355',
          kpiIndex: 94
        },
        {
          name: '信丰工业污水处理厂',
          lng: '114.922011',
          lat: '25.429639',
          kpiIndex: 69
        },
        {
          name: '龙南工业污水处理厂',
          lng: '114.809366',
          lat: '24.861893',
          kpiIndex: 70
        },
        {
          name: '大余工业污水处理厂',
          lng: '114.358073',
          lat: '25.383188',
          kpiIndex: 80
        },
        {
          name: '定南工业污水处理厂',
          lng: '115.057733',
          lat: '24.771674',
          kpiIndex: 85
        },
        {
          name: '青原工业污水处理厂',
          lng: '115.161862',
          lat: '26.98831',
          kpiIndex: 90
        },
        {
          name: '泰和工业污水处理厂',
          lng: '114.941348',
          lat: '26.827623',
          kpiIndex: 92
        },
        {
          name: '井冈山工业污水处理厂',
          lng: '115.323105',
          lat: '27.578978',
          kpiIndex: 98
        },
        {
          name: '抚北工业污水处理厂',
          lng: '116.286817',
          lat: '28.01334',
          kpiIndex: 84
        },
        {
          name: '南丰工业污水处理厂',
          lng: '116.534802',
          lat: '27.245852',
          kpiIndex: 60
        },
        {
          name: '南城工业园区污水处理厂',
          lng: '116.334349',
          lat: '27.994054',
          kpiIndex: 67
        },
        {
          name: '上饶县工业污水处理厂',
          lng: '117.887163',
          lat: '28.353865',
          kpiIndex: 68
        },
        {
          name: '鹰潭龙岗工业污水处理厂',
          lng: '117.000095',
          lat: '28.215526',
          kpiIndex: 83
        },
        {
          name: '余干工业污水处理厂',
          lng: '116.839926',
          lat: '28.461554',
          kpiIndex: 85
        },
        {
          name: '中童污水处理厂',
          lng: '116.977909',
          lat: '28.293759',
          kpiIndex: 87
        },
        {
          name: '锦江污水处理厂',
          lng: '116.915211',
          lat: '28.39954',
          kpiIndex: 82
        },
        {
          name: '潢溪污水处理厂',
          lng: '116.931543',
          lat: '28.339521',
          kpiIndex: 84
        },
        {
          name: '虎山工业污水处理厂',
          lng: '116.799934',
          lat: '28.215397',
          kpiIndex: 78
        },
        {
          name: '袁州机电基地污水处理厂',
          lng: '114.552594',
          lat: '27.78892',
          kpiIndex: 79
        },
        {
          name: '上高工业园区污水处理厂',
          lng: '115.013814',
          lat: '28.28272',
          kpiIndex: 75
        },
        {
          name: '高安建陶基地污水处理厂',
          lng: '115.482908',
          lat: '28.075816',
          kpiIndex: 88
        },
        {
          name: '宜丰工业污水处理厂',
          lng: '114.840624',
          lat: '28.32154',
          kpiIndex: 89
        },
        {
          name: '上高工业园区五里岭污水处理厂',
          lng: '114.959661',
          lat: '28.25368',
          kpiIndex: 92
        },
        {
          name: '庐山工业污水处理厂',
          lng: '116.04506',
          lat: '29.448128',
          kpiIndex: 91
        },
        {
          name: '安义工业园区污水处理厂',
          lng: '115.612107',
          lat: '28.848',
          kpiIndex: 87
        },
        {
          name: '德安工业污水处理厂',
          lng: '115.790825',
          lat: '29.307294',
          kpiIndex: 86
        },
        {
          name: '武宁工业污水处理厂',
          lng: '115.138113',
          lat: '29.2314',
          kpiIndex: 81
        },
        {
          name: '荆门工业污水处理厂',
          lng: '118.400608',
          lat: '25.169383',
          kpiIndex: 78
        }
      ], // 水厂地图坐标点数据
      waterworksMapMarkers: [], // 水厂地图坐标点
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
      waterworksInfoVisible: false // 污水处理厂是否弹框
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      AMapLoader.load({
        'key': 'db315280d0e2846c9377850248784804', // 申请好的Web端开发者Key，首次调用 load 时必填
        'version': '2.0', // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
        'plugins': [], // 需要使用的的插件列表，如比例尺'AMap.Scale'等
        'AMapUI': { // 是否加载 AMapUI，缺省不加载
          'version': '1.1', // AMapUI 缺省 1.1
          'plugins': [] // 需要加载的 AMapUI ui插件
        },
        'Loca': { // 是否加载 Loca， 缺省不加载
          'version': '2.0' // Loca 版本，缺省 1.3.2
        }
      }).then((AMap) => {
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
        const mapzoom = this.mapZoomData[windowWidth] === undefined ? this.mapZoomData['1920'] : this.mapZoomData[windowWidth]
        this.map = new AMap.Map('container', {
          center: [mapzoom.lng, mapzoom.lat],
          zoom: mapzoom.zoom,
          mapStyle: 'amap://styles/7a40947ea269d1d72bdd0ad91ce59d71', // 设置地图的显示样式
          layers: [
            AMap.createDefaultLayer(),
            imageLayer,
            imageLayer2
          ],
          pitch: 30,
          viewMode: '3D'
        })
        // 添加污水处理厂坐标点
        this.addWaterworkMarkers()
        // 地图点击事件
        var clickHandler = function(e) {
          console.log('您在[ ' + e.lnglat.getLng() + ',' + e.lnglat.getLat() + ' ]的位置点击了地图！')
        }
        this.map.on('click', clickHandler)
      }).catch(e => {
        console.log(e)
      })
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
        if (item.name === '于都工业污水处理厂' || item.name === '袁州机电基地污水处理厂' || item.name === '南丰工业污水处理厂') {
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
        marker.on('mouseover', (e) => {
          // 信息窗体的内容
          // const content = `<div class="waterworks-info">${item.name}</div>`
          const content = `<div class="waterworks-label">
                  <span class="waterworks-icon"></span>
                  <div class="waterworks-content">
                    <span class="waterworks-name">${item.name}</span>
                    <span class="waterworks-num">${item.kpiIndex}</span>
                  </div>
                  <div class="waterworks-width">
                    <div style="width: 24px"></div>
                    <div>${item.name}</div>
                    <div style="width: 40px"></div>
                  </div>
                </div>`
          this.waterworksInfoWindow = new this.AMap.InfoWindow({
            content: content,
            isCustom: true,
            offset: new this.AMap.Pixel(0, -44)
          })
          this.waterworksInfoWindow.open(this.map, [item.lng, item.lat])
        }).on('mouseout', (e) => {
          this.waterworksInfoWindow.close()
        }).on('click', (e) => {
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
    }
  }
}
</script>

<style lang="scss" scoped>
// 污水处理厂infoWindow信息样式
::v-deep .waterworks-info{
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
::v-deep .waterworks-label{
  width: auto;
  display: flex;
  align-items: center;
  height: 26px;
  color: #FFFFFF;
  position: relative;
  .waterworks-icon{
    position: absolute;
    z-index: 2;
    width: 24px;
    height: 26px;
    background: url(../../../assets/img/map/map-water-label-icon1.png) no-repeat;
    background-size: 100% 100%;
  }
  .waterworks-content{
    position: absolute;
    z-index: 1;
    left: 12px;
    padding-left: 14px;
    border: 1px solid #C4FFEF;
    background: #00262B;
    display: flex;
    .waterworks-name{
      height: 24px;
      font-size: 12px;
      line-height: 24px;
      padding-right: 6px;
    }
    .waterworks-num{
      height: 24px;
      font-size: 12px;
      font-weight: 500;
      line-height: 24px;
      padding: 0 7px;
      background: #00515C;
    }
  }
  .waterworks-width{
    display: flex;
  }
}
#container{
  width: 100vw;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
}
//右下角图例样式
.legend-wrap{
  position: absolute;
  left: 2016px;
  top: 630px;
  z-index: 10;
  height: 216px;
  display: flex;
  flex-flow: column-reverse;
  .l-waterworks-wrap{
    width: 128px;
    height: 50px;
    display: flex;
    flex-direction: column;
    .title{
      font-size: 12px;
      font-weight: bold;
      color: #FFFFFF;
      opacity: 0.8;
      margin-bottom: 8px;
    }
    .row{
      display: flex;
      .legend{
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
      .normal{
        background: rgba(56, 255, 103, 0.85);
        border-radius: 12px 0 0 12px;
      }
      .more-norm{
        background: #E12234;
        border-radius: 0 16px 16px 0;
      }
    }
  }
}
// 清除高德地图的logo和版权信息
::v-deep .amap-container {
  .amap-logo ,
  .amap-copyright{
    display: none !important;
  }
}
</style>
