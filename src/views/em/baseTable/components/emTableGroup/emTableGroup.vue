<template>
  <div class="emTableGroup-container">
    <el-card>
      <row>
        <el-col span="48">
          <em-form />
        </el-col>
        <el-col span="48">
          <em-table />
        </el-col>
      </row>
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
        value: ''
      },
      children: {
        componentItem: []
      }
    }
  },
  watch: {
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
