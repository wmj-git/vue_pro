<template>
  <div class="table-container">
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
    <em-form ref="em_form" />
    <Pagination
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.limit"
      :hide-on-single-page="pageOne"
      @pagination="handlePaginationChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>
<script>
import { fetchList, educationCommission, delList } from '@/api/schoolService/schoolInfo'
import EmForm from '@/views/em/school-service/schoolInfo/components/emForm/emForm'

export default {
  name: 'EmTable',
  components: { EmForm },
  data() {
    return {
      id: '',
      set: {

      },
      tableDataEnd: [],
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
      listQuery: {
        page: 1,
        limit: 10
      },
      pageOne: false,
      total: 0,
      ids: [] // 要删除id
    }
  },
  created() {
    this.init()
    this.getSection()
  },
  methods: {
    init() {
      fetchList({
        pageSize: this.listQuery.limit,
        pageNum: this.listQuery.page
      }).then(response => {
        this.total = response.data.total
        this.tableDataEnd = response.data.list
      })
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    // 分页改变:改变条数和分页
    handlePaginationChange(res) {
      this.listQuery = res
      this.init()
    },
    // 获取下拉选项
    getSection() {
      const optionsArr = []
      educationCommission().then(response => {
        response.data.list.forEach((_val) => {
          optionsArr.push({ 'label': _val.name, 'value': _val.id })
        })
        this.$refs.em_form.statusOptions = optionsArr
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
    handleCurrentChange(val) {},
    handleEdit(row) {
      this.$refs.em_form.temp = Object.assign({}, row)
      this.$refs.em_form.changeDialogVisible()
      this.$refs.em_form.titleUpdate()
    },
    // 按钮组方法
    clickMethod(val) {
      this.fn = val
      // 添加数据
      if (val === 'handleCreate') {
        this.resetTemp()
        this.$refs.em_form.changeDialogVisible()
        this.$refs.em_form.titleCreate()
        this.$nextTick(() => {
          this.$refs['dataForm'].clearValidate()
        })
        // 删除行
      } else if (val === 'handleDelete') {
        var _val = this.multipleSelection
        _val.forEach(_val => {
          //  提取出需要传给后台的参数ids
          this.ids.push(_val.id)
          console.log('ids', _val.id)
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
                this.init()
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
      }
    }
  }
}
</script>
