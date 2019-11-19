<template>
  <div class="school-container">
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
        v-for="info in meta.tableHeader"
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
  </div>
</template>
<script>
import vueBus from '@/utils/vueBus'
import { emMixin } from '@/utils/mixins'
import { dataInitFn, childrenInitFn } from '@/utils/tool'
import { fetchList, delList } from '@/api/schoolService/classInfo'
export default {
  name: 'EmTable',
  mixins: [emMixin],
  data() {
    return {
      id: '',
      set: {
        queryUrl: '',
        appendUrl: '',
        removeUrl: '',
        updateUrl: ''
      },
      tableHeader: [],
      tableDataEnd: [],
      pageOne: false,
      total: 0,
      listQuery: {},
      ids: []
    }
  },
  created() {
    this.init()
    this.getList()
    vueBus.$on('queryAll', () => {
      this.getList() // 触发该方法即可
    })
  },
  methods: {
    init() {
      this.set = dataInitFn(this.set, this.meta)
      this.children = childrenInitFn(this.children, this.componentData)
      /*   const _meta = this.data.meta
      this.tableHeader = _meta.tableHeader // 表头
      this.pageOne = _meta.pageOne
      this.total = _meta.total
      this.listQuery = _meta.listQuery
      this.set.queryUrl = _meta.queryUrl // 查询
      this.set.appendUrl = _meta.appendUrl // 添加
      this.set.updateUrl = _meta.updateUrl // 修改
      this.set.removeUrl = _meta.removeUrl // 删除
      this.ids = _meta.ids*/
    },
    // 分页改变:改变条数和分页
    handlePaginationChange(res) {
      this.listQuery = res
      console.log(this.listQuery)
      this.getList()
    },
    // 渲染数据
    getList() {
      const obj = {
        url: this.set.queryUrl,
        params: {
          pageSize: this.listQuery.limit,
          pageNum: this.listQuery.page
        }
      }
      if (this.inputFilter) {
        obj.name = this.inputFilter
      }
      fetchList(obj).then(response => {
        this.total = response.data.total
        this.tableDataEnd = response.data.list
      })
    },
    handleCurrentChange(val) {},
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    handleEdit(row) {
      this.temp = Object.assign({}, row)
      console.log('选择', this.temp)
    },
    // 删除选中行
    remove() {
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
            url: this.set.removeUrl,
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
    }
  }
}
</script>
