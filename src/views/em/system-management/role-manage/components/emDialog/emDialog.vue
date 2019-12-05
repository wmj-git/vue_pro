<template>
  <div class="emDialog">
    <el-dialog
      v-el-drag-dialog
      :close-on-click-modal="true"
      :title="set.title"
      :modal="set.modal"
      :visible.sync="set.dialogVisible"
      :width="set.width"
      :destroy-on-close="true"
      :append-to-body="set.appendToBody"
      @close="clear"
    >
      <el-row :gutter="2">
        <template v-for="(component, index) in children.ContainerItem">
          <el-col :key="index" :span="Number(component.meta.span)" :offset="Number(component.meta.offset)">
            <component :is="component.meta.componentType" :ref="component.meta.system_id" :data="component" />
          </el-col>
        </template>
      </el-row>
    </el-dialog>
  </div>
</template>

<script>
// import vueBus from '@/utils/vueBus'
import { mapGetters } from 'vuex'
import { emMixin } from '@/utils/mixins'
import elDragDialog from '@/directive/el-drag-dialog' // base on element-ui
import { dataInitFn, childrenInitFn, FilterTree } from '@/utils/tool'
import emButtonGroup from '../emButtonGroup/emButtonGroup'
import emTree from '../emTree/emTree'
import emForm from '../emForm/emForm'

export default {
  name: 'EmDialog',
  directives: { elDragDialog },
  components: {
    emButtonGroup,
    emTree,
    emForm
  },
  mixins: [emMixin],
  data() {
    return {
      set: {
        dialogVisible: true,
        clear: true,
        appendToBody: true,
        title: '标题',
        modal: true,
        width: '380px',
        childrenId: 'none'
      },
      children: {
        ContainerItem: []
      }
    }
  },
  computed: {
    ...mapGetters([
      'permission_routes'
    ])
  },
  created() {
    this.init()
  },
  mounted() {

  },
  beforeDestroy() {

  },
  methods: {
    fn(_obj, _data) {
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
      if (!(this.set.clear)) {
        this.children = childrenInitFn(this.children, this.componentData)
      }
    },
    childrenFn(_val) {
      const _permissionRoutes = this.permission_routes
      const Tree = new FilterTree({
        treeData: _permissionRoutes,
        key: ['meta', 'system_id'],
        value: _val
      })
      const _data = Tree.getData()
      if (_data.length > 0) {
        return _data[0]
      }
    },
    clear() {
      if (this.set.clear) {
        this.children.ContainerItem.splice(0, this.children.ContainerItem.length)
        if (this.set.childrenId === 'none') {
          this.children = childrenInitFn(this.children, this.childrenFn(this.system_id))
        } else {
          this.children = childrenInitFn(this.children, this.childrenFn(this.set.childrenId))
        }
      }
    },
    openFn(_obj) {
      if (_obj && 'set' in _obj) {
        this.set = dataInitFn(this.set, _obj.set)
      } else {
        this.set.dialogVisible = true
      }
      this.clear()
    },
    closeFn() {
      this.set.dialogVisible = false
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "emDialog";
</style>
