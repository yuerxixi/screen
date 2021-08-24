<template>
  <div class="common-border">
    <img
      v-for="item in imgArr"
      :key="item.src"
      class="border-quadrangle"
      :class="item.class"
      :src="item.src"
      alt=""
    >
    <div class="border-inner">
      <div class="border-title">
        <div v-if="isTitle" class="border-title-back">
          <span>{{ title }}</span>
          <!-- 标题右边tab切换部分 -->
          <slot name="right" />
        </div>
        <div v-else>
          <!-- 无标题自定义插槽 -->
          <slot name="custom" />
        </div>
      </div>
      <div class="border-con">
        <!-- 内容插槽 -->
        <slot />
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Border',
  props: {
    title: {
      // 该组件的标题
      type: String,
      default: ''
    },
    isTitle: {
      // true代表默认标题背景样式 false代表仅有背景其他自由写入
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      imgArr: [
        { src: require('./../../assets/img/border-top.png'), class: 'img-top' },
        {
          src: require('./../../assets/img/border-right.png'),
          class: 'img-right'
        },
        {
          src: require('./../../assets/img/border-bottom.png'),
          class: 'img-bottom'
        },
        {
          src: require('./../../assets/img/border-left.png'),
          class: 'img-left'
        }
      ]
    }
  },
  methods: {}
}
</script>
<style scoped lang="scss">
.common-border {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  position: relative;
  background-color: rgba(12, 12, 38, 0.6);
  .border-quadrangle {
    width: 12px;
    height: 12px;
    position: absolute;
  }
  .img-top {
    left: -6px;
    top: -6px;
  }
  .img-right {
    right: -6px;
    top: -6px;
  }
  .img-bottom {
    bottom: -6px;
    right: -6px;
  }
  .img-left {
    bottom: -6px;
    left: -6px;
  }
  .border-inner {
    position: relative;
    border: 2px solid;
    border-color: rgba(119, 215, 250, 0.31);
    box-shadow: 0px 0px 10px rgba(0, 231, 255, 0.4);
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    .border-title {
      width: 100%;
      height: 40px;
      background-color: rgba(0, 233, 255, 0.08);
      .border-title-back {
        display: flex;
        justify-content: space-between;
        align-items: center;
        background-image: url('./../../assets/img/border-title-back.png');
        background-repeat: no-repeat;
        background-size: 58px 21px;
        background-position: 3px center;
        width: 100%;
        height: 100%;
        padding: 0 16px;
        box-sizing: border-box;
        span {
          font-family: 'titlePlus';
          color: #00ebff;
          font-size: 24px;
          padding-left: 13px;
        }
      }
    }
    .border-con {
      box-sizing: border-box;
      width: 100%;
    }
  }
}
</style>
