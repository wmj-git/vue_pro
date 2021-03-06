<template>
  <div class="school-container table-container">
    <el-table
      :ref="system_id"
      :data="tableDataEnd "
      border
      :height="tableHeight"
      style="width: 100%;"
      :row-style="rowClass"
      @selection-change="handleSelectionChange"
      @row-dblclick="showDrawer"
      @row-click="handleRowClick"
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
      <el-table-column
        v-for="info in meta.tableHeader"
        :key="info.key"
        :label="info.label"
        :prop="info.key"
        :formatter="formatterFn"
      />
      <el-table-column label="操作" fixed="right" width="200px">
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
import { staticFormatterMap } from '@/utils/formatterMap'

import { emMixin } from '@/utils/mixins'
import { dataInitFn, childrenInitFn } from '@/utils/tool'
import { fetchList, delList } from '@/api/schoolService/tableInfo'
export default {
  name: 'EmTable',
  mixins: [emMixin],
  data() {
    return {
      id: '',
      tableHeight: window.innerHeight - 240,
      set: {
        queryUrl: '',
        removeUrl: '',
        vueBusName: ''// 抽屉
      },
      selectRow: [], // 选中行
      formatterMap: {}, // 需要过滤的动态数据字段（后台返回的id转换为对应的中文名称）
      tableHeader: [
        {
          value: '',
          formatterSet: {
            url: ''
          }
        }
      ],
      tableDataEnd: [],
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
      }
    }
  },
  watch: {
    multipleSelection(data) { // 存储选中的row
      this.selectRow = []
      if (data.length > 0) {
        data.forEach((item, index) => {
          this.selectRow.push(item.id)
        })
      }
    }
  },
  created() {
    this.init()
    this.getList()
    vueBus.$on('query', () => {
      this.getList()
    })
    vueBus.$on('device_type', (val) => {
      this.formatterMap = val // 接受后台获取的动态字段值(传值时已标明字段值)
    })
  },
  methods: {
    init() {
      this.set = dataInitFn(this.set, this.meta)
      this.children = childrenInitFn(this.children, this.componentData)
    },
    fn(_obj, _data) {
      Object.assign({}, _data.row)
      const _controlType = _obj.meta.control_type ? _obj.meta.control_type : ''
      const _controlId = _obj.meta.control_id
      switch (_controlType) {
        case 'DeviceInfo_editData_dialogVisible':
          vueBus.$emit(_controlId, {
            meta: _obj.meta,
            data: Object.assign({}, _data.row)
          })
          break
        default:
          this.FN(_obj, _data)
      }
    },
    /* 点击行选中复选框*/
    handleRowClick(row) {
      this.$refs[this.system_id].toggleRowSelection(row)
    },
    /* 选中复选框高亮显示*/
    rowClass({ row, rowIndex }) {
      if (this.selectRow.includes(row.id)) {
        return { 'backgroundColor': 'rgba(4, 86, 169, 0.2)' }
      }
    },
    tableIndex(index) { // 第二页开始表格数据行号不从1开始
      return (this.listQuery.page - 1) * this.listQuery.limit + index + 1
    },
    // 分页改变:改变条数和分页
    handlePaginationChange(res) {
      this.listQuery = res
      this.getList()
    },
    // 查询
    handleFilter(_obj) {
      if (_obj.temp) {
        // 接受后需要传递给查询接口，不然还是查询不到
        this.getList(_obj.temp)
      }
    },
    // 渲染数据
    getList(params) {
      const _params = {
        pageSize: this.listQuery.limit,
        pageNum: this.listQuery.page,
        enumType: 'device_type' // 设备类型
      }
      try {
        let _val = {}
        if (params) {
          _val = params
        }
        for (const k in _val) {
          _params[k] = _val[k]
        }
      } catch (e) {
        console.log(e)
      } finally {
        fetchList({
          url: this.set.queryUrl,
          params: _params
        }).then(response => {
          this.total = response.data.total
          this.tableDataEnd = response.data.list
        })
      }
    },
    handleCurrentChange(val) {
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    handleEdit(row) {
      vueBus.$emit(this.set.vueBusName, Object.assign({}, row)) // 当前选中行内容返回给表单（当有两个按钮时无法区别点击了哪个按钮）
    },
    // 删除选中行
    remove() {
      var _val = this.multipleSelection
      _val.forEach(_val => {
        //  提取出需要传给后台的参数ids
        this.ids.push(_val.id)
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
    showDrawer(row) {
      vueBus.$emit(this.set.vueBusName, { row: row, label: this.meta.tableHeader })
    }
  }
}
</script>
<style lang="scss" scoped>
  @import "emTable";
</style>
