<template>
  <div class="emTree_container">
    <el-tree
      ref="tree"
      :data="treeData"
      :props="defaultProps"
      :load="loadNode"
      lazy
      @node-click="handleNodeClick" />
  </div>
</template>
<script>
import { fetchList } from '@/api/schoolService/classInfo'
export default {
  name: 'EmTree',
  data() {
    return {
      treeData: [],
      defaultProps: {
        children: 'children',
        label: 'label',
        isLeaf: 'leaf'
      },
      set: {
        queryUrl: ''
      }
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      fetchList({ // 班级信息
        url: 'school/class/queryAllByPage'
      }).then(response => {
        console.log('班级信息', response.data.list)
      })
    },
    handleNodeClick(data) {
      console.log(data)
    },
    loadNode(node, resolve) {
      if (node.level === 0) {
        // 树根节点名称为当前登录学校名称（以中横线为分界取第一个字符串）
        const name = (this.$store.getters.currentRole.description).split('-')[0]
        return resolve([{ label: name }])
      }
      if (node.level > 1) return resolve([])
      setTimeout(() => {
        const data = [{
          label: 'leaf',
          leaf: true
        }, {
          label: 'zone'
        }]
        resolve(data)
      }, 500)
    }
  }
}
</script>
