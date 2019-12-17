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
import { fetchList } from '@/api/schoolService/classInfo'
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
        queryUrl: ''
      },
      classData: [] // 班级
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
      console.log(data)
    },
    async loadNode(node, resolve) {
      if (node.level === 0) {
        // 树根节点名称为当前登录学校名称（以中横线为分界取第一个字符串）
        const name = (this.$store.getters.currentRole.description).split('-')[0]
        return resolve([{ label: name }])
      }
      if (node.level === 2) return resolve([])
      setTimeout(async() => {
        var classArr = []
        await fetchList({ // 班级信息
          url: this.set.queryUrl
        }).then(response => {
          response.data.list.forEach(val => {
            classArr.push({ 'label': val.name })
          })
        })
        for (const i in classArr) {
          this.classData.push({ label: classArr[i].label })
          resolve(this.classData)
        }
      }, 300)
    }
  }
}
</script>
