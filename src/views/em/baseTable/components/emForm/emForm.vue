<template>
  <div class="form-container">
    <el-card :style="{'height': set.height,'max-height': set.maxHeight,'overflow-y': 'auto'}">
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
            <el-form-item v-if="item.meta.itemType==='input'" :label-width="item.meta.labelWidth || '0px'" :label="item.meta.title" :prop="item.meta.valueKey">
              <el-input
                :ref="item.meta.system_id"
                v-model="Form[item.meta.valueKey]"
                :disabled="item.meta.disabled"
                :placeholder="item.meta.placeholder ? item.meta.placeholder : '请输入'"
              />
            </el-form-item>
            <el-form-item v-else-if="item.meta.itemType==='selectInput'" :label-width="item.meta.labelWidth || '0px'" :label="item.meta.title" :prop="item.meta.valueKey">
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
            <el-form-item v-else-if="item.meta.itemType==='textarea'" :label-width="item.meta.labelWidth || '0px'" :label="item.meta.title" :prop="item.meta.valueKey">
              <el-input
                :ref="item.meta.system_id"
                v-model="Form[item.meta.valueKey]"
                :disabled="item.meta.disabled"
                :placeholder="item.meta.placeholder ? item.meta.placeholder : '请输入'"
                type="textarea"
                :autosize="item.meta.autosize_OBJ ? item.meta.autosize_OBJ : { minRows: 2, maxRows: 6}"
              />
            </el-form-item>
            <el-form-item v-else-if="item.meta.itemType==='select'" :label-width="item.meta.labelWidth || '0px'" :label="item.meta.title" :prop="item.meta.valueKey">
              <el-select
                :ref="item.meta.system_id"
                v-model="Form[item.meta.valueKey]"
                :style="{width: item.meta.selectWidth}"
                :disabled="item.meta.disabled"
                :placeholder="item.meta.placeholder ? item.meta.placeholder : '请选择'"
                :multiple="item.meta.allowCreate ? item.meta.allowCreate : false"
                :filterable="item.meta.allowCreate ? item.meta.allowCreate : false"
                :allow-create="item.meta.allowCreate ? item.meta.allowCreate : false"
                default-first-option
                @change="selectOnChangeFn(item, Form)"
              >
                <template v-for="option in item.meta.options_OBJ.data">
                  <el-option :key="option.value" :label="option.label" :value="option.value" />
                </template>
              </el-select>
            </el-form-item>
            <el-form-item v-else-if="item.meta.itemType==='switch'" :label-width="item.meta.labelWidth || '0px'" :label="item.meta.title" :prop="item.meta.valueKey">
              <el-switch
                :ref="item.meta.system_id"
                v-model="Form[item.meta.valueKey]"
                :disabled="item.meta.disabled"
                :active-color="item.meta.activeColor || '#353bbd'"
                :inactive-color="item.meta.inactiveColor || '#a6aebd'"
                :active-value="item.meta.activeValue"
                :inactive-value="item.meta.inactiveValue"
              />
            </el-form-item>
            <el-form-item v-else-if="item.meta.itemType==='dropzone'" :label-width="item.meta.labelWidth || '0px'" :label="item.meta.title" :prop="item.meta.valueKey">
              <el-row>
                <el-col :span="32">
                  <el-image
                    :src="Form[item.meta.valueKey]"
                    style="max-height: 184px;overflow: hidden"
                    fit="fit"
                  />
                </el-col>
                <el-col :span="16">
                  <dropzone
                    :id="item.meta.system_id"
                    :ref="item.meta.system_id"
                    :style="{'max-height': '184px','overflow':'hidden'}"
                    :url="BASE_API+item.meta.url"
                    :item="item"
                    @dropzone-removedFile="dropzoneR"
                    @dropzone-success="dropzoneS"
                  />
                </el-col>
              </el-row>
            </el-form-item>
            <el-form-item v-else-if="item.meta.itemType==='json'" :label-width="item.meta.labelWidth || '0px'" :label="item.meta.title" :prop="item.meta.valueKey">
              <div class="json-item">
                <json-editor
                  :ref="item.meta.system_id"
                  v-model="Form[item.meta.valueKey]"
                />
              </div>
            </el-form-item>
            <el-form-item v-else-if="item.meta.itemType==='tree'" :label-width="item.meta.labelWidth || '0px'" :label="item.meta.title" :prop="item.meta.valueKey">
              <em-tree :ref="item.meta.system_id" :data="item" />
            </el-form-item>
            <el-form-item v-else-if="item.meta.itemType==='timePicker'" :label-width="item.meta.labelWidth || '0px'" :label="item.meta.title" :prop="item.meta.valueKey">
              <el-time-picker
                :ref="item.meta.system_id"
                v-model="Form[item.meta.valueKey]"
                is-range
                :disabled="item.meta.disabled"
                range-separator="至"
                start-placeholder="开始时间"
                end-placeholder="结束时间"
                placeholder="选择时间范围">
              </el-time-picker>
            </el-form-item>
          </el-col>
        </template>
      </el-form>
    </el-card>
    <el-row>
      <template v-for="(item,index) in children.formItem">
        <el-col :key="index" :offset="Number(item.meta.offset)" :span="Number(item.meta.span)">
          <el-button
            v-if="item.meta.itemType==='button'"
            :ref="item.meta.system_id"
            :icon="item.meta.icon"
            :class="item.meta.class"
            :disabled="item.meta.disabled"
            :type="item.meta.buttonType ? item.meta.buttonType : 'primary'"
            @click="fn(item, Form)"
          >
            {{ item.meta.title }}
          </el-button>
        </el-col>
      </template>
    </el-row>
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
import emTree from '@/views/em/baseTable/components/emTree/emTree'
export default {
  name: 'EmForm',
  components: {
    JsonEditor,
    Dropzone,
    emTree
  },
  mixins: [emMixin],
  data() {
    return {
      set: {
        labelPosition: '',
        labelWidth: '',
        height: '280px',
        maxHeight: '580px', // 表单最大高
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
    fn(obj, data) {
      const _obj = JSON.parse(JSON.stringify(obj))
      const _data = JSON.parse(JSON.stringify(data))
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
      const _fn = _obj.meta.fn
      const _controlType = _obj.meta.control_type ? _obj.meta.control_type : ''
      const _controlId = _obj.meta.control_id
      const _Form = this.getForm()
      let _val = {}
      let _row = {}
      switch (_controlType) {
        case 'BaseTable_EmForm_btnClick--BaseTable_EmTableGroup_EmTable_addFn':
          vueBus.$emit(_controlId, {
            meta: _obj.meta,
            Form: _Form
          })
          break
        case 'BaseTable_EmForm_onSubmit-userUpdateRoles':
          this.$refs[this.system_id].validate((valid) => {
            if (valid) {
              _val = Object.assign({}, _obj.meta.fn_set.requestParams)
              _row = this.senderData.data.row
              Object.assign(_Form, _row)
              _val = dataInitFn(_val, _Form)
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
        default:
          this.FN(_obj, _data)
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
      _rule_items.forEach((_obj) => {
        // 表单验证
        _obj.meta.validate_OBJ.data.forEach((_item) => {
          if ('validator' in _item) {
            _item.validator = validate[_item.validator]
          }
        })
        // 表单绑定数据
        if (_obj.meta.itemType === 'selectInput') {
          _obj.meta.options_OBJ.data.forEach((_val) => {
            _Form[_val.value] = (_val.value in this.Form) ? this.Form[_val.value] : _obj.meta.defaultValue
            _rules[_val.value] = _obj.meta.validate_OBJ.data
          })
        } else {
          _Form[_obj.meta.valueKey] = (_obj.meta.valueKey in this.Form) ? this.Form[_obj.meta.valueKey] : _obj.meta.defaultValue
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
      const _set = _meta.fn_set
      const _params = _obj.data
      this.children.formItem.forEach(async(_item) => {
        if ('system_ids' in _set && _set.system_ids.indexOf(_item.meta.system_id) !== -1) {
          if (_set.requestType === 'optionParams') {
            _item.meta.options_OBJ.data = await this.optionParamsFn({
              meta: _meta,
              params: _params
            })
          } else if (_set.requestType === 'option') {
            let _options = []
            await optionData({
              url: _set.requestUrl,
              method: _set.requestMethod || null,
              params: _params
            }).then((res) => {
              if (res && res.statusCode === 200) {
                let _resData = []
                if ('list' in res.data) {
                  _resData = _resData.concat(res.data.list)
                } else {
                  _resData = _resData.concat(res.data)
                }
                const _keys = _set.successKeys
                const _data = []
                _resData.forEach((_item) => {
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
            _item.meta.options_OBJ.data = _options
          }
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
      return _options
    },
    setForm(_obj) { // 设置表单值
      const _this = this
      let _set = {}
      let _data = {}
      if ('meta' in _obj && 'fn_set' in _obj.meta) {
        _set = JSON.parse(JSON.stringify(_obj.meta.fn_set))
      }
      if ('data' in _obj) {
        _data = JSON.parse(JSON.stringify(_obj.data))
      } else {
        _data = JSON.parse(JSON.stringify(_obj.Form))
      }
      Object.assign(this.Form, _data)

      if (!('requestType' in _set)) {
        return
      }
      switch (_set.requestType) {
        case 'baseGet':
          break
        case 'userUpdateRoles':
          paramsGetApi({
            url: _set.requestUrl,
            params: _data[_set.requestParams]
          }).then((res) => {
            if (res && res.statusCode === 200) {
              const _val = []
              res.data.forEach((_item) => {
                _val.push(_item.id)
              })
              _this.Form.ids = _val
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

      postApi({
        url: _url,
        method: _set.requestMethod || null,
        params: _params
      }).then((res) => {
        if (res && res.statusCode === 200) {
          this.$message({
            message: res.message,
            type: 'success'
          })
          this.callbackFn(this.senderData, res)
        }
      })
    },
    onReset() { // 重置
      this.$refs[this.system_id].resetFields()
    },
    windowOpen(_obj) {
      // console.log('windowOpen', _obj)
      const _meta = _obj.meta
      // 请求的数据
      const _params = _obj.data
      const _set = _meta.fn_set
      const _url = _set.requestUrl
      let _str = ''
      for (const k in _params) {
        _str += k + '=' + _params[k] + '&'
      }
      _str += 'Authorization=' + this.$store.getters['token']
      window.open(`${process.env.VUE_APP_ACT_API + _url + '?' + _str}`, '_blank')
    },
    dropzoneS(file, el, item) {
      if (!(file.xhr.status === 200)) {
        return
      }
      const _response = JSON.parse(file.xhr.response)
      this.Form[item.meta.valueKey] = _response.data[0].networkPath
      this.$message({ message: '图片上传成功', type: 'success' })
    },
    dropzoneR(file) {
      this.$message({ message: 'Delete success', type: 'success' })
    },
    selectOnChangeFn(obj, data) {
      const _obj = JSON.parse(JSON.stringify(obj))
      const _data = JSON.parse(JSON.stringify(data))
      if ('onChange' in _obj.meta) {
        this.fn({
          meta: _obj.meta.onChange
        }, _data)
      }
    }
  }
}
</script>
<style lang="scss" scoped>
@import "emForm";
</style>
