<template>
  <div v-if="dialogVisible" class="map-air-info-dialog">
    <div class="header">
      <span class="air-name">{{ markerInfoData.name }}</span>
      <img class="icon-close" src="../../../assets/img/map/map-close.png" alt="close" @click="closeInfoDialog" />
    </div>
    <div class="content">
      <div class="address">赣州市章贡区水西工业园区水西工业污水处理厂</div>
      <div class="aqi-wrap" :class="markerInfoData.aqicolor">
        <div class="num">{{ markerInfoData.airQualityIndex }}</div>
        <div class="title">AQI指数</div>
      </div>
      <div class="so2 param-wrap">
        <div class="num">15</div>
        <div class="title">SO<sub>2</sub></div>
      </div>
      <div class="no2 param-wrap">
        <div class="num">15</div>
        <div class="title">NO<sub>2</sub></div>
      </div>
      <div class="co param-wrap">
        <div class="num">15</div>
        <div class="title">CO</div>
      </div>
      <div class="tvoc param-wrap">
        <div class="num">15</div>
        <div class="title">TVOC</div>
      </div>
      <div class="pm25 param-wrap">
        <div class="num">15</div>
        <div class="title">PM2.5</div>
      </div>
      <div class="pm10 param-wrap">
        <div class="num">15</div>
        <div class="title">PM10</div>
      </div>
      <div class="o3 param-wrap">
        <div class="num">15</div>
        <div class="title">O<sub>3</sub></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MapAirDialog',
  props: {
    visible: {
      type: Boolean,
      required: true
    },
    markerInfoData: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      dialogVisible: false
    }
  },
  watch: {
    visible(val) {
      this.dialogVisible = val
    }
  },
  methods: {
    // 关闭弹窗
    closeInfoDialog() {
      this.dialogVisible = false
      this.$emit('update:visible', this.dialogVisible)
    }
  }
}
</script>

<style lang="scss" scoped>
.map-air-info-dialog{
  width: 748px;
  height: 554px;
  position: absolute;
  left: 1180px;
  top: 180px;
  border: 2px solid rgba(119, 215, 250, 0.6);
  backdrop-filter: blur(10px);
  border-radius: 8px;
  background: rgba(12, 20, 38, 0.85);
  z-index: 10;
  color: #FFFFFF;
  .header{
    width: 100%;
    height: 48px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: rgba(0, 233, 255, 0.08);
    border-radius: 8px 8px 0 0;
    .air-name{
      padding-left: 16px;
      font-size: 16px;
      font-weight: bold;
    }
    .icon-close{
      width: 24px;
      height: 24px;
      margin-right: 20px;
      cursor: pointer;
    }
  }
  .content{
    width: 100%;
    height: 502px;
    position: relative;
    background: url("../../../assets/img/map/map-air-info-bg1.png") 52px 42px no-repeat;
    background-size: 89% 77%;
    .address{
      position: absolute;
      left: 24px;
      top: 24px;
      font-size: 14px;
      font-weight: bold;
    }
    .aqi-wrap{
      position: absolute;
      left: 265px;
      top: 165px;
      width: 228px;
      height: 228px;
      .num{
        width: 228px;
        font-size: 76px;
        font-family: BebasNeue;
        text-align: center;
        margin-top: 54px;
      }
      .title{
        font-size: 16px;
        font-weight: bold;
        text-align: center;
        margin-top: -6px;
      }
    }
    .color1{
      background: url("../../../assets/img/map/map-air-info-bg3.png") no-repeat;
      background-size: 100% 100%;
    }
    .color2{
      background: url("../../../assets/img/map/map-air-info-bg4.png") no-repeat;
      background-size: 100% 100%;
    }
    .color3{
      background: url("../../../assets/img/map/map-air-info-bg5.png") no-repeat;
      background-size: 100% 100%;
    }
    .param-wrap{
      position: absolute;
      width: 100px;
      height: 100px;
      background: url("../../../assets/img/map/map-air-info-bg2.png") no-repeat;
      background-size: 100% 100%;
      .num{
        width: 100px;
        font-size: 28px;
        font-family: BebasNeue;
        color: #0BEBFF;
        text-align: center;
        margin-top: 22px;
      }
      .title{
        font-size: 14px;
        font-weight: bold;
        text-align: center;
      }
    }
    .so2{
      left: 115px;
      top: 99px;
    }
    .no2{
      left: 42px;
      top: 250px;
    }
    .co{
      left: 157px;
      top: 382px;
    }
    .tvoc{
      left: 437px;
      top: 61px;
    }
    .pm25{
      left: 570px;
      top: 124px;
    }
    .pm10{
      left: 620px;
      top: 264px;
    }
    .o3{
      left: 496px;
      top: 376px;
    }
  }
}
</style>
