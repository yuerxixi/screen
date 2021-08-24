<template>
  <!-- 搜索组件 -->
  <div class="select">
    <el-input
      v-model="value"
      :class="{ padding: clearable }"
      :placeholder="placeholder"
      @input="input"
      @focus="focus"
      @blur="blur"
    />
    <div class="select-icon">
      <div v-if="clearable" class="select-icon-inner" @click="deletes">
        <img src="@/assets/img/delete.png" class="select-icon-img" alt="">
      </div>
      <div class="select-icon-inner" @click="query">
        <img src="@/assets/img/serch.png" class="select-icon-img" alt="">
      </div>
    </div>
    <ul
      v-if="autocompleteList.length"
      ref="autocomplete"
      class="autocomplete"
      :class="{ right: isRight }"
    >
      <li
        v-for="(item, index) in autocompleteList"
        :key="index"
        @click="autocomplete(item)"
      >
        {{ item }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Search',
  props: {
    list: {
      type: Array,
      default: () => []
    },
    isRight: {
      type: Boolean,
      default: false
    },
    placeholder: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      value: '', // 输入的值
      clearable: false, // 显示清除搜索
      autocompleteList: [] // 自动补全列表
    }
  },
  methods: {
    autocomplete(value) {
      // 弹出的自动补全弹窗点击
      this.value = value
      this.query()
    },
    keydown(event) {
      console.log(event)
      console.log('keydown')
    },
    blur() {
      setTimeout(() => {
        // this.autocompleteList = []
      }, 100)
      this.listener(false)
    },
    focus() {
      this.listener(true)
      this.input()
    },
    input() {
      this.autocompleteList = []
      if (this.value === '' || this.value === null) {
        this.clearable = false
        this.$emit('search', this.value)
        return
      }
      this.clearable = true
      this.list.map(item => {
        if (item.includes(this.value)) {
          this.autocompleteList.push(item)
        }
      })
      this.$nextTick(() => {
        console.log(this.$refs)
      })
    },
    query() {
      this.autocompleteList = []
      if (this.value === '' || this.value === null) {
        return
      }
      this.$emit('search', this.value)
    },
    deletes() {
      this.autocompleteList = []
      this.value = ''
      this.clearable = false
      this.$emit('search', this.value)
    },
    listener(type) {
      // 添加和移除监听回车按键
      var _this = this
      if (type) {
        document.addEventListener('keydown', _this.watchEnter)
      } else {
        document.removeEventListener('keydown', _this.watchEnter)
      }
    },
    watchEnter(e) {
      //   e.preventDefault()
      var keyNum = window.event ? e.keyCode : e.which
      if (keyNum === 13 && e.target.tagName === 'INPUT') {
        this.query()
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.select {
  width: 220px;
  position: relative;
  ::v-deep.el-input {
    .el-input__inner {
      height: 34px;
      font-size: 14px;
      font-weight: bold;
      line-height: 26px;
      color: #ffffff;
      opacity: 0.6;
      background: rgba(12, 12, 38, 0.6);
      border: 2px solid rgba(119, 215, 250, 0.3);
      box-shadow: 0px 0px 10px rgba(0, 231, 255, 0.4);
      border-radius: 4px;
      padding-left: 8px;
    }
    .el-input__icon {
      line-height: 38px;
      width: 16px;
      height: 16px;
    }
    .el-input__inner::-webkit-input-placeholder {
      font-weight: normal;
    }
  }
  .padding {
    ::v-deep.el-input__inner {
      padding-right: 70px;
    }
  }
  .select-icon {
    position: absolute;
    display: inline-block;
    height: 100%;
    right: 0;
    top: 0;
    display: flex;
    justify-content: space-between;
    .select-icon-inner {
      height: 100%;
      width: 34px;
      display: inline-block;
      cursor: pointer;
      display: flex;
      justify-content: center;
      align-items: center;
      .select-icon-img {
        height: 20px;
        width: 20px;
      }
    }
  }
  .autocomplete {
    position: absolute;
    left: 0;
    top: 40px;
    z-index: 22;
    background: #ffffff;
    background-color: rgba(12, 12, 38, 0.9);
    border: 1px solid rgba(119, 215, 250, 0.31);
    max-height: 400px;
    overflow-x: hidden;
    overflow-y: auto;
    scrollbar-width: none;
    -ms-overflow-style: none;
    li {
      width: 340px;
      color: #00ebff;
      font-size: 24px;
      line-height: 1.5;
      padding: 10px;
      color: rgba(255, 255, 255, 0.8);
      cursor: pointer;
      font-size: 14px;
    }
    .li:hover {
      background: rgba(0, 140, 159, 0.15);
    }
  }
  .right {
    left: unset;
    top: unset;
    right: 0;
    bottom: 40px;
  }
  .autocomplete::-webkit-scrollbar {
    width: 0;
  }
}
</style>
