<template>
  <div class="sewageDeal">
    <Border title="污水处理厂">
      <!-- 标题 -->
      <div class="top-title">
        <div class="top-title-left">
          月度处理效率排名<el-tooltip
            class="item"
            effect="light"
            placement="right"
            popper-class="waste-deal-tooltip"
          ><div slot="content">
             月度处理效率按照完成率*达标率<br>的结果来排列
           </div>
            <img
              :src="require('@/assets/images/ico/info-more.png')"
            ></el-tooltip>
        </div>
        <div class="top-title-middle">
          月度运营计划分析
        </div>
        <div class="top-title-right">
          药耗
        </div>
      </div>
      <!--内容 -->
      <div class="content">
        <!-- 月度处理效率排名 -->
        <div class="content-left">
          <table
            class="month-table"
            :class="{ decrease: orderColor == 'decrease' }"
          >
            <thead>
              <tr>
                <th @click="changeSort">
                  排名 <img :src="orderIcon" alt="" srcset="">
                </th>
                <th>水厂</th>
                <th>计划完成率</th>
                <th>出水达标率</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in factory" :key="item.id">
                <td>{{ index + 1 }}</td>
                <td :title="item.name">{{ item.name }}</td>
                <td>{{ item.manageRate }}</td>
                <td>{{ item.realRate }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <!-- 月度运营计划分析 -->
        <div class="content-middle">
          <div
            v-for="(item, index) in monthManage"
            :key="index"
            class="month-analysis"
          >
            <div class="title">{{ item.name }}</div>
            <div class="mount">
              {{ item.mount }}
            </div>
            <div class="percent" v-html="item.perMount" />
          </div>
        </div>
        <!-- 药耗 -->
        <div class="content-right">
          <!-- <div :id="id1" :style="{ width: '100%' }" /> -->
          <!-- <BarRateCharts
            id="medicalCost"
            :datas="medicalData"
            :height="height1"
          /> -->
          <ul class="medicalData">
            <li v-for="(item, index) in medicalData" :key="index">
              <div class="name-left">{{ item.title }}</div>
              <div class="progress">
                <el-progress
                  :show-text="false"
                  color="#0BEBFF"
                  :percentage="(item.value / item.fullValue) * 100"
                  stroke-linecap="butt"
                />
              </div>
              <div class="right-mount">
                <span class="mount">{{ item.value }}</span>
                <span class="allMount">&nbsp;/{{ item.fullValue }}</span>
                <span class="mount-per">&nbsp;吨</span>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </Border>
  </div>
</template>
<script>
import Border from '@/components/Border'
// import BarRateCharts from '@/components/Charts/barRateCharts'
export default {
  name: 'SewageDeal',
  components: { Border },
  data() {
    return {
      height1: 187,
      orderIcon: require('@/assets/images/ico/icon-sort-increase.png'),
      orderColor: 'increase',
      factory: [
        {
          name: '赣州经济技术开发区工业污水处理厂',
          manageRate: '95%',
          realRate: '99%',
          id: 1
        },
        {
          name: '赣州水西工业污水处理厂',
          manageRate: '95%',
          realRate: '99%',
          id: 2
        },
        {
          name: '赣县工业污水处理厂',
          manageRate: '95%',
          realRate: '99%',
          id: 3
        },
        {
          name: '上犹工业污水处理厂',
          manageRate: '95%',
          realRate: '99%',
          id: 4
        },
        {
          name: '瑞金工业污水处理厂',
          manageRate: '95%',
          realRate: '99%',
          id: 5
        }
      ],
      monthManage: [
        {
          name: '处理水量',
          mount: '1335',
          perMount: "/1780<span class='size-unique'>万吨</span>"
        },
        {
          name: '电耗',
          mount: '6261',
          perMount: "/8200<span class='size-unique'>KWH</span>"
        },
        {
          name: '水耗',
          mount: '6261',
          perMount: "/8200<span class='size-unique'>吨</span>"
        }
      ],
      // 药耗的表格数据格式暂定
      medicalData: [
        {
          value: 50,
          title: 'Y-001',
          fullValue: 100
        },
        {
          value: 60,
          title: 'Y-002',
          fullValue: 100
        },
        {
          value: 70,
          title: 'Y-003',
          fullValue: 100
        },
        {
          value: 20,
          title: 'Y-004',
          fullValue: 100
        },
        {
          value: 30,
          title: 'Y-005',
          fullValue: 100
        },
        {
          value: 10,
          title: 'Y-006',
          fullValue: 100
        }
      ]
    }
  },
  mounted() {},
  methods: {
    // 改变列表的显示数据顺序
    changeSort() {
      if (
        this.orderIcon === require('@/assets/images/ico/icon-sort-increase.png')
      ) {
        this.orderColor = 'decrease'
        // 默认正序，调整后修改为倒序
        this.factory = [
          {
            name: '武宁工业污水处理厂',
            manageRate: '92%',
            realRate: '95%',
            id: 1
          },
          {
            name: '德安工业污水处理厂',
            manageRate: '91%',
            realRate: '93%',
            id: 2
          },
          {
            name: '安义工业园区污水处理厂',
            manageRate: '90%',
            realRate: '96%',
            id: 3
          },
          {
            name: '庐山工业污水处理厂',
            manageRate: '95%',
            realRate: '92%',
            id: 4
          },
          {
            name: '上高工业园区五里岭污水处理厂',
            manageRate: '95%',
            realRate: '99%',
            id: 5
          }
        ]
        this.orderIcon = require('@/assets/images/ico/icon-sort-decrease.png')
      } else {
        // 调整后修改为正序
        this.orderColor = 'increase'
        this.factory = [
          {
            name: '赣州经济技术开发区工业污水处理厂',
            manageRate: '95%',
            realRate: '99%',
            id: 1
          },
          {
            name: '赣州水西工业污水处理厂',
            manageRate: '95%',
            realRate: '99%',
            id: 2
          },
          {
            name: '赣县工业污水处理厂',
            manageRate: '95%',
            realRate: '99%',
            id: 3
          },
          {
            name: '上犹工业污水处理厂',
            manageRate: '95%',
            realRate: '99%',
            id: 4
          },
          {
            name: '瑞金工业污水处理厂',
            manageRate: '95%',
            realRate: '99%',
            id: 5
          }
        ]
        this.orderIcon = require('@/assets/images/ico/icon-sort-increase.png')
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.sewageDeal {
  margin-top: 25px;
  .top-title {
    display: flex;
    border-bottom: 1px solid #02619b;

    > div {
      flex: 1;
      font-weight: 700;
      color: #fff;
      font-size: 16px;
      line-height: 34px;
      text-align: center;
      img {
        vertical-align: middle;
        margin-top: -2px;
        margin-left: 4px;
      }
    }
  }
  .content {
    display: flex;
    > div {
      flex: 1;
      height: 198px;
    }
    .content-left {
      overflow: hidden;
      border-right: 1px solid #02619b;
      .month-table {
        width: 100%;
        table-layout: fixed;
        thead {
          tr th {
            text-align: center;
            height: 26px;
            background-color: rgba(0, 132, 162, 0.2);
            font-weight: 700;
            color: rgba(255, 255, 255, 0.6);
            border: none;
            font-size: 12px;
            line-height: 22px;
            img {
              vertical-align: middle;
            }
            &:nth-child(1) {
              width: 15%;
            }
            &:nth-child(3) {
              width: 22%;
            }
            &:nth-child(4) {
              width: 22%;
            }
          }
        }
        tbody {
          tr {
            td {
              font-size: 14px;
              color: #fff;
              padding: 6px 8px;
              line-height: 20px;
              text-align: center;
              &:last-child {
                color: #38ff67;
              }
              &:nth-child(1) &:nth-child(3),
              &:nth-child(4) {
                font-family: BebasNeue;
              }
              &:nth-child(2) {
                text-overflow: ellipsis;
                overflow: hidden;
                white-space: nowrap;
              }
            }
          }
        }
        &.decrease {
          tbody {
            tr {
              td {
                &:last-child {
                  color: #ff0200;
                }
              }
            }
          }
        }
      }
    }
    .content-middle {
      display: flex;
      text-align: center;
      align-items: center;
      border-right: 1px solid #02619b;
      justify-content: space-around;
      .month-analysis {
        font-size: 14px;
        color: #fff;
        .mount {
          margin: 25px;
          font-family: BebasNeue;
          color: #0bebff;
          font-size: 28px;
        }
        .title {
          font-weight: 700;
        }
        .percent {
          color: rgba(255, 255, 255, 0.6);
          font-family: 'BebasNeue';
          font-size: 16px;
          ::v-deep .size-unique {
            font-size: 14px;
            vertical-align: middle;
            font-family: 'microsoft yahei';
          }
        }
      }
    }
    .content-right {
      #medicalCost {
        height: 198px;
      }
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      .medicalData {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        li {
          display: flex;
          padding: 3px 0;
          align-items: center;
          justify-content: space-between;
          color: #fff;
          .name-left {
            width: 35px;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
            font-size: 14px;
            font-family: 'BebasNeue';
          }
          .progress {
            width: 155px;
            margin-right: 16px;
            ::v-deep.el-progress-bar__outer {
              border-radius: 0;
              background: #465b60;
              height: 12px !important;
              .el-progress-bar__inner {
                border-radius: 0;
                height: 12px !important;
              }
            }
          }
          .right-mount {
            width: 60px;
            .mount {
              color: #0bebff;
              font-size: 20px;
              font-family: 'BebasNeue';
              margin-right: 4px;
            }
            .allMount {
              font-family: 'BebasNeue';
              font-size: 16px;
              color: rgba(255, 255, 255, 0.8);
            }
            .mount-per {
              color: rgba(255, 255, 255, 0.6);
              font-size: 14px;
            }
          }
        }
      }
    }
  }
}
@media screen and (max-width: 1921px) {
  .sewageDeal .content {
    display: flex;
    > div {
      flex: 1;
      height: 191px;
    }
    .content-right {
      #medicalCost {
        height: 191px;
      }
      .medicalData li {
        padding: 1px 0;
        .name-left {
          width: 50px;
        }
        .progress {
          width: 105px;
        }
        .right-mount {
          width: 80px;
        }
      }
    }
  }
}
</style>
<style lang="scss">
.waste-deal-tooltip.el-tooltip__popper.is-light {
  background: rgba(12, 20, 38, 0.8);
  border: 1px solid #77d7fa;
  color: #fff;
  padding: 12px;
  border-radius: 8px;
  .popper__arrow {
    border-right-color: rgb(119, 215, 250);
    &:after {
      border-right-color: rgb(12, 20, 38);
    }
  }
}
</style>
