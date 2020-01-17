<template>
  <div class="emDialog-container">
    <el-dialog
      width="40%"
      :title="set.textMap[dialogStatus]"
      :modal-append-to-body="false"
      :visible.sync="dialogFormVisible"
    >
      <el-form
        :ref="system_id"
        :class="set.class"
        :label-position="set.labelPosition"
        :label-width="set.labelWidth"
        :status-icon="set.statusIcon"
        :model="temp"
        :rules="rules"
      >
        <template v-for="(item,index) in children.formItem">
          <el-col :key="index" :offset="Number(item.meta.offset)" :span="Number(item.meta.span)">
            <el-form-item v-if="item.meta.itemType==='input'" :label="item.meta.title" :prop="item.meta.valueKey">
              <el-input
                :ref="item.meta.system_id"
                v-model="temp[item.meta.valueKey]"
                clearable
                :disabled="item.meta.disabled"
                :placeholder="item.meta.placeholder ? item.meta.placeholder : '请输入'"
              />
            </el-form-item>
            <el-form-item v-else-if="item.meta.itemType==='selectInput'" :label="item.meta.title" :prop="item.meta.valueKey">
              <el-input
                :ref="item.meta.system_id"
                v-model="temp[item.meta.valueKey]"
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
                v-model="temp[item.meta.valueKey]"
                clearable
                :disabled="item.meta.disabled"
                :placeholder="item.meta.placeholder ? item.meta.placeholder : '请输入'"
                type="textarea"
                :autosize="item.meta.autosize_OBJ ? item.meta.autosize_OBJ : { minRows: 2, maxRows: 4}"
              />
            </el-form-item>
            <el-form-item v-else-if="item.meta.itemType==='selects'" v-show="item.meta.itemFormVisible" :label="item.meta.title" :prop="item.meta.valueKey">
              <el-select
                :ref="item.meta.system_id"
                v-model="temp[item.meta.valueKey]"
                :disabled="item.meta.disabled"
                :placeholder="item.meta.placeholder ? item.meta.placeholder : '请选择'"
                multiple
              >
                <template v-for="(option, _index) in item.meta.options_OBJ.data">
                  <el-option :key="_index" :label="option.label" :value="option.value" />
                </template>
              </el-select>
            </el-form-item>
            <el-form-item v-else-if="item.meta.itemType==='datetime'" :label="item.meta.title" :prop="item.meta.valueKey">
              <el-date-picker
                :ref="item.meta.system_id"
                v-model="temp[item.meta.valueKey]"
                :disabled="item.meta.disabled"
                :placeholder="item.meta.placeholder ? item.meta.placeholder : '请选择时间'"
                format
              />
            </el-form-item>
            <el-form-item v-else-if="item.meta.itemType==='select'" v-show="item.meta.itemFormVisible" :label="item.meta.title" :prop="item.meta.valueKey">
              <el-select
                :ref="item.meta.system_id"
                v-model="temp[item.meta.valueKey]"
                :disabled="item.meta.disabled"
                :placeholder="item.meta.placeholder ? item.meta.placeholder : '请选择'"
                clearable
              >
                <template v-for="(option, _index) in item.meta.options_OBJ.data">
                  <el-option :key="_index" :label="option.label" :value="option.value" />
                </template>
              </el-select>
            </el-form-item>
          </el-col>
        </template>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <template v-for="(btn, _index ) in children.formBtn">
          <el-button
            :key="_index"
            :ref="btn.meta.system_id"
            class="em-btn-operation table_inLine_btn"
            size="mini"
            :type="btn.meta.buttonType ? btn.meta.buttonType : 'primary'"
            @click="fn(btn,temp)"
          >
            {{ btn.meta.title }}
          </el-button>
        </template>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import vueBus from '@/utils/vueBus'
