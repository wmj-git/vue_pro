<template>
  <div class="deviceManage-container">
    <el-row style="height: 100%">
      <el-tabs v-model="tableTabsValue" :tab-position="tabPosition" @tab-click="handleClick">
        <el-tab-pane
          :ref="system_id"
          v-for="(item, index) in meta.tableTabs"
          :key="index"
          :label="item.text"
          :name="item.name"
        >
            <div style="overflow: auto;height: 100%;">
              <el-row>
                <template v-for="(item,index) in children.paneC">
                  <el-col :key="index" :offset="Number(item.meta.offset)" :span="Number(item.meta.span)">
                    <component :is="item.meta.componentType" :key="index" :data="item" v-if="isChildUpdate"/>
                  </el-col>
                </template>
              </el-row>
            </div>
        </el-tab-pane>
      </el-tabs>
    </el-row>
  </div>
</template>
<script>
import { emMixin, emPage } from '@/utils/mixins'
import { dataInitFn, childrenInitFn } from '@/utils/tool'
import EmTableGroup from '@/views/em/school-service/deviceManage/components/emTableGroup/emTableGroup'
import EmForm from '@/views/em/school-service/deviceManage/components/emButtons/emButtons'
import EmTable from '@/views/em/school-service/deviceManage/components/emTable/emTable'
import EmDialog from '@/views/em/school-service/deviceManage/components/emDialog/emDialog'
export default {
  name: 'DeviceManage',
  components: { EmTableGroup, EmForm, EmTable, EmDialog },
  mixins: [emMixin, emPage],
  data() {
    return {
      tableTabs: [], // 选项卡list
      tabPosition: 'left',
      tableTabsValue: '',
      children: {
        paneC: []
      },
      isChildUpdate: true
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      this.set = dataInitFn(this.set, this.meta)
      this.children = childrenInitFn(this.children, this.componentData)
    },
    handleClick(tab) {
      console.log('name', tab.name)
    }
  }
}
</script>
<style lang="scss" scoped>
  @import "deviceManage";
</style>
