<template>
  <div class="school-container">
    <el-table
      :data="tableDataEnd "
      style="width: 100%;"
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
        updateUrl: '',
        vueBusName: ''
      },
      tableHeader: [],
      tableDataEnd: [],
      multipleSelection: [], // 初始化时没有值，forEach属性不能用，就算作了判断也不行
      pageOne: false,
      total: 0,
      listQuery: {},
      ids: [],
      valueKey: '' // 模糊查询关键字
    }
  },
  watch: {
    tableDataEnd: {
      handler: function(val, oldVal) {
        val.forEach((_item) => {
          for (const _k in _item) {
            switch (_k) {
              case 'parentSex':
                if (typeof _item[_k] === 'number') {
                  _item[_k] = (_item[_k] === 2) ? '女' : '男'
                }
                break
              case 'studentSex':
                if (typeof _item[_k] === 'number') {
                  _item[_k] = (_item[_k] === 2) ? '女' : '男'
                }
                break
            }
          }
        })
        return val
      },
      deep: true
    }
  },
  created() {
    this.init()
    this.getList()
    vueBus.$on('query', () => {
      this.getList()
    })
  },
  methods: {
    init() {
      this.set = dataInitFn(this.set, this.meta)
      this.children = childrenInitFn(this.children, this.componentData)
    },
    // 分页改变:改变条数和分页
    handlePaginationChange(res) {
      this.listQuery = res
      console.log(this.listQuery)
      this.getList()
    },
    // 查询
    handleFilter() {
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
      if (emMixin.valueKey) {
        obj.parentName = emMixin.valueKey
        console.log(21, emMixin.valueKey)
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
      vueBus.$emit(this.set.vueBusName, Object.assign({}, row)) // 当前选中行内容返回给表单（当有两个按钮时无法区别点击了哪个按钮）
    },
    // 删除选中行
    remove() {
      var _val = this.multipleSelection
      console.log('val', _val)
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
<style lang="scss" scoped>
  @import "emTable";
</style>
