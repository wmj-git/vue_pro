<template>
  <div class="ol-map">
    <div :id="system_id" class="map-node" />
  </div>
</template>

<script>
// import vueBus from '@/utils/vueBus'
import { dataInitFn, childrenInitFn } from '@/utils/tool'
import { emMixin } from '@/utils/mixins'

import mp from '@/utils/ol/index'
import { loadJs, loadCss } from '@/utils/tool'

export default {
  name: 'OlMap',
  components: {
  },
  mixins: [emMixin],
  data() {
    return {
      set: {
        center: [114.031047, 22.663679],
        zoom: 10
      },
      children: {},
      features: null,
      featureData: null,
      draw: null
    }
  },
  created() {
    this.init()
  },
  mounted() {
    this.loadOl()
  },
  beforeDestroy() {
  },
  methods: {
    fn(_obj, _data) {
      const _controlType = _obj.meta.control_type ? _obj.meta.control_type : ''
      switch (_controlType) {
        case 'none':
          break
        default:
          this.FN(_obj, _data)
      }
    },
    init() {
      this.set = dataInitFn(this.set, this.meta)
      this.children = childrenInitFn(this.children, this.componentData)
    },
    loadOl() { // 加载依赖库ol文件
      const _this = this
      const _element = document.getElementById('ol_js')
      if (_element) {
        _this.mapInit()
      } else {
        // 动态加载依赖库
        const _url = process.env.VUE_APP_STATIC_API
        loadCss('ol_css', _url + '/sceneStatic/ol/ol.css', function() {
        })
        loadJs('ol_js', _url + '/sceneStatic/ol/ol.js', function() {
          _this.mapInit()
        })
        // 加载
      }
    },
    mapInit() { // 创建地图对象
      // console.log('mapInit', this.$data, _G)
      _G[this.system_id] = new mp.MinMap({
        set: {
          target: this.system_id,
          zoom: this.set.zoom,
          center: this.set.center,
          layers: [
            mp.baseMapFN().baidu_vec
          ]
        }
      })
    },
    viewToFn(obj) {
      //  获取对象
      let _g = _G[this.system_id]

      let _zoom = _g.map.getView().getZoom()
      let _lng = obj.lng ? obj.lng : 114.031047;
      let _lat = obj.lat ? obj.lat : 22.663679;

      _g.viewTo({
        zoom: obj.zoom || _zoom,
        center: [_lng, _lat],
        duration: 500 })
     }
  }
}
</script>

<style scoped lang="scss">
  @import "olMap";
</style>
