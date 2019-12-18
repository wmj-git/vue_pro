<template>
  <div class="emTree_container">
    <el-tree
      ref="tree"
      :data="treeData"
      :props="defaultProps"
      :load="loadNode"
      accordion
      empty-text="暂无内容"
      node-key="id"
      :default-expand-all="expandAll"
      :filter-node-method="filterNode"
      lazy
      @node-click="handleNodeClick"
    >
      <span class="custom-tree-node" slot-scope="{ node, data }">
        <span>{{ node.label }}</span>
        <span>
          <el-button
            type="text"
            size="mini"
            @click="() => update(node, data)">
            修改
          </el-button>
          <el-button
            type="text"
            size="mini"
            @click="() => remove(node, data)">
            删除
          </el-button>
        </span>
      </span>
    </el-tree>
  </div>
</template>
<script>
import { fetchList, gradeCode, delList } from '@/api/schoolService/parentInfo'
import { dataInitFn, childrenInitFn } from '@/utils/tool'
import { emMixin } from '@/utils/mixins'
import vueBus from '@/utils/vueBus'
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
        gradeUrl: '',
        removeUrl: ''
      },
      expandAll: false,
      currentNode: []
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
    filterNode(value, data) {
      if (!value) return true
      return data[this.defaultProps.label].indexOf(value) !== -1
    },
    handleNodeClick(node, _data) {
      if (_data.level === 3) {
        vueBus.$emit('classId', _data.data.nodeData.id)
      }
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
            gradeArr.push({ 'label': val.gradeName, 'value': val.gradeKey, nodeData: val })
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
            classArr.push({ 'label': val.name, 'value': val.gradeKey, leaf: true, nodeData: val })
          })
        })
        return resolve(classArr)
      }
    },
    // 修改节点
    update(node) {
    },
    // 删除节点
    remove(node, data) {
      // 获取子集id
      const ids = [] // node的id和列表数据的id不一样？？
      if (node.data.nodeData.id) {
        ids.push(node.data.nodeData.id) // id是后台获取的数据记录中的id,不是节点id
      }
      const _this = this
      this.$confirm('此操作将永久删除, 是否继续?', '提示', {
        cancelButtonText: '取消',
        confirmButtonText: '确定',
        type: 'warning'
      }).then(() => {
        delList({
          url: this.set.removeUrl,
          params: ids
        }).then(function(response) {
          if (response.statusCode === 200) {
            _this.$notify({
              message: '删除成功',
              type: 'success'
            })
          } else {
            _this.$notify({
              message: '删除失败',
              type: 'error'
            })
          }
        })
      }).catch(() => {
        _this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    }
  }
}
</script>
