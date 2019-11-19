<template>
  <div class="emDialog">
    <el-dialog
      :close-on-click-modal="false"
      v-el-drag-dialog
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
    <div v-el-drag-dialog class="em-win">
      <div class="el-dialog__header">
        水电费第三方
      </div>
      去问问
    </div>
  </div>
</template>

<script>
// import vueBus from '@/utils/vueBus'
import { emMixin } from '@/utils/mixins'
import elDragDialog from '@/directive/el-drag-dialog' // base on element-ui
import { dataInitFn, childrenInitFn } from '@/utils/tool'
import emButtonGroup from '../emButtonGroup/emButtonGroup'

export default {
  name: 'EmDialog',
  directives: { elDragDialog },
  components: {
    emButtonGroup
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
      if (_val && 'meta' in _val) {
        this.set = dataInitFn(this.set, _val.meta)
      }
      if (_val && 'children' in _val) {
        this.children = childrenInitFn(this.children, _val)
      }
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
