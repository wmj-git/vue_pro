<template>
  <div class="role-container">
    <split-pane split="vertical" :min-percent="20" :default-percent="30">
      <template slot="paneL">
        <el-row>
          <el-col :span="48">
           <em-tree></em-tree>
          </el-col>
        </el-row>
      </template>
      <template slot="paneR">
        <split-pane split="horizontal">
          <template slot="paneL">
            <el-row>
              <el-col :span="48">
                <em-form></em-form>
              </el-col>
            </el-row>
          </template>
          <template slot="paneR">
            <el-row>
              <el-col :span="48">
                <el-card>
                  范德萨发的发的
                </el-card>
              </el-col>
            </el-row>
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

export default {
  name: 'RoleManage',
  components: {
    splitPane,
    emTree,
    emForm
  },
  data() {
    return {
      id: '',
      set: {
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
      console.log('_route：', _route, 'permission_routes：', this.permission_routes)
      // this.id = this.data.systemId
    }
  }
}
</script>
<style lang="scss" scoped>
@import "role-manage";
</style>
