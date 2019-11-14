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
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import vueBus from '@/utils/vueBus'
import { FilterTree, dataInitFn, childrenInitFn } from '@/utils/tool'
import splitPane from 'vue-splitpane'

import emTree from './components/emTree/emTree'
import emForm from './components/emForm/emForm'
import emButtonGroup from './components/emButtonGroup/emButtonGroup'

export default {
  name: 'RoleManage',
  components: {
    splitPane,
    emTree,
    emForm,
    emButtonGroup
  },
  data() {
    return {
      id: '',
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
        form_R_item: []
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
    vueBus.$on(this.id, obj => {
      this[obj.fn](obj)
    })
  },
  mounted() {
  },
  beforeDestroy() {
    vueBus.$off(this.id)
  },
  methods: {
    init() {
      const _route = this.$route
      const _meta = _route.meta
      const _permissionRoutes = this.permission_routes
      console.log('_route：', _route, 'permission_routes：', _permissionRoutes)

      this.id = _meta.system_id
      this.set = dataInitFn(this.set, _meta)
      console.log('set：', this.set)

      const Tree = new FilterTree({
        treeData: _permissionRoutes,
        key: ['meta', 'system_id'],
        value: _meta.system_id
      })
      const _data = Tree.getData()
      if (_data.length > 0) {
        this.children = childrenInitFn(this.children, _data[0])
      }
      console.log('_data：', _data)
      console.log('children：', this.children)
    }
  }
}
</script>
<style lang="scss" scoped>
@import "role-manage";
</style>
