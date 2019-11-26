<template>
  <div class="form-container">
    <template v-for="(item,index) in children.operateItem">
      <el-col :key="index" :offset="Number(item.meta.offset)" :span="Number(item.meta.span)">
        <el-input
          v-if="item.meta.itemType==='input'"
          :ref="item.meta.system_id"
          v-model="item.meta.valueKey"
          :label="item.meta.title"
          :prop="item.meta.valueKey"
          :disabled="item.meta.disabled"
          :placeholder="item.meta.placeholder ? item.meta.placeholder : '请输入'"
          clearable
        />
        <el-input
          v-else-if="item.meta.itemType==='selectInput'"
          :ref="item.meta.system_id"
          v-model="item.meta.valueKey"
          :label="item.meta.title"
          :prop="item.meta.valueKey"
          :disabled="item.meta.disabled"
          :placeholder="item.meta.placeholder ? item.meta.placeholder : '请输入'"
          clearable
        >
          <el-select
            slot="prepend"
            v-model="item.meta.valueKey"
            :style="{width: item.meta.selectWidth}"
            @change="selectInputKey(item.meta.valueKey,item.meta)"
          >
            <template v-for="(option, _index) in item.meta.options_OBJ.data">
              <el-option :key="_index" :label="option.label" :value="option.value" />
            </template>
          </el-select>
        </el-input>
        <el-input
          v-else-if="item.meta.itemType==='textarea'"
          :ref="item.meta.system_id"
          v-model="item.meta.valueKey"
          :prop="item.meta.valueKey"
          :label="item.meta.title"
          :disabled="item.meta.disabled"
          :placeholder="item.meta.placeholder ? item.meta.placeholder : '请输入'"
          type="textarea"
          :autosize="item.meta.autosize_OBJ ? item.meta.autosize_OBJ : { minRows: 2, maxRows: 4}"
          clearable
        />
        <el-select
          v-else-if="item.meta.itemType==='select'"
          :ref="item.meta.system_id"
          v-model="item.meta.valueKey"
          :label="item.meta.title"
          :prop="item.meta.valueKey"
          :disabled="item.meta.disabled"
          :placeholder="item.meta.placeholder ? item.meta.placeholder : '请输入'"
        >
          <template v-for="(option, _index) in item.meta.options_OBJ.data">
            <el-option :key="_index" :label="option.label" :value="option.value" />
          </template>
        </el-select>
        <el-switch
          v-else-if="item.meta.itemType==='switch'"
          :ref="item.meta.system_id"
          v-model="item.meta.valueKey"
          :disabled="item.meta.disabled"
          :active-color="item.meta.activeColor ? item.meta.activeColor : '#111c95'"
          :inactive-color="item.meta.inactiveColor ? item.meta.inactiveColor : '#c6c6c6'"
        />
        <el-button
          v-else-if="item.meta.itemType==='button'"
          :ref="item.meta.system_id"
          :icon="item.meta.icon"
          :class="item.meta.class"
          :disabled="item.meta.disabled"
          :type="item.meta.buttonType ? item.meta.buttonType : 'primary'"
          @click="fn(item.meta.fn,{'item':item,'control_type':item.meta.control_type})"
        >
          {{ item.meta.title }}
        </el-button>
      </el-col>
    </template>
  </div>
</template>
<script>
import { emMixin } from '@/utils/mixins'
import vueBus from '@/utils/vueBus'
import { dataInitFn, childrenInitFn } from '@/utils/tool'
export default {
  name: 'EmForm',
  mixins: [emMixin],
  data() {
    return {
      id: '',
      children: {
        operateItem: []
      },
      inpVal: '' // 模糊查询
    }
  },
  created() {
    this.init()
  },
  beforeDestroy() {
  },
  methods: {
    fn(_fn, _obj) {
      const _controlType = _obj.control_type ? _obj.control_type : ''
      const _controlId = _obj.item.meta.control_id
      switch (_controlType) {
        case 'dialog':
          vueBus.$emit(_controlId, {
            meta: _obj.item.meta
          })
          break
        case 'table':
          vueBus.$emit(_controlId, {
            meta: _obj.item.meta
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
    init: function() {
      this.set = dataInitFn(this.set, this.meta)
      this.children = childrenInitFn(this.children, this.componentData)
      for (const _v in this.children) {
        const _meta = this.children[_v][0].meta
        const type = this.children[_v][0].meta.itemType
        if (type === 'input') { // 获取第一个输入框的值
          _meta.valueKey = this.inpVal
        }
      }
    }
  }
}
</script>
<style lang="scss" scoped>
  @import "emButtons";
</style>
