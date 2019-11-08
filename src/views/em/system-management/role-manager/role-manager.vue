<template>
  <div class="role-container">
    <el-tree
      :data="treeData"
      node-key="id"
      :props="defaultProps"
      :render-content="renderContent"
      class="filter-tree"
      @node-click="handleNodeClick"
    />
  </div>
</template>
<script>
import { fetchList } from '@/api/role'
let id = 1000
export default {
  name: 'RoleManager',
  data() {
    return {
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
    this.getList()
  },
  methods: {
    // 转换树状数据
    getList() {
      fetchList().then(response => {
        console.log('response:', response)
        const data1 = response.data

        function setTreeData(arr) {
          // 删除所有的children,以防止多次调用
          arr.forEach(function(item) {
            delete item.children
          })
          const map = {} // 构建map
          arr.forEach(i => {
            map[i.id] = i // 构建以id为键 当前数据为值
          })
          const treeData = []
          arr.forEach(child => {
            const mapItem = map[child.pid] // 判断当前数据的parentId是否存在map中
            if (mapItem) {
              // 存在则表示当前数据不是最顶层的数据
              // 注意： 这里的map中的数据是引用了arr的它的指向还是arr,当mapItem改变时arr也会改变，踩坑点
              (mapItem.children || (mapItem.children = [])).push(child) // 这里判断mapItem中是否存在child
            } else {
              // 不存在则是顶层数据
              treeData.push(child)
            }
          })
          return treeData
        }

        console.log('treeData', setTreeData(data1))
      })
    },
    // 渲染树状数据
    renderContent(h, { node, data, store }) {
      return (
        '<span>' +
        '<span>' +
           ' <span>{ node.label }</span>' +
          '</span>' +
        '<span style="float: right; margin-right: 20px">' +
           '<el-button size="mini" on-click={() => this.append(store, data) }> Append </el-button>' +
           '<el-button size="mini" on-click={() => this.remove(store, data) }> Delete </el-button>' +
        '</span>' +
      '</span>')
    },
    append(store, data) {
      store.append({ id: id++, label: 'test', children: [] }, data)
    },

    remove(store, data) {
      store.remove(data)
    },
    handleNodeClick(data) {
    }
  }
}
</script>
<style lang="scss" scoped>
@import "role-manager";

</style>
