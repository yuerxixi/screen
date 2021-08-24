<template>
  <div class="threewaste-container">
    <!-- 头部 -->
    <Header title="中节能智慧环保管家综合监测平台" />
    <!-- 背景 -->
    <Background />
    <!-- 左边区域 -->
    <div class="threewaste threewaste-left" />
    <!-- 右边区域 -->
    <div class="threewaste threewaste-left" />
  </div>
</template>

<script>
import Header from '@/components/Header'
import Background from '@/components/Background'
export default {
  name: 'ThreeWaste',
  components: {
    Header,
    Background
  }
}
</script>

<style lang="scss" scoped>
.threewaste {
  position: absolute;
  top: 64px;
  z-index: 17;
  &.threewaste-left {
    left: 40px;
    width: 900px;
    display: flex;
  }
  &.threewaste-right {
    right: 40px;
    width: 900px;
    display: flex;
  }
}
</style>
