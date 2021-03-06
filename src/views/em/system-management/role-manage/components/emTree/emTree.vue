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
            :highlight-current="true"
            :auto-expand-parent="true"
            :current-node-key="currentKey"
            :default-expanded-keys="[currentKey]"
            node-key="id"
            :accordion="true"
            :show-checkbox="set.checkbox"
            :default-expand-all="set.expandAll"
            :expand-on-click-node="false"
            :filter-node-method="filterNode"
            draggable
            :style="{maxHeight:set.maxHeight}"
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
                  @click.stop="() => append(node,data)"
                >
                  添加
                </el-button>
                <el-button
                  class="em-btn-gradient em-btn-uniform-gradient"
                  size="mini"
                  @click.stop="() => remove(node, data)"
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
import { emMixin } from '@/utils/mixins'
import { mapGetters } from 'vuex'
import { getResources } from '@/utils/auth'
import vueBus from '@/utils/vueBus'

import { toTree, dataInitFn, FilterChildrenFn } from '@/utils/tool'
import { updateCheckedKeys, getRoutePermission, query, add, del, update } from '@/api/system-management/role-manage'

export default {
  name: 'EmTree',
  components: {
  },
  mixins: [emMixin],
  data() {
    return {
      set: {
        title: '', // 标题
        maxHeight: '',
        expandAll: false,
        buttons: false,
        appendUrl: '',
        appendSuccess: '',
        removeUrl: '',
        updateUrl: '',
        routePermissionUrl: '',
        setRoutePermissionUrl: '',
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
      currentKey: '',
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      setFn: {
        // 点击节点时交互的对象
        handleNodeClickControlType: '',
        handleNodeClickControlId: '',
        handleNodeClickFn: '',
        handleNodeClickFnType: '',
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
    },
    treeData(val) {
      this.$nextTick(() => {
        this.$refs.tree.setCurrentKey(this.currentKey)
      })
    }
  },
  created() {
    this.init()
  },
  mounted() {

  },
  beforeDestroy() {
  },
  methods: {
    fn(_obj, _data) {
      const _fn = _obj.meta.fn
      const _controlType = _obj.meta.control_type ? _obj.meta.control_type : ''
      const _controlId = _obj.meta.control_id
      switch (_controlType) {
        case 'RoleManage_EmTree_handleNodeClickControlType--RoleManage_EmForm_setForm':
          vueBus.$emit(_controlId, {
            meta: _obj.meta,
            data: _data
          })
          break
        case 'default':
          this[_fn](_obj.meta)
          break
        default:
          this.FN(_obj, _data)
      }
    },
    init() {
      this.set = dataInitFn(this.set, this.meta)
      this.setFn = dataInitFn(this.setFn, this.meta)

      this.defaultProps.children = this.meta.propsChildren
      this.defaultProps.label = this.meta.propsLabel

      this.treeDataFn()
    },
    filterNode(value, data) {
      if (!value) return true
      return data[this.defaultProps.label].indexOf(value) !== -1
    },
    treeDataFn() {
      let _tree = []
      switch (this.set.treeDataType) {
        case 'permissions':
          _tree = getResources()
          this.treeData = []
          this.treeData = this.treeData.concat(toTree(_tree))
          break
        case 'query':
          query({
            'url': this.set.treeDataUrl,
            'params': this.set.treeDataParams_OBJ
          }).then((response) => {
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
      const _this = this
      switch (this.set.appendSuccess) {
        case 'permissions':
          // 更新权限
          this.$store.dispatch('permission/generateRoutes', this.$store.getters.displayMode).then(() => {
            _this.treeDataFn()
          })
          break
        default :
          this.treeDataFn()
      }
    },
    append(node, data) {
      const _data = JSON.parse(JSON.stringify(data))
      let _extData
      if ('id' in _data) {
        _data.pid = _data.id
        delete _data.id
      }
      if ('extData' in _data) {
        _extData = JSON.parse(JSON.stringify(data.extData))
        _data.extData = JSON.stringify(_extData)
      }
      add({
        url: this.set.appendUrl,
        params: _data
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
    update({ data, meta }) {
      console.log('node', data, meta)
      const _this = this
      update({
        url: this.set.updateUrl,
        params: data
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
    getRoutePermission(_id) {
      const _this = this
      getRoutePermission({
        'url': this.set.routePermissionUrl,
        'params': _id
      }).then((response) => {
        if (response.statusCode === 200) {
          _this.$message({
            message: response.message,
            type: 'success'
          })

          let _treeVal = []
          let _keys = []
          _treeVal = _treeVal.concat(toTree(response.data))
          const _Children = new FilterChildrenFn({
            treeData: _treeVal,
            value: 'id'
          })
          _keys = _keys.concat(_Children.getData())
          _this.$refs.tree.setCheckedKeys(_keys)
        }
      })
    },
    updateRoutePermission(_id, _ids) {
      const _this = this
      updateCheckedKeys({
        'url': this.set.setRoutePermissionUrl,
        params: {
          id: _id,
          ids: _ids
        }
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
      this.currentKey = data.id
      const _componentData = this.componentData
      if (_componentData.meta.handleNodeClickControlType) {
        _componentData.meta.control_type = _componentData.meta.handleNodeClickControlType
        _componentData.meta.control_id = _componentData.meta.handleNodeClickControlId
        _componentData.meta.fn = _componentData.meta.handleNodeClickFn
        _componentData.meta.fn_type = _componentData.meta.handleNodeClickFnType
        this.fn(_componentData, data)
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
    updateCheckedKeys(_id) {
      const _CheckedKeys = this.getCheckedKeys()
      this.updateRoutePermission(_id, _CheckedKeys)
    },
    getCheckedKeys() {
      let _Keys = this.$refs.tree.getCheckedKeys()
      _Keys = _Keys.concat(this.$refs.tree.getHalfCheckedKeys())
      return _Keys
    },
    setCheckedKeys(_val) {
      console.log('setCheckedKeys', this.$data)
      this.getRoutePermission(_val.data.id)
    },
    setCurrentKey({ data, meta }) {
      this.currentKey = data.id
    },
    setPermissionFn(_obj) {
      console.log(_obj, this.saveData)
      /* let _this = this
      update({
        url: this.set.updateUrl,
        params: data
      }).then((response) => {
        if (response.statusCode === 200) {
          this.$message({
            message: response.message,
            type: 'success'
          })
        }
       _this.callbackFn(this.senderData, res)
      })*/
    }
  }
}
</script>
<style lang="scss" scoped>
@import "emTree";
</style>
