<template>
  <div class="emTable-container">
    <el-row>
      <el-col :span="48">
        <el-table
          v-loading="listLoading"
          border
          highlight-current-row
          tooltip-effect="dark"
          :data="tableData"
          style="width: 100%;"
          :max-height="set.maxHeight"
          row-key="id"
          :tree-props="{children: 'children'}"
          @current-change="handleCurrentChange"
          @selection-change="handleSelectionChange"
          @row-click="handleRowClick"
          @row-dblclick="handleRowDoubleClick"
        >
          <el-table-column
            align="center"
            type="selection"
            width="54"
          />
          <el-table-column
            type="index"
            fixed="left"
            align="center"
            :index="tableIndex"
          />
          <template v-for="(column,index) in set.tableHeader">
            <el-table-column
              :key="index"
              :prop="column.prop"
              :label="column.label"
              :width="column.width"
              :show-overflow-tooltip="true"
              :formatter="formatterFn"
            />
          </template>
          <el-table-column  :width="248" fixed="right" label="操作">
            <template slot-scope="scope">
              <template v-for="(btn, _index ) in children.columnBtn">
                <el-button
                  :key="_index"
                  :ref="btn.meta.system_id"
                  class="em-btn-operation"
                  size="mini"
                  :type="btn.meta.buttonType ? btn.meta.buttonType : 'primary'"
                  @click.stop
                  @click="fn(btn,{'index':scope.$index,'row':scope.row,'control_type':btn.meta.control_type})"
                >
                  {{ btn.meta.title }}
                </el-button>
              </template>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="48">
        <el-pagination
          :current-page="pagination.currentPage"
          :page-sizes="[10,50,100,500,1000]"
          :page-size="pagination.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="pagination.totalSize"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChangePage"
        />
      </el-col>
    </el-row>
  </div>
