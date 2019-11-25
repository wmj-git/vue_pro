<template>
  <div class="emTransfer-container">
    <el-transfer
      :titles="set.titles"
      v-model="set.value"
      :data="showData"
    />
  </div>
</template>
<script>
import { emMixin } from '@/utils/mixins'
import { dataInitFn, childrenInitFn } from '@/utils/tool'
// import { dataInitFn, childrenInitFn } from '@/utils/tool'
export default {
  name: 'EmTransfer',
  mixins: [emMixin],
  data() {
    return {
      set: {
        titles: ['表1', '表2'],
        value: [],
        dataUrl: '',
        dataKey: '',
        dataLabel: '',
        dataDisabled: ''
      },
      children: {
        componentItem: []
      },
      showData: []
    }
  },
  watch: {
  },
  created() {
    this.init()
    this.createData()
  },
  methods: {
    fn(_obj, _data) {

    },
    init() {
      this.set = dataInitFn(this.set, this.meta)
      this.children = childrenInitFn(this.children, this.componentData)
    },
    createData: function() {



      const _data = []
      for (let i = 1; i <= 15; i++) {
        _data.push({
          key: i,
          label: `备选项 ${i}`,
          disabled: i % 4 === 0
        })
      }
      this.showData = this.showData.concat(_data)
    }
  }
}
</script>
<style lang="scss" scoped>
  @import "emTransfer";
</style>
