<template>
  <div class="warn-detail">
    <Border title="报警详情">
      <!-- 头部切换 -->
      <template v-slot:right>
        <ul class="changeview">
          <li
            v-for="(item, index) in titleTop"
            :key="index"
            :class="{ active: index == warnIndex }"
            @click="changeIndex(index, direction)"
          >
            {{ item.name }}<span v-if="index !== titleTop.length - 1" />
          </li>
        </ul>
      </template>
      <!-- 下面内容 -->
      <div ref="ranking-box" class="ranking-box">
        <div class="title width">
          <span class="equpiment">报警设备</span>
          <span class="location-info">设备位置</span>
          <span class="alarm-time">报警时间</span>
          <span class="alarm-content">报警内容</span>
          <span class="deal-info">处理状况</span>
        </div>
        <div class="rank-con">
          <Scrolling :length="list.length">
            <ul ref="ul">
              <li v-for="item in list" :key="item.rank" class="width">
                <span class="equpiment">{{ item.equipment }}</span>
                <span class="location-info">{{ item.alarmLocation }}</span>
                <span class="alarm-time">{{ item.alarmTime }}</span>
                <span class="alarm-content">{{ item.type }}</span>
                <span class="deal-info" :class="trandformType(item.type)">{{
                  item.content
                }}</span>
              </li>
            </ul>
          </Scrolling>
        </div>
      </div>
    </Border>
  </div>
</template>
<script>
import Border from '@/components/Border'
import Scrolling from '@/components/Scrolling'
export default {
  name: 'WarnDetail',
  components: { Border, Scrolling },
  props: {
    titleTop: {
      type: Array,
      default: () => []
    },
    warnIndex: {
      type: Number,
      default: 0
    },
    list: {
      type: Array,
      default: () => []
    },
    direction: {
      type: String,
      default: ''
    }
  },
  data() {
    return {}
  },
  mounted() {
    this.listWarn = this.list
  },
  methods: {
    trandformType(item) {
      switch (item) {
        case '黑名单':
          return 'black-list'
        case '闯入':
          return 'beak-in'
        case '监测':
        case '离线':
        case '故障':
          return 'err-warn'
        default:
          break
      }
    },
    // 切换索引值
    changeIndex(index, direction) {
      this.$emit('changeWarnIndex', index, direction)
    }
  }
}
</script>
<style lang="scss" scoped>
.warn-detail {
  width: 432px;
  margin: 30px 0;
  .changeview {
    li {
      display: inline-flex;
      font-size: 14px;
      font-weight: 700;
      align-items: center;
      cursor: pointer;
      color: rgba(255, 255, 255, 0.6);
      span {
        display: inline-block;
        width: 1px;
        padding: 0 !important;
        height: 15px;
        margin: 0 8px;
        vertical-align: middle;
        border-right: 1px solid #0bcdff;
      }
      &.active,
      &:hover {
        color: #0ac4d8;
      }
    }
  }
  .ranking-box {
    height: 100%;
    box-sizing: border-box;
    padding: 12px 8px 5px;
    display: flex;
    flex-direction: column;
    .title {
      height: 34px;
      background: rgba(0, 132, 162, 0.2);
      opacity: 0.8;
    }
    .rank-con {
      height: 159px;
      overflow: hidden;
      ul {
        width: 100%;
        padding: 2px 0 4px;
        li {
          width: 100%;
          padding: 6px 0;
          display: flex;
          align-items: center;
          span {
            line-height: 20px;
          }
        }
      }
    }
    .width {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      text-align: center;
      span {
        padding: 0 5px;
        line-height: 1;
        display: inline-block;
        font-size: 14px;
        font-weight: bold;
        color: #fff;
        width: 67px;
        &.alarm-time {
          width: 110px;
        }
        &.location-info {
          width: 95px;
        }
      }
      .rank {
        width: 140px;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
      }
      .alarm-time {
        font-family: 'BebasNeue';
        font-weight: 400;
      }
      .deal-info {
        &.black-list {
          color: #fff;
        }
        &.beak-in {
          color: #f7b500;
        }
        &.err-warn {
          color: #cb2537;
        }
      }
      .state {
        color: rgba(203, 37, 55, 1);
      }
      .processing {
        color: rgba(234, 206, 0, 1);
      }
      .equpiment {
        font-family: 'BebasNeue';
        font-weight: 400;
      }
    }
  }
  .ranking-box::-webkit-scrollbar {
    display: none;
  }
}
</style>
