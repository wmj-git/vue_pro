<template>
  <div class="emTableGroup-container">
    样本
  </div>
</template>
<script>
import { emMixin } from '@/utils/mixins'
import { dataInitFn, childrenInitFn } from '@/utils/tool'

export default {
  name: 'EmTableGroup',
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
