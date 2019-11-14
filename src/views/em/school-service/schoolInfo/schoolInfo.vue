<template>
  <div class="schoolInfo-container">
    <el-container>
      <el-header style="text-align: right; font-size: 12px">
        <em-button ref="btn" :data="buttonGroupItem" @click="clickMethod" />
      </el-header>
      <el-main>
        <em-table />
      </el-main>
    </el-container>
  </div>
</template>
<script>
import vueBus from '@/utils/vueBus'
import { fetchList, delList } from '@/api/schoolService/schoolInfo'
import { mapGetters } from 'vuex'
import { FilterTree } from '@/utils/tool'
import EmTable from '@/views/em/school-service/schoolInfo/components/emTable/emtable'
import EmButton from './components/emButtonGroup/emButtonGroup'
export default {
  name: 'SchoolInfo',
  components: { EmButton, EmTable },
  data() {
    return {
      buttonGroupItem: '' // 按钮
    }
  },
  computed: {
    ...mapGetters([
      'permission_routes'
    ])
  },
  created() {
    this.init()
    vueBus.$on(this.id, obj => {
      this[obj.fn](obj)
    })
  },
  beforeDestroy() {
    vueBus.$off(this.id)
  },
  methods: {
    init() {
      const _route = this.$route
      const _meta = _route.meta
      const _permissionRoutes = this.permission_routes
      this.id = _meta.system_id
      console.log('_route：', _route, 'permission_routes：', _permissionRoutes)

      const Tree = new FilterTree({
        treeData: _permissionRoutes,
        key: ['meta', 'system_id'],
        value: _meta.system_id
      })
      const _data = Tree.getData()
      console.log('_data：', _data)
      if (_data.length === 1 && 'children' in _data[0]) {
        _data[0].children.forEach((_item) => {
          switch (_item.meta.system_type) {
            case 'EmButton':
              this.buttonGroupItem = _item
              break
          }
        })
      }
    },
    getList() {
      fetchList({
        pageSize: this.listQuery.limit,
        pageNum: this.listQuery.page
      }).then(response => {
        this.total = response.data.total
        this.tableDataEnd = response.data.list
      })
    },
    // 按钮组方法
    clickMethod(val) {
      this.fn = val
      // 添加数据
      if (val === 'handleCreate') {
        this.$refs.em_dialog.changeDialogVisible()
        this.$refs.em_dialog.titleCreate()
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
<style lang="scss" scoped>
  @import "schoolInfo";
</style>
