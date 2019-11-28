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
            <el-form-item v-else-if="item.meta.itemType==='json'" :label="item.meta.title" :prop="item.meta.valueKey">
              <div class="json-item">
                <json-editor
                  :ref="item.meta.system_id"
                  v-model="Form[item.meta.valueKey]"
                />
              </div>
            </el-form-item>
            <el-form-item v-else-if="item.meta.itemType==='dropzone'" :label="item.meta.title" :prop="item.meta.valueKey">
              {{ Form[item.meta.valueKey] ? Form[item.meta.valueKey] : "" }}
              <dropzone
                :id="item.meta.system_id"
                :url="BASE_API+item.meta.url"
                :item="item"
                @dropzone-removedFile="dropzoneR"
                @dropzone-success="dropzoneS"
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
            <el-form-item v-else-if="item.meta.itemType==='transfer'" :label="item.meta.title" :prop="item.meta.valueKey">
              <el-transfer
                :ref="item.meta.system_id"
                v-model="Form[item.meta.valueKey]"
                :titles="item.meta.titles"
                :data="item.meta.options_OBJ.data"
              />
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

import JsonEditor from '@/components/JsonEditor'
import Dropzone from '@/components/Dropzone'

export default {
  name: 'EmForm',
  components: {
    JsonEditor,
    Dropzone
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
        formItem: [] // 子组件的system_type值
      }
    }
  },
  watch: {
    Form: {
      handler: function(val) {
        let _path = val.path
        if ('regular' in val) {
          _path = _path.replace(/\//g, '_')
          if (_path.substr(0, 1) === '_') {
            _path = _path.substr(1, _path.length)
          }
          val.regular = _path
        }
        return val
      },
      deep: true
    }
  },
  created() {
    this.init()
    console.log(this.system_id, this.$data)
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
        case 'RoleManage_EmForm_ControlType--RoleManage_EmTree_update':
          this.$refs[this.system_id].validate((valid) => {
            if (valid) {
              vueBus.$emit(_controlId, {
                meta: _obj.meta,
                node: _Form
              })
            } else {
              console.log('error submit!!')
              return false
            }
          })
          break
        case 'RoleManage_EmForm_ControlType--RoleManage_EmTree_updateCheckedKeys':
          this.$refs[this.system_id].validate((valid) => {
            if (valid) {
              vueBus.$emit(_controlId, {
                meta: _obj.meta,
                id: _Form.id
              })
            } else {
              console.log('error submit!!')
              return false
            }
          })
          break
        case 'RoleManage_EmForm_ControlType--RoleManage_EmDialog_openFn':
          this.$refs[this.system_id].validate((valid) => {
            if (valid) {
              const _Form = this.getForm()
              vueBus.$emit(_controlId, {
                meta: _obj.meta,
                data: _Form
              })
              this.controlGroupFn(_obj, _Form)
            } else {
              console.log('error submit!!')
              return false
            }
          })
          break
        case 'RoleManage_EmForm_ControlType--RoleManage_EmDialog_closeFn':
          vueBus.$emit(_controlId, {
            meta: _obj.meta
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
    init() {
      this.set = dataInitFn(this.set, this.meta)
      // 获取行按钮数据
      this.children = childrenInitFn(this.children, this.componentData)

      this.children.formItem.forEach(async(_item) => {
        if ('options_url' in _item.meta && 'options_params' in _item.meta) {
          _item.meta.options_OBJ.data = await this.optionParamsFn({
            meta: _item.meta,
            params: _item.meta.options_params
          })
        } else if ('options_url' in _item.meta) {
          _item.meta.options_OBJ.data = await this.optionFn(_item.meta)
        }
      })
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
      const _data = _obj.data
      this.onReset()
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
    },
    dropzoneS(file, el, item) {
      console.log('file', file, file.xhr.status, JSON.parse(file.xhr.response), this.Form, item)
      if (!(file.xhr.status === 200)) {
        return
      }
      const _response = JSON.parse(file.xhr.response)
      const _imgUrl = _response.data[0].networkPath
      // this.Form[item.valueKey] = _imgUrl
      const val = this.Form
      if ('extData' in this.Form && 'imgUrl' in this.Form) {
        this.Form.imgUrl = _imgUrl
      }
      console.log(typeof val.extData)
      if ('extData' in val && 'imgUrl' in val && typeof val.extData === 'string') {
        val.extData = JSON.parse(val.extData)
        val.extData.imgUrl = _imgUrl
        this.Form.extData = val.extData
      }
      this.$message({ message: '图片上传成功', type: 'success' })
    },
    dropzoneR(file) {
      console.log(file)
      this.$message({ message: 'Delete success', type: 'success' })
    }
  }
}
</script>
<style lang="scss" scoped>
@import "emForm";
</style>
