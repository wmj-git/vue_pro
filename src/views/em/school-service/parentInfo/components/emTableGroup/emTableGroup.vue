<template>
  <div class="emTableGroup-container">
    <el-card :class="set.class" :shadow="set.shadow">
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
    </el-card>
  </div>
</template>
<script>
import { emMixin } from '@/utils/mixins'
import { dataInitFn, childrenInitFn } from '@/utils/tool'
import EmButton from '@/views/em/school-service/parentInfo/components/emButtons/emButtons'
import EmTable from '@/views/em/school-service/parentInfo/components/emTable/emTable'
import EmDialog from '@/views/em/school-service/parentInfo/components/emDialog/emDialog'
export default {
  name: 'EmTableGroup',
  components: { EmDialog, EmTable, EmButton },
  mixins: [emMixin],
  data() {
    return {
      set: {
        class: '',
        shadow: 'hover'
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
  @import "emTableGroup";
</style>
