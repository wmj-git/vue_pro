<template>
  <div class="role-container">
    <el-card v-if="set.buttonGroup">
      <el-row>
        <template v-for="(item,index) in children.buttonGroupItem">
          <el-col :key="index" :offset="Number(item.meta.offset)" :span="Number(item.meta.span)">
            <em-button-group :data="item" />
          </el-col>
        </template>
      </el-row>
    </el-card>
    <split-pane split="vertical" :min-percent="20" :default-percent="Number(set.verticalPercent)">
      <template slot="paneL">
        <div style="overflow: auto;height: 100%;">
          <el-row v-if="set.tree">
            <template v-for="(item,index) in children.treeItem">
              <el-col :key="index" :offset="Number(item.meta.offset)" :span="Number(item.meta.span)">
                <em-tree :data="item" />
              </el-col>
            </template>
          </el-row>
        </div>
      </template>
      <template slot="paneR">
        <split-pane split="horizontal" :min-percent="20" :default-percent="Number(set.horizontalPercent)">
          <template slot="paneL">
            <div style="overflow: auto;height: 100%;">
              <el-row v-if="set.form_L">
                <template v-for="(item,index) in children.form_L_item">
                  <el-col :key="index" :offset="Number(item.meta.offset)" :span="Number(item.meta.span)">
                    <em-form :data="item" />
                  </el-col>
                </template>
              </el-row>
            </div>
          </template>
          <template slot="paneR">
            <div style="overflow: auto;height: 100%;">
              <el-row v-if="set.form_R">
                <template v-for="(item,index) in children.form_R_item">
                  <el-col :key="index" :offset="Number(item.meta.offset)" :span="Number(item.meta.span)">
                    <em-form :data="item" />
                  </el-col>
                </template>
              </el-row>
            </div>
          </template>
        </split-pane>
      </template>
    </split-pane>
    <!--容器类显示-->
    <template v-for="(item,index) in children.ContainerBox">
      <component :is="item.meta.componentType" :key="index" :data="item" />
    </template>
  </div>
</template>
<script>
import { emMixin, emPage } from '@/utils/mixins'
// import vueBus from '@/utils/vueBus'
import { dataInitFn, childrenInitFn } from '@/utils/tool'
import splitPane from 'vue-splitpane'

// import emTree from './components/emTree/emTree'
import emTree from './components/emTree/emTree'
import emForm from './components/emForm/emForm'
import emButtonGroup from './components/emButtonGroup/emButtonGroup'
import emDialog from './components/emDialog/emDialog'

export default {
  name: 'RoleManage',
  components: {
    splitPane,
    emTree,
    emForm,
    emButtonGroup,
    emDialog
  },
  mixins: [emMixin, emPage],
  data() {
    return {
      set: {
        verticalPercent: '30',
        horizontalPercent: '50',
        buttonGroup: false,
        tree: false,
        form_L: false,
        form_R: false
      },
      children: {
        buttonGroupItem: [],
        treeItem: [],
        form_L_item: [],
        form_R_item: [],
        ContainerBox: []
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
    init() {
      this.set = dataInitFn(this.set, this.meta)
      this.children = childrenInitFn(this.children, this.componentData)
      console.log('EmDialog123：', this.$data)
    }
  }
}
</script>
<style lang="scss" scoped>
@import "role-manage";
</style>
