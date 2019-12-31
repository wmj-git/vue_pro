<template>
  <div class="htmlPan-container">
    <el-card :style="{'width':set.width,'max-height': set.maxHeight,'overflow-y': 'auto'}">
      <div v-html="contentData" />
    </el-card>
  </div>
</template>
<script>
import { emMixin } from '@/utils/mixins'
import { dataInitFn, childrenInitFn } from '@/utils/tool'

export default {
  name: 'HtmlPan',
  components: {
  },
  mixins: [emMixin],
  data() {
    return {
      set: {
        width: '750px',
        maxHeight: '100%' // 表单最大高
      },
      contentData: `<h1>html内容</h1>` // 表单组值对象
    }
  },
  watch: {
  },
  created() {
    this.init()
  },
  mounted() {
  },
  beforeDestroy() {
  },
  methods: {
    fn(obj, data) {
      const _obj = JSON.parse(JSON.stringify(obj))
      const _data = JSON.parse(JSON.stringify(data))
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
      // 获取行按钮数据
      this.children = childrenInitFn(this.children, this.componentData)
    },
    setContentFn({ meta, data }) {
      this.contentData = data
    }
  }
}
</script>
<style lang="scss" scoped>
@import "htmlPan";
</style>
