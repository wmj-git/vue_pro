<template>
  <div class="emDialog-container">
    <el-dialog v-if="dialogFormVisible" :title="set.textMap[dialogStatus]" :visible.sync="dialogFormVisible">
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
            <el-form-item v-if="item.meta.itemType==='inputs'" :label="item.meta.title" :prop="item.meta.valueKey">
              <el-input
                :ref="item.meta.system_id"
                v-model="temp[item.meta.valueKey][0]"
                clearable
                :disabled="item.meta.disabled"
                :placeholder="item.meta.placeholder ? item.meta.placeholder : '请输入'"
              />
            </el-form-item>
            <el-form-item v-if="item.meta.itemType==='input'" :label="item.meta.title" :prop="item.meta.valueKey">
              <el-input
                :ref="item.meta.system_id"
                v-model="temp[item.meta.valueKey]"
                clearable
                :disabled="item.meta.disabled"
                :placeholder="item.meta.placeholder ? item.meta.placeholder : '请输入'"
              />
            </el-form-item>
            <el-form-item v-if="item.meta.itemType==='inputBlur'" :label="item.meta.title" :prop="item.meta.valueKey">
              <el-input
                :ref="item.meta.system_id"
                v-model="temp[item.meta.valueKey]"
                clearable
                :disabled="item.meta.disabled"
                :placeholder="item.meta.placeholder ? item.meta.placeholder : '请输入'"
                @blur="onBlur"
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
                  clearable
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
                clearable
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
                clearable
                :placeholder="item.meta.placeholder ? item.meta.placeholder : '请选择'"
              >
                <template v-for="(option, _index) in item.meta.options_OBJ.data">
                  <el-option :key="_index" :label="option.label" :value="option.value" />
                </template>
              </el-select>
            </el-form-item>
            <el-form-item v-else-if="item.meta.itemType==='dropzone'" :label="item.meta.title" :prop="item.meta.valueKey">
              <el-row>
                <el-col :span="16">
                  <el-image
                    :src="temp[item.meta.valueKey]"
                    style="max-height: 120px;overflow: hidden"
                    fit="fit"
                  />
                </el-col>
                <el-col :span="28">
                  <dropzone
                    :id="item.meta.system_id"
                    :url="BASE_API+item.meta.url"
                    :item="item"
                    @dropzone-removedFile="dropzoneR"
                    @dropzone-success="dropzoneS"
                  />
                </el-col>
              </el-row>
            </el-form-item>
          </el-col>
        </template>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <template v-for="(btn, _index ) in children.formBtn">
          <el-button
            :key="_index"
            :ref="btn.meta.system_id"
            class="em-btn-operation"
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
import { addList, editList, currentUser, gradeCode, parentList } from '@/api/schoolService/parentInfo'
import Dropzone from '@/components/Dropzone'
import { validate } from '@/utils/validate'
export default {
  name: 'EmDialog',
  components: { Dropzone },
  mixins: [emMixin],
  data() {
    return {
      id: '',
      set: {
        appendUrl: '',
        updateUrl: '',
        selectUrl: '',
        telUrl: '', // 查询家长
        searchUrl: '',
        status: true,
        labelWidth: '',
        statusIcon: '',
        labelPosition: '',
        textMap: {},
        vueBusName: '',
        clickRow: { // 查询学生对应的家长
          control_id: ''
        },
        fn_set: { // 判断家长是否已经存在
          control_id: ''
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
      formLabelWidth: '120px',
      dialogFormVisible: false,
      itemFormVisible: false,
      dialogStatus: '',
      organizationCode: '', // 当前用户的组织编码
      currentClass: '', // 当前选中的班级id
      currentStu: []
    }
  },
  created() {
    this.init()
    vueBus.$on('class', val => {
      this.currentClass = val
      this.temp['classId'] = val // 异步获取班级传过来的数据，不是初始化获取
    })
  },
  beforeDestroy() {
  },
  methods: {
    async init() {
      this.set = dataInitFn(this.set, this.meta)
      this.children = childrenInitFn(this.children, this.componentData)
      // 查找 formTtem: 'studentIds'
      for (const i in this.children.formItem) {
        switch (this.children.formItem[i].meta.valueKey) {
          case 'siOrgCode':
            await currentUser({
              url: this.set.selectUrl
            }).then(response => {
              this.organizationCode = String(response.data.orgCode) // 异步获取当前用户（学校）组织
            })
            this.children.formItem[i].meta.defaultValue = this.organizationCode
            break
          case 'gradeKey':
            var gradeArr = []
            gradeCode({
              url: this.set.searchUrl
            }).then(res => {
              res.data.forEach(val => {
                gradeArr.push({ 'label': val.gradeName, 'value': val.gradeKey })
              })
            })
            this.children.formItem[i].meta.options_OBJ.data = gradeArr // 当前组织具有的年级
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
          return false
        }
      })
      const _controlType = _obj.meta.control_type ? _obj.meta.control_type : ''
      switch (_controlType) {
        default:
          this.FN(_obj, _data)
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
    },
    // 移除图片
    dropzoneR(file) {
    },
    // 失去焦点时判断该家长是否存在
    async onBlur() {
      console.log('失去焦点了', String(this.temp['parentTel']))
      const _this = this
      const _params = {
        tel: this.temp['parentTel'] // 获取当前输入框的值传递给后台查询是否有该家长已存在
      }
      console.log('_params', _params)
      await parentList({
        url: _this.set.telUrl,
        params: _params
      }).then(res => {
        if (res.statusCode === 200) {
          if (res.data === null) {
            this.$message({
              showClose: true,
              message: '该家长信息为空，请继续填写！',
              type: 'info'
            })
          } else if (res.data !== '') {
            this.temp['parentName'] = res.data.parentName
            this.temp['parentSex'] = res.data.parentSex
            this.temp['kinshipName'] = res.data.kinshipName
            this.temp['parentAge'] = res.data.parentAge
          }
        }
      })
    },
    // 添加学生
    append() {
      vueBus.$on('stuId', val => {
        this.currentStu = val
        this.temp['studentIds'] = [val]
      })
      if (this.currentStu === null) {
        this.$message({
          showClose: true,
          message: '请先选择学生！',
          type: 'warning'
        })
      } else if (!this.currentClass) {
        this.$message({
          showClose: true,
          message: '请先选择左侧树状中对应的班级！',
          type: 'warning'
        })
      } else {
        this.dialogStatus = 'create'
        this.dialogFormVisible = true
      }
    },
    // 添加数据显示
    add() {
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      if (this.$refs[this.system_id] !== undefined) {
        this.$nextTick(() => {
          this.$refs[this.system_id].resetFields()
        })
      }
    },
    // 修改数据弹框
    edit(_data) {
      this.temp = dataInitFn(_data.data, _data.data)
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
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
            params: Object.assign({}, this.temp)
          }
          addList(obj).then((res) => {
            if (res.statusCode === 200) {
              this.$notify({
                message: '一条数据添加成功',
                type: 'success'
              })
              this.changeDialogHidden()
              /* vueBus.$emit(this.set.fn_set.control_id, { // 刷新表格数据
                fn: 'getList',
                data: {}
              })*/
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
            params: this.temp
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
    onReset() { // 重置
      this.$refs[this.system_id].resetFields()
    },
    // 提交表单
    submitFn({ meta, data }) {
      this.dialogStatus === 'create' ? this.createData() : this.updateData()
    }
  }
}
</script>
<style lang="scss" scoped>
  @import "emDialog";
</style>
