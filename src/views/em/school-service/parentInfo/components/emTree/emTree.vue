<template>
  <div class="emTree_container">
    <el-input
      v-model="filterText"
      placeholder="输入关键字"
    />
    <el-tree
      ref="tree"
      :data="treeData"
      :props="defaultProps"
      :load="loadNode"
      accordion
      empty-text="暂无内容"
      node-key="id"
      :highlight-current="highlight"
      :default-expand-all="expandAll"
      :filter-node-method="filterNode"
      lazy
      @node-click="handleNodeClick"
    >
      <span slot-scope="{ node }" class="custom-tree-node">
        <span>{{ node.label }}</span>
        <span v-if="node.level === 3">
          <template v-for="(btn, _index ) in children.treeBtn">
            <el-button
              :key="_index"
              :ref="btn.meta.system_id"
              class="em-btn-operation"
              size="mini"
              :type="btn.meta.buttonType ? btn.meta.buttonType : 'text'"
              @click="() => fn(btn, {'control_type': btn.meta.control_type})"
            >
              {{ btn.meta.title }}
            </el-button>
          </template>
        </span>
        <span v-if="node.level === 3">
          <el-button
            type="text"
            size="mini"
            @click="() => remove(node, data)"
          >
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
      highlight: true, // 高亮显示当前节点
      children: {
        treeBtn: []
      },
      set: {
        queryUrl: '',
        gradeUrl: '',
        removeUrl: '',
        fn_set: {
          control_id: null // 区别哪个table的getList()
        },
        fn_edit: {
          control_id: null // 编辑学生
        },
        fn_add: {
          control_id: null // 添加学生
        }, // classId给学生
        fn_append: ''
      },
      filterText: '',
      expandAll: false
    }
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val)
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
    fn(_obj, _data) {
      const _controlType = _obj.meta.control_type ? _obj.meta.control_type : ''
      const _controlId = _obj.meta.control_id
      switch (_controlType) {
        case 'importDialog': // 导入弹框
          vueBus.$emit(_controlId, {
            meta: _obj.meta
          })
          break
        default:
          this.FN(_obj, _data)
      }
    },
    filterNode(value, data) {
      if (!value) return true
      return data[this.defaultProps.label].indexOf(value) !== -1
    },
    handleNodeClick(node, _data) {
      if (_data.level === 3) {
        vueBus.$emit(this.set.fn_set.control_id, { // 点击班级查询相应学生
          fn: 'getList',
          params: {
            'classId': _data.data.nodeData.id
          }
        })
        vueBus.$emit(this.set.fn_add.control_id, { // 添加学生需要的班级id
          fn: 'getClassId',
          params: {
            'classId': _data.data.nodeData
          }
        })
        vueBus.$emit('pageQuery', _data.data.nodeData.id) // 学生分页查询
        vueBus.$emit(this.set.fn_edit.control_id, { // 修改学生刷新表格数据需要的班级id
          fn: 'queryClassId',
          params: {
            'classId': _data.data.nodeData
          }
        })
        vueBus.$emit('class', _data.data.nodeData.id)
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
          if (response.statusCode === 200) {
            response.data.forEach(val => {
              gradeArr.push({ 'label': val.gradeName, 'value': val.gradeKey, nodeData: val })
            })
          } else if (response.statusCode === 503) {
            this.$message({
              showClose: true,
              message: '没有找到指定内容！',
              type: 'info',
              duration: 1000
            })
          }
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
          if (response.statusCode === 200) {
            response.data.list.forEach(val => {
              classArr.push({ 'label': val.name, 'value': val.gradeKey, leaf: true, nodeData: val })
            })
          } else if (response.statusCode === 503) {
            this.$message({
              showClose: true,
              message: '没有找到指定内容！',
              type: 'info',
              duration: 1000
            })
          }
        })
        return resolve(classArr)
      }
    },
    // 修改节点
    update(_data) {
    },
    // 删除节点
    remove(node) {
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
            node.parent.loaded = false
            node.parent.expand()
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
