<template>
  <div class="baseTable-container">
    <split-pane split="vertical" :min-percent="0" :default-percent="Number(set.defaultPercent)">
      <template slot="paneL">
        <div style="overflow: auto;height: 100%;">
          <el-row v-if="set.paneL">
            <template v-for="(item,index) in children.paneL">
              <el-col :key="index" :offset="Number(item.meta.offset)" :span="Number(item.meta.span)">
                <component :is="item.meta.componentType" :key="index" :data="item" />
              </el-col>
            </template>
          </el-row>
        </div>
      </template>
      <template slot="paneR">
        <div style="overflow: auto;height: 100%;">
          <el-row v-if="set.paneR">
            <template v-for="(item,index) in children.paneR">
              <el-col :key="index" :offset="Number(item.meta.offset)" :span="Number(item.meta.span)">
                <component :is="item.meta.componentType" :key="index" :data="item" />
              </el-col>
            </template>
          </el-row>
        </div>
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
import { dataInitFn, childrenInitFn } from '@/utils/tool'
import splitPane from 'vue-splitpane'

import emTree from './components/emTree/emTree'
import emForm from './components/emForm/emForm'
import emButtonGroup from './components/emButtonGroup/emButtonGroup'
import emDialog from './components/emDialog/emDialog'
import emTableGroup from './components/emTableGroup/emTableGroup'

export default {
  name: 'BaseTable',
  components: {
    splitPane,
    emTree,
    emForm,
    emButtonGroup,
    emDialog,
    emTableGroup
  },
  mixins: [emMixin, emPage],
  data() {
    return {
      set: {
        defaultPercent: '50',
        paneL: true,
        paneR: true
      },
      children: {
        paneL: [],
        paneR: [],
        ContainerBox: []
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
@import "baseTable";
</style>
