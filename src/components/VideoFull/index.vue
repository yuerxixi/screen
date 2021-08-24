<template>
  <!-- 视频全屏组件 -->
  <el-dialog
    :visible.sync="dialogVisible"
    append-to-body
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    destroy-on-close
    top="30px"
    custom-class="video-custom"
    @close="close"
  >
    <template v-slot:title>
      <div class="title">
        <span>视频监控</span>
        <div class="monitoring-location">
          <span
            v-for="item in list"
            :key="item.id"
            :class="{ active: activeValue === item.id }"
            @click="toSwitch(item.id)"
          >{{ item.name }}</span>
        </div>
      </div>
    </template>

    <div class="video-full-box">
      <Video
        :options="options"
        :is-enlarge="false"
        :surveillance-id="Number(activeValue)"
      />
    </div>

    <template v-slot:footer>
      <div class="footer" />
    </template>
  </el-dialog>
</template>

<script>
import Video from '@/components/Video'
export default {
  name: 'VideoFull',
  components: { Video },
  props: {
    isShow: {
      // 弹出窗展示
      type: Boolean,
      default: false
    },
    waterworksId: {
      // 水厂id
      type: Number,
      default: 1
    }
  },
  data() {
    return {
      activeValue: 1,
      dialogVisible: false,
      options: {
        sources: [
          {
            type: 'video/mp4', // 视频类型
            src: require('@/assets/video/test.mp4') // 视频地址
          }
        ]
      }
    }
  },
  computed: {
    list() {
      return [
        { id: 1, name: '鹰眼' },
        { id: 2, name: this.waterworks > 1 ? '进水口' : '进口' },
        { id: 3, name: this.waterworks > 1 ? '出水口' : '出口' }
      ]
    }
  },
  watch: {
    isShow() {
      this.dialogVisible = this.isShow
    }
  },
  methods: {
    toSwitch(index) {
      this.activeValue = index
      if (this.activeValue > 1) {
        this.options.sources[0].src = ''
      } else {
        this.options.sources[0].src = require('@/assets/video/test.mp4')
      }
      console.log(this.options)
      // 更换地址.....
    },
    close() {
      this.$emit('update:isShow', false)
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
  .monitoring-location {
    margin-left: 24px;
    span {
      display: inline-block;
      padding: 0 20px;
      height: 28px;
      background: rgba(11, 235, 255, 0.1);
      border-radius: 2px;
      font-size: 14px;
      line-height: 28px;
      text-align: center;
      margin-right: 8px;
      cursor: pointer;
    }
    .active {
      background: #00b7c7;
    }
  }
}
.video-full-box {
  width: 100%;
  height: 750px;
  background: #000;
}

.footer {
  height: 40px;
  background: rgba(0, 186, 255, 0.08);
}
</style>
<style lang="scss">
.video-custom {
  width: 1620px;
  height: 840px;
  background: rgba(12, 20, 38, 0.8);
  border: 2px solid rgba(119, 215, 250, 0.6);
  opacity: 1;
  border-radius: 8px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}
.video-custom > .el-dialog__header {
  height: 48px;
  padding: 0;
}
.video-custom > .el-dialog__header > .el-dialog__headerbtn {
  top: 9px;
  right: 16px;
}
.video-custom > .el-dialog__body {
  flex: 1;
  padding: 0;
}
.video-custom > .el-dialog__footer {
  height: 40px;
  padding: 0;
}
</style>
