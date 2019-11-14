<template>
  <div class="tree-container">
    <el-card class="box-card">
      <el-row>
        <el-col :span="48">
          <p class="head_title">{{ set.title }}</p>
          <el-input
            v-model="filterText"
            placeholder="输入关键字"
          />
          <el-tree
            ref="tree"
            :data="treeData"
            :props="defaultProps"
            node-key="id"
            :show-checkbox="set.checkbox"
            :default-expand-all="set.expandAll"
            :expand-on-click-node="false"
            :filter-node-method="filterNode"
            draggable
            @node-click="handleNodeClick"
            @check-change="handleCheckChange"
            @node-drag-end="handleDragEnd"
          >
            <span slot-scope="{ node, data }" class="custom-tree-node">
              <span :title="node.label" class="em-tree-text">{{ node.label }}</span>
              <span v-if="set.buttons">
                <el-button
                  class="em-btn-gradient em-btn-uniform-gradient"
                  size="mini"
                  @click="() => append(node,data)"
                >
                  复制
                </el-button>
                <el-button
                  class="em-btn-gradient em-btn-uniform-gradient"
                  size="mini"
                  @click="() => remove(node, data)"
                >
                  删除
                </el-button>
              </span>
            </span>
          </el-tree>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import vueBus from '@/utils/vueBus'

import { toTree, dataInitFn } from '@/utils/tool'
import { getRoutePermission, query, add, del, update } from '@/api/system-management/role-manage'

export default {
  name: 'EmTree',
  components: {
  },
  props: ['data'],
  data() {
    return {
      id: '',
      set: {
        title: '',
        expandAll: true,
        buttons: false,
        appendUrl: '',
        appendSuccess: '',
        removeUrl: '',
        updateUrl: '',
        routePermissionUrl: '',
        checkbox: false,
        treeDataType: 'query',
        treeDataUrl: '',
        treeDataParams_OBJ: {},
        checkedKeysType: '',
        checkedKeysUrl: '',
        checkedKeysParams_OBJ: {},
        updateCheckedType: '',
        updateCheckedUrl: '',
        updateCheckedParams_OBJ: {}
      },
      treeData: [],
      filterText: '',
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      setFn: {
        // 点击节点时交互的对象
        handleNodeClickType: '',
        handleNodeClickControlId: '',
        handleNodeClickFn: '',

        handleCheckChange: '',
        handleDragEnd: ''
      }
    }
  },
  computed: {
    ...mapGetters([
      'permission_routes'
    ])
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val)
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
    fn(_fn, _obj) {
      const _controlType = _obj.control_type ? _obj.control_type : ''
      switch (_controlType) {
        case 'win':
          break
        default:
          this[_fn](_obj)
      }
    },
    init() {
      const _meta = this.data.meta
      this.id = _meta.system_id
      this.set = dataInitFn(this.set, _meta)
      console.log('_tree：', this.set)
      this.setFn = dataInitFn(this.setFn, _meta)

      this.defaultProps.children = _meta.propsChildren
      this.defaultProps.label = _meta.propsLabel

      this.treeDataFn()
      if (this.set.checkbox) {
        this.setCheckedKeys()
      }
    },
    filterNode(value, data) {
      if (!value) return true
      return data[this.defaultProps.label].indexOf(value) !== -1
    },
    treeDataFn() {
      let _tree = []
      switch (this.set.treeDataType) {
        case 'permissions':
          _tree = this.permission_routes
          this.treeData = []
          this.treeData = this.treeData.concat(toTree(_tree))
          break
        case 'query':
          query({
            'url': this.set.treeDataUrl,
            'params': this.set.treeDataParams_OBJ
          }).then((response) => {
            console.log(response)
            if (response.statusCode === 200) {
              response.data.forEach((_obj) => {
                _tree.push(_obj)
              })
              this.treeData = []
              this.treeData = this.treeData.concat(toTree(_tree))
            }
          })
          break
      }
    },
    SuccessFn() {
      switch (this.set.appendSuccess) {
        case 'permissions':
          // 更新权限
          /* _this.$store.dispatch('user/systemPermissions', {}).then(() => {
            _this.treeDataFn()
          })*/
          break
        default :
          this.treeDataFn()
      }
    },
    append(node, data) {
      if (data.id) {
        data.id = ''
      }
      add({
        url: this.set.appendUrl,
        params: data
      }).then((response) => {
        if (response.statusCode === 200) {
          this.$message({
            message: response.message,
            type: 'success'
          })
          this.SuccessFn()
        }
      })
    },
    update(node) {
      console.log('node', node)
      const _this = this
      update({
        url: this.set.updateUrl,
        // params: node.params
        params: { 'id': 29, 'name': 'root123', 'zhName': '2运营团队-超级管理员1', 'roleCode': '', 'orgId': 1, 'orgType': 1, 'description': '运营团队-超级管理员', 'dataStatus': 1, 'weight': 199, 'pid': 1 }
      }).then((response) => {
        if (response.statusCode === 200) {
          this.$message({
            message: response.message,
            type: 'success'
          })
        }
        _this.SuccessFn()
      })
    },
    remove(node, data) {
      // 获取子集id
      function removeFn(_data) {
        let _val = []
        if (_data.children) {
          _val.push(_data.id)
          _data.children.forEach((_item) => {
            _val = _val.concat(removeFn(_item))
          })
          return _val
        }
        _val.push(_data.id)
        return _val
      }
      const _this = this
      this.$confirm('此操作将永久删除, 是否继续?', '提示', {
        cancelButtonText: '取消',
        confirmButtonText: '确定',
        type: 'warning'
      }).then(() => {
        del({
          url: this.set.removeUrl,
          params: removeFn(data)
        }).then(function(response) {
          _this.$message({
            message: response.message,
            type: 'success'
          })
          _this.SuccessFn()
        })
      }).catch(() => {
        _this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    getRoutePermission() {
      const _this = this
      getRoutePermission({
        'url': this.set.routePermissionUrl,
        params: 1
      }).then((response) => {
        if (response.statusCode === 200) {
          _this.$message({
            message: response.message,
            type: 'success'
          })
        }
      })
    },
    handleNodeClick(data) {
      console.log(data)
      switch (this.setFn.handleNodeClickType) {
        case 'form':
          vueBus.$emit(this.setFn.handleNodeClickControlId, {
            fn: this.setFn.handleNodeClickFn,
            obj: this.data,
            data: data
          })
          break
        default:
      }
    },
    handleDragEnd(draggingNode, dropNode, dropType, ev) {

      /* if (dropType === "inner") {
         draggingNode.data.parentId = dropNode.data.id;
       } else {
         draggingNode.data.parentId = dropNode.data.parentId;
       }
       update(draggingNode.data).then((response) => {
         console.log(response);
         this.$message(response.message);
       });*/

    },
    handleCheckChange(data, checked, indeterminate) {
      // console.log(data, checked, indeterminate);
      // console.log("getCheckedKeys",this.$refs.tree.getCheckedKeys());
    },
    updateCheckedKeys() {
    },
    getCheckedKeys() {
      return this.$refs.tree.getCheckedKeys()
    },
    setCheckedKeys(_obj) {
    }

  }
}
</script>
<style lang="scss" scoped>
@import "emTree";
</style>
