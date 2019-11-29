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
import { dataInitFn, childrenInitFn } from '@/utils/tool'
import { optionData, paramsGetApi, postApi } from '@/api/baseTable/form'

import { validate } from '@/utils/validate'
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
      let _val = null; let _value
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
              console.log('验证错误')
              return false
            }
          })
          break
        case 'RoleManage_EmForm_btnClick--RoleManage_EmForm_setForm':
          this.$refs[this.system_id].validate((valid) => {
            if (valid) {
              vueBus.$emit(_controlId, {
                meta: _obj.meta,
                data: _Form
              })
            } else {
              console.log('验证错误')
              return false
            }
          })
          break
        case 'RoleManage_EmForm_btnClick-onSubmit':
          this.$refs[this.system_id].validate((valid) => {
            if (valid) {
              if (_obj.meta.fn_set.dataType === 'objectData') {
                _val = Object.assign({}, _obj.meta.fn_set.requestParams)
                _value = JSON.parse(JSON.stringify(this.senderData.data))
                Object.assign(_value, _Form)
                _val = dataInitFn(_val, _value)
              }
              this[_fn]({
                meta: _obj.meta,
                data: _val
              })
            } else {
              console.log('验证错误')
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
        if ('options_url' in _item.meta) {
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
    updateOptionParamsFn(_obj) {
      const _meta = _obj.meta
      const _set = _obj.set
      const _params = _obj.data
      this.children.formItem.forEach(async(_item) => {
        if ('system_ids' in _set && _set.system_ids.indexOf(_item.meta.system_id) !== -1) {
          _item.meta.options_OBJ.data = await this.optionParamsFn({
            meta: _meta,
            params: _params
          })
        }
      })
      this.defaultFn(this.children.formItem)
    },
    async optionParamsFn(_obj) {
      const _meta = _obj.meta
      const _set = _meta.fn_set
      const _params = _obj.params

      let _options = []
      await paramsGetApi({
        url: _set.requestUrl,
        params: _params
      }).then((res) => {
        if (res && res.statusCode === 200) {
          const _keys = _set.successKeys
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
      console.log('optionData', _options)
      return _options
    },
    async optionFn(_meta) {
      async function option() {
        let _options = []
        await optionData({
          url: _meta.options_url
          // params: _params
        }).then((res) => {
          if (res && res.statusCode === 200) {
            const _keys = _meta.successKeys
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
      const _this = this
      console.log('setForm', _obj)
      this.onReset()
      let _set = {}
      let _data = {}
      if ('set' in _obj) {
        _set = JSON.parse(JSON.stringify(_obj.set))
        _data = JSON.parse(JSON.stringify(_obj.data))
      } else {
        _data = JSON.parse(JSON.stringify(_obj.data))
        this.Form = _data
        return
      }

      if (!('requestType' in _set)) {
        return
      }

      const _url = _set.requestUrl; let _params
      const _value = JSON.parse(JSON.stringify(this.senderData.data))
      if (_set.dataType === 'objectData') {
        _params = Object.assign({}, _set.requestParams)
        _params = dataInitFn(_params, _value)
      } else if (_set.dataType === 'stringData') {
        _params = _value[_set.requestParams]
      }

      switch (_set.requestType) {
        case 'baseGet':
          break
        case 'paramsGetApi':
          paramsGetApi({
            url: _url,
            params: _params
          }).then((res) => {
            if (res && res.statusCode === 200) {
              const _val = []
              console.log('paramsGet', res, _this.Form)
              res.data.forEach((_item) => {
                _val.push(_item[_set.successKeys.valueKey])
              })
              _set.successKeys.objKeys.forEach((_key) => {
                _this.Form[_key] = _val
              })
            } else {
              this.$message({
                message: '获取数据错误',
                type: 'error'
              })
            }
          })
          break
        default:
          this.Form = _data
      }
    },
    getForm() {
      return this.Form
    },
    onSubmit(_obj) { // 表单提交
      // 属性值
      const _meta = _obj.meta
      // 请求的数据
      const _params = _obj.data
      const _set = _meta.fn_set
      const _url = _set.requestUrl

      this.$refs[this.system_id].validate((valid) => {
        if (valid) {
          postApi({
            url: _url,
            method: _set.requestMethod ? _set.requestMethod : null,
            params: _params
          }).then((res) => {
            console.log('submit!', res)
            if (res && res.statusCode === 200) {
              this.$message({
                message: '添加成功',
                type: 'success'
              })
              this.callbackFn(this.senderData, res.data)
            }
          })
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
