<template>
  <div class="crousrl-container">
  <el-carousel :interval="3000" type="card" height="400px">
    <el-carousel-item v-for="(item, index) in bannerList" :key="index">
      <h3 class="medium">
        <img :src="item.imagesUrl">
      </h3>
    </el-carousel-item>
  </el-carousel>
  </div>
</template>
<script>
import { emMixin } from '@/utils/mixins'
import { dataInitFn, childrenInitFn } from '@/utils/tool'
import { currentBanner } from '@/api/schoolService/tableInfo'
export default {
  name: 'EmCarousel',
  mixins: [emMixin],
  data() {
    return {
      bannerList: [],
      set: {
        selectUrl: ''
      }
    }
  },
  created() {
    this.init()
    this.getBanner()
    this.setActiveItem()
  },
  methods: {
    init() {
      this.set = dataInitFn(this.set, this.meta)
      this.children = childrenInitFn(this.children, this.componentData)
    },
    setActiveItem(name) {
      console.log('bannername', name)
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
