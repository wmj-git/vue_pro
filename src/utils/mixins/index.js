import { Message } from 'element-ui'
import { mapGetters } from 'vuex'
import vueBus from '@/utils/vueBus'
import { FilterTree, TimeFn } from '@/utils/tool'

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
      componentData: JSON.parse(JSON.stringify(this.data)),
      BASE_API: process.env.VUE_APP_BASE_API,
      senderData: null
    }
  },
  watch: {
    // 如果路由有变化，会再次执行该方法
    '$route': 'fetchData'
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
        this.senderData = JSON.parse(JSON.stringify(obj))
        this.receiverFn(obj)
      })
    }
  },
  updated() {
    // console.log('$route', this.$route)
  },
  beforeDestroy() {
    if (this.system_id !== 'none') {
      vueBus.$off(this.system_id)
    }
  },
  methods: {
    fetchData() {
      console.log('$route', this.$route, this.system_id)
      const _query = this.$route.query
      if (_query && 'meta' in _query) {
        const _system_id = _query.meta.control_id
        if (!(this.system_id === _system_id)) {
          return
        }
        this.senderData = JSON.parse(JSON.stringify(_query))
        this.fetchFn(_query)
      }
    },
    fetchFn(_query) {
      const _fn = _query.meta.fn
      const _fn_type = _query.meta.fn_type
      switch (_fn_type) {
        case 'default':
          if (_fn) {
            this[_fn](_query)
          }
          this.controlGroupFn(_query, _query.data)
          break
        case 'RoleManage_EmTree_update':
          break
        default:
          Message({
            message: '(fn_type)参数无效',
            type: 'error',
            duration: 5 * 1000
          })
      }
    },
    receiverFn(_obj) {
      if (!(_obj && 'meta' in _obj)) {
        return
      }
      const _fn = _obj.meta.fn
      const _fn_type = _obj.meta.fn_type
      const _meta = _obj.meta
      let val, _value
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
          _value = _obj.data
          for (const _k in _value) {
            let _extData = _value[_k]
            if (typeof (_extData) === 'string' && _k === 'extData') {
              _extData = _extData.replace(/\\n/g, '')// 去掉换行
              _extData = _extData.replace(/\s*/g, '')// 去掉空格
              if (_extData.substr(0, 1) === '{' && _extData.substr(-1) === '}') {
                _value[_k] = JSON.parse(_extData)
                try {
                  if ('system_id' in _value.extData.meta) {
                    _value.extData.meta.system_id = 'system_id_' + _value.id
                  }
                } catch (err) {
                  console.log(err)
                }
              }
            }
          }
          if ('set' in _obj) {
            val = {
              meta: _meta,
              set: _meta.fn_set,
              data: _value
            }
          } else {
            val = {
              data: _value
            }
          }
          this[_fn](val)
          break
        case 'RoleManage_EmForm_updateOptionParamsFn':

          if (_meta.fn_set.dataType === 'stringData') {
            val = _meta.fn_set.requestParams
            val = _obj.data[val]
          }
          this[_fn]({
            meta: _meta,
            set: _meta.fn_set,
            data: val
          })
          break
        case 'RoleManage_EmForm_fn':
          this[_fn](_obj.meta.fn_set, _obj.meta)
          break
        case 'TableInfo_EmForm_queryData': // 查询
          this[_fn]({
            temp: _obj.temp
          })
          break
        case 'ParentInfo_EmForm_addForm': // 弹框显示(无需传递参数)
          this[_fn]({
            params: _obj.params
          })
          break
        case 'ParentInfo_EmTable_deleteData':
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
        case 'BaseTable_EmTableGroup_EmTable_queryFn':
          this[_fn]({
            Form: _obj.Form
          })
          break
        case 'BaseTable_EmTableGroup_EmTable_addFn':
          if (_meta.fn_set && 'dataType' in _meta.fn_set) {
            switch (_meta.fn_set.dataType) {
              case 'userAddRoles':
                val = {
                  addPo: {
                    ids: _obj.Form.ids
                  },
                  user: {
                    phone: Number(_obj.Form.phone),
                    username: _obj.Form.username
                  }
                }
                break
            }
          }
          this[_fn]({
            Form: val
          })
          break
        case 'BaseTable_EmTableGroup_EmTable_updateFn':
          this[_fn]({
            Form: _obj.Form
          })
          break
        case 'BaseTable_EmDialog_openFn':
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
        case 'BaseTable_EmDialog_closeFn':
          this[_fn]()
          break
        case 'BaseTable_EmForm_onReset':
          this[_fn]()
          break
        case 'BaseTable_EmForm_setForm':

          if ('set' in _obj) {
            if (_obj.set.dataType === 'tableColumnBtn') {
              val = {
                set: _obj.set,
                Form: _obj.data.row
              }
            }
          } else {
            val = {
              Form: _obj.Form
            }
          }
          this[_fn](val)
          break
        default:
          Message({
            message: '(fn_type)参数无效',
            type: 'error',
            duration: 5 * 1000
          })
      }
    },
    controlGroupFn(_obj, _data) {
      const _this = this
      if ('controlGroup' in _obj.meta) {
        _obj.meta.controlGroup.forEach((_item, _index) => {
          let _refs
          function PromiseFn(_obj, _data, _fn) {
            new Promise((resolve) => {
              setTimeout(() => {
                _refs = _this.$refs[_item.control_id]
                if (_refs.length > 0) {
                  resolve(true)
                } else {
                  resolve(false)
                }
              }, 500)
            }).then(val => {
              if (val) {
                _fn()
              } else {
                PromiseFn(_obj, _data, _fn)
              }
            })
          }
          switch (_item.control_type) {
            case 'refs':
              // console.log('$', this.$route, this.system_id)
              _refs = this.$refs[_item.control_id]
              _refs[0].senderData = JSON.parse(JSON.stringify(_obj))
              _refs[0][_item.fn]({
                meta: _item,
                data: _data
              })
              break
            case 'TimeFn':
              new TimeFn(this.system_id + '_' + _index + '_t1', () => {
                vueBus.$emit(_item.control_id, {
                  meta: _item,
                  set: _item.fn_set,
                  data: _data
                })
              }, () => {
                return false
              }, 500).run()
              break
            case 'Promise':
              PromiseFn(_obj, _data, function() {
                _refs[0].senderData = JSON.parse(JSON.stringify(_obj))
                _refs[0][_item.fn]({
                  meta: _item,
                  data: _data
                })
              })
              break
            default:
              vueBus.$emit(_item.control_id, {
                meta: _item,
                set: _item.fn_set,
                data: _data
              })
          }
        })
      }
    },
    callbackFn(_obj, _data) {
      console.log('callback', _obj, _data)
      if ('callback' in _obj.meta) {
        _obj.meta.callback.forEach((_item, _index) => {
          switch (_item.control_type) {
            case 'TimeFn':
              new TimeFn(this.system_id + '_' + _index + '_t2', () => {
                vueBus.$emit(_item.control_id, {
                  meta: _item,
                  data: _data
                })
              }, () => {
                return false
              }, 200).run()
              break
            default:
              vueBus.$emit(_item.control_id, {
                meta: _item,
                data: _data
              })
          }
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

