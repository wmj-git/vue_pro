<template>
  <div class="emDialog-container">
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :model="temp" :inline="true">
        <el-form-item label="班级名称" prop="name" :label-width="formLabelWidth">
          <el-input v-model="temp.name" />
        </el-form-item>
        <el-form-item label="学校组织编码" prop="name" :label-width="formLabelWidth">
          <el-select v-model="temp.siOrgCode" class="filter-item" clearable placeholder="Please select" @change="currentSel">
            <el-option
              v-for="item in statusOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="结业状态" prop="name" :label-width="formLabelWidth">
          <el-select v-model="temp.graduateStatus" class="filter-item" clearable placeholder="Please select" @change="currentSel">
            <el-option
              v-for="item in graduateStatus"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="界别" prop="name" :label-width="formLabelWidth">
          <el-input v-model="temp.boundary" />
        </el-form-item>
        <el-form-item label="年级" prop="name" :label-width="formLabelWidth">
          <el-input v-model="temp.gradeName" />
        </el-form-item>
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
import { addList, schoolInfo } from '@/api/schoolService/classInfo'
export default {
  name: 'EmDialog',
  props: ['data'],
  data() {
    return {
      id: '',
      set: {
        dialogFormVisible: '',
        appendUrl: '',
        selectUrl: '',
        status: true
      },
      temp: {},
      textMap: {},
      statusOptions: '',
      formLabelWidth: '120px',
      dialogFormVisible: false,
      dialogStatus: '',
      graduateStatus: []
    }
  },
  created() {
    this.init()
    this.getSection()
    vueBus.$on(this.id, obj => {
      this[obj.fn](obj)
    })
  },
  beforeDestroy() {
    vueBus.$off(this.id)
  },
  methods: {
    init() {
      const _meta = this.data.meta
      this.textMap = _meta.textMap
      this.set.dialogStatus = _meta.dialogStatus
      this.temp = _meta.temp
      this.set.dialogFormVisible = _meta.dialogFormVisible
      this.set.appendUrl = _meta.appendUrl
      this.set.selectUrl = _meta.selectUrl
      this.graduateStatus = _meta.graduateStatus
    },
    getSection() {
      const optionsArr = []
      const obj = {
        url: this.set.selectUrl
      }
      schoolInfo(obj).then(response => {
        response.data.list.forEach((_val) => {
          optionsArr.push({ 'label': _val.orgCode, 'value': _val.orgCode })
        })
        this.statusOptions = optionsArr
      })
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
      this.$refs['dataForm'].validate((valid) => {
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
