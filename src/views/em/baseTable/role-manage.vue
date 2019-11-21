<template>
  <div class="baseTable-container">
    <split-pane split="vertical" :min-percent="20" :default-percent="Number(set.defaultPercent)">
      <template slot="paneL">
        <div style="overflow: auto;height: 100%;">
          <el-row v-if="set.paneL">
            <template v-for="(item,index) in children.treeItem">
              <el-col :key="index" :offset="Number(item.meta.offset)" :span="Number(item.meta.span)">
                123
              </el-col>
            </template>
          </el-row>
        </div>
      </template>
      <template slot="paneR">
        <el-row v-if="set.paneL">
          <template v-for="(item,index) in children.treeItem">
            <el-col :key="index" :offset="Number(item.meta.offset)" :span="Number(item.meta.span)">
              12
            </el-col>
          </template>
        </el-row>

      </template>
    </split-pane>
    <!--容器类显示-->
    <template v-for="(item,index) in children.ContainerBox">
      <component :is="item.meta.componentType" :key="index" :data="item" />
    </template>
  </div>
</template>
<script>
import { emMixin, emPage } from '@/utils/mixins'
// import vueBus from '@/utils/vueBus'
import { dataInitFn, childrenInitFn } from '@/utils/tool'
import splitPane from 'vue-splitpane'

export default {
  name: 'BaseTable',
  components: {
    splitPane
  },
  mixins: [emMixin, emPage],
  data() {
    return {
      set: {
        defaultPercent: '50',
        panL: true,
        panR: true
      },
      children: {
        panL: [],
        panR: []
      }
    }
  },
  created() {
    this.init()
  },
  mounted() {

  },
  beforeDestroy() {
  },
  methods: {
    init() {
      this.set = dataInitFn(this.set, this.meta)
      this.children = childrenInitFn(this.children, this.componentData)
      console.log('baseTable：', this.$data)
    }
  }
}
</script>
<style lang="scss" scoped>
@import "role-manage";
</style>
