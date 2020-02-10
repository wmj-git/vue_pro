<template>
  <div class="dashboard-container">
    <div id="hh"><el-button>按钮123</el-button></div>
    <template v-for="(item,index) in children.pane">
      <component :is="item.meta.componentType" :ref="item.meta.system_id" :key="index" :data="item" />
    </template>
    <template v-for="(item,index) in children.ContainerBox">
      <component :is="item.meta.componentType" :ref="item.meta.system_id" :key="index" :data="item" />
    </template>
  </div>
</template>

<script>
// 函数式编程工具库
/*
import * as _ from 'lodash'
import * as R from 'ramda'
*/

import { dataInitFn, childrenInitFn } from '@/utils/tool'

import { emMixin, emPage } from '@/utils/mixins'
import { mapGetters } from 'vuex'

import olMap from '@/components/olMap'

export default {
  name: 'Dashboard',
  components: {
    olMap
  },
  mixins: [emMixin, emPage],
  data() {
    return {
      set: {
      },
      children: {
        pane: [],
        ContainerBox: []
      }
    }
  },
  computed: {
    ...mapGetters([
      'roles',
      'currentRole'
    ])
  },
  created() {
    this.init()
  },
  mounted() {
    this.$nextTick(function() {
      $('#hh').window({
        inline: true,
        width: 600,
        height: 400,
        modal: false
      })
    })
  },
  beforeDestroy() {
  },
  methods: {
    init() {
      this.set = dataInitFn(this.set, this.meta)
      this.children = childrenInitFn(this.children, this.componentData)
    }
  }

}
</script>

<style scoped lang="scss">
  @import "dashboard";
</style>
