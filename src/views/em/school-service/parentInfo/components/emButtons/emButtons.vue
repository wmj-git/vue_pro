<template>
  <div class="emButton-container">
    <el-button
      v-for="(btn, key) in children.buttonGroup"
      :ref="btn.meta.system_id"
      :key="key"
      class="el-button"
      :type="btn.meta.type"
      :size="btn.meta.size"
      :title="btn.meta.title"
      :icon="btn.meta.icon"
      @click="fn(btn.meta.fn,{'btn':btn,'control_type':btn.meta.control_type})"
    >
      {{ btn.meta.title }}
    </el-button>
  </div>
</template>
<script>
import { emMixin } from '@/utils/mixins'
import vueBus from '@/utils/vueBus'
import { dataInitFn, childrenInitFn } from '@/utils/tool'
export default {
  name: 'EmButton',
  mixins: [emMixin],
  data() {
    return {
      id: '',
      children: {
        buttonGroup: []
      }
    }
  },
  created() {
    this.init()
  },
  beforeDestroy() {
  },
  methods: {
    fn(_fn, _obj) {
      console.log('_fn', _fn, '_obj', _obj)
      const _controlType = _obj.control_type ? _obj.control_type : ''
      const _controlId = _obj.btn.meta.control_id
      switch (_controlType) {
        case 'dialog':
          vueBus.$emit(_controlId, {
            meta: _obj.btn.meta
          })
          break
        case 'table':
          vueBus.$emit(_controlId, {
            meta: _obj.meta
          })
          break
        case 'component':

          break
        case 'default':
          this[_fn](_obj.meta)
          break
        default:
          this.$message({
            message: '(control_type)参数无效',
            type: 'error'
          })
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
  @import "emButtons";
</style>
