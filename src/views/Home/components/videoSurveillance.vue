<template>
  <!-- 视频监控 -->
  <div class="video-surveillance">
    <Border title="视频监控">
      <template v-slot:right>
        <Search
          :list="listData"
          placeholder="请输入园区或水厂名称"
          @search="search"
        />
      </template>
      <div class="video-surveillance-inner">
        <ul v-if="isSearch" class="video-surveillance-ui">
          <li
            v-for="(item, index) in list"
            :key="item"
            :ref="'videoLi' + index"
            class="video-surveillance-item"
            @click="full"
          >
            <div class="title">
              <span class="circular" />
              <span class="waterwork-name">{{ item }}</span>
            </div>
            <img
              class="cover"
              src="@/assets/img/intake.png"
              alt=""
              title="点击查看视频"
            >
          </li>
        </ul>

        <Scrolling
          v-if="!isSearch"
          ref="scrolling"
          :length="list.length"
          :scroll-time="30000"
          :scroll-height="scrollHeight"
        >
          <ul>
            <li
              v-for="(item, index) in list"
              :key="item"
              :ref="'videoLi' + index"
              class="video-surveillance-item"
              @click="full"
            >
              <div class="title">
                <span class="circular" />
                <span class="waterwork-name">{{ item }}</span>
              </div>
              <img
                class="cover"
                :src="listDataUrl[index]"
                alt=""
                title="点击查看视频"
              >
            </li>
          </ul>
        </Scrolling>
      </div>
    </Border>

    <VideoFull :is-show.sync="isShow" />
  </div>
</template>

<script>
import Border from '@/components/Border'
import VideoFull from '@/components/VideoFull'
import Scrolling from '@/components/Scrolling'
import Search from '@/components/Search'
export default {
  name: 'HomeVideoSurveillance',
  components: { Border, VideoFull, Scrolling, Search },
  data() {
    return {
      isShow: false, // 视频放大弹窗显示字段
      scrollHeight: 0, // 滚动高度
      list: [], // 展示列表
      isSearch: false, // 搜索点击
      listDataUrl: [], // 34个水厂加两个园区图片
      listData: [
        '中节能国际中心',
        '中节能低碳园',
        '赣州水西工业污水处理厂',
        '赣州经济技术开发区工业污水处理厂',
        '赣县工业污水处理厂',
        '上犹工业污水处理厂',
        '瑞金工业污水处理厂',
        '于都工业污水处理厂',
        '兴国工业污水处理厂',
        '信丰工业污水处理厂',
        '龙南工业污水处理厂',
        '大余工业污水处理厂',
        '定南工业污水处理厂',
        '青原工业污水处理厂',
        '泰和工业污水处理厂',
        '井冈山工业污水处理厂',
        '抚北工业污水处理厂',
        '南丰工业污水处理厂',
        '南城工业园区污水处理厂',
        '上饶县工业污水处理厂',
        '鹰潭龙岗工业污水处理',
        '余干工业污水处理厂',
        '中童污水处理厂',
        '锦江污水处理厂',
        '潢溪污水处理厂',
        '虎山工业污水处理厂',
        '袁州机电基地污水处理厂',
        '上高工业园区污水处理厂',
        '高安建陶基地污水处理厂',
        '宜丰工业污水处理厂',
        '上高工业园区五里岭污水处理厂',
        '庐山工业污水处理厂',
        '安义工业园区污水处理厂',
        '德安工业污水处理厂',
        '武宁工业污水处理厂',
        '中节能（荆门）环科水务技术发展有限公司'
      ]
    }
  },
  created() {
    this.list = this.listData
    this.setData()
  },
  mounted() {
    this.setScroll()
  },
  methods: {
    setData() {
      for (let i = 0; i < this.listData.length; i++) {
        this.listDataUrl[i] = require(`@/assets/img/waterworks/waterworks${i +
          1}.png`)
      }
    },
    search(data) {
      if (data) {
        this.list = []
        this.isSearch = true
        this.listData.map(item => {
          if (item.includes(data)) {
            this.list.push(item)
          }
        })
      } else {
        this.list = this.listData
        this.isSearch = false
      }
    },
    full() {
      // 全屏
      this.isShow = true
    },
    setScroll() {
      this.scrollHeight = Number(this.$refs.videoLi0[0].offsetHeight) * 3
      this.$nextTick(() => {
        this.$refs.scrolling.setScroll()
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.video-surveillance {
  height: 849px;
  width: 420px;
  .video-surveillance-inner {
    padding: 10px;
    height: 800px;
    ul {
      width: 100%;
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
      .video-surveillance-item {
        width: 378px;
        height: 238px;
        position: relative;
        padding-bottom: 26px;
        box-sizing: content-box;
        cursor: pointer;
        .title {
          height: 28px;
          width: 100%;
          position: absolute;
          left: 0;
          top: 0;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          align-items: center;
          .circular {
            width: 10px;
            height: 10px;
            background: #38ff68;
            border-radius: 50%;
            margin: 0 10px;
          }
          .waterwork-name {
            display: inline-block;
            font-size: 14px;
            font-weight: bold;
            color: #ffffff;
            line-height: 1;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
          }
        }
        .cover {
          width: 100%;
          height: 100%;
          z-index: 999;
        }
      }
      .video-surveillance-item:last-child {
        margin: 0;
      }
    }
    .video-surveillance-ui {
      height: 100%;
      overflow-x: hidden;
      overflow-y: auto;
      scrollbar-width: none;
      -ms-overflow-style: none;
    }
    .video-surveillance-ui::-webkit-scrollbar {
      width: 8px;
      background-color: rgba(255, 255, 255, 0.1);
    }
    .video-surveillance-ui::-webkit-scrollbar-button {
      display: none;
    }
    .video-surveillance-ui::-webkit-scrollbar-thumb {
      background: rgba(255, 255, 255, 0.2);
      border-radius: 4px;
    }
  }
}
</style>
