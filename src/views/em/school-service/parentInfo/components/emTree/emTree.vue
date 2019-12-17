<template>
  <div class="emTree_container">
    <el-tree
      ref="tree"
      :data="treeData"
      :props="defaultProps"
      :load="loadNode"
      lazy
      @node-click="handleNodeClick"
    />
  </div>
</template>
<script>
import { fetchList, gradeCode } from '@/api/schoolService/parentInfo'
import { dataInitFn, childrenInitFn } from '@/utils/tool'
import { emMixin } from '@/utils/mixins'
export default {
  name: 'EmTree',
  mixins: [emMixin],
  data() {
    return {
      treeData: [],
      defaultProps: {
        children: 'children',
        label: 'label',
        isLeaf: 'leaf'
      },
      set: {
        queryUrl: '',
        gradeUrl: ''
      },
      classData: [], // 班级
      gradeData: [] // 年级
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      this.set = dataInitFn(this.set, this.meta)
      this.children = childrenInitFn(this.children, this.componentData)
    },
    handleNodeClick(data) {
    },
    async loadNode(node, resolve) {
      if (node.level === 0) {
        // 树根节点名称为当前登录学校名称（以中横线为分界取第一个字符串）
        const name = (this.$store.getters.currentRole.description).split('-')[0]
        return resolve([{ label: name }])
      }
      if (node.level === 1) { // 子节点一级
        var gradeArr = []
        await gradeCode({ // 年级信息
          url: this.set.gradeUrl
        }).then(response => {
          response.data.forEach(val => {
            gradeArr.push({ 'label': val.gradeName, 'value': val.gradeKey })
          })
        })
        return resolve(gradeArr)
      }
      if (node.level === 2) { // 子节点二级
        var classArr = []
        const _data = node.data
        var _params = {
          gradeKey: _data.value
        }
        await fetchList({ // 班级信息
          url: this.set.queryUrl,
          params: _params
        }).then(response => {
          response.data.list.forEach(val => {
            classArr.push({ 'label': val.name, 'value': val.gradeKey, leaf: true })
          })
        })
        return resolve(classArr)
      }
    }
  }
}
</script>