</template>
<script>
import vueBus from '@/utils/vueBus'
import { emMixin } from '@/utils/mixins'
import { staticFormatterMap } from '@/utils/formatterMap'
import { dataInitFn, childrenInitFn, toTree } from '@/utils/tool'
import { add, del, update, query } from '@/api/baseTable/table'
export default {
  name: 'EmTable',
  mixins: [emMixin],
  data() {
    return {
      set: {
        queryUrl: '',
        appendUrl: '',
        removeUrl: '',
        updateUrl: '',
        updateMethod: 'post',
        treeShow: false,
        treeShow_set: {
          id: 'id',
          pid: 'pid'
        },
        maxHeight: '100',
        tableHeader: []
      },
      listLoading: true, // 加载状态
      formatterMap: {},
      tableData: [], // 表数据
      currentRow: null, // 单选对象
      multipleSelection: [], // 多选框对象组
      children: {
        columnBtn: [] // 配置表行内按钮,
      },
      pagination: { // 分页
        currentPage: 1, // 当前页
        pageSize: 10, // 当前信息条数
        totalSize: 0 // 总条数
      }
    }
  },
  watch: {
    tableData: {
      handler: function(val, oldVal) {
      },
      deep: true
    }
  },
  created() {
    this.init()
  },
  methods: {
    fn(_obj, _data) {
      Object.assign(_data, _data.row)
      const _controlType = _obj.meta.control_type ? _obj.meta.control_type : ''
      const _controlId = _obj.meta.control_id
      switch (_controlType) {
        case 'BaseTable_EmTableGroup_columnBtnClick--BaseTable_EmTableGroup_EmTable_queryFn':
          vueBus.$emit(_controlId, {
            meta: _obj.meta,
            data: _data
          })
          break
        case 'BaseTable_EmTableGroup_EmTable_columnBtnClick--BaseTable_EmDialog_openFn':
          vueBus.$emit(_controlId, {
            meta: _obj.meta,
            data: _data
          })
          this.controlGroupFn(_obj, _data)
          break
        default:
          this.FN(_obj, _data)
      }
    },
    init() {
      this.set = dataInitFn(this.set, this.meta)
      this.children = childrenInitFn(this.children, this.componentData)
      this.createDataFn()
    },
    createDataFn(params) { // 更新表数据
      this.listLoading = true
      const _params = {
        pageNum: this.pagination.currentPage,
        pageSize: this.pagination.pageSize
      }
      try {
        let _val = {}
        if (params) {
          _val = params
        }
        for (const k in _val) {
          _params[k] = _val[k]
        }
      } catch (error) {
        console.log(error.message)
      } finally {
        query({ // 页面渲染时拿表格数据
          url: this.set.queryUrl,
          params: _params
        }).then(res => {
          if (this.set.treeShow) {
            this.tableData = toTree(res.data.list, {
              id: this.set.treeShow_set.id,
              pid: this.set.treeShow_set.pid
            })
          } else {
            this.tableData = res.data.list
          }
          this.pagination.totalSize = res.data.total
          this.listLoading = false
        })
      }
    },
    tableIndex(index) { // 控制表格数据行号
      return (this.pagination.currentPage - 1) * this.pagination.pageSize + index + 1
    },
    handleSizeChange(val) { // 页条数
      this.pagination.pageSize = val
      this.createDataFn()
    },
    handleCurrentChangePage(val) { // 当前页
      this.pagination.currentPage = val
      this.createDataFn()
    },
    handleSelectionChange(val) { // 多选框（选中删除）
      this.multipleSelection = val
    },
    handleCurrentChange(val) { // 单选行 （选中修改）
      this.currentRow = val
    },
    // 单击行
    handleRowClick(row, column, event) {
      console.log(1, row, column, event)
    },
    // 双击行
    handleRowDoubleClick(row, column, event) {
      console.log(2, row, column, event)
    },
    // 查询数据
    queryFn(_obj) {
      if (_obj.Form) {
        this.createDataFn(_obj.Form)
      } else {
        this.createDataFn(_obj.data)
      }
    },
    // 添加一行数据
    addFn(_obj) { // 添加一行数据
      console.log(_obj)
      const _this = this
      add({ // 页面渲染时拿表格数据
        url: _this.set.appendUrl,
        params: _obj.data
      }).then(res => {
        if (res && res.statusCode === 200) {
          _this.$message({
            message: '恭喜你，添加成功',
            type: 'success'
          })
          this.listLoading = false
          this.callbackFn(this.senderData, res)
        }
      })
    },
    // 更新行数据
    updateFn(_obj) {
      console.log('updateFn', _obj)
      const _this = this
      update({
        url: _this.set.updateUrl,
        method: _this.set.updateMethod,
        params: _obj.Form || _obj.data
      }).then(res => {
        if (res) {
          if (res.statusCode === 200) {
            _this.$message({
              message: '恭喜你，更新成功',
              type: 'success'
            })
            this.callbackFn(this.senderData, res)
          }
        }
      })
    },
    // 选择删除行
    delFn(_obj) {
      console.log('del', _obj)
      const _this = this
      const _items = []

      if (this.multipleSelection && this.multipleSelection.length > 0) {
        this.$confirm('此操作将删除所选项, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.multipleSelection.forEach((_val) => {
            _items.push(_val.id)
          })
          del({
            url: _this.set.removeUrl,
            params: _items
          }).then(res => {
            if (res) {
              if (res.statusCode === 200) {
                _this.$message({
                  message: '恭喜你，删除成功',
                  type: 'success'
                })
                this.callbackFn(this.senderData, res)
              }
            }
          })
        }).catch(() => {

        })
      } else {
        _this.$message({
          message: '请勾选要删除的行!',
          type: 'error'
        })
      }
    },
    formatterFn(row, column) {
      let _val = ''
      const _formatterMap = Object.assign({}, this.formatterMap, staticFormatterMap)
      if (column.property in _formatterMap) {
        _val = _formatterMap[column.property].get(row[column.property])
      } else {
        _val = row[column.property]
      }
      return _val
    }
  }
}
</script>
<style lang="scss" scoped>
  @import "emTable";
</style>
