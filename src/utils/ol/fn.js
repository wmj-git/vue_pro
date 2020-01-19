import store from '@/store'
import vueBus from '@/utils/vueBus'

// 添加热力图
/* {
data:[{
  value:'',
  lng:'',
  lat:''
}
],
blur : 15,
radius : 5,
max:6000,
layerName:"fire",
weight:'value'
}*/
export class HeatMap {
  constructor() {
    this.source = new ol.source.Vector({})
    this.features = []
  }

  static createFeature({ type = 'Point', coordinates = [0, 0], data }) {
    return new ol.Feature({
      geometry: new ol.geom[type](coordinates),
      featureData: data
    })
  }

  createHeatmapLayer({ data, blur = 15, radius = 5, max, layerName, weight }) {
    for (const i in data) {
      const newFeature = HeatMap.createFeature({ coordinates: [data[i].lng, data[i].lat], data: data[i] })
      this.features.push(newFeature)
    }
    this.source.on('addfeature', function(event) {
      const _featureData = event.feature.get('featureData')
      event.feature.set('weight', parseFloat(_featureData[weight] / max))
    })
    this.source.addFeatures(this.features)
    return new ol.layer.Heatmap({
      name: layerName || '',
      gradient: ['#00f', '#0ff', '#0f0', '#ff0', '#f00'], // 热力图渲染色带，默认可不设置
      radius: radius, // 每个像素渲染点半径，可根据实际数据效果进行调整
      blur: blur, // 模糊度，可根据实际数据效果进行调整
      weight: 'weight', // 权重值，热力图根据这个值进行热力渲染；图层中每个feature都要有这个属性；属性名默认weight，可以改成自己的字段名；注：0~1之间。
      renderModed: 'image', // 图层渲染方式，image和vector分别为栅格和矢量，第一个渲染速度快；后者慢，ol5新增加的属性，对于大量数据渲染有利
      source: this.source
    })
  }
}

// 场景添加数量数据
/*
let drawClass = new DrawClass({
  _map: map,
  _imgUrl: 'img/fire_icon.png'
});
*/
export class DrawClass {
  constructor({ _map, _imgUrl }) {
    this.map = _map
    this.source = new ol.source.Vector({
      wrapX: false
    })
    this.vector = new ol.layer.Vector({
      source: this.source
    })
    this.draw = null
    this.imgUrl = _imgUrl || ''
    this.init()
  }

  init() {
    this.map.addLayer(this.vector)
  }

  addMarkerFn() {
    const _this = this

    function markerFn(evt) {
      const coordinate = evt.feature.getGeometry().getCoordinates()
      console.log(evt, coordinate)
      const iconFeature = new ol.Feature({
        geometry: new ol.geom.Point(coordinate),
        name: 'marker',
        population: 4000,
        rainfall: 500,
        featureData: {
          text: coordinate.toString(),
          coordinate: coordinate
        }
      })
      const iconStyle = new ol.style.Style({
        image: new ol.style.Icon(({
          anchor: [0.5, 100],
          anchorXUnits: 'fraction',
          anchorYUnits: 'pixels',
          color: '#130f7a',
          scale: 0.32,
          src: _this.imgUrl
        })),
        text: new ol.style.Text({
          text: iconFeature.get('featureData').text,
          offsetY: -42,
          fill: new ol.style.Fill({
            color: '#ff3a41'
          }),
          stroke: new ol.style.Stroke({
            color: '#fff6fe',
            width: 2
          })
        })
      })
      iconFeature.setStyle(iconStyle)
      _this.source.addFeature(iconFeature)
    }

    this.map.removeInteraction(this.draw)
    this.draw = new ol.interaction.Draw({
      source: this.source,
      type: 'Point'
    })
    this.draw.on('drawstart', markerFn, window)
    this.map.addInteraction(this.draw)
  }

