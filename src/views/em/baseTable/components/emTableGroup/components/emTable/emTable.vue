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
            width="54"
            fixed="left"
            align="center"
            label="序号"
            :index="tableIndex"
          />
          <template v-for="(column,index) in set.tableHeader">
            <el-table-column
              v-if="column.columnType && column.columnType === 'unusualTimes'"
              :key="index"
              :prop="column.prop"
              :label="column.label"
              :width="column.width"
              :show-overflow-tooltip="true"
              :formatter="formatterFn"
            >
              <template slot-scope="scope">
                <el-popover trigger="hover" placement="top">
                  <el-timeline :reverse="false">
                    <el-timeline-item
                      v-for="(activity, _index) in unusualTimesFn(scope.row)"
                      :key="_index"
                      :color="'#0bbd87'"
                      :timestamp="activity.end"
                    >
                      {{ activity.start }}
                    </el-timeline-item>
                  </el-timeline>
                  <div slot="reference" class="name-wrapper">
                    <el-tag size="medium">监控时段</el-tag>
                  </div>
                </el-popover>
              </template>
            </el-table-column>
            <el-table-column
              v-else
              :key="index"
              :prop="column.prop"
              :label="column.label"
              :width="column.width"
              :show-overflow-tooltip="true"
              :formatter="column.noFormatter && column.noFormatter === true ? noFormatterFn : formatterFn"
            />
          </template>
          <el-table-column v-if="children.columnBtn.length > 0" :width="set.columnBtnWidth" fixed="right" label="操作">
            <template slot-scope="scope">
              <template v-for="(btn, _index ) in children.columnBtn">
                <el-button
                  v-if="buttonIfFn(scope.row,btn)"
                  :key="_index"
                  :ref="btn.meta.system_id"
                  :disabled="buttonDisabledFn(scope.row,btn)"
                  class="em-btn-operation table_inLine_btn"
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
// import vueBus from '@/utils/vueBus'
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
        queryMethod: 'post', // 查询接口请求类型
        appendUrl: '',
        appendMethod: 'post',
        removeUrl: '',
        removeMethod: 'post',
        updateUrl: '',
        updateMethod: 'post',
        rowClick: 'none',
        columnBtnWidth: 180, // 操作列宽度
        paginationSever: true, // 是否后台分页
        treeShow: false, // 是否显示树形结构
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
        case 'none':
          console.log(_controlId)
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
      let _params = {
        pageNum: this.pagination.currentPage,
        pageSize: this.pagination.pageSize
      }
      try {
        if (params) {
          _params = Object.assign(_params, params)
        }
      } catch (error) {
        console.log(error.message)
      } finally {
        query({ // 页面渲染时拿表格数据
          url: this.set.queryUrl,
          method: this.set.queryMethod,
          params: _params
        }).then(res => {
          let _list = []

          if (res.data && 'list' in res.data) {
            _list = res.data.list
          } else if (res.data) {
            _list = res.data
          } else {
            return
          }

          if (this.set.treeShow) {
            this.tableData = toTree(_list, {
              id: this.set.treeShow_set.id,
              pid: this.set.treeShow_set.pid
            })
          } else {
            this.tableData = _list
          }

          if (this.set.paginationSever) {
            this.pagination.totalSize = res.data.total
          } else {
            this.pagination.totalSize = _list.length
          }
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
      if (this.set.rowClick !== 'none') {
        this.fn({
          meta: this.set.rowClick
        }, row)
      }
      console.log(1, row, column, event)
    },
    // 双击行
    handleRowDoubleClick(row, column, event) {
      console.log(2, row, column, event)
    },
    // 查询数据
    queryFn(_obj) {
      this.pagination.currentPage = 1
      if (_obj.Form) {
        this.createDataFn(_obj.Form)
      } else {
        this.createDataFn(_obj.data)
      }
    },
    // 添加一行数据
    addFn(_obj) { // 添加一行数据
      const _this = this
      let _params = null
      if (_this.set.appendUrl === '/user/user/addOrgUser') {
        _params = {
          'addPo': {
            'ids': _obj.data.ids
          },
          'user': {
            'phone': _obj.data.phone,
            'username': _obj.data.username
          }
        }
      } else {
        _params = _obj.data
      }
      add({ // 页面渲染时拿表格数据
        url: _this.set.appendUrl,
        params: _params
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
    // 删除单行数据
    delOneFn(_obj) {
      const _this = this
      let _val = this
      this.$confirm('此操作将删除所选项, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        if ('data' in _obj && _obj.data) {
          _val = _obj.data
        } else {
          return
        }
        del({
          url: _this.set.removeUrl,
          params: _val
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
    },
    // 选择删除多行数据
    delFn(_obj) {
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
    // 表单字段格式化
    formatterFn(row, column) {
      let _val = ''
      let _fn = null
      const _formatterMap = Object.assign({}, this.formatterMap, staticFormatterMap)
      if ((column.property in _formatterMap) && (typeof _formatterMap[column.property] !== 'function')) {
        _val = _formatterMap[column.property].get(row[column.property])
      } else if ((column.property in _formatterMap) && (typeof _formatterMap[column.property] === 'function')) {
        _fn = _formatterMap[column.property]
        _val = _fn(row[column.property])
      } else {
        _val = row[column.property]
      }
      return _val
    },
    noFormatterFn(row, column) {
      return row[column.property]
    },
    unusualTimesFn(str) {
      if (str.unusualTimes) {
        str = JSON.parse(str.unusualTimes)
      } else {
        str = [{
          start: '00:00:00',
          end: '00:00:00'
        }]
      }
      // console.log(str)
      return str
    },
    windowOpen(_obj) {
      // console.log('windowOpen', _obj)
      const _meta = _obj.meta
      // 请求的数据
      const _currentRole = this.$store.getters['currentRole'] // 当前角色信息
      let _params = _obj.data
      _params = dataInitFn(_params, _currentRole)
      const _set = _meta.fn_set
      const _url = _set.requestUrl
      let _str = ''
      for (const k in _params) {
        _str += k + '=' + _params[k] + '&'
      }
      _str += 'Authorization=' + this.$store.getters['token']
      window.open(`${process.env.VUE_APP_ACT_API + _url + '?' + _str}`, '_blank')
    },
    buttonDisabledFn(_row, _btn) { // 初始判断按钮是否禁用
      let _value = false
      if (!('buttonDisabledKey' in _btn.meta)) {
        return _value
      }
      switch (_btn.meta.buttonDisabledKey) {
        case 'category':
          if ('category' in _row) {
            _value = _row['category'] === 'false'
          }
          break
      }

      return _value
    },
    buttonIfFn(_row, _btn) {
      let _value = true
      let _key = null
      let _type = null
      if (!('buttonIfSet' in _btn.meta)) {
        return _value
      }
      _key = _btn.meta.buttonIfSet.key
      _type = _btn.meta.buttonIfSet.type
      switch (_type) {
        case '1':
          _value = _row[_key] === 'false'
          break
      }
      return _value
    }
  }
}
</script>
<style lang="scss" scoped>
  @import "emTable";
</style>
