<template>
  <div class="form-container">
    <el-form
      :ref="system_id"
      :class="set.class"
      :label-position="set.labelPosition"
      :label-width="set.labelWidth"
      :status-icon="set.statusIcon"
      :model="Form"
      :rules="rules"
    >
      <template v-for="(item,index) in children.formItem">
        <el-col :key="index" :offset="Number(item.meta.offset)" :span="Number(item.meta.span)">
          <el-form-item v-if="item.meta.itemType==='input'" :label="item.meta.title" :prop="item.meta.valueKey">
            <el-input
              :ref="item.meta.system_id"
              v-model="Form[item.meta.valueKey]"
              :disabled="item.meta.disabled"
              :placeholder="item.meta.placeholder ? item.meta.placeholder : '请输入'"
            />
          </el-form-item>
          <el-form-item v-else-if="item.meta.itemType==='selectInput'" :label="item.meta.title" :prop="item.meta.valueKey">
            <el-input
              :ref="item.meta.system_id"
              v-model="Form[item.meta.valueKey]"
              :disabled="item.meta.disabled"
              :placeholder="item.meta.placeholder ? item.meta.placeholder : '请输入'"
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
          </el-form-item>
          <el-form-item v-else-if="item.meta.itemType==='textarea'" :label="item.meta.title" :prop="item.meta.valueKey">
            <el-input
              :ref="item.meta.system_id"
              v-model="Form[item.meta.valueKey]"
              :disabled="item.meta.disabled"
              :placeholder="item.meta.placeholder ? item.meta.placeholder : '请输入'"
              type="textarea"
              :autosize="item.meta.autosize_OBJ ? item.meta.autosize_OBJ : { minRows: 2, maxRows: 4}"
            />
          </el-form-item>
          <el-form-item v-else-if="item.meta.itemType==='select'" :label="item.meta.title" :prop="item.meta.valueKey">
            <el-select
              :ref="item.meta.system_id"
              v-model="Form[item.meta.valueKey]"
              :disabled="item.meta.disabled"
              :placeholder="item.meta.placeholder ? item.meta.placeholder : '请输入'"
            >
              <template v-for="(option, _index) in item.meta.options_OBJ.data">
                <el-option :key="_index" :label="option.label" :value="option.value" />
              </template>
            </el-select>
          </el-form-item>
          <el-form-item v-else-if="item.meta.itemType==='switch'" :label="item.meta.title" :prop="item.meta.valueKey">
            <el-switch
              :ref="item.meta.system_id"
              v-model="Form[item.meta.valueKey]"
              :disabled="item.meta.disabled"
              :active-color="item.meta.activeColor ? item.meta.activeColor : '#111c95'"
              :inactive-color="item.meta.inactiveColor ? item.meta.inactiveColor : '#c6c6c6'"
            />
          </el-form-item>
          <el-button
            v-else-if="item.meta.itemType==='button'"
            :ref="item.meta.system_id"
            :icon="item.meta.icon"
            size="mini"
            :class="item.meta.class"
            :disabled="item.meta.disabled"
            :type="item.meta.buttonType ? item.meta.buttonType : 'primary'"
            @click="fn(item, Form)"
          >
            {{ item.meta.title }}
          </el-button>
        </el-col>
      </template>
    </el-form>
  </div>
</template>
<script>
import { emMixin } from '@/utils/mixins'
import vueBus from '@/utils/vueBus'
import { dataInitFn, childrenInitFn } from '@/utils/tool'
import { validate } from '@/utils/validate'

