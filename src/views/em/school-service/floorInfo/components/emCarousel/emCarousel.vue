<template>
  <div class="crousrl-container">
    <el-carousel :interval="4000" type="card" height="400px">
      <el-carousel-item v-for="(item, index) in bannerList" :key="index">
        <h3 class="medium">
          <img :src="item.imagesUrl" @click="getElement(index)">
        </h3>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>
<script>
import { emMixin } from '@/utils/mixins'
import { dataInitFn, childrenInitFn } from '@/utils/tool'
import { currentBanner } from '@/api/schoolService/tableInfo'
import vueBus from '@/utils/vueBus'
export default {
  name: 'EmCarousel',
  mixins: [emMixin],
  data() {
    return {
      bannerList: [],
      set: {
        selectUrl: ''
      },
      currentContent: {}
    }
  },
  created() {
    this.init()
    this.getBanner()
    vueBus.$on('getBanner', () => {
      this.getBanner()
    })
  },
  methods: {
    init() {
      this.set = dataInitFn(this.set, this.meta)
      this.children = childrenInitFn(this.children, this.componentData)
    },
    getElement(index) {
      this.currentContent = this.bannerList[index] // 当前点击的carousel内容
      vueBus.$emit('getCarousel', this.currentContent)
    },
    getBanner() {
      currentBanner({
        url: this.set.selectUrl
      }).then(val => {
        if (val.statusCode === 200) {
          this.bannerList = val.data
        } else if (val.statusCode === 503) {
          this.bannerList = 'banner图片加载中'
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
  @import "emCarousel";
</style>
