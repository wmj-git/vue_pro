<template>
  <div class="deviceManage-container">
    <el-row style="height: 100%">
      <el-tabs v-model="tableTabsValue" :tab-position="tabPosition" @tab-click="handleClick">
        <el-tab-pane
          v-for="item in meta.tableTabs"
          :ref="system_id"
          :key="item.name"
          :label="item.text"
          :name="item.name"
        >
          <div style="overflow: auto;height: 100%;">
            <el-row>
              <template v-for="(item,index) in children.paneC">
                <el-col :key="index" :offset="Number(item.meta.offset)" :span="Number(item.meta.span)">
                <component :is="item.meta.componentType" v-if="item.meta.tableType===tableType" :key="index" :data="item"/>
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
      tableType: 'device_manage',// 默认显示第一个
      tableTabs: [], // 选项卡list
      tabPosition: 'left',
      tableTabsValue: 'device_manage',
      children: {
        paneC: []
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
    },
    handleClick(tab) {
      if (tab.name === 'device_type_manage') {
        this.tableType = 'device_type_manage'
      } else if (tab.name === 'device_manage') {
        this.tableType = 'device_manage'
      }
    }
  }
}
</script>
<style lang="scss" scoped>
  @import "deviceManage";
</style>
