<template>
  <div class="emDialog-container">
    <el-dialog v-if="dialogFormVisible" :title="set.textMap[dialogStatus]" :visible.sync="dialogFormVisible" width="40%">
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
            <el-form-item v-if="item.meta.itemType==='inputPhone'" :label="item.meta.title" :prop="item.meta.valueKey">
              <el-input
                :ref="item.meta.system_id"
                v-model="temp[item.meta.valueKey]"
                clearable
                oninput="if(value.length>13)value=value.slice(0,13)"
                :disabled="item.meta.disabled"
                :placeholder="item.meta.placeholder ? item.meta.placeholder : '请输入'"
                @input="handlerPhone"
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
            <el-form-item v-else-if="item.meta.itemType==='selectBlur'" v-show="item.meta.itemFormVisible" :label="item.meta.title" :prop="item.meta.valueKey">
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
        allGradeUrl: '',
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
      name: '',
      gradeKey: '',
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
      currentClass: [], // 当前点击班级数组---修改班级
      currentClassId: null, // 当前班级id----添加学生
      gradeArr: [],
      checkedId: null // 选中行的学生id
    }
  },
  async created() {
    await this.init()
  },
  beforeDestroy() {
  },
  methods: {
    async init() {
      this.set = dataInitFn(this.set, this.meta)
      this.children = childrenInitFn(this.children, this.componentData)
      this.defaultFn(this.children.formItem)
    },
    // 电话输入时就开始判断加上短横线
    handlerPhone(val) {
      if (val.length <= 13) {
        if (val.length > 3 && val.length < 7) {
          val = val.replace(/\D/g, '').replace(/(\d{3})(?=\d)/g, '$1 ')
        } else if (val.length >= 7) {
          val = val.replace(/\s/g, '-').replace(/[^\d]/g, ' ').replace(/(\d{4})(?=\d)/g, '$1 ')
        }
        this.$set(this.temp, 'parentTel', val) // 家长电话
        this.$set(this.temp, 'studentTel', val)// 学生电话
      }
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
    // 先选择年级再获取年级对应的年级编码id
    changeGrade(val) {
      this.temp['gradeKey'] = val // 赋值给年级编码
    },
    // 获取学生选中行的id----添加家长
    getCheckedStu(val) {
      this.checkedId = val.studentId
    },
    // 添加家长
    appendParent() {
      this.temp['studentIds'] = [this.checkedId]
      if (this.checkedId === null) {
        this.$message({
          showClose: true,
          message: '请先选择学生！',
          type: 'warning'
        })
      } else {
        this.dialogStatus = 'create'
        this.dialogFormVisible = true
      }
    },
    // 从左侧树状获取班级id
    getClassId(val) {
      this.currentClassId = val.classId.id
    },
    // 添加学生
    append() {
      this.temp['classId'] = this.currentClassId
      if (!this.temp['classId']) {
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
    // 添加班级
    add() {
      currentUser({
        url: this.set.selectUrl
      }).then(response => {
        this.temp['siOrgCode'] = String(response.data.orgCode) // 获取当前用户（学校）组织
      })
      for (const i in this.children.formItem) {
        switch (this.children.formItem[i].meta.valueKey) {
          case 'gradeName':
            var gradeArr = []
            var gradeKey = []
            gradeCode({
              url: this.set.allGradeUrl
            }).then(res => {
              if (res.statusCode === 200) {
                res.data.forEach(val => {
                  gradeArr.push({ 'label': val.enumCvalue, 'value': val.id })
                  gradeKey.push({ 'label': val.id, 'value': val.id })
                })
              }
              this.children.formItem[i].meta.options_OBJ.data = gradeArr // 当前组织具有的年级
            })
            break
        }
      }
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      if (this.$refs[this.system_id] !== undefined) {
        this.$nextTick(() => {
          this.$refs[this.system_id].resetFields()
        })
      }
    },
    // 修改班级
    updateClass(_data) {
      vueBus.$on('currentClass', val => {
        this.temp = Object.assign(val, _data.data) // 获取班级传过来的数据
      })
      console.log('temp:', this.temp)
      if (this.temp) {
        this.dialogStatus = 'update'
        this.dialogFormVisible = true
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
            vueBus.$emit('handleClick', () => {
              this.handleClick()
            })
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
      /* 提交表单之前需要判断电话号码是否有空格，修改了电话就有，没修改电话直接提交就没有空格*/
      if (!(/^[\u4e00-\u9fa5_a-zA-Z0-9]+$/).test(this.temp['parentTel']) || !(/^[\u4e00-\u9fa5_a-zA-Z0-9]+$/).test(this.temp['studentTel'])) {
        this.temp['parentTel'] = this.temp['parentTel'].replace(/\s/g, '')
        this.temp['studentTel'] = this.temp['studentTel'].replace(/\s/g, '')
      }
      this.dialogStatus === 'create' ? this.createData() : this.updateData()
    }
  }
}
</script>
<style lang="scss" scoped>
  @import "emDialog";
</style>
