<template>
  <!-- 异常报警组件 -->
  <div class="border-box">
    <Border title="异常报警">
      <template v-slot:right>
        <div class="total">
          <p>
            报警总数<i class="number">{{ list.length }}</i><i>条</i>
          </p>
        </div>
      </template>

      <div ref="error" class="error">
        <Scrolling :length="list.length">
          <ul ref="ul">
            <li v-for="item in list" :key="item.id">
              <p>{{ item.title }}</p>
              <p class="abnormal opacity">
                <span>{{ item.reason }}</span>
                <span>{{ item.position }}</span>
              </p>
              <p class="abnormal">
                <span>
                  <span class="fault"> {{ item.fault }} </span>
                  <span
                    class="fault handle"
                    :class="{ process: item.handleBool }"
                  >{{ item.handle }}</span>
                </span>
                <span class="time">{{ item.time }}</span>
              </p>
            </li>
          </ul>
        </Scrolling>
      </div>
    </Border>
  </div>
</template>

<script>
import Scrolling from '@/components/Scrolling'
import Border from '@/components/Border'
export default {
  name: 'AbnormalAlarm',
  components: { Border, Scrolling },
  data() {
    return {
      list: [
        {
          id: 1,
          title: '赣州经济技术开发区工业污水处理厂',
          reason: '抽水泵故障',
          position: '昌东大道',
          fault: '设备故障',
          handle: '未处理',
          handleBool: 0,
          time: '2021-07-15 21:11:07'
        },
        {
          id: 2,
          title: '赣州经济技术开发区工业污水处理厂',
          reason: '抽水泵故障',
          position: '昌东大道',
          fault: '设备故障',
          handle: '未处理',
          handleBool: 0,
          time: '2021-07-15 21:11:07'
        },
        {
          id: 3,
          title: '南丰工业污水处理厂',
          reason: '抽水泵故障',
          position: '昌东大道',
          fault: '设备故障',
          handle: '处理中',
          handleBool: 1,
          time: '2021-07-15 21:11:07'
        },
        {
          id: 4,
          title: '昌东大道污水处理厂',
          reason: '抽水泵故障',
          position: '昌东大道',
          fault: '设备故障',
          handle: '处理中',
          handleBool: 1,
          time: '2021-07-15 21:11:07'
        },
        {
          id: 5,
          title: '赣州经济技术开发区工业污水处理厂',
          reason: '抽水泵故障',
          position: '昌东大道',
          fault: '设备故障',
          handle: '处理中',
          handleBool: 1,
          time: '2021-07-15 21:11:07'
        }
      ]
    }
  }
}
</script>
<style lang="scss" scoped>
.border-box {
  height: 558px;
  width: 448px;
  margin-bottom: 25px;
  .total {
    display: inline-block;
    font-size: 14px;
    font-weight: bold;
    color: #ffffff;
    p {
      font-size: 14px;
      font-weight: bold;
      color: #ffffff;
      i {
        font-style: normal;
        opacity: 0.7;
      }
      .number {
        margin: 0 4px 0 12px;
        font-size: 24px;
        font-family: 'BebasNeue';
        color: #38ff67;
        opacity: 1;
      }
    }
  }
  .error {
    height: 504px;
    box-sizing: border-box;
    padding: 16px 13px 0;
    ul {
      box-sizing: border-box;
      padding-bottom: 16px;
      li {
        height: 108px;
        background-color: #153b57;
        border-radius: 4px;
        font-weight: 700;
        color: #ffffff;
        font-size: 16px;
        box-sizing: border-box;
        padding: 0 12px;
        text-align: left;
        display: flex;
        justify-content: space-around;
        flex-direction: column;
        margin-bottom: 16px;
        .abnormal {
          display: flex;
          justify-content: space-between;
          align-items: center;
          span {
            display: inline-block;
            line-height: 20px;
            font-size: 14px;
          }
          .fault {
            padding: 2px 4px;
            line-height: 1;
            background-size: 100% 100%;
            background-image: url('./../../../assets/img/failure.png');
            background-repeat: no-repeat;
            background-size: 100% 100%;
          }
          .handle {
            padding: 2px 8px;
            margin-left: 12px;
            background-image: url('./../../../assets/img/unprocessed.png');
          }
          .process {
            background-image: url('./../../../assets/img/in-process.png');
          }
          .time {
            font-size: 12px;
          }
        }
        .opacity {
          opacity: 0.8;
        }
      }
      li:last-child {
        margin-bottom: 0;
      }
    }
  }
  .error::-webkit-scrollbar {
    display: none;
  }
}
</style>
