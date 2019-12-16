<template>
  <div class="emTree_container">
    <el-tree
      :data="treeData"
      :props="defaultProps"
      :load="loadNode"
      lazy
      @node-click="handleNodeClick" />
  </div>
</template>
<script>
import { schoolName } from '@/api/schoolService/parentInfo'
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
    init(params) {
      console.log(11)
      const _params = {
        orgType: 5 // 查询学校
      }
      try {
        let _val = {}
        if (params) {
          _val = params
        }
        for (const k in _val) {
          _params[k] = _val[k]
        }
      } catch (e) {
        console.log(e)
      } finally {
        schoolName({
          url: this.set.queryUrl,
          params: _params
        }).then(response => {
          console.log(55, response)
        })
      }
    },
    handleNodeClick(data) {
      console.log(data)
    },
    loadNode(node, resolve) {
      if (node.level === 0) {
        return resolve([{ label: 'region' }])
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
