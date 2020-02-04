import { dataInitFn } from '@/utils/tool'

export class DataProcessing {
  constructor() {
    this.set = null
  }
  transducerFn(set, _data, _senderData) {
    this.set = JSON.parse(JSON.stringify(set))
    const _set = {
      dataType: '',
      requestParams: ''
    }
    Object.assign(_set, set)
    let _key
    let _value
    let _val
    switch (_set.dataType) {
      case 'objectData_someSet':
        _key = _data[_set.fn_set_key]
        _val = _set.fn_set_some
        _val.forEach((_item) => {
          if (_item.values.indexOf(_key) !== -1) {
            this.transducerFn(_item, _data, _senderData)
          }
        })
        return
      case 'stringData':
        _key = _set.requestParams
        _value = _data[_key]
        break
      case 'valueData': // 设置自定义数据
        _value = _set.requestParams
        break
      case 'objectData':
        _key = Object.assign({}, _set.requestParams)
        _value = JSON.parse(JSON.stringify(_senderData.data))
        _value = Object.assign({}, _value, _data)
        _value = dataInitFn(_key, _value)
        break
      case 'objectData_a':
        _key = Object.assign({}, _set.requestParams)
        for (const _k in _key) {
          _data[_k] = _data[_key[_k]]
        }
        _value = Object.assign({}, _data)
        break
      case 'objectData_b':
        _key = Object.assign({}, _set.paramsKeys)
        for (const _k in _key) {
          _key[_k] = _data[_key[_k]]
        }
        _value = Object.assign({}, _key, _set.requestParams)
        break
      case 'arrayData':
        _key = Object.assign({}, _set.requestParams)
        for (const _k in _key) {
          _data[_k] = _data[_key[_k].key][_key[_k].index]
        }
        _value = Object.assign({}, _data)
        break
      default:
        _value = _data
    }
    return _value
  }
}