  drawOn(_type, _drawEndFn) {
    if (_type === 'marker') {
      this.addMarkerFn()
      return
    }
    const _this = this

    function fn(evt) {
      let _features = []
      let _featureData = null
      const _geometry = evt.feature.getGeometry()
      const _coordinate = _geometry.getCoordinates()
      if ('getRadius' in _geometry) {
        _featureData = {
          type: _geometry.getType(),
          Center: _geometry.getCenter(),
          radius: _geometry.getRadius(),
          geometry: _geometry
        }
      } else {
        _featureData = {
          type: _geometry.getType(),
          coordinate: _coordinate,
          geometry: _geometry
        }
      }
      if (_drawEndFn) {
        _features = _features.concat(_this.source.getFeatures())
        _features = _features.concat(evt.feature)
        _drawEndFn({
          features: _features,
          featureData: _featureData
        })
      }
    }

    this.map.removeInteraction(this.draw)
    this.draw = new ol.interaction.Draw({
      source: this.source,
      type: _type// LineString,Polygon,Circle,Point
    })
    this.draw.on('drawend', fn, window)
    this.map.addInteraction(this.draw)
  }

  drawOff() {
    this.map.removeInteraction(this.draw)
  }

  drawClearLayer() {
    this.map.removeInteraction(this.draw)
    this.map.removeLayer(this.vector)
  }

  drawClearData() {
    this.source.clear()
  }
}

export class MinMap {
  constructor({ set }) {
    this.map = null
    this.view = null
    this.overlays = []
    this.init(set)
  }

  init({ target, zoom = 1, center, layers }) {
    this.view = new ol.View({
      center: center,
      zoom: zoom,
      projection: 'EPSG:4326'
    })
    this.map = new ol.Map({
      target: target || '',
      layers: layers,
      view: this.view
    })
  }

  viewFn({ zoom, center, duration }) {
    if (center === 'none') {
      this.view.animate({
        zoom: zoom
      })
    } else {
      this.view.animate({
        center: center,
        zoom: zoom || 1,
        duration: duration || 100
      })
    }
  }

  addOverlayFn({ _icon, _data, className, clickFn }) { // 添加覆盖物
    /* [{
          type:"",
          id:"",
          lng:"",
          lat""
     }]*/
    for (let i = 0; i < _data.length; i++) {
      $('body').append(`<img id="${_data[i].type}_${_data[i].id}"  src=${_icon} />`)
      const _el = document.getElementById(_data[i].type + '_' + _data[i].id)
      const _popup = new ol.Overlay({
        id: _data[i].type + '_' + _data[i].id,
        position: [_data[i].lng, _data[i].lat],
        offset: [-10, -32],
        element: _el,
        className: className || 'default-overlay'
      })
      _popup.set('overlayData', _data[i])

      /* _popup.on("change:overlayData", function (e) {
           console.log(123);
           console.log(e.target);
           console.log(e.type);
       });*/
      this.overlays.push(_popup)
      this.map.addOverlay(_popup)
      console.log(this.map.getOverlays())
      $(_popup.getElement()).on('click', clickFn).on('mouseover', function() {
        $(this).css('cursor', 'pointer')
      })
    }
  }

  clearOverlayFn(_overlay, _type) { // 删除覆盖物
    /* {
          type:"",
          id:"",
          lng:"",
          lat""
    }*/
    const _overlays = this.overlays
    let _arr = null
    if (_overlays && _overlays.length > 0) {
      _arr = _overlays.filter((_item) => {
        const _data = _item.get('overlayData')
        let _val = true
        switch (_type) {
          case 'all':
            this.map.removeOverlay(_item)
            _val = false
            break
          case 'type':
            if (_overlay === _data.type) {
              this.map.removeOverlay(_item)
              _val = false
            }
            break
          case 'one':
            if (_overlay.type === _data.type && _overlay.id === _data.id) {
              this.map.removeOverlay(_item)
              _val = false
            }
            break
        }
        return _val
      })

      this.overlays = []
      this.overlays = this.overlays.concat(_arr)
    }
  }
}

