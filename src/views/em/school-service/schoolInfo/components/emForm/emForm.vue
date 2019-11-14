<template>
  <div class="emForm-container">
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :model="temp" :inline="true">
        <el-form-item label="学校名称" prop="name" :label-width="formLabelWidth">
          <el-input v-model="temp.name" clearable />
        </el-form-item>
        <el-form-item label="学校地址" prop="name" :label-width="formLabelWidth">
          <el-input v-model="temp.address" clearable />
        </el-form-item>
        <el-form-item label="所属教委id" prop="name" :label-width="formLabelWidth">
          <el-select v-model="temp.siEcId" class="filter-item" clearable placeholder="Please select" @change="currentSel">
            <el-option
              v-for="item in statusOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="学校联系电话" prop="name" :label-width="formLabelWidth">
          <el-input v-model="temp.tel" clearable />
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
import { editList, addList } from '@/api/schoolService/schoolInfo'
export default {
  name: 'EmForm',
  data() {
    return {
      dialogFormVisible: false,
      textMap: {
        update: '修改',
        create: '添加'
      },
      temp: {
        name: '',
        address: '',
        orgCode: '',
        siEcId: '',
        tel: ''
      },
      formLabelWidth: '120px',
      dialogStatus: '',
      statusOptions: [] // 获取所属教委id
    }
  },
  methods: {
    // 弹框显示
    changeDialogVisible() {
      this.dialogFormVisible = true
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
          addList(this.temp).then((res) => {
            console.log('res11：', this.temp)
            if (res.statusCode === 200) {
              this.$notify({
                message: '一条数据添加成功',
                type: 'success'
              })
              this.$parent.getList()
              this.dialogFormVisible = false
            } else {
              this.$notify.error('添加失败')
            }
          })
        }
      })
    },
    updateData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          const tempData = Object.assign({}, this.temp)
          console.log(tempData)
          editList(tempData).then(() => {
            for (const v of this.$parent.tableDataEnd) {
              if (v.id === this.temp.id) {
                const index = this.$parent.tableDataEnd.indexOf(v)
                this.$parent.tableDataEnd.splice(index, 1, this.temp)
                break
              }
            }
            this.dialogFormVisible = false
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
    currentSel() {}
  }
}
</script>
