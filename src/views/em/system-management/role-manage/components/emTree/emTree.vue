<template>
  <div class="tree-container">
    <el-card>
      <el-tree :data="treeData" :props="defaultProps" />
    </el-card>
  </div>
</template>
<script>

import vueBus from '@/utils/vueBus'
// import { toTree } from '@/utils/tool'
export default {
  name: 'EmTree',
  components: {
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
  props: ["data"],
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
@import "emTree";
</style>