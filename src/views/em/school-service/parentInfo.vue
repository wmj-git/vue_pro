<template>
  <div class="school-container">
    <div class="table-operate">
      <!-- <el-select v-model="studentId " class="filter-item" clearable placeholder="选择学生id" @change="currentSel">
        <el-option
          v-for="item in studentOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>-->
      <el-button class="filter-item" style="margin-left: 10px;" type="primary" size="mini" icon="el-icon-search" @click="handleFilter">
        查询
      </el-button>
      <el-button class="filter-item" style="margin-left: 10px;" type="primary" size="mini" icon="el-icon-plus" @click="handleCreate">
        添加
      </el-button>
      <el-button
        size="mini"
        type="primary"
        icon="el-icon-delete"
        @click="handleDelete"
      >删除</el-button>
    </div>

    <el-table
      :data="tableDataEnd"
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column
        type="index"
        width="50"
      />
      <el-table-column
        type="selection"
        width="55"
      />
      <el-table-column
        v-for="info in tableHeader"
        :key="info.key"
        :label="info.label"
      >
        <template slot-scope="scope">
          <span>{{ scope.row[info.key] }}</span>
        </template>
      </el-table-column>
      <el-table-column label="家长性别">
        <template slot-scope="scope">
          {{ scope.row.parentSex === 2 ? '女' : '男' }}
        </template>
      </el-table-column>
      <el-table-column label="操作" fixed="right" width="auto">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            @click="handleEdit(scope.row)"
          >编辑</el-button>
        </template>
      </el-table-column>
    </el-table>

    <Pagination
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.limit"
      :hide-on-single-page="pageOne"
      @pagination="handlePaginationChange"
      @current-change="handleCurrentChange"
    />

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :model="temp" :inline="true">
        <el-form-item label="家长姓名" prop="name" :label-width="formLabelWidth">
          <el-input v-model="temp.parentName" />
        </el-form-item>
        <el-form-item label="学生id" prop="siOrgCode" :label-width="formLabelWidth">
          <el-select v-model="temp.studentIds " class="filter-item" clearable placeholder="选择学生id" @change="currentSel">
            <el-option
              v-for="item in studentOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="家长年龄" prop="introduction" :label-width="formLabelWidth">
          <el-input v-model="temp.parentAge" />
        </el-form-item>
        <el-form-item label="性别" prop="siOrgCode" :label-width="formLabelWidth">
          <el-select v-model="temp.parentSex" class="filter-item" clearable placeholder="Please select" @change="currentSel">
            <el-option
              v-for="item in statusOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="联系方式" prop="tel" :label-width="formLabelWidth">
          <el-input v-model="temp.parentTel" />
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
import { fetchList, addList, editList, delList, studentInfo, filterList } from '@/api/schoolService/parentInfo'
export default {
  name: 'ParentInfo',
  data() {
    return {
      tableDataEnd: null,
      tableHeader: [
        {
          label: '家长姓名',
          key: 'parentName'
        },
        {
          label: '家长年龄',
          key: 'parentAge'
        },
        {
          label: '家长电话',
          key: 'parentTel'
        }
      ],
      pageOne: false,
      total: 0,
      listQuery: {
        page: 1,
        limit: 10
      },
      textMap: {
        update: '修改',
        create: '添加'
      },
      temp: {
        parentName: '',
        parentAge: '',
        studentNumber: '',
        parentSex: '',
        parentTel: '',
        studentIds: ''
      },
      studentId: '', // 查询学生id
      statusOptions: [{ label: '女', value: 2 }, { label: '男', value: 1 }], // 定义性别
      studentOptions: [], // 添加学生id
      dialogFormVisible: false,
      itemFormVisible: false, // 字段显示与隐藏
      dialogStatus: '',
      formLabelWidth: '100px',
      inputFilter: '',
      multipleSelection: [],
      classId: ''
    }
  },
  created() {
    this.getSection()
    this.getList()
  },
  methods: {
    // 分页改变:改变条数和分页
    handlePaginationChange(res) {
      this.listQuery = res
      this.getList()
    },
    // 渲染表格数据
    getList() {
      fetchList({
        pageSize: this.listQuery.limit,
        pageNum: this.listQuery.page
      }).then(response => {
        this.total = response.data.total
        this.ids = response.data.classId
        this.tableDataEnd = response.data.list
      })
    },
    // 获取学生id
    getSection() {
      const optionsArr = []
      studentInfo().then(response => {
        response.data.list.forEach((_val) => {
          optionsArr.push({ 'label': _val.id, 'value': _val.id })
          console.log('optionsArr:', optionsArr)
        })
        this.studentOptions = optionsArr
      })
    },
    currentSel(val) {
    },
    // 修改弹框
    handleEdit(row) {
      this.temp = Object.assign({}, row)
      this.dialogFormVisible = true
      this.dialogStatus = 'update'
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    // 添加弹框
    handleCreate() {
      this.resetTemp()
      this.itemFormVisible = true
      this.dialogFormVisible = true
      this.dialogStatus = 'create'
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    // 查询
    handleFilter() {
      console.log(111)
      console.log(this.classId)
      filterList({
        classId: this.classId
      }).then(res => {
        console.log('res', res)
      })
      this.getList()
    },
    // 删除
    handleDelete() {
      var val = this.multipleSelection
      val.forEach(val => {
        //  提取出需要传给后台的参数ids
        this.ids.push(val.id)
        console.log('ids', val.id)
      })
      if (this.ids.length >= 1) {
        this.$confirm('此操作将删除所选项, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          delList({
            params: this.ids
          }).then(res => {
            this.ids = []
            if (res.statusCode === 200) {
              this.$notify({
                message: '删除成功',
                type: 'success'
              })
              this.getList()
            }
          })
        }).catch(() => {
        })
      } else {
        this.$message({
          showClose: true,
          message: '请先单击复选框选择你要删除的数据行',
          type: 'warning'
        })
      }
    },
    // 添加功能
    createData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          addList(this.temp).then((res) => {
            console.log('temp:', this.temp)
            if (res.statusCode === 200) {
              this.$notify({
                message: '一条数据添加成功',
                type: 'success'
              })
              this.getList()
              this.dialogFormVisible = false
            } else {
              this.$notify.error('添加失败')
            }
          })
        }
      })
    },
    // 修改功能
    updateData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          const tempData = Object.assign({}, this.temp)
          editList(tempData).then(() => {
            for (const v of this.tableDataEnd) {
              if (v.id === this.temp.id) {
                const index = this.tableDataEnd.indexOf(v)
                this.tableDataEnd.splice(index, 1, this.temp)
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
    // 清空已提交的表单
    resetTemp() {
      this.temp = {
        name: '',
        address: '',
        orgCode: '',
        siEcId: '',
        tel: ''
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    handleCurrentChange(val) {
    }
  }
}
</script>
<style lang="scss" scoped>
  .school-container {
    & .table-operate {
      margin: 10px;
      .el-input {
        width: 30%;
      }
    }
  }
</style>
