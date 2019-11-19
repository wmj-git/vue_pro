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
            <component :is="component.meta.componentType" :data="component" />
          </el-col>
        </template>
      </el-row>
    </el-dialog>
  </div>
</template>

<script>
// import vueBus from '@/utils/vueBus'
import { emMixin } from '@/utils/mixins'
import elDragDialog from '@/directive/el-drag-dialog' // base on element-ui
import { dataInitFn, childrenInitFn } from '@/utils/tool'
import emButtonGroup from '../emButtonGroup/emButtonGroup'
import emTree from '../emTree/emTree'

export default {
  name: 'EmDialog',
  directives: { elDragDialog },
  components: {
    emButtonGroup,
    emTree
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
        width: '380px'
      },
      children: {
        ContainerItem: []
      }
    }
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

    },
    init() {
      this.set = dataInitFn(this.set, this.meta)
      this.children = childrenInitFn(this.children, this.componentData)
      console.log('EmDialog：', this.$data)
    },
    clear() {
      if (this.set.clear) {
        this.children.ContainerItem.splice(0, this.children.ContainerItem.length)
      }
    },
    openFn(_val) {
      this.set.dialogVisible = true
      /* if (_val && 'meta' in _val) {
        this.set = dataInitFn(this.set, _val.meta)
      }
      if (_val && 'children' in _val) {
        this.children = childrenInitFn(this.children, _val)
      }*/
    },
    closeFn(_val) {
      this.set.dialogVisible = false
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "emDialog";
</style>