export default {
  name: 'EmForm',
  components: {
  },
  mixins: [emMixin],
  data() {
    return {
      set: {
        labelPosition: '',
        labelWidth: '',
        statusIcon: false,
        class: ''
      },
      Form: {
      }, // 表单组值对象
      rules: {
      }, // 验证数据
      children: {
        formItem: []
      }
    }
  },
  watch: {
    Form: {
      handler: function(val) {
        for (const _k in val) {
          if (typeof val[_k] === 'string') {
            val[_k] = val[_k].trim()
          }
        }
        return val
      },
      deep: true
    }
  },
  created() {
    this.init()
  },
  mounted() {
  },
  beforeDestroy() {
  },
  methods: {
    fn(_obj, _data) {
      const _controlType = _obj.meta.control_type ? _obj.meta.control_type : ''
      const _controlId = _obj.meta.control_id
      const _validate = _obj.meta.fn_set.validate || false
      let _valid = false
      this.$refs[this.system_id].validate((valid) => { // 表单验证
        if (valid) {
          _valid = true
          return true
        } else {
          console.log('error submit!!')
          return false
        }
      })
      if (_validate) {
        if (!(_valid)) {
          return
        }
      }
      const _Form = this.getForm()
      switch (_controlType) {
        case 'BaseTable_EmTableGroup_EmForm_ControlType--BaseTable_EmTableGroup_EmTable_queryFn':
          this.$refs[this.system_id].validate((valid) => {
            if (valid) {
              vueBus.$emit(_controlId, {
                meta: _obj.meta,
                Form: _Form
              })
            } else {
              console.log('error submit!!')
              return false
            }
          })
          break
        case 'BaseTable_EmTableGroup_EmForm_ControlType--BaseTable_EmDialog_openFn':
          this.$refs[this.system_id].validate((valid) => {
            if (valid) {
              const _Form = this.getForm()
              vueBus.$emit(_controlId, {
                meta: _obj.meta,
                data: _Form
              })
              this.controlGroupFn(_obj)
            } else {
              // console.log('error submit!!')
              return false
            }
          })
          break
        default:
          this.FN(_obj, _data)
      }
    },
    init() {
      this.set = dataInitFn(this.set, this.meta)
      // 获取行按钮数据
      this.children = childrenInitFn(this.children, this.componentData)
      // 处理验证和数据
      this.defaultFn(this.children.formItem)
    },
    defaultFn(_formItem) {
      if (!(this.children.formItem && this.children.formItem.length > 0)) {
        return
      }
      // 表单组数据
      const _rule_data = []
      _formItem.forEach((_item) => {
        if ('valueKey' in _item.meta) {
          _rule_data.push(_item)
        }
      })
      this.rulesFn(_rule_data)
    },
    rulesFn(rule_items) {
      const _Form = {}
      const _rules = {}
      const _rule_items = JSON.parse(JSON.stringify(rule_items))
      _rule_items.forEach(function(_obj) {
        _obj.meta.validate_OBJ.data.forEach((_item) => {
          if ('validator' in _item) {
            _item.validator = validate[_item.validator]
          }
        })
        if (_obj.meta.itemType === 'selectInput') {
          _obj.meta.options_OBJ.data.forEach((_val) => {
            _Form[_val.value] = _obj.meta.defaultValue
            _rules[_val.value] = _obj.meta.validate_OBJ.data
          })
        } else {
          _Form[_obj.meta.valueKey] = _obj.meta.defaultValue
          _rules[_obj.meta.valueKey] = _obj.meta.validate_OBJ.data
        }
      })

      this.Form = _Form
      this.rules = _rules
    },
    selectInputKey(_val, _obj) {
      const _this = this
      _obj.options_OBJ.data.forEach((_item) => {
        if (_item.value !== _val) {
          _this.Form[_item.value] = ''
        }
      })
    },
    setForm(_obj) { // 设置表单值
      const _data = _obj.Form
      console.log('setForm', _data)
      this.Form = dataInitFn(this.Form, _data)
    },
    getForm() {
      return this.Form
    },
    onSubmit() { // 表单提交
      const _this = this
      this.$refs[this.system_id].validate((valid) => {
        if (valid) {
          console.log('submit!', _this.Form)
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    onReset() { // 重置
      this.$refs[this.system_id].resetFields()
    }
  }
}
</script>
<style lang="scss" scoped>
@import "emForm";
</style>
