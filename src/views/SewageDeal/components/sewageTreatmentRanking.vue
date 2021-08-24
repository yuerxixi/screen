<template>
  <!-- 月度污水处理完成效率排名组件 -->
  <div class="sewage-treatment-ranking">
    <Border title="月度污水处理完成效率排名">
      <template v-slot:right>
        <div class="total" @click="detail">详情</div>
      </template>
      <div ref="ranking-box" class="ranking-box">
        <div class="title width">
          <span class="rank">排名</span>
          <span class="waterworks">水厂</span>
          <span>计划完成率</span>
          <span class="standard-rate standard-rate-color">出水达标率</span>
        </div>
        <div class="rank-con">
          <Scrolling :length="list.length">
            <ul ref="ul">
              <li v-for="item in list" :key="item.rank" class="width">
                <span class="rank">{{ item.rank }}</span>
                <span class="waterworks">{{ item.waterworks }}</span>
                <span>{{ item.completionRate }}</span>
                <span class="standard-rate">{{ item.standardRate }}</span>
              </li>
            </ul>
          </Scrolling>
        </div>
      </div>
    </Border>

    <Dialog title="月度污水处理完成效率排名详情" :vsible.sync="vsible">
      <Rankingdetail :list="titleList" />
    </Dialog>
  </div>
</template>

<script>
import Border from '@/components/Border'
import Scrolling from '@/components/Scrolling'
import Dialog from '@/components/Dialog'
import Rankingdetail from './rankingdetail.vue'
export default {
  name: 'SewageTreatmentRanking',
  components: { Border, Scrolling, Dialog, Rankingdetail },
  data() {
    return {
      vsible: false,
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
          name: '计划完成率',
          isSort: true,
          className: 'score',
          key: 'completionRate'
        },
        {
          name: '出水达标率',
          key: 'standardRate'
        }
      ],
      list: [
        {
          rank: 1,
          waterworks: '赣县工业污水处理厂',
          completionRate: '96%',
          standardRate: '91.8%'
        },
        {
          rank: 2,
          waterworks: '上犹工业污水处理厂',
          completionRate: '96%',
          standardRate: '91.8%'
        },
        {
          rank: 3,
          waterworks: '赣县工业污水处理厂',
          completionRate: '96%',
          standardRate: '91.8%'
        },
        {
          rank: 4,
          waterworks: '上犹工业污水处理厂',
          completionRate: '96%',
          standardRate: '91.8%'
        },
        {
          rank: 5,
          waterworks: '赣县工业污水处理厂',
          completionRate: '96%',
          standardRate: '91.8%'
        },
        {
          rank: 6,
          waterworks: '赣县工业污水处理厂',
          completionRate: '96%',
          standardRate: '91.8%'
        }
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
.sewage-treatment-ranking {
  margin-top: 30px;
  height: 318px;
  width: 420px;
  .total {
    display: inline-block;
    font-size: 14px;
    font-weight: bold;
    line-height: 22px;
    color: #00ebff;
    cursor: pointer;
  }

  .ranking-box {
    height: 100%;
    box-sizing: border-box;
    padding: 20px 14px 10px;
    display: flex;
    flex-direction: column;
    .title {
      height: 34px;
      background: rgba(0, 132, 162, 0.2);
      opacity: 0.8;
    }
    .rank-con {
      height: 210px;
      overflow: hidden;
      ul {
        width: 100%;
        padding-top: 5px;
        li {
          width: 100%;
          padding: 10px 0;
          display: flex;
          align-items: center;
          span {
            font-family: 'BebasNeue';
            line-height: 20px;
          }
          .waterworks {
            font-family: Microsoft YaHei;
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
        width: 80px;
      }
      .rank {
        width: 40px;
        opacity: 0.6;
      }
      .waterworks {
        width: 140px;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
      }
      .standard-rate {
        color: rgba(56, 255, 103, 1);
      }
      .standard-rate-color{
        color: #fff;
      }
    }
  }
  .ranking-box::-webkit-scrollbar {
    display: none;
  }
}
</style>
