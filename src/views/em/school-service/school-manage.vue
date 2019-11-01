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
    <pagination :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :model="temp">
        <el-form-item label="姓名" prop="name" :label-width="formLabelWidth">
          <el-input v-model="temp.name" />
        </el-form-item>
        <el-form-item label="住址" prop="address" :label-width="formLabelWidth">
          <el-select v-model="temp.address" class="filter-item" placeholder="Please select">
            <el-option v-for="item in statusOptions" :key="item" :label="item" :value="item" />
          </el-select>
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
import { fetchList } from '@/api/school-manage'
import Pagination from '@/components/Pagination'
export default {
  name: 'SchoolManage',
  components: { Pagination },
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
      total: 0,
      listQuery: {
        page: -1,
        limit: 20
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
      statusOptions: [
        '重庆', '上海', '云南', '江苏'
      ],
      dialogFormVisible: false,
      dialogStatus: '',
      formLabelWidth: '120px',
      inputFilter: ''
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      fetchList(this.listQuery).then(response => {
        console.log(response.data.list)
        this.tableDataEnd = response.data.list
        this.total = response.data.total
      })
    },
    handleEdit() {
      this.dialogFormVisible = true
      this.dialogStatus = 'update'
    },
    handleCreate() {
      this.dialogFormVisible = true
      this.dialogStatus = 'create'
    },
    handleFilter(ids) {
    },
    handleDelete() {},
    createData() {},
    updateData() {}
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
