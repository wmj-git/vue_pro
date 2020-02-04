<template>
  <div class="emTableGroup-container">
    样本
  </div>
</template>
<script>
/* // 函数式编程工具库
import * as _ from 'lodash'
import * as R from 'ramda'
// 获取顶层对象
*/
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
    fn(_obj, _data) {
      const _controlType = _obj.meta.control_type ? _obj.meta.control_type : ''
      // const _controlId = _obj.meta.control_id
      switch (_controlType) {
        case 'none':
          // console.log(_controlId)
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
