<template>
  <div class="emTableGroup-container">
    <el-card :class="set.class" :shadow="set.shadow">
      <div class="emForm">
        <template v-for="(item, index) in children.operateItem">
          <el-col :key="index" class="el-col-48">
            <em-form :data="item" />
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
      <div class="emImport">
        <template v-for="(item, items) in children.importItem">
          <el-col :key="items" :offset="Number(item.meta.offset)" :span="Number(item.meta.span)">
            <em-import :data="item" />
          </el-col>
        </template>
      </div>
      <div class="emDrawer">
        <template v-for="(item, items) in children.drawerItem">
          <el-col :key="items" :offset="Number(item.meta.offset)" :span="Number(item.meta.span)">
            <em-drawer :data="item" />
          </el-col>
        </template>
      </div>
    </el-card>
  </div>
</template>
<script>
import { emMixin } from '@/utils/mixins'
import { dataInitFn, childrenInitFn } from '@/utils/tool'
import EmTable from '@/views/em/school-service/deviceManage/components/emTable/emTable'
import EmDialog from '@/views/em/school-service/deviceManage/components/emDialog/emDialog'
import EmForm from '@/views/em/school-service/deviceManage/components/emButtons/emButtons'
import EmDrawer from '@/views/em/school-service/deviceManage/components/emDrawer/emDrawer'
import EmImport from '@/views/em/school-service/deviceManage/components/emImport/emImport'
export default {
  name: 'EmTableGroup',
  components: { EmDrawer, EmForm, EmDialog, EmTable, EmImport },
  mixins: [emMixin],
  data() {
    return {
      set: {
        class: '',
        shadow: 'hover'
      },
      children: {
        operateItem: [], // 表头操作表单
        formItem: [],
        dataItem: [],
        importItem: [], // 导入
        drawerItem: [] // 抽屉
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
  @import "emTableGroup";
</style>
