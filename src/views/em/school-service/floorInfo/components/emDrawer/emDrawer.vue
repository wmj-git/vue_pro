<template>
  <div class="emDrawer-container">
    <el-drawer
      v-if="drawer"
      :visible.sync="set.visible"
      direction="rtl"
      :modal="set.modal"
      :append-to-body="set.appendToBody"
      :show-close="true"
      :destroy-on-close="true"
      :size="set.size"
    >
      <el-form label-position="left" class="demo-table-expand">
        <el-form-item v-if="set.imgUrl!==''" class="picture">
          <el-image
            :src="baseUrl+imgUrl"
          />
        </el-form-item>
        <el-form-item
          v-for="(item,index) in children.drawerItem"
          :key="index"
          :label="item.name"
          :formatter="formatterFn"
        >
          <span>{{ item.value }}</span>
        </el-form-item>
      </el-form>
    </el-drawer>
  </div>
</template>

<script>
import vueBus from '@/utils/vueBus'
import { emMixin } from '@/utils/mixins'
import { dataInitFn, childrenInitFn } from '@/utils/tool'
import { staticFormatterMap } from '@/utils/formatterMap'
export default {
  name: 'EmDrawer',
  mixins: [emMixin],
  data() {
    return {
      drawer: true,
      temp: {},
      children: {
        drawerItem: []
      },
      set: {
        modal: true, // 是否添加遮罩
        appendToBody: true,
        visible: false,
        size: '20%',
        imgUrl: ''
      },
      rules: {}
    }
  },
  mounted() {
    vueBus.$on('tableDetail', res => {
      console.log('详情信息：', res)
      this.set.visible = true
      this.children.drawerItem = []
      res.label.forEach(val => {
        for (const i in res.row) {
          if (i === val.key) {
            this.children.drawerItem.push({ name: val.label, value: res.row[i] })
          }
        }
      })
    })
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      this.set = dataInitFn(this.set, this.meta)
      this.children = childrenInitFn(this.children, this.componentData)
    },
    // 过滤字段
    formatterFn(row, column) {
      let _val = ''
      const _formatterMap = Object.assign({}, this.formatterMap, staticFormatterMap) // 动态和静态数据求交集
      if (column.property in _formatterMap) {
        _val = _formatterMap[column.property].get(row[column.property])
      } else {
        _val = row[column.property]
      }
      return _val
    }
  }
}
</script>
<style lang="scss" scoped>
  @import "emDrawer";
</style>
