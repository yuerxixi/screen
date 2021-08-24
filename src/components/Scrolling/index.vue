<template>
  <!-- 滚动组件 -->
  <div
    ref="scrollBox"
    class="scroll-box"
    :class="{ 'scroll-rollback': rollback }"
    @mouseout="mouseout"
    @mouseover="mouseover"
  >
    <div ref="ul">
      <slot />
    </div>
    <div ref="ulNext" />
  </div>
</template>

<script>
export default {
  name: 'Scrolling',
  props: {
    rollNumber: {
      // 需要滚动的最低数 当数据有多少条时滚动
      type: Number,
      default: 4
    },
    length: {
      // 数组长度
      type: Number,
      default: 0
    },
    scrollTime: {
      // 滚动需要的毫秒数
      type: Number,
      default: 40
    },
    scrollHeight: {
      // 每次滚动的高度
      type: Number,
      default: 1
    }
  },
  data() {
    return {
      rollback: true,
      time: null,
      scrollBox: null,
      ul: null,
      ulNext: null
    }
  },
  computed: {
    isScroll() {
      return this.length > this.rollNumber
    }
  },
  watch: {
    length: {
      handler(newVal, oldVal) {
        if (newVal !== oldVal && oldVal !== 0) {
          clearInterval(this.time)
          this.scrollBox.scrollTop = 0
          this.ulNext.innerHTML = null
          this.scrollBox = null
          this.ul = null
          this.rollback = true
          this.$nextTick(() => {
            this.setRef()
            if (this.isScroll) {
              this.setScroll()
            }
          })
        }
      }
    }
  },
  mounted() {
    this.setRef()
    if (this.isScroll) {
      this.setScroll()
    }
  },
  destroyed() {
    clearInterval(this.time)
    this.scrollBox = null
    this.ul = null
    this.ulNext = null
  },
  methods: {
    setRef() {
      this.scrollBox = this.$refs.scrollBox
      this.ul = this.$refs.ul
      if (this.isScroll) {
        this.ulNext = this.$refs.ulNext
        this.ulNext.innerHTML = this.ul.innerHTML
      }
    },
    setScroll() {
      clearInterval(this.time)
      this.time = setInterval(() => {
        if (this.scrollBox.scrollTop >= this.ul.offsetHeight) {
          this.rollback = true
          this.scrollBox.scrollTop = 0
        } else {
          this.rollback = true
          if (
            this.scrollBox.scrollTop + this.scrollHeight >=
            this.ul.offsetHeight
          ) {
            this.rollback = false
          }
          this.scrollBox.scrollTop =
            this.scrollBox.scrollTop + this.scrollHeight
        }
      }, this.scrollTime)
    },
    mouseover() {
      clearInterval(this.time)
    },
    mouseout() {
      if (this.isScroll) {
        this.setScroll()
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.scroll-box {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  transition: 0.5s;
  scrollbar-width: none;
  -ms-overflow-style: none;
  overflow-x: hidden;
  overflow-y: auto;
}
.scroll-rollback {
  scroll-behavior: smooth;
}
.scroll-box::-webkit-scrollbar {
  display: none;
}
</style>
