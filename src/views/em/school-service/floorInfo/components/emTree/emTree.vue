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
      <span slot-scope="{ node, data }" class="custom-tree-node">
        <span>{{ node.label }}</span>
        <span v-if="node.level === 2">
          <template v-for="(btn, _index ) in children.treeBtn">
            <el-button
              :key="_index"
              :ref="btn.meta.system_id"
              class="em-btn-operation"
              size="mini"
              :type="btn.meta.buttonType ? btn.meta.buttonType : 'primary'"
              @click="() => fn(btn, {'control_type': btn.meta.control_type})"
            >
              {{ btn.meta.title }}
            </el-button>
          </template>
        </span>
        <span v-if="node.level === 3">
          <template v-for="(btn, _index ) in children.treeFloorBtn">
            <el-button
              :key="_index"
              :ref="btn.meta.system_id"
              class="em-btn-operation"
              size="mini"
              :type="btn.meta.buttonType ? btn.meta.buttonType : 'primary'"
              @click="() => fn(btn, {'control_type': btn.meta.control_type})"
            >
              {{ btn.meta.title }}
            </el-button>
          </template>
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
import { fetchList, buildList, delList } from '@/api/schoolService/floorInfo'
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
      children: {
        treeBtn: [],
        treeFloorBtn: []
      },
      highlight: true, // 高亮显示当前节点
      set: {
        queryUrl: '',
        buildingUrl: '',
        removeUrl: '',
        fn_set: {
          control_id: null // 区别哪个table的getList()
        },
        fn_floor: {
          control_id: null
        },
        fn_append: ''
      },
      expandAll: false,
      filterText: ''
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
        case 'floorInfo_associateData_dialogVisible': // 楼层关联设备-树弹框
          vueBus.$emit(_controlId, {
            meta: _obj.meta
          })
          break
        case 'buildInfo_associateData_dialogVisible': // 建筑关联设备-树弹框
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
        vueBus.$emit(this.set.fn_set.control_id, { // 点击楼层查询该楼层已分配设备
          fn: 'getList',
          params: {
            floorId: _data.data.nodeData.id
          }
        })
        vueBus.$emit('floorInfo', _data.data.nodeData) // 关联设备
      } else if (_data.level === 2) { // 点击建筑查询该建筑已分配设备
        vueBus.$emit(this.set.fn_set.control_id, { // 点击楼层查询该楼层已分配设备
          fn: 'getBuildList',
          params: {
            buildingId: _data.data.nodeData.id
          }
        })
      }
    },
    async loadNode(node, resolve) {
      if (node.level === 0) {
        // 树根节点名称为当前登录学校名称（以中横线为分界取第一个字符串）
        const name = (this.$store.getters.currentRole.description).split('-')[0]
        return resolve([{ label: name }])
      }
      if (node.level === 1) { // 子节点一级
        var buildArr = []
        await buildList({ // 建筑信息
          url: this.set.buildingUrl
        }).then(response => {
          if (response.statusCode === 200) {
            response.data.list.forEach(val => {
              buildArr.push({ 'label': val.buildingName, 'value': val.id, nodeData: val })
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
        return resolve(buildArr)
      }
      if (node.level === 2) { // 子节点二级
        var floorArr = []
        const _data = node.data
        var _params = {
          buildingId: _data.value
        }
        await fetchList({ // 楼层信息
          url: this.set.queryUrl,
          params: _params
        }).then(response => {
          if (response.statusCode === 200) {
            response.data.list.forEach(val => {
              floorArr.push({ 'label': val.floorName, 'value': val.id, leaf: true, nodeData: val })
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
        return resolve(floorArr)
      }
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
            node.parent.loaded = false // 删除操作时局部刷新
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
