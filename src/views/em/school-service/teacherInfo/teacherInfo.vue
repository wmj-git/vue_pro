<template>
  <div class="parentInfo-container">
    <split-pane :min-percent="20" :default-percent="30" split="vertical">
      <template slot="paneL">
        <div>
          树
        </div>
      </template>
      <template slot="paneR">
        <div class="emButton">
          <template v-for="(item, index) in children.buttonGroupItem">
            <el-col :key="index">
              <em-button :data="item" />
            </el-col>
          </template>
        </div>
        <div class="emTable">
          <template v-for="(item, data) in children.dataItem">
            <el-row :key="data">
              <em-table :data="item" />
            </el-row>
          </template>
        </div>
        <div class="emDialog">
          <template v-for="(item, items) in children.formItem">
            <el-col :key="items" :offset="Number(item.meta.offset)" :span="Number(item.meta.span)">
              <em-dialog :data="item" />
            </el-col>
          </template>
        </div>
      </template>
    </split-pane>
  </div>
</template>
<script>
import { emMixin, emPage } from '@/utils/mixins'
import splitPane from 'vue-splitpane'
import { dataInitFn, childrenInitFn } from '@/utils/tool'
import EmButton from '@/views/em/school-service/parentInfo/components/emButtons/emButtons'
import EmTable from '@/views/em/school-service/parentInfo/components/emTable/emTable'
import EmDialog from '@/views/em/school-service/parentInfo/components/emDialog/emDialog'
export default {
  name: 'ParentInfo',
  components: { splitPane, EmDialog, EmTable, EmButton },
  mixins: [emMixin, emPage],
  data() {
    return {
      set: {
        verticalPercent: '30'
      },
      children: {
        buttonGroupItem: [],
        formItem: [],
        dataItem: []
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
  @import "teacherInfo";
</style>
