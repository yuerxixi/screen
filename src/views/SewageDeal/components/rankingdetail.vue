<template>
  <!-- 排名详情 -->
  <div class="rank-full-box">
    <div class="rank-full-inner">
      <div class="rank-full-title rank-full-width">
        <span
          v-for="(item, index) in list"
          :key="index"
          :class="item.className"
        >
          <i>{{ item.name }}</i>
          <i v-if="item.isSort" class="triangle-box">
            <i
              class="triangle upper"
              :class="{ active: !sort }"
              @click="sortRank(0)"
            />
            <i
              class="triangle lower"
              :class="{ active: sort }"
              @click="sortRank(1)"
            />
          </i>
        </span>
      </div>
      <ul>
        <li v-for="i in 33" :key="i" class="rank-full-width">
          <span
            v-for="(item, index) in list"
            :key="index"
            :class="item.className"
          >
            {{
              item.name === '排名' ? (sort ? 34 - i : i) : rankData[item.key]
            }}
          </span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Rankingdetail',
  props: {
    list: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      sort: 0,
      rankData: {
        completionRate: '99%',
        standardRate: '99%',
        waterworks: '龙南县东江乡大稳村龙南工业污水处理厂',
        score: '99',
        person: '杨艳良',
        phone: '18770025030'
      }
    }
  },

  methods: {
    sortRank(i) {
      this.sort = i
    }
  }
}
</script>
<style lang="scss" scoped>
.rank-full-box {
  width: 100%;
  height: 530px;
  padding: 16px;
  .rank-full-inner {
    height: 100%;
    display: flex;
    flex-direction: column;
    background: rgba(255, 255, 255, 0.06);
    border-radius: 8px;
    padding: 0 18px;
    .rank-full-title {
      height: 48px;
      display: flex;
      line-height: 1;
      align-items: center;
      justify-content: space-around;
      border-bottom: 1px solid rgba(255, 255, 255, 0.2);
      color: rgba(255, 255, 255, 0.6);
    }
    ul {
      flex: 1;
      overflow-x: hidden;
      overflow-y: scroll;
      padding-top: 10px;
      li {
        display: flex;
        align-items: center;
        justify-content: space-around;
        font-size: 14px;
        line-height: 2.5;
        color: #ffffff;
      }
    }
    ul::-webkit-scrollbar {
      width: 0;
    }
    .rank-full-width {
      span {
        flex: 1;
        font-size: 14px;
        text-align: center;
        i {
          font-style: normal;
          margin-left: 4px;
        }
        .triangle-box {
          display: flex;
          flex-direction: column;
          justify-content: center;
          .triangle {
            display: inline-block;
            width: 0;
            height: 0;
            border-left: 10px solid transparent;
            border-right: 10px solid transparent;
            cursor: pointer;
          }
          .upper {
            border-bottom: 10px solid #ffffff;
            margin-bottom: 4px;
          }
          .lower {
            border-top: 10px solid #ffffff;
          }
          .active {
            opacity: 0.4;
          }
        }
      }
      .rank {
        flex: 0.6;
      }
      .waterworks {
        flex: 2;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
      }
      .score {
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
  }
}
</style>
