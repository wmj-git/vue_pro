<template>
  <div class="emDrawer-container">
    <el-drawer
      v-if="drawer"
      :visible.sync="set.visible"
      direction="rtl"
      :modal="set.modal"
      :modal-append-to-body="set.appendToBody"
      :show-close="true"
      :destroy-on-close="true"
      :size="set.size"
    >
      <el-form label-position="left" class="demo-table-expand">
        <el-form-item :label="item.name" v-for="(item,index) in children.drawerItem" :key="index">
          <span>{{item.value}}</span>
        </el-form-item>
      </el-form>
    </el-drawer>
  </div>
</template>

<script>
import vueBus from '@/utils/vueBus'
import { emMixin } from '@/utils/mixins'
import { dataInitFn, childrenInitFn } from '@/utils/tool'
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
        modal: false, // 是否添加遮罩(添加遮罩)
        appendToBody: false, // 遮罩和body有冲突
        visible: false,
        size: '20%',
        vueBusName: '' // 区分抽屉
      },
      rules: {}
    }
  },
  mounted() {
    vueBus.$on(this.set.vueBusName, res => {
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
    }
  }
}
</script>
<style lang="scss" scoped>
  @import "emDrawer";
</style>
