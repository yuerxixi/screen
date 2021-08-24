<template>
  <div class="common-video">
    <div class="load">
      <img src="./../../assets/img/load.svg" alt="">
      <p>正在连接，请稍候……</p>
    </div>
    <video-player
      v-if="currentOptions.sources[0].src"
      ref="videoPlayer"
      class="video-player-custom"
      :options="currentOptions"
      :playsinline="true"
    />
    <img v-else class="poster" :src="posterSrc[surveillanceId + 1]" alt="">
    <div v-if="isEnlarge" class="full-screen" @click="fullScreen">
      <img src="@/assets/img/full-screen.png" alt="">
    </div>
  </div>
</template>

<script>
import 'videojs-contrib-hls'
import { videoPlayer } from 'vue-video-player'
export default {
  name: 'Video',
  components: { videoPlayer },
  props: {
    options: {
      // 配置项 详细见 defaultOptions
      type: Object,
      default: () => {}
    },
    isEnlarge: {
      // 当前视频是否需要放大展示
      type: Boolean,
      default: true
    },
    surveillanceId: {
      // 临时
      type: Number,
      default: 1
    }
  },
  data() {
    return {
      posterSrc: [
        // 临时图片地址
        require('@/assets/img/key-places.png'),
        require('@/assets/img/import.png'),
        require('@/assets/img/export.png'),
        require('@/assets/img/intake.png'),
        require('@/assets/img/outlet.png')
      ],
      defaultOptions: {
        muted: true, // 静音
        autoplay: true, // 自动播放
        controls: false, // 下方控制按钮
        loop: true, // 循环播放
        language: 'zh-CN', // 语言
        preload: 'auto', // 预加载
        playbackRates: [0.5, 1.0, 1.5, 2.0], // 倍速
        aspectRatio: '4:3', // 视频比例
        techOrder: ['html5'],
        // poster: './../../assets/img/import.png', // 视频封面
        sources: [
          {
            type: 'video/mp4', // 视频类型
            src: ''
            // src: require('@/assets/video/test.mp4') // 视频地址
          }
        ]
      }
    }
  },
  computed: {
    player() {
      return this.$refs.videoPlayer.player
    },
    currentOptions() {
      return Object.assign(this.defaultOptions, this.options)
    }
  },
  destroyed() {
    this.$refs.videoPlayer = null
  },
  methods: {
    fullScreen() {
      this.$emit('full', this.videoId)
    }
  }
}
</script>
<style scoped lang="scss">
.common-video {
  height: 100%;
  position: relative;
  .video-player-custom {
    position: relative;
    height: 100%;
    ::v-deep.video-js {
      width: 100%;
      height: 100%;
      padding: 0;
      overflow: hidden;
      .vjs-tech {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
  }
  .load {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    img {
      margin: 10px 0;
    }
    p {
      margin: 10px 0;
    }
  }
  .full-screen {
    width: 20px;
    height: 20px;
    position: absolute;
    right: 8px;
    bottom: 8px;
    cursor: pointer;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .poster {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
  }
}
</style>
