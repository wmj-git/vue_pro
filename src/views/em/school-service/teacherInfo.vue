<template>
  <div class="school-container">
    <div class="table-operate">
      <el-input v-model="tName" placeholder="输入教师姓名查询" clearable>
        <i slot="prefix" class="el-input__icon el-icon-search" />
      </el-input>
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
      <el-table-column label="教师性别">
        <template slot-scope="scope">
          {{ scope.row.sex === 2 ? '女' : '男' }}
        </template>
      </el-table-column>
      <el-table-column label="在职状态">
        <template slot-scope="scope">
          <span>{{ scope.row.tncumbency === 1 ? '在职': scope.row.graduateStatus === 0 ? '离职' : '开除' }}</span>
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
        <el-form-item label="教师姓名" prop="name" :label-width="formLabelWidth">
          <el-input v-model="temp.name" clearable />
        </el-form-item>
        <el-form-item v-show="itemFormVisible" label="在职状态" prop="siOrgCode" :label-width="formLabelWidth">
          <el-select v-model="temp.tncumbency " class="filter-item" clearable placeholder="选择在职状态" @change="currentSel">
            <el-option
              v-for="item in tncumbencyStatus"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="教师年龄" prop="introduction" :label-width="formLabelWidth">
          <el-input v-model="temp.age" clearable />
        </el-form-item>
        <el-form-item label="性别" prop="siOrgCode" :label-width="formLabelWidth">
          <el-select v-model="temp.sex" class="filter-item" clearable placeholder="Please select" @change="currentSel">
            <el-option
              v-for="item in statusOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="所在学校" prop="siOrgCode" :label-width="formLabelWidth">
          <el-select v-model="temp.siId" class="filter-item" clearable placeholder="Please select" @change="currentSel">
            <el-option
              v-for="item in schoolOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="工作年限" prop="tel" :label-width="formLabelWidth">
          <el-input v-model="temp.seniority" clearable />
        </el-form-item>
        <el-form-item label="联系方式" prop="tel" :label-width="formLabelWidth">
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
import { fetchList, addList, editList, delList, schoolInfo } from '@/api/schoolService/teacherInfo'
export default {
  name: 'TeacherInfo',
  data() {
    return {
      tableDataEnd: null,
      tableHeader: [
        {
          label: '教师姓名',
          key: 'name'
        },
        {
          label: '教师年龄',
          key: 'age'
        },
        {
          label: '工作年限',
          key: 'seniority'
        },
        {
          label: '所在学校',
          key: 'siId'
        },
        {
          label: '联系方式',
          key: 'tel'
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
        name: '',
        age: '',
        sex: '',
        tes: '',
        siId: '',
        seniority: '',
        tel: '',
        tncumbency: ''
      },
      statusOptions: [{ label: '女', value: 2 }, { label: '男', value: 1 }], // 定义性别
      schoolOptions: [], // 添加学校id
      dialogFormVisible: false,
      itemFormVisible: false, // 字段显示与隐藏
      dialogStatus: '',
      formLabelWidth: '100px',
      multipleSelection: [],
      classId: '', // 查询家长
      tName: '', // 根据教师姓名查询教师
      ids: [], // 已选中需要删除的id(数组)
      tncumbencyStatus: [{ label: '在职', value: 1 }, { label: '离职', value: 0 }, { label: '开除', value: -1 }]
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
      var obj = {
        pageSize: this.listQuery.limit,
        pageNum: this.listQuery.page
      }
      if (this.tName) {
        obj.name = this.tName
      }
      fetchList(obj).then(response => {
        this.total = response.data.total
        this.tableDataEnd = response.data.list
      })
    },
    // 获取学校id
    getSection() {
      const optionsArr = []
      schoolInfo().then(response => {
        response.data.list.forEach((_val) => {
          optionsArr.push({ 'label': _val.name, 'value': _val.id })
        })
        this.schoolOptions = optionsArr
      })
    },
    currentSel(val) {
    },
    // 修改弹框
    handleEdit(row) {
      this.temp = Object.assign({}, row)
      this.dialogFormVisible = true
      this.itemFormVisible = false
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
      if (this.ids.length > 0) {
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
        width: 15%;
      }
    }
  }
</style>
