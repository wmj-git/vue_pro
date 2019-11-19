<template>
  <div class="emDialog-container">
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
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
                :disabled="item.meta.disabled"
                :placeholder="item.meta.placeholder ? item.meta.placeholder : '请输入'"
                type="textarea"
                :autosize="item.meta.autosize_OBJ ? item.meta.autosize_OBJ : { minRows: 2, maxRows: 4}"
              />
            </el-form-item>
            <el-form-item v-else-if="item.meta.itemType==='select'" :label="item.meta.title" :prop="item.meta.valueKey">
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
            <el-form-item v-else-if="item.meta.itemType==='switch'" :label="item.meta.title" :prop="item.meta.valueKey">
              <el-switch
                :ref="item.meta.system_id"
                v-model="temp[item.meta.valueKey]"
                :disabled="item.meta.disabled"
                :active-color="item.meta.activeColor ? item.meta.activeColor : '#111c95'"
                :inactive-color="item.meta.inactiveColor ? item.meta.inactiveColor : '#c6c6c6'"
              />
            </el-form-item>
            <el-button
              v-else-if="item.meta.itemType==='button'"
              :ref="item.meta.system_id"
              :icon="item.meta.icon"
              :class="item.meta.class"
              :disabled="item.meta.disabled"
              :type="item.meta.primary ? item.meta.primary : 'primary'"
              @click="fn(item, {})"
            >
              {{ item.meta.title }}
            </el-button>
          </el-col>
        </template>
      </el-form>
      <!--<el-form ref="dataForm" :model="temp" :inline="true">
        <el-form-item label="家长姓名" prop="" :label-width="formLabelWidth">
          <el-input v-model="temp.parentName" />
        </el-form-item>
        <el-form-item label="学生id" prop="" :label-width="formLabelWidth">
          <el-select v-model="temp.studentIds" class="filter-item" clearable placeholder="Please select" @change="currentSel">
            <el-option
              v-for="item in studentOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="家长性别" prop="" :label-width="formLabelWidth">
          <el-select v-model="temp.parentSex" class="filter-item" clearable placeholder="Please select" @change="currentSel">
            <el-option
              v-for="item in statusOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="家长年龄" prop="" :label-width="formLabelWidth">
          <el-input v-model="temp.parentAge" />
        </el-form-item>
        <el-form-item label="联系方式" prop="" :label-width="formLabelWidth">
          <el-input v-model="temp.parentTel" />
        </el-form-item>
      </el-form>-->
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
import { addList, studentInfo } from '@/api/schoolService/parentInfo'
export default {
  name: 'EmDialog',
  mixins: [emMixin],
  data() {
    return {
      id: '',
      set: {
        appendUrl: '',
        selectUrl: '',
        status: true,
        labelWidth: '',
        statusIcon: '',
        labelPosition: ''
      },
      children: {
        formItem: []
      },
      temp: {},
      rules: {}, // 验证数据
      textMap: {},
      formLabelWidth: '120px',
      dialogFormVisible: false,
      statusOptions: [{ label: '女', value: 2 }, { label: '男', value: 1 }], // 定义性别
      studentOptions: [], // 添加学生id
      dialogStatus: ''
    }
  },
  created() {
    this.init()
  },
  beforeDestroy() {
  },
  methods: {
    init() {
      this.set = dataInitFn(this.set, this.meta)
      this.children = childrenInitFn(this.children, this.componentData)
      // 查找 formTtem: 'studentIds'
      for (var i = 0; i < this.children.formItem.length; i++) {
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
            this.children.formItem[i].meta.options_OBJ.data = optionsArr // 下拉选项赋值
            break
        }
      }
    },
    fn(_obj) {
      const _fn = _obj.meta.fn
      const _controlType = _obj.meta.control_type ? _obj.meta.control_type : ''
      const _controlId = _obj.meta.control_id
      switch (_controlType) {
        case 'ParentInfo_dialogShowControlType_changeDialogVisible':
          console.log('弹框显示')
          vueBus.$emit(_controlId, {
            meta: _obj.meta,
            trigger: this.changeDialogVisible()
          })
          break
        case 'default':
          this[_fn](_obj.meta)
          break
      }
    },
    // 弹框显示
    changeDialogVisible() {
      this.dialogFormVisible = true
    },
    changeDialogHidden() {
      this.dialogFormVisible = false
    },
    titleUpdate() {
      this.dialogStatus = 'update'
    },
    titleCreate() {
      this.dialogStatus = 'create'
    },
    createData() {
      vueBus.$emit('queryAll')
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          const obj = {
            url: this.set.appendUrl,
            params: this.temp
          }
          addList(obj).then((res) => {
            console.log('we', obj)
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
      this.dialogFormVisible = false
    },
    currentSel() {}
  }
}
</script>
<style lang="scss" scoped>
  @import "emDialog";
</style>
