<template>
  <el-container>
    <el-header>
      <em-button ref="btn" :data="buttonGroupItem" @click="clickMethod" />
    </el-header>
    <el-main>
      <em-table ref="myTable" :data="dataItem" />
      <em-dialog ref="em_dialog" :data="formItem" />
    </el-main>
  </el-container>
</template>
<script>
import { mapGetters } from 'vuex'
import vueBus from '@/utils/vueBus'
import { FilterTree } from '@/utils/tool'
/* import { delList } from '@/api/schoolService/classInfo'*/
import EmButton from './components/emButtons/emButtons'
import EmTable from './components/emTable/emTable'
import EmDialog from './components/emDialog/emDialog'
export default {
  name: 'SchoolInfo',
  components: { EmDialog, EmTable, EmButton },
  data() {
    return {
      id: '',
      set: {
      },
      buttonGroupItem: '',
      dataItem: '',
      formItem: '',
      ids: []
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
  methods: {
    init() {
      const _route = this.$route
      const _meta = _route.meta
      const _permissionRoutes = this.permission_routes
      this.id = _meta.system_id
      const Tree = new FilterTree({
        treeData: _permissionRoutes,
        key: ['meta', 'system_id'],
        value: _meta.system_id
      })
      const _data = Tree.getData()
      console.log('班级表头：', _data)
      if (_data.length === 1 && 'children' in _data[0]) {
        _data[0].children.forEach((_item) => {
          switch (_item.meta.system_type) {
            case 'EmButton':
              this.buttonGroupItem = _item
              break
            case 'EmTable':
              this.dataItem = _item
              break
            case 'EmDialog':
              this.formItem = _item
              break
          }
        })
      }
    },
    // 按钮组方法
    clickMethod(val) {
      this.fn = val
      // 添加数据
      if (val === 'handleCreate') {
        console.log('点击 了添加')
        this.$refs.em_dialog.changeDialogVisible()
        this.$refs.em_dialog.titleCreate()
        // 删除行
      } else if (val === 'handleDelete') {
        console.log('点击了删除按钮')
        this.$refs.myTable.remove()
      }
    }
  }
}
</script>
