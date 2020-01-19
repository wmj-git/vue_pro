<template>
  <div class="school-container table-container">
    <el-table
      :data="tableDataEnd "
      border
      :ref="system_id"
      style="width: 100%;"
      :row-click="meta.rowClick"
      @selection-change="handleSelectionChange"
      @row-dblclick="showDrawer"
      @row-click="onClickRow"
      :highlight-current-row="highlight"
      empty-text="暂无数据"
    >
      <el-table-column
        type="index"
        width="50"
        :index="tableIndex"
      />
      <el-table-column
        type="selection"
        width="55"
      />
      <el-table-column v-if="meta.tableHeader[0].key==='studentName'" label="头像">
        <template slot-scope="scope">
          <img :src="scope.row.headImage" width="40" height="40">
        </template>
      </el-table-column>
      <el-table-column
        v-for="info in meta.tableHeader"
        :key="info.key"
        :label="info.label"
        :prop="info.key"
        :formatter="formatterFn"
      />
      <el-table-column label="操作" fixed="right" width="auto">
        <template slot-scope="scope">
          <template v-for="(btn, _index ) in children.columnBtn">
            <el-button
              :key="_index"
              :ref="btn.meta.system_id"
              class="em-btn-operation table_inLine_btn"
              size="mini"
              :type="btn.meta.buttonType ? btn.meta.buttonType : 'primary'"
              @click="fn(btn,{'index':scope.$index, 'row':scope.row, 'control_type':btn.meta.control_type})"
            >
              {{ btn.meta.title }}
            </el-button>
          </template>
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
import { staticFormatterMap } from '@/utils/formatterMap'
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
        vueBusName: '', // 区分抽屉
        clickRow: {
          control_id: '' // 区别哪个table的getList()
        },
        clickRowId: {
          control_id: '' // 获取选中行的id---添加家长信息
        },
        rowClick: false
      },
      highlight: true,
      tableHeader: [],
      tableDataEnd: [],
      selectRow: [], // 选中行
      multipleSelection: [], // 初始化时没有值，forEach属性不能用，就算作了判断也不行
      pageOne: false,
      total: 0,
      listQuery: {
        limit: 10,
        page: 1
      },
      ids: [],
      children: {
        columnBtn: []
      },
      formatterMap: {}
    }
  },
  created() {
    this.init()
  },
  methods: {
    fn(_obj, _data) {
      Object.assign({}, _data.row)
      const _controlType = _obj.meta.control_type ? _obj.meta.control_type : ''
      const _controlId = _obj.meta.control_id
      switch (_controlType) {
        case 'ParentInfo_editData_dialogVisible':
          vueBus.$emit(_controlId, {
            meta: _obj.meta,
            data: Object.assign({}, _data.row)
          })
          break
        default:
          this.FN(_obj, _data)
      }
    },
    init() {
      this.set = dataInitFn(this.set, this.meta)
      this.children = childrenInitFn(this.children, this.componentData)
    },
    // 分页改变:改变条数和分页
    handlePaginationChange(res) {
      this.listQuery = res
      this.getList()
    },
    tableIndex(index) { // 第二页开始表格数据行号不从1开始
      return (this.listQuery.page - 1) * this.listQuery.limit + index + 1
    },
    // 查询
    handleFilter(_obj) {
      if (_obj.temp) {
        console.log('_obj.temp', _obj.temp)
        // 接受后需要传递给查询接口，不然还是查询不到
        this.getList(_obj.temp)
      } else {
        this.$message({
          showClose: true,
          message: '没有对应查询条件的内容！',
          type: 'warning'
        })
      }
    },
    // 单击行获取指定学生的家长信息
    onClickRow(row) {
      if (!this.set.rowClick) {
        this.$refs[this.system_id].toggleRowSelection(row) // 家长表单击行即可选中当前行
      } else if (row.id) { // 学生表需要实现只选中当前行，其他行取消选中
        const refsElTable = this.$refs[this.system_id] // 获取表格对象
        const findRow = this.multipleSelection.find(col => col.id === row.id) // 对比id不是rowIndex
        if (findRow) {
          refsElTable.toggleRowSelection(row, false)
          return
        }
        refsElTable.clearSelection()
        refsElTable.toggleRowSelection(row, true)
        vueBus.$emit(this.set.clickRow.control_id, { // 点击学生数据行获取相应家长信息
          fn: 'getList',
          params: {
            studentId: row.id
          }
        })
        vueBus.$emit(this.set.clickRowId.control_id, { // 获取选中行的学生id用于添加相应家长信息
          fn: 'getCheckedStu',
          params: {
            studentId: row.id
          }
        })
      }
    },
    // 渲染数据
    getList(params) {
      const _params = {
        pageSize: this.listQuery.limit,
        pageNum: this.listQuery.page
      }
      let _val = {}
      if (params) {
        _val = params
      }
      for (const k in _val) {
        _params[k] = _val[k]
      }
      fetchList({
        url: this.set.queryUrl,
        params: _params
      }).then(response => {
        console.log('参数', _params)
        if (response.statusCode === 200) {
          this.total = response.data.total
          this.tableDataEnd = response.data.list
        } else if (response.statusCode === 503) { // 数据为空时不渲染表格
          this.total = 0
          this.tableDataEnd = null
          this.$message({
            showClose: true,
            message: '没有找到指定内容！',
            type: 'info',
            duration: 1000
          })
        }
      })
    },
    handleCurrentChange(val) {
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
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
    // 过滤字段
    formatterFn(row, column) {
      let _val = ''
      const _formatterMap = Object.assign({}, this.formatterMap, staticFormatterMap) // 动态和静态数据求交集
      if (column.property in _formatterMap) {
        _val = _formatterMap[column.property].get(row[column.property])
      } else {
        _val = row[column.property]
      }
      return _val
    },
    // 双击行显示抽屉
    showDrawer(row) {
      vueBus.$emit(this.set.vueBusName, { row: row, label: this.meta.tableHeader })
    }
  }
}
</script>
<style lang="scss" scoped>
  @import "emTable";
</style>
