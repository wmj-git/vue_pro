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
        queryAllUrl: '',
        vueBusName: ''
      },
      visibleSubmit: '',
      selectRow: [], // 选中行
      formatterMap: {}, // 需要过滤的动态数据字段（后台返回的id转换为对应的中文名称）
      tableHeader: [],
      tableDataEnd: [],
      currentFloor: '', // 当前楼层（楼层id渲染表格数据）
      multipleSelection: [], // 初始化时没有值，forEach属性不能用，就算作了判断也不行
      pageOne: false,
      total: 0,
      listQuery: {
        limit: 10,
        page: 1
      },
      ids: [],
      children: {
        columnBtn: [] // 行内按钮
      },
      rowClick: 'none',
      classes: ''
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
  mounted() {
    vueBus.$on('floorInfo', val => {
      this.currentFloor = val
    })
  },
  created() {
    this.init()
    this.getAllList()
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
        case 'TableInfo_editData_dialogVisible':
          vueBus.$emit(_controlId, {
            meta: _obj.meta,
            data: Object.assign({}, _data.row)
          })
          break
        case 'TableInfo_connectData_dialogVisible':
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
      this.getAllList()
    },
    // 查询
    handleFilter(_obj) {
      if (_obj.temp) {
        // 接受后需要传递给查询接口，不然还是查询不到
        this.getList(_obj.temp)
      }
    },
    // 默认显示所有未分配建筑或楼层的设备信息
    getAllList(params) {
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
        url: this.set.queryAllUrl,
        params: _params
      }).then(val => {
        if (val.statusCode === 200) {
          /* this.children.columnBtn[1].meta.className = ''*/ // 学校才能给指定老师分配班级（去掉类名即可显示‘分配班级’）
          this.total = val.data.total
          this.tableDataEnd = val.data.list
        } else if (val.statusCode === 503) { // 数据为空时不渲染表格
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
    // 渲染数据(指定楼层的设备)
    getList(params) {
      const _params = {
        floorId: this.currentFloor.id,
        pageSize: this.listQuery.limit,
        pageNum: this.listQuery.page
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
          if (response.statusCode === 200) {
            this.total = response.data.total
            this.tableDataEnd = response.data.list
            if (response.data.total === 0) { // 数据为空时不渲染表格
              this.tableDataEnd = null
              this.$message({
                showClose: true,
                message: '没有找到指定内容！',
                type: 'info',
                duration: 1000
              })
            }
          }
        })
      }
    },
    // 渲染数据(指定建筑的设备)
    getBuildList(params) {
      const _params = {
        pageSize: this.listQuery.limit,
        pageNum: this.listQuery.page
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
          if (response.statusCode === 200) {
            this.total = response.data.total
            this.tableDataEnd = response.data.list
            /* this.children.columnBtn[1].meta.className = 'distribution_class' */
          } else if (response.statusCode === 503) { // 数据为空时不渲染表格
            this.tableDataEnd = null
            this.$message({
              showClose: true,
              message: '没有找到指定内容！',
              type: 'info',
              duration: 1000
            })
          }
        })
      }
    },
    handleCurrentChange(val) {
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    // 删除选中行
    remove() {
      console.log('点击删除了！')
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
              this.getAllList()
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
      console.log('详情信息：', row)
      vueBus.$emit('tableDetail', { row: row, label: this.meta.tableHeader })
    }
  }
}
</script>
<style lang="scss" scoped>
  @import "emTable";
</style>
