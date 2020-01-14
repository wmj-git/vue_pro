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
            </el-form-item>
            <el-form-item v-if="item.meta.itemType==='transfer'" :label="item.meta.title" :prop="item.meta.valueKey">
              <el-transfer
                filterable
                :ref="item.meta.system_id"
                v-model="temp[item.meta.valueKey]"
                :titles="item.meta.titles"
                :right-default-checked="rightDefaultChecked"
                :data="item.meta.options_OBJ.data"
                @change="handleChange"
              />
            </el-form-item>
            <el-form-item v-else-if="item.meta.itemType==='selectBlur'" :label="item.meta.title" :prop="item.meta.valueKey">
              <el-select
                :ref="item.meta.system_id"
                v-model="temp[item.meta.valueKey]"
                :disabled="item.meta.disabled"
                clearable
                @change="changeGrade"
                :placeholder="item.meta.placeholder ? item.meta.placeholder : '请选择'"
              >
                <template v-for="(option, _index) in item.meta.options_OBJ.data">
                  <el-option :key="_index" :label="option.label" :value="option.value" />
                </template>
              </el-select>
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
                clearable
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
                clearable
                :placeholder="item.meta.placeholder ? item.meta.placeholder : '请选择'"
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
import { addList, editList, currentUser, classList, associateClass, checkedList, gradeCode } from '@/api/schoolService/tableInfo'
import { validate } from '@/utils/validate'
export default {
  name: 'EmDialog',
  mixins: [emMixin],
  data() {
    return {
      id: '',
      set: {
        associateUrl: '',
        searchUrl: '',
        appendUrl: '',
        updateUrl: '',
        selectUrl: '',
        classUrl: '', // 当前组织下的所有班级
        checkedUrl: '', // 已分配班级-指定老师
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
      organizationCode: '', // 当前用户的组织编码
      formLabelWidth: '120px',
      dialogFormVisible: false,
      itemFormVisible: false,
      dialogStatus: '',
      typeArrList: {}, // 设备类型传递给表格
      currentClass: '',
      rightCheckedArr: [],
      rightDefaultChecked: [], // 右边默认已选中数组
      teachersId: []
    }
  },
  async created() {
    await this.init()
    vueBus.$on('class', val => {
      this.currentClass = val
      this.temp['classId'] = val // 异步获取班级传过来的数据，不是初始化获取
    })
  },
  beforeDestroy() {
  },
  methods: {
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
    async init() { // 异步转换为同步进行
      this.set = dataInitFn(this.set, this.meta)
      this.children = childrenInitFn(this.children, this.componentData)
      // 查找 formTtem: 'studentIds'
      for (const i in this.children.formItem) {
        switch (this.children.formItem[i].meta.valueKey) {
          case 'classIds':
            var classArr = []
            classList({ // 未分配班级信息
              url: this.set.classUrl
            }).then(response => {
              response.data.forEach(val => {
                classArr.push({ 'label': val.name, 'key': val.id })
              })
            })
            this.children.formItem[i].meta.options_OBJ.data = classArr
            break
          case 'gradeName':
            var gradeArr = []
            var gradeKey = []
            gradeCode({
              url: this.set.searchUrl
            }).then(res => {
              res.data.forEach(val => {
                gradeArr.push({ 'label': val.enumCvalue, 'value': val.id })
                gradeKey.push({ 'label': val.id, 'value': val.id })
              })
            })
            this.children.formItem[i].meta.options_OBJ.data = gradeArr // 当前组织具有的年级
            break
          case 'gradeKey':
            break
        }
      }
      this.defaultFn(this.children.formItem)
    },
    // 添加数据显示
    add() {
      currentUser({
        url: this.set.selectUrl
      }).then(response => {
        this.temp['siOrgCode'] = String(response.data.orgCode) // 获取当前用户（学校）组织
      })
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
    },
    // 分配班级(dialog)
    associate(_data) {
      this.temp = Object.assign({}, this.temp, _data.data) // 赋值给修改表单
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.teachersId = this.temp.id
      const _obj = {
        teacherId: this.teachersId,
        type: 1
      }
      checkedList({
        url: this.set.checkedUrl,
        params: _obj
      }).then(response => {
        this.temp['classIds'] = []
        response.data.list.forEach(val => {
          this.temp['classIds'].push(val.id) // 获取指定老师已分配的班级
        })
      })
    },
    // 修改数据弹框
    edit(_data) {
      /* this.temp = dataInitFn(this.temp, _data.data)*/ // 这里不(设置值不能使用this.temp,否则不会将entryTimeStr传递给后台，将会报参数错误)
      this.temp = Object.assign({}, this.temp, _data.data) // 赋值给修改表单
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
    },
    changeDialogHidden() {
      this.dialogFormVisible = false
    },
    createData() {
      this.$refs[this.system_id].validate((valid) => {
        if (valid) {
          for (const i in this.temp) { // 寻找时间字段后再转换
            if (i === 'entryTime') {
              this.temp[i] = new Date(this.temp[i]).getTime()
            }
          }
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
          editList(obj).then((response) => {
            const _this = this
            for (const v in _this.tableDataEnd) {
              if (v.id === _this.temp.id) {
                const index = this.tableDataEnd.indexOf(v)
                this.tableDataEnd.splice(index, 1, _this.temp)
                break
              }
            }
            this.changeDialogHidden()
            if (response.statusCode === 200) {
              this.$notify({
                title: 'Success',
                message: '修改成功',
                type: 'success',
                duration: 2000
              })
            }
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
    getTemp() {
      return this.temp
    },
    // 提交表单
    submitFn({ meta, data }) {
      this.dialogStatus === 'create' ? this.createData() : this.updateData()
    },
    handleChange(value, direction, movedKeys) {
      this.rightCheckedArr = value // 穿梭框右边的值发生改变时获取穿梭框的值
      console.log('rightCheckedArr', this.rightCheckedArr)
    },
    // 为指定老师分配班级(提交)
    associateFn() {
      const _params = {
        teacherIds: [this.teachersId],
        classIds: this.rightCheckedArr
      }
      associateClass({
        url: this.set.associateUrl,
        params: _params
      }).then(response => {
        if (response.statusCode === 200) {
          this.changeDialogHidden()
          this.$notify({
            title: 'Success',
            message: '班级分配成功',
            type: 'success',
            duration: 2000
          })
        }
      })
    },
    // 先选择年级再获取年级对应的年级编码id
    changeGrade(val) {
      this.temp['gradeKey'] = val // 赋值给年级编码
    }
  }
}
</script>
<style lang="scss" scoped>
  @import "emDialog";
</style>
