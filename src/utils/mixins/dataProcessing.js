import { dataInitFn } from '@/utils/tool'

export class DataProcessing {
  constructor() {
    this.set = ''
  }
  transducerFn(set, _data, _senderData) {
    const _set = {
      dataType: '',
      requestParams: ''
    }
    Object.assign(_set, set)
    let _key
    let _value
    switch (_set.dataType) {
      case 'stringData':
        _key = _set.requestParams
        _value = _data[_key]
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
      case 'valueData':
        _value = _set.requestParams
        break
      default:
        _value = _data
    }
    return _value
  }
}