import { emMixin } from '@/utils/mixins'
import { dataInitFn, childrenInitFn } from '@/utils/tool'
import { addList, editList, deviceType, currentUser } from '@/api/schoolService/tableInfo'
import { validate } from '@/utils/validate'
export default {
  name: 'EmDialog',
  mixins: [emMixin],
  data() {
    return {
      id: '',
      set: {
        appendUrl: '',
        updateUrl: '',
        selectUrl: '',
        searchUrl: '',
        status: true,
        labelWidth: '',
        statusIcon: '',
        labelPosition: '',
        textMap: {},
        vueBusName: ''
      },
      multiple: {
        type: Boolean
      },
      children: {
        formItem: [],
        formBtn: []
      },
      temp: {},
      rules: {}, // 验证数据
      formLabelWidth: '120px',
      dialogFormVisible: false,
      itemFormVisible: false,
      dialogStatus: '',
      organizationCode: '', // 当前用户的组织编码
      typeArrList: {} // 设备类型传递给表格
    }
  },
  async created() {
    await this.init()
    vueBus.$on(this.set.vueBusName, val => {
      this.temp = val // 接收修改时的表单值
      this.edit()
    })
    vueBus.$emit('device_type', this.typeArrList)
  },
  beforeDestroy() {
  },
  methods: {
    async  init() { // 异步转换为同步进行
      this.set = dataInitFn(this.set, this.meta)
      this.children = childrenInitFn(this.children, this.componentData)
      // 查找 formTtem: 'studentIds'
      for (const i in this.children.formItem) {
        switch (this.children.formItem[i].meta.valueKey) {
          case 'siOrgCode':
            await currentUser({
              url: '/school/organization/selectThis'
            }).then(response => {
              this.organizationCode = String(response.data.orgCode) // 异步获取当前用户（学校）组织
            })
            this.children.formItem[i].meta.defaultValue = this.organizationCode
            break
          case 'type': // 设备管理-设备类型
            var typeArr = []
            var _obj = {
              enumType: 'device_type'
            }
            await deviceType({
              url: this.set.searchUrl,
              params: _obj
            }).then(response => {
              const _map = new Map()
              response.data.forEach((_val) => {
                typeArr.push({ 'label': _val.enumCvalue, 'value': _val.id })
                _map.set(_val.id, _val.enumCvalue)
              })
              Object.assign(this.typeArrList, { // 表格type字段需要转换为对应的中文显示（需要注明字段名：type）
                type: _map
              })
            })
            this.children.formItem[i].meta.options_OBJ.data = typeArr // 设备类型下拉选项赋值
            break
        }
      }
      this.defaultFn(this.children.formItem)
    },
    fn(_obj, _data) {
      console.log('methods', _obj, _data)
      this.$refs[this.system_id].validate((valid) => { // 表单验证
        if (valid) {
          return true
        } else {
          console.log('error submit!!')
          return false
        }
      })
      const _controlType = _obj.meta.control_type ? _obj.meta.control_type : ''
      switch (_controlType) {
        default:
          this.FN(_obj, _data)
      }
    },
    // 添加数据显示
    add() {
      console.log('add')
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
    },
    // 修改数据弹框
    edit(_data) {
      this.temp = dataInitFn(_data.data, _data.data) // 赋值给修改表单
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
    },
    changeDialogHidden() {
      this.dialogFormVisible = false
      try {
        this.$refs[this.system_id].resetFields()
      } catch (e) {
        e
      }
    },
    createData() {
      this.$refs[this.system_id].validate((valid) => {
        if (valid) {
          const obj = {
            url: this.set.appendUrl,
            params: this.temp
          }
          addList(obj).then((res) => {
            if (res.statusCode === 200) {
              this.$notify({
                message: '一条数据添加成功',
                type: 'success'
              })
              this.changeDialogHidden()
              vueBus.$emit('query')
            } else {
              this.$notify.error('添加失败')
            }
          })
        }
      })
    },
    updateData() {
      this.$refs[this.system_id].validate((valid) => {
        if (valid) {
          for (const i in this.temp) { // 寻找时间字段后再转换
            if (i === 'entryTime') {
              this.temp[i] = new Date(this.temp[i]).getTime()
            }
          }
          const obj = {
            url: this.set.updateUrl,
            params: Object.assign({}, this.temp)
          }
          editList(obj).then(() => {
            const _this = this
            for (const v in _this.tableDataEnd) {
              if (v.id === _this.temp.id) {
                const index = this.tableDataEnd.indexOf(v)
                this.tableDataEnd.splice(index, 1, _this.temp)
                break
              }
            }
            this.changeDialogHidden()
            vueBus.$emit('query')
            this.$notify({
              title: 'Success',
              message: '修改成功',
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    },
    currentSel() {
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
    // 表单验证
    rulesFn(rule_items) {
      const _temp = {}
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
            _temp[_val.value] = _obj.meta.defaultValue
            _rules[_val.value] = _obj.meta.validate_OBJ.data
          })
        } else {
          _temp[_obj.meta.valueKey] = _obj.meta.defaultValue
          _rules[_obj.meta.valueKey] = _obj.meta.validate_OBJ.data
        }
      })

      this.temp = _temp
      this.rules = _rules
    },
    // 提交表单
    submitFn({ meta, data }) {
      this.dialogStatus === 'create' ? this.createData() : this.updateData()
    },
  }
}
</script>
<style lang="scss" scoped>
  @import "emDialog";
</style>
