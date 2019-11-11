<template>
  <div class="school-container">
    <div class="table-operate">
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
        <el-form-item label="教委名称" prop="name" :label-width="formLabelWidth">
          <el-input v-model="temp.name" clearable />
        </el-form-item>
        <el-form-item label="教委地址" prop="name" :label-width="formLabelWidth">
          <el-input v-model="temp.address" clearable />
        </el-form-item>
        <el-form-item label="教委区域编码" prop="siOrgCode" :label-width="formLabelWidth">
          <el-select v-model="temp.criCode" class="filter-item" clearable placeholder="Please select" @change="currentSel">
            <el-option
              v-for="item in statusOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="纬度" prop="introduction" :label-width="formLabelWidth">
          <el-input v-model="temp.latitude" clearable />
        </el-form-item>
        <el-form-item label="经度" prop="introduction" :label-width="formLabelWidth">
          <el-input v-model="temp.longitude" clearable />
        </el-form-item>
        <el-form-item label="教委联系方式" prop="tel" :label-width="formLabelWidth">
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
import { fetchList, addList, editList, delList, cnRegion } from '@/api/schoolService/educationCommission'
export default {
  name: 'EducationCommission',
  data() {
    return {
      tableDataEnd: null,
      tableHeader: [
        {
          label: '教委名称',
          key: 'name'
        },
        {
          label: '教委地址',
          key: 'address'
        },
        {
          label: '教委区域编码',
          key: 'criCode'
        },
        {
          label: '教委组织编码',
          key: 'orgCode'
        },
        {
          label: '纬度',
          key: 'latitude'
        },
        {
          label: '经度',
          key: 'longitude'
        },
        {
          label: '教委联系方式',
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
        address: '',
        name: '',
        criCode: '',
        latitude: '',
        longitude: '',
        tel: ''
      },
      dialogFormVisible: false,
      itemFormVisible: false, // 字段显示与隐藏
      dialogStatus: '',
      formLabelWidth: '100px',
      ids: [], // 存储已选中记录的id（删除）
      multipleSelection: [],
      statusOptions: '', // 学校组织编码
      buildingStatus: [{ label: '正常', value: '正常' }, { label: '危楼重建', value: '危楼重建' }, { label: '旧楼翻新', value: '旧楼翻新' }] // 结业状态
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
      fetchList(obj).then(response => {
        this.total = response.data.total
        this.tableDataEnd = response.data.list
      })
    },
    // 获取区域编码
    getSection() {
      const optionsArr = []
      cnRegion().then(response => {
        response.data.list.forEach((_val) => {
          optionsArr.push({ 'label': _val.criCode, 'value': _val.criCode })
        })
        this.statusOptions = optionsArr
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
        width: 15%;
      }
    }
  }
</style>
