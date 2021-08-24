<template>
  <!-- 综合考核排名 -->
  <div class="comprehensive-ranking">
    <Border title="综合考核排名">
      <template v-slot:right>
        <div class="total" @click="detail">详情</div>
      </template>
      <div class="score-box">
        <div v-for="i in 2" :key="i" class="score-con">
          <div class="title" :class="{ color: i === 2 }">
            <p>
              <img :src="titleImg[i - 1]" alt="">
              <span class="dic">考核得分{{ i === 1 ? '正' : '倒' }}排</span>
            </p>
            <span class="dic">TOP5</span>
          </div>
          <ul>
            <li v-for="(item, index) in list" :key="index">
              <div class="rank">
                <img
                  v-if="index < 3"
                  :class="{ 'positive-row': i === 1 }"
                  :src="i === 1 ? rankImg[index] : rankImg[index + 3]"
                  alt=""
                >
                <span v-else class="rank-number"> 0{{ index + 1 }} </span>
              </div>
              <span class="waterworks">{{ item.waterworks }}</span>
              <div class="progress">
                <el-progress
                  :stroke-width="8"
                  :show-text="false"
                  :color="color[i - 1]"
                  :percentage="item.score"
                  stroke-linecap="butt"
                />
              </div>
              <div class="score">
                <span class="number" :class="{ 'number-color': i === 2 }">{{
                  item.score
                }}</span><span class="minutes">分</span>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </Border>

    <Dialog title="综合考核排名详情" :vsible.sync="vsible">
      <Rankingdetail :list="titleList" />
    </Dialog>
  </div>
</template>

<script>
import Border from '@/components/Border'
import Dialog from '@/components/Dialog'
import Rankingdetail from './rankingdetail.vue'
export default {
  name: 'ComprehensiveRanking',
  components: { Border, Dialog, Rankingdetail },
  data() {
    return {
      vsible: false,
      sort: 0,
      titleList: [
        {
          name: '排名',
          className: 'rank',
          key: 'rank'
        },
        {
          name: '水厂',
          className: 'waterworks',
          key: 'waterworks'
        },
        {
          name: '综合考核得分',
          isSort: true,
          className: 'score',
          key: 'score'
        },
        {
          name: '负责人',
          key: 'person'
        },
        {
          name: '联系电话',
          key: 'phone'
        }
      ],
      list: [
        {
          waterworks: '于都工业污水处理厂',
          score: 50
        },
        {
          waterworks: '于都工业污水处理厂',
          score: 50
        },
        {
          waterworks: '瑞金工业污水处理厂',
          score: 89
        },
        {
          waterworks: '于都工业污水处理厂',
          score: 50
        },
        {
          waterworks: '于都工业污水处理厂',
          score: 50
        }
      ],
      color: ['#32E265', '#E12234'],
      titleImg: [
        require('@/assets/img/ranking/positive-row.png'),
        require('@/assets/img/ranking/inverted.png')
      ],
      rankImg: [
        require('@/assets/img/ranking/one.png'),
        require('@/assets/img/ranking/two.png'),
        require('@/assets/img/ranking/three.png'),
        require('@/assets/img/ranking/inverted-one.png'),
        require('@/assets/img/ranking/inverted-two.png'),
        require('@/assets/img/ranking/inverted-three.png')
      ]
    }
  },
  methods: {
    detail() {
      this.vsible = true
    }
  }
}
</script>
<style lang="scss" scoped>
.comprehensive-ranking {
  width: 420px;
  height: 498px;
  .total {
    display: inline-block;
    font-size: 14px;
    font-weight: bold;
    line-height: 22px;
    color: #00ebff;
    cursor: pointer;
  }
  .score-box {
    padding: 8px 18px;
    .score-con {
      margin-bottom: 5px;
      .title {
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 30px;
        color: #38ff67;
        p {
          display: flex;
          align-items: center;
          img {
            width: 14px;
            height: 14px;
            margin-right: 4px;
          }
        }
        .dic {
          font-size: 18px;
          font-family: 'titlePlus';
          line-height: 25px;
        }
      }
      .color {
        color: #e12234;
      }
      ul {
        background: rgba(12, 40, 61, 0.55);
        li {
          padding: 7px 5px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          .rank {
            width: 22px;
            height: 22px;
            position: relative;
            text-align: center;
            img {
              width: 22px;
              height: 22px;
            }
            .positive-row {
              position: absolute;
              top: 0;
              left: 0;
              width: 22px;
              height: 27px;
            }
            .rank-number {
              font-size: 16px;
              font-family: 'BebasNeue';
              line-height: 1;
              color: rgba(255, 255, 255, 0.6);
            }
          }
          .waterworks {
            width: 140px;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
            font-size: 14px;
            font-weight: bold;
            line-height: 22px;
            color: #ffffff;
          }
          .progress {
            width: 150px;
            ::v-deep.el-progress-bar__outer {
              border-radius: 0;
              height: 10px !important;
              background: #465b60;
              .el-progress-bar__inner {
                border-radius: 0;
                height: 10px !important;
              }
            }
          }
          .score {
            display: flex;
            align-items: flex-end;
            line-height: 1;
            .number {
              font-family: 'BebasNeue';
              font-size: 20px;
              color: #32e265;
              margin-right: 4px;
            }
            .number-color {
              color: #e12234;
            }
            .minutes {
              font-size: 14px;
              color: #ffffff;
              opacity: 0.6;
            }
          }
        }
      }
    }
  }
}
</style>
