<template>
  <div class="tableInfo-container">
    <split-pane :min-percent="20" :default-percent="Number(set.defaultPercent)" :split="set.split">
      <template slot="paneL">
        <div style="overflow: auto;height: 100%;">
          <el-row>
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
          <el-row>
            <template v-for="(item,index) in children.paneR">
              <el-col :key="index" :offset="Number(item.meta.offset)" :span="Number(item.meta.span)">
                <component :is="item.meta.componentType" :key="index" :data="item" />
              </el-col>
            </template>
          </el-row>
        </div>
      </template>
    </split-pane>
  </div>
</template>
<script>
import { emMixin, emPage } from '@/utils/mixins'
import splitPane from 'vue-splitpane'
import { dataInitFn, childrenInitFn } from '@/utils/tool'

import EmTableGroup from '@/views/em/school-service/floorInfo/components/emTableGroup/emTableGroup'
import EmForm from '@/views/em/school-service/floorInfo/components/emButtons/emButtons'
import EmTable from '@/views/em/school-service/floorInfo/components/emTable/emTable'
import EmDialog from '@/views/em/school-service/floorInfo/components/emDialog/emDialog'
import EmImport from '@/views/em/school-service/floorInfo/components/emImport/emImport'
import EmTree from '@/views/em/school-service/floorInfo/components/emTree/emTree'
import EmTransfer from '@/views/em/school-service/floorInfo/components/emTransfer/emTransfer'
import EmCarousel from '@/views/em/school-service/floorInfo/components/emCarousel/emCarousel'
import EmCropper from '@/views/em/school-service/floorInfo/components/emCropper/emCropper'
export default {
  name: 'TableInfo',
  components: { EmCropper, EmCarousel, EmTransfer, EmTree, splitPane, EmTableGroup, EmForm, EmTable, EmDialog, EmImport },
  mixins: [emMixin, emPage],
  data() {
    return {
      set: {
        split: 'vertical', // 左右（vertical） ，上下（horizontal）
        defaultPercent: 50
      },
      children: {
        paneL: [],
        paneR: []
      }
    }
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
  @import "floorInfo";
</style>
