<template>
  <div class="form-container">
    <el-card>
     12
    </el-card>
  </div>
</template>
<script>

import vueBus from '@/utils/vueBus'

export default {
  name: 'EmForm',
  components: {
  },
  data() {
    return {
      id: '',
      set: {
      }
    }
  },
  created() {
    this.init()
    vueBus.$on(this.id, obj => {
      this[obj.fn](obj)
    })
  },
  mounted() {
  },
  beforeDestroy() {
    vueBus.$off(this.id)
  },
  methods: {
    init() {
      const _route = this.$route.meta
      console.log('path：', this.$route.path, '$route:', this.$route)
      console.log('_route：', _route)
      // this.id = this.data.systemId
    }
  }
}
</script>
<style lang="scss" scoped>
@import "emForm";
</style>
