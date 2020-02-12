<template>
  <div class="emDialog-container">
    <el-dialog
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
            <el-form-item v-if="item.meta.itemType==='inputPhone'" :label="item.meta.title" :prop="item.meta.valueKey">
              <el-input
                :ref="item.meta.system_id"
                v-model="temp[item.meta.valueKey]"
                clearable
                oninput="if(value.length>13)value=value.slice(0,13)"
                :disabled="item.meta.disabled"
                :placeholder="item.meta.placeholder ? item.meta.placeholder : '请输入'"
                @blur="onBlur"
                @input="handlerPhone"
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
                :ref="item.meta.system_id"
                v-model="temp[item.meta.valueKey]"
                filterable
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
                :placeholder="item.meta.placeholder ? item.meta.placeholder : '请选择'"
                @change="changeGrade"
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
                :picker-options="pickerOptions"
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
import { addList, editList, currentUser, buildList, floorList, associateFloor, associateBuild, deviceInfo } from '@/api/schoolService/floorInfo'
import { validate } from '@/utils/validate'
export default {
  name: 'EmDialog',
  mixins: [emMixin],
  data() {
    return {
      id: '',
      set: {
        associateUrl: '', // 关联设备（楼层）
        associateBuildUrl: '', // 关联设备（建筑）
        searchUrl: '',
        appendUrl: '',
        updateUrl: '',
        floorUrl: '', // 楼层id
        deviceUrl: '', // 设备
        selectUrl: '',
        classUrl: '', // 当前组织下的所有班级
        checkedUrl: '', // 已分配设备-指定楼层
        telUrl: '', // 已存在教师
        buildingUrl: '', // 关联建筑
        checkedBuildUrl: '', // 已分配设备-指定建筑
        status: true,
        labelWidth: '',
        statusIcon: '',
        labelPosition: '',
        textMap: {},
        vueBusName: ''
      },
      pickerOptions: {
        disabledDate: (time) => {
          return this.dealDisabledDate(time)
        }
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
      currentFloor: '',
      rightCheckedArr: 0,
      BuildArr: [], // 建筑信息(穿梭框左边的值，添加楼层的下拉选项)
      rightDefaultChecked: [], // 右边默认已选中数组
      deviceArr: [],
      deviceIdes: [] // 设备id关联建筑
    }
  },
  async created() {
    await this.init()
    vueBus.$on('floorInfo', val => {
      this.currentFloor = val
      console.log('接受参数', val)
    })
  },
  beforeDestroy() {
  },
  methods: {
    fn(_obj, _data) {
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
          /* case 'floorId':
            floorList({
              url: this.set.floorUrl
            }).then(res => {
              console.log('楼层', res)
              res.data.list.forEach(val => {
                this.BuildArr.push({ 'label': val.buildingName, 'key': val.id })
              })
            })
            this.children.formItem[i].meta.options_OBJ.data = this.BuildArr // 当前组织具有的楼层
            break*/
          case 'deviceIds':
            floorList({
              url: this.set.deviceUrl
            }).then(res => {
              res.data.list.forEach(val => {
                this.deviceArr.push({ 'label': val.name, 'key': val.id })
              })
            })
            this.children.formItem[i].meta.options_OBJ.data = this.deviceArr // 当前组织具有的所有设备
            break
          case 'buildingName':
            buildList({
              url: this.set.searchUrl
            }).then(res => {
              res.data.list.forEach(val => {
                this.BuildArr.push({ 'label': val.buildingName, 'value': val.id })
              })
            })
            this.children.formItem[i].meta.options_OBJ.data = this.BuildArr // 当前组织具有的建筑
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
    // 设备关联楼层
    associate() {
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      const _param = {
        floorIds: [this.currentFloor.id]
      }
      deviceInfo({
        url: this.set.checkedUrl,
        params: _param
      }).then(response => {
        console.log('已分配设备：', response)
        response.data.list.forEach(val => {
          // this.temp['deviceIds'].push(val.id) // 获取指定楼层已关联设备
        })
      })
    },
    // 设备关联建筑
    associateBuild() {
      /* this.dialogStatus = 'update'
      this.dialogFormVisible = true
      const _param = {
        buildingIds: [this.currentFloor.buildingId]
      }
      deviceInfo({
        url: this.set.checkedBuildUrl,
        params: _param
      }).then(response => {
        console.log('已分配设备：', response)
        response.data.list.forEach(val => {
          /!* this.temp['deviceIds'].push(val.id)*!/ // 获取指定楼层已关联设备
        })
      })*/
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
      this.$refs[this.system_id].resetFields()
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
    handleChange(value, direction) {
      this.rightCheckedArr = value // 穿梭框右边的值发生改变时获取穿梭框的值
      console.log('选择的值', this.rightCheckedArr)
    },
    // 为指定楼层分配设备(提交)
    associateFn() {
      const _params = {
        deviceIds: this.rightCheckedArr,
        buildingId: this.currentFloor.buildingId,
        floorId: this.currentFloor.id
      }
      associateFloor({
        url: this.set.associateUrl,
        params: _params
      }).then(response => {
        if (response.statusCode === 200) {
          this.changeDialogHidden()
          this.$notify({
            title: 'Success',
            message: '楼层设备分配成功',
            type: 'success',
            duration: 2000
          })
        }
      })
    },
    // 为指定建筑分配设备(提交)
    associateBuildFn() {
      /* const _params = {
        deviceIds: this.rightCheckedArr,
        buildingId: this.currentFloor.buildingId,
        floorId: this.currentFloor.id
      }
      associateBuild({
        url: this.set.associateBuildUrl,
        params: _params
      }).then(response => {
        if (response.statusCode === 200) {
          this.changeDialogHidden()
          this.$notify({
            title: 'Success',
            message: '建筑设备分配成功',
            type: 'success',
            duration: 2000
          })
        }
      })*/
    },
    // 先选择建筑再获取该建筑对应的建筑id
    changeGrade(val) {
      this.temp['buildingId'] = val // 赋值给建筑id
    }
  }
}
</script>
<style lang="scss" scoped>
  @import "emDialog";
</style>
