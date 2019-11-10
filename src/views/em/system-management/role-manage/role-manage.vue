<template>
  <div class="role-container">
    <split-pane split="vertical" :min-percent="20" :default-percent="30">
      <template slot="paneL">
        <el-row>
          <el-col :span="48">
            <el-card>
              <el-tree :data="treeData" :props="defaultProps" />
            </el-card>
          </el-col>
        </el-row>
      </template>
      <template slot="paneR">
        <split-pane split="horizontal">
          <template slot="paneL">
            <el-row>
              <el-col :span="48">
                <el-card>
                  范德萨发的发的
                </el-card>
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

import vueBus from '@/utils/vueBus'
// import { toTree } from '@/utils/tool'
import splitPane from 'vue-splitpane'

export default {
  name: 'RoleManage',
  components: {
    splitPane
  },
  data() {
    return {
      id: '',
      set: {
      },
      treeData: [
        {
          id: 1,
          label: '一级 1',
          children: [{
            id: 4,
            label: '二级 1-1',
            children: [{
              id: 9,
              label: '三级 1-1-1'
            }, {
              id: 10,
              label: '三级 1-1-2'
            }]
          }]
        },
        {
          id: 2,
          label: '一级 2',
          children: [{
            id: 5,
            label: '二级 2-1'
          }, {
            id: 6,
            label: '二级 2-2'
          }]
        },
        {
          id: 3,
          label: '一级 3',
          children: [{
            id: 7,
            label: '二级 3-1'
          }, {
            id: 8,
            label: '二级 3-2'
          }]
        }],
      defaultProps: {
        children: 'children',
        label: 'label'
      }
    }
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
      const _route = this.$route.meta
      console.log('path：', this.$route.path, '$route:', this.$route)
      console.log('_route：', _route)
      // this.id = this.data.systemId
    }
  }
}
</script>
<style lang="scss" scoped>
@import "role-manage";
</style>
