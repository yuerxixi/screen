<template>
  <!-- 弹窗组件
    封装自element-ui的弹窗组件
    使用 solt name customTitle头部 不写则是默认主体内容
    字段使用 vsible.sync true false  备注 .sync必加  title 弹窗标题
    默认宽高
  -->
  <el-dialog
    :visible.sync="dialogVisible"
    append-to-body
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    destroy-on-close
    :custom-class="className"
    :top="isVideo ? '30px' : '10vh'"
    @close="close"
  >
    <template v-slot:title>
      <div class="title">
        <span>{{ title }}</span>
        <slot name="customTitle" />
      </div>
    </template>

    <div class="full-box">
      <slot />
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: 'Dialog',
  props: {
    vsible: {
      // 弹出窗展示
      type: Boolean,
      default: false
    },
    isVideo: {
      // 是否是视频弹窗
      type: Boolean,
      default: false
    },
    title: {
      // 标题
      type: String,
      default: ''
    }
  },
  data() {
    return {
      dialogVisible: false
    }
  },
  computed: {
    className() {
      return this.isVideo ? 'custom-dialog video-dialog' : 'custom-dialog'
    }
  },
  watch: {
    vsible() {
      this.dialogVisible = this.vsible
    }
  },

  methods: {
    close() {
      this.$emit('update:vsible', false)
    }
  }
}
</script>
<style lang="scss" scoped>
.title {
  display: flex;
  align-items: center;
  height: 100%;
  font-size: 20px;
  font-family: Microsoft YaHei;
  font-weight: bold;
  color: #ffffff;
  height: 48px;
  background: rgba(0, 233, 255, 0.08);
  padding-left: 24px;
}
.rank-full-box {
  width: 100%;
  height: 100%;
}
</style>
<style lang="scss">
.custom-dialog {
  width: 800px;
  height: 580px;
  background: rgba(12, 20, 38, 0.8);
  border: 2px solid rgba(119, 215, 250, 0.6);
  opacity: 1;
  border-radius: 8px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}
.video-dialog {
  width: 1620px;
  height: 840px;
}
.custom-dialog > .el-dialog__header {
  height: 48px;
  padding: 0;
}
.custom-dialog > .el-dialog__header > .el-dialog__headerbtn {
  top: 9px;
  right: 16px;
}
.custom-dialog > .el-dialog__body {
  flex: 1;
  padding: 0;
}
.custom-dialog > .el-dialog__footer {
  height: 40px;
  padding: 0;
}
</style>
