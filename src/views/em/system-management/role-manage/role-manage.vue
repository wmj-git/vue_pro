<template>
  <div class="role-container">
    <el-card>
      <!--<em-button-group></em-button-group>-->
    </el-card>
    <split-pane split="vertical" :min-percent="20" :default-percent="30">
      <template slot="paneL">
        <div style="overflow: auto">
          <el-row>
            <el-col :span="48">
              <em-tree></em-tree>
            </el-col>
          </el-row>
        </div>
      </template>
      <template slot="paneR">
        <split-pane split="horizontal" :min-percent="20" :default-percent="40">
          <template slot="paneL">
            <div style="overflow: auto;height: 100%;">
              <el-row >
                <el-col :span="48">
                  <em-form></em-form>
                </el-col>
              </el-row>
            </div>
          </template>
          <template slot="paneR">
            <div style="overflow: auto;height: 100%;">
              <el-row >
                <el-col :span="48">
                  <em-form></em-form>
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
// import { toTree } from '@/utils/tool'
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
        buttonGroup: false,
        tree: false,
        form_L: false,
        form_R: false
      },
      buttonGroupItems: [],
      treeItems: [],
      form_L_Items: [],
      form_R_Items: []
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
      console.log('_route：', _route, 'permission_routes：', this.permission_routes)
      // this.id = this.data.systemId
    }
  }
}
</script>
<style lang="scss" scoped>
@import "role-manage";
</style>
