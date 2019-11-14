<template>
  <div class="emButton-container">
    <el-button
      v-for="(btn, key) in buttonGroup"
      :ref="btn.meta.system_id"
      :key="key"
      class="el-button"
      :type="btn.meta.type"
      :size="btn.meta.size"
      :title="btn.meta.title"
      :icon="btn.meta.icon"
      @click="handleClick(btn.meta.fn)"
    >
      {{ btn.meta.title }}
    </el-button>
  </div>
</template>
<script>
import vueBus from '@/utils/vueBus'
export default {
  name: 'EmButton',
  props: ['data'],
  data() {
    return {
      id: '',
      buttonGroup: []
    }
  },
  created() {
    this.init()
    vueBus.$on(this.id, obj => {
      this[obj.fn](obj)
    })
  },
  beforeDestroy() {
    vueBus.$off(this.id)
  },
  methods: {
    handleClick(fn) {
      this.$emit('click', fn)
    },
    init() {
      if (this.data.children) {
        const _group = []
        this.data.children.forEach(function(_obj) {
          if (_obj.meta.system_type === 'EmButton') {
            _group.push(_obj)
          }
        })
        this.buttonGroup = _group
      }
    }
  }
}
</script>
<style lang="scss" scoped>
  @import "emButtons";
</style>
