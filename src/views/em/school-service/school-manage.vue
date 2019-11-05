<template>
  <div class="school-container">
    <div class="table-operate">
      <el-input v-model="inputFilter" placeholder="输入用户名查询" />
      <el-button class="filter-item" style="margin-left: 10px;" type="primary" size="mini" icon="el-icon-search" @click="handleFilter">
        查询
      </el-button>
      <el-button class="filter-item" style="margin-left: 10px;" type="primary" size="mini" icon="el-icon-plus" @click="handleCreate">
        添加
      </el-button>
    </div>
    <el-table
      :data="tableDataEnd"
      style="width: 100%"
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
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index,scope.row)"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <Pagination
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.limit"
      :hide-on-single-page="pageOne"
      @pagination="getList"
      @current-change="handleCurrentChange"
    />
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :model="temp">
        <el-form-item label="学校名称" prop="name" :label-width="formLabelWidth">
          <el-input v-model="temp.name" />
        </el-form-item>
        <el-form-item label="学校地址" prop="name" :label-width="formLabelWidth">
          <el-input v-model="temp.address" />
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
          <el-input v-model="temp.tel" />
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
import { fetchList, addList, JiaoweiList } from '@/api/school-manage'
export default {
  name: 'SchoolManage',
  data() {
    return {
      tableDataEnd: null,
      tableHeader: [
        {
          label: '学校名称',
          key: 'name'
        },
        {
          label: '学校地址',
          key: 'address'
        },
        {
          label: '学校组织编码',
          key: 'orgCode'
        },
        {
          label: '所属教委id',
          key: 'siEcId'
        },
        {
          label: '学校联系电话',
          key: 'tel'
        }
      ],
      pageOne: false,
      total: 0,
      listQuery: {
        page: -1,
        limit: 10
      },
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
      statusOptions: [],
      dialogFormVisible: false,
      dialogStatus: '',
      formLabelWidth: '120px',
      inputFilter: '',
      multipleSelection: []
    }
  },
  created() {
    this.getList()
    this.getSection()
  },
  methods: {
    // 渲染表格数据
    getList() {
      fetchList(this.listQuery).then(response => {
        console.log(response.data.list)
        this.total = response.data.total
        console.log('total', this.total)
        this.listQuery.limit = response.data.pageSize
        console.log('pageSize:', response.data.pageSize)
        console.log('pages:', response.data.pages)
        this.tableDataEnd = response.data.list
      })
    },
    // 获取下拉选项
    getSection() {
      const optionsArr = []
      JiaoweiList().then(response => {
        console.log(response.data.list)
        response.data.list.forEach((_val) => {
          optionsArr.push({ 'label': _val.name, 'value': _val.id })
        })
        this.statusOptions = optionsArr
      })
      console.log(optionsArr)
    },
    currentSel(val) {
      console.log(val)
    },
    handleEdit() {
      this.dialogFormVisible = true
      this.dialogStatus = 'update'
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    handleCreate() {
      this.dialogFormVisible = true
      this.dialogStatus = 'create'
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    handleFilter(ids) {
    },
    handleDelete() {},
    createData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          addList(this.temp).then((res) => {
            console.log(res)
            if (res.statusCode === 200) {
              this.$message({
                message: '添加成功',
                type: 'success'
              })
              this.getList()
              this.dialogFormVisible = false
            } else {
              this.$message.error('添加失败')
            }
          })
        }
      })
    },
    updateData() {},
    resetTemp() {
      this.temp = {}
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    handleCurrentChange(val) {
      console.log('当前页:', val)
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
