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
      const _fn = _obj.meta.fn
      const _fn_type = _obj.meta.fn_type
      const _meta = _obj.meta
      let val
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
          val = _obj.data
          for (const _k in val) {
            let _extData = val[_k]
            if (typeof (_extData) === 'string' && _k === 'extData') {
              _extData = _extData.replace(/\\n/g, '')// 去掉换行
              _extData = _extData.replace(/\s*/g, '')// 去掉空格
              if (_extData.substr(0, 1) === '{' && _extData.substr(-1) === '}') {
                val[_k] = JSON.parse(_extData)
                try {
                  if ('system_id' in val.extData.meta) {
                    val.extData.meta.system_id = 'system_id_' + val.id
                  }
                } catch (err) {
                  console.log(err)
                }
              }
            }
          }
          this[_fn]({
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
        case 'TeacherInfo_EmForm_addForm': // 添加教师
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
      if ('controlGroup' in _obj.meta) {
        _obj.meta.controlGroup.forEach((_item, _index) => {
          switch (_item.control_type) {
            case 'TimeFn':
              new TimeFn(this.system_id + '_' + _index + '_t1', () => {
                vueBus.$emit(_item.control_id, {
                  meta: _item,
                  set: _item.fn_set,
                  data: _data
                })
              }, () => {
                return false
              }, 200).run()
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

