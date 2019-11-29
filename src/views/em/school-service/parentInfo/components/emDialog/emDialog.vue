<template>
  <div class="emDialog-container">
    <el-dialog :title="set.textMap[dialogStatus]" :visible.sync="dialogFormVisible" v-if="dialogFormVisible">
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
            <el-form-item v-else-if="item.meta.itemType==='select'" v-show="item.meta.itemFormVisible" :label="item.meta.title" :prop="item.meta.valueKey">
              <el-select
                :ref="item.meta.system_id"
                v-model="temp[item.meta.valueKey]"
                :disabled="item.meta.disabled"
                :placeholder="item.meta.placeholder ? item.meta.placeholder : '请选择'"
              >
                <template v-for="(option, _index) in item.meta.options_OBJ.data">
                  <el-option :key="_index" :label="option.label" :value="option.value" />
                </template>
              </el-select>
            </el-form-item>
            <el-form-item v-else-if="item.meta.itemType==='dropzone'" :label="item.meta.title" :prop="item.meta.valueKey">
              {{ temp[item.meta.valueKey] ? temp[item.meta.valueKey] : "" }}
              <dropzone
                :id="item.meta.system_id"
                :url="BASE_API+item.meta.url"
                :item="item"
                @dropzone-removedFile="dropzoneR"
                @dropzone-success="dropzoneS" />
            </el-form-item>
          </el-col>
        </template>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogStatus==='create'?createData():updateData()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import vueBus from '@/utils/vueBus'
import { emMixin } from '@/utils/mixins'
import { dataInitFn, childrenInitFn } from '@/utils/tool'
import { addList, studentInfo, editList, ClassId } from '@/api/schoolService/parentInfo'
import Dropzone from '@/components/Dropzone'
import { validate } from '@/utils/validate'
export default {
  name: 'EmDialog',
  mixins: [emMixin],
  components: { Dropzone },
  data() {
    return {
      id: '',
      set: {
        appendUrl: '',
        updateUrl: '',
        selectUrl: '',
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
        formItem: []
      },
      temp: {},
      rules: {}, // 验证数据
      formLabelWidth: '120px',
      dialogFormVisible: false,
      itemFormVisible: false,
      dialogStatus: ''
    }
  },
  created() {
    this.init()
    vueBus.$on(this.set.vueBusName, val => {
      this.temp = val // 接收修改时的表单值
      this.edit()
    })
  },
  beforeDestroy() {
  },
  methods: {
    init() {
      this.set = dataInitFn(this.set, this.meta)
      this.children = childrenInitFn(this.children, this.componentData)
      // 查找 formTtem: 'studentIds'
      for (const i in this.children.formItem) {
        switch (this.children.formItem[i].meta.valueKey) {
          case 'studentIds':
            var optionsArr = []
            var obj = {
              url: this.set.selectUrl
            }
            studentInfo(obj).then(response => {
              response.data.list.forEach((_val) => {
                optionsArr.push({ 'label': _val.studentName, 'value': _val.id })
              })
            })
            this.children.formItem[i].meta.options_OBJ.data = optionsArr // 班级id下拉选项赋值
            break
          case 'classId':
            var optionsArrs = []
            var _obj = {
              url: this.set.selectUrl
            }
            ClassId(_obj).then(response => {
              response.data.list.forEach((_val) => {
                optionsArrs.push({ 'label': _val.name, 'value': _val.id })
              })
            })
            this.children.formItem[i].meta.options_OBJ.data = optionsArrs // 学生id下拉选项赋值
            break
        }
      }
      this.defaultFn(this.children.formItem)
    },
    fn(_obj) {
      const _fn = _obj.meta.fn
      const _controlType = _obj.meta.control_type ? _obj.meta.control_type : ''
      switch (_controlType) {
        case 'default':
          this[_fn](_obj.meta)
          break
      }
    },
    // 上传图片
    dropzoneS(file, el, item) {
      if (!(file.xhr.status === 200)) {
        return
      }
      const _response = JSON.parse(file.xhr.response)
      const _imgUrl = _response.data[0].networkPath
      this.temp[item.meta.valueKey] = _imgUrl // 后台获取到的url地址赋值给表单
      this.$message({ message: '图片上传成功', type: 'success' })
    },
    // 移除图片
    dropzoneR(file) {
      console.log(file)
      this.$message({ message: 'Delete success', type: 'success' })
    },
    // 添加数据显示
    add() {
      this.dialogStatus = 'create'
      this.children.formItem.forEach((val) => {
        switch (val.meta.valueKey) {
          case 'studentIds':
            val.meta.itemFormVisible = true // 添加时该字段应该显示
            break
          case 'classId':
            val.meta.itemFormVisible = true // 添加时该字段应该显示
            break
        }
      })
      this.dialogFormVisible = true
      if (this.$refs[this.system_id] !== undefined) {
        this.$nextTick(() => {
          this.$refs[this.system_id].resetFields()
        })
      }
    },
    // 修改数据弹框
    edit() {
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.children.formItem.forEach((val) => {
        switch (val.meta.valueKey) {
          case 'studentIds':
            val.meta.itemFormVisible = false // 修改时该字段应该隐藏
            break
          case 'classId':
            val.meta.itemFormVisible = false // 修改时该字段应该隐藏
            break
        }
      })
      try {
        this.$refs[this.system_id].resetFields()
      } catch (e) {
      }
    },
    changeDialogHidden() {
      this.dialogFormVisible = false
      this.onReset()
    },
    createData() {
      this.$refs[this.system_id].validate((valid) => {
        if (valid) {
          const obj = {
            url: this.set.appendUrl,
            params: this.temp
          }
          addList(obj).then((res) => {
            console.log('填入数据：', obj)
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
          const obj = {
            url: this.set.updateUrl,
            params: Object.assign({}, this.temp)
          }
          editList(obj).then(() => {
            console.log('修改数据', this.temp)
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
      this.dialogFormVisible = false
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
    onReset() { // 重置
      this.$refs[this.system_id].resetFields()
    }
  }
}
</script>
<style lang="scss" scoped>
  @import "emDialog";
</style>
