<template>
  <el-carousel :interval="4000" type="card" height="200px">
    <el-carousel-item v-for="item in 6" :key="item">
      <h3 class="medium">{{ item }}</h3>
    </el-carousel-item>
  </el-carousel>
</template>
<script>
import { emMixin } from '@/utils/mixins'
import { dataInitFn, childrenInitFn } from '@/utils/tool'
export default {
  name: 'EmCarousel',
  mixins: [emMixin],
  data() {
    return {}
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      this.set = dataInitFn(this.set, this.meta)
      this.children = childrenInitFn(this.children, this.componentData)
    }
  }
}
</script>
<style lang="scss" scoped>
  @import "emCarousel";
</style>
