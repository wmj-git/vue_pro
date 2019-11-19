<template>
  <el-container>
    <el-header>
      <template v-for="(item, index) in children.buttonGroupItem">
        <el-col :key="index">
          <em-button :data="item" />
        </el-col>
      </template>
    </el-header>
    <el-main>
      <template v-for="(item, index) in children.dataItem">
        <el-row :key="index">
          <em-table :data="item" />
        </el-row>
      </template>
      <template v-for="(item, index) in children.formItem">
        <el-col :key="index" :offset="Number(item.meta.offset)" :span="Number(item.meta.span)">
          <em-dialog :data="item" />
        </el-col>
      </template>
    </el-main>
  </el-container>
</template>
<script>
import { emMixin, emPage } from '@/utils/mixins'
import { dataInitFn, childrenInitFn } from '@/utils/tool'
import EmButton from '@/views/em/school-service/parentInfo/components/emButtons/emButtons'
import EmTable from '@/views/em/school-service/parentInfo/components/emTable/emTable'
import EmDialog from '@/views/em/school-service/parentInfo/components/emDialog/emDialog'
export default {
  name: 'ParentInfo',
  components: { EmDialog, EmTable, EmButton },
  mixins: [emMixin, emPage],
  data() {
    return {
      set: {},
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
      console.log('dw', this.children)
    }
  }
}
</script>
