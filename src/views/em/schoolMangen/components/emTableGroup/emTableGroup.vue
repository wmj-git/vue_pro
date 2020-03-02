<template>
  <div class="emTableGroup-container">
    <el-card :shadow="set.shadow">
      <el-row>
        <template v-for="(item,index) in children.tableGroupItem">
          <el-col :key="index" :offset="Number(item.meta.offset)" :span="Number(item.meta.span)">
            <component :is="item.meta.componentType" :ref="item.meta.system_id" :key="index" :data="item" />
          </el-col>
        </template>
      </el-row>
    </el-card>
  </div>
</template>
<script>
import { emMixin } from '@/utils/mixins'
import { dataInitFn, childrenInitFn } from '@/utils/tool'

import emTable from './components/emTable/emTable'
import emForm from './components/emForm/emForm'

export default {
  name: 'EmTableGroup',
  components: {
    emTable,
    emForm
  },
  mixins: [emMixin],
  data() {
    return {
      set: {
        shadow: 'hover'
      },
      children: {
        tableGroupItem: []
      }
    }
  },
  watch: {
  },
  created() {
    this.init()
  },
  methods: {
    fn(_obj, _data) {
      const _controlType = _obj.meta.control_type ? _obj.meta.control_type : ''
      const _controlId = _obj.meta.control_id
      switch (_controlType) {
        case 'none':
          console.log(_controlId)
          break
        default:
          this.FN(_obj, _data)
      }
    },
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
