import { Message } from 'element-ui'
import { mapGetters } from 'vuex'
import vueBus from '@/utils/vueBus'
import { FilterTree } from '@/utils/tool'

// 定义一个混入对象
export const emMixin = {
  props: {
    data: {
      type: Object,
      default: () => {
        return { }
      }
    }
  },
  data() {
    return {
      system_id: 'none',
      meta: {},
      componentData: JSON.parse(JSON.stringify(this.data))
    }
  },
  created: function() {
    if ('meta' in this.componentData) {
      this.meta = { ...this.componentData.meta }
    }
    const _meta = this.meta
    if ('system_id' in _meta) {
      this.system_id = this.meta.system_id
    }
  },
  mounted() {
    if (this.system_id !== 'none') {
      vueBus.$on(this.system_id, obj => {
        this.receiverFn(obj)
      })
    }
  },
  beforeDestroy() {
    if (this.system_id !== 'none') {
      vueBus.$off(this.system_id)
    }
  },
  methods: {
    receiverFn(_obj) {
      if (!(_obj && 'meta' in _obj)) {
        return
      }
      console.log('receiverFn', _obj)
      const _fn = _obj.meta.fn
      const _fn_type = _obj.meta.fn_type
      const _meta = _obj.meta
      switch (_fn_type) {
        case 'default':
          this[_fn](_meta)
          break
        case 'RoleManage_EmTree_update':
          this[_fn](_obj.node)
          break
        case 'RoleManage_EmTree_setCheckedKeys':
          this[_fn](_obj)
          break
        case 'RoleManage_EmTree_updateCheckedKeys':
          this[_fn](_obj.id)
          break
        case 'RoleManage_EmForm_setForm':
          this[_fn]({
            data: _obj.data
          })
          break
        case 'RoleManage_EmForm_fn':
          this[_fn](_obj.meta.fn_set, _obj.meta)
          break
        case 'ParentInfo_EmForm_addForm': // 弹框显示(无需传递参数)
          this[_fn](_obj)
          break
        case 'RoleManage_EmDialog_openFn':
          if ('fn_set' in _meta) {
            this[_fn]({
              meta: _meta,
              set: _meta.fn_set,
              data: _obj.data
            })
          } else {
            Message({
              message: '(fn_set)参数无效',
              type: 'error',
              duration: 5 * 1000
            })
          }

          break
        case 'RoleManage_EmDialog_closeFn':
          this[_fn]()
          break
        default:
          Message({
            message: '(fn_type)参数无效',
            type: 'error',
            duration: 5 * 1000
          })
      }
    }
  }
}
// 定义一个混入对象
export const emPage = {
  data() {
    return {
    }
  },
  computed: {
    ...mapGetters([
      'permission_routes'
    ])
  },
  created: function() {
    const _route = this.$route
    const _permissionRoutes = this.permission_routes

    const Tree = new FilterTree({
      treeData: _permissionRoutes,
      key: ['meta', 'system_id'],
      value: _route.meta.system_id
    })
    const _data = Tree.getData()
    this.componentData = _data[0]

    if ('meta' in this.componentData) {
      this.meta = { ...this.componentData.meta }
    }
    const _meta = this.meta
    if ('system_id' in _meta) {
      this.system_id = this.meta.system_id
    }
  },
  mounted() {
    // console.log('emMixin', this.$data)
  },
  methods: {
  }
}

