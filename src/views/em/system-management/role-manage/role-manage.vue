<template>
  <div class="role-container">
    <el-card v-if="set.buttonGroup">
      <em-button-group :data="buttonGroupItem" />
    </el-card>
    <split-pane split="vertical" :min-percent="20" :default-percent="Number(set.verticalPercent)">
      <template slot="paneL">
        <div style="overflow: auto;height: 100%;">
          <el-row>
            <el-col :span="48">
              <em-tree v-if="set.tree" :data="treeItem" />
            </el-col>
          </el-row>
        </div>
      </template>
      <template slot="paneR">
        <split-pane split="horizontal" :min-percent="20" :default-percent="Number(set.horizontalPercent)">
          <template slot="paneL">
            <div style="overflow: auto;height: 100%;">
              <el-row>
                <el-col :span="48">
                  <em-form v-if="set.form_L" :data="form_L_item" />
                </el-col>
              </el-row>
            </div>
          </template>
          <template slot="paneR">
            <div style="overflow: auto;height: 100%;">
              <el-row>
                <el-col :span="48">
                  <em-form v-if="set.form_R" :data="form_R_item" />
                </el-col>
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
import { FilterTree } from '@/utils/tool'
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
      buttonGroupItem: '',
      treeItem: '',
      form_L_item: '',
      form_R_item: ''
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
      this.set.verticalPercent = _meta.verticalPercent
      this.set.horizontalPercent = _meta.horizontalPercent
      this.set.buttonGroup = _meta.buttonGroup
      this.set.tree = _meta.tree
      this.set.form_L = _meta.form_L
      this.set.form_R = _meta.form_R

      const Tree = new FilterTree({
        treeData: _permissionRoutes,
        key: ['meta', 'system_id'],
        value: _meta.system_id
      })
      const _data = Tree.getData()
      console.log('_data：', _data)

      if (_data.length === 1 && _data[0].children) {
        _data[0].children.forEach((_item) => {
          switch (_item.meta.system_type) {
            case 'EmButtonGroup':
              this.buttonGroupItem = _item
              break
            case 'EmForm_L':
              this.form_L_item = _item
              break
            case 'EmForm_R':
              this.form_R_item = _item
              break
            case 'EmTree':
              this.treeItem = _item
              break
          }
        })
      }
    }
  }
}
</script>
<style lang="scss" scoped>
@import "role-manage";
</style>
