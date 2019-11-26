<template>
  <div class="form-container">
    <el-card>
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
                :style="{width: item.meta.selectWidth}"
                :disabled="item.meta.disabled"
                :placeholder="item.meta.placeholder ? item.meta.placeholder : '请输入'"
                :multiple="item.meta.allowCreate ? item.meta.allowCreate : false"
                :filterable="item.meta.allowCreate ? item.meta.allowCreate : false"
                :allow-create="item.meta.allowCreate ? item.meta.allowCreate : false"
                default-first-option
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
            <el-form-item v-else-if="item.meta.itemType==='json'" :label="item.meta.title" :prop="item.meta.valueKey">
              <div class="json-item">
                <json-editor
                  :ref="item.meta.system_id"
                  v-model="Form[item.meta.valueKey]"
                />
              </div>
            </el-form-item>
            <el-button
              v-else-if="item.meta.itemType==='button'"
              :ref="item.meta.system_id"
              :icon="item.meta.icon"
              :class="item.meta.class"
              :disabled="item.meta.disabled"
              :type="item.meta.buttonType ? item.meta.buttonType : 'primary'"
              @click="fn(item, {})"
            >
              {{ item.meta.title }}
            </el-button>
          </el-col>
        </template>
      </el-form>
    </el-card>
  </div>
</template>
<script>
import { emMixin } from '@/utils/mixins'
import vueBus from '@/utils/vueBus'
import { dataInitFn, childrenInitFn, TimeFn } from '@/utils/tool'
import { optionData } from '@/api/baseTable/form'

import JsonEditor from '@/components/JsonEditor'

export default {
  name: 'EmForm',
  components: {
    JsonEditor
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
      Form: {}, // 表单组值对象
      rules: {}, // 验证数据
      children: {
        formItem: []
      }
    }
  },
  watch: {
    Form: {
      handler: function(val, oldVal) {
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
      const _fn = _obj.meta.fn
      const _controlType = _obj.meta.control_type ? _obj.meta.control_type : ''
      const _controlId = _obj.meta.control_id
      const _Form = this.getForm()
      switch (_controlType) {
        case 'BaseTable_EmForm_btnClick--BaseTable_EmTableGroup_EmTable_addFn':
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
        case 'BaseTable_EmForm_btnClick--BaseTable_EmTableGroup_EmTable_updateFn':
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
        case 'BaseTable_EmForm_btnClick--BaseTable_EmDialog_closeFn':
          vueBus.$emit(_controlId, {
            meta: _obj.meta,
            data: _Form
          })
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
    controlGroupFn(_obj) {
      const _this = this
      let tm1 = null
      if ('controlGroup' in _obj.meta) {
        _obj.meta.controlGroup.forEach((_item) => {
          switch (_item.control_type) {
            case 'TimeFn':
              tm1 = new TimeFn('t1', () => {
                vueBus.$emit(_item.control_id, {
                  meta: _item,
                  set: _item.fn_set,
                  data: _this.getForm()
                })
              }, () => {
                return false
              }, 200)
              tm1.run()
              break
            default:
              vueBus.$emit(_item.control_id, {
                meta: _item,
                set: _item.fn_set,
                data: _this.getForm()
              })
          }
        })
      }
    },
    init() {
      this.set = dataInitFn(this.set, this.meta)
      // 获取行按钮数据
      this.children = childrenInitFn(this.children, this.componentData)

      this.children.formItem.forEach(async(_item) => {
        if ('options_url' in _item.meta) {
          _item.meta.options_OBJ.data = await this.optionFn(_item.meta)
        }
      })

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
    async optionFn(_meta) {
      async function option() {
        let _options = []
        await optionData({
          url: _meta.options_url
          // params: _params
        }).then((res) => {
          if (res && res.statusCode === 200) {
            const _keys = _meta.options_OBJ.data[0]
            const _data = []
            res.data.forEach((_item) => {
              const _value = {}
              for (const _k in _keys) {
                _value[_k] = _item[_keys[_k]]
              }
              _data.push(_value)
            })
            _options = _options.concat(_data)
          } else {
            this.$message({
              message: '获取数据错误',
              type: 'error'
            })
          }
        })
        return _options
      }

      let _options = []
      if (_meta && ('options_url' in _meta) && _meta.options_url) {
        _options = await option()
      } else if (_meta && 'options_OBJ' in _meta) {
        _options = _options.concat(_meta.options_OBJ.data ? _meta.options_OBJ.data : [])
      }
      console.log('optionData', _options)
      return _options
    },
    setForm(_obj) { // 设置表单值
      this.onReset()
      const _data = _obj.Form
      for (const _k in _data) {
        switch (_k) {
          case 'parentSex':
            if (typeof _data[_k] === 'string') {
              _data[_k] = (_data[_k] === '男') ? 1 : 2
            }
            break
        }
      }
      console.log('setForm', _data)
      this.Form = _data
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
