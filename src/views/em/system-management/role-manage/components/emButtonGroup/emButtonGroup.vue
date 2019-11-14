<template>
  <div class="buttonGroup-container">
    <div :class="set.class">
      <template v-if="set.groupType==='default'">
        <el-row>
          <el-button
            v-for="(btn,index) in children.buttonGroup"
            :key="index"
            :ref="btn.meta.system_id"
            :size="btn.meta.size"
            :type="btn.meta.type"
            :icon="btn.meta.icon"
            :disabled="btn.meta.disabled"
            :plain="btn.meta.plain ? btn.meta.plain : false "
            :round="btn.meta.round ? btn.meta.round : false "
            :circle="btn.meta.circle ? btn.meta.circle : false "
            :class="btn.meta.class ? btn.meta.class : ''"
            @click="fn(btn.meta.fn,{'btn':btn,'control_type':btn.meta.control_type})"
          >
            {{ btn.meta.title }}
          </el-button>
        </el-row>
      </template>
      <template v-else-if="set.groupType==='group'">
        <el-button-group>
          <el-button
            v-for="(btn,index) in children.buttonGroup"
            :key="index"
            :ref="btn.meta.system_id"
            :size="btn.meta.size"
            :type="btn.meta.type"
            :icon="btn.meta.icon"
            :disabled="btn.meta.disabled"
            :plain="btn.meta.plain ? btn.meta.plain : false "
            :round="btn.meta.round ? btn.meta.round : false "
            :circle="btn.meta.circle ? btn.meta.circle : false "
            :class="btn.meta.class ? btn.meta.class : ''"
            @click="fn(btn.meta.fn,{'btn':btn,'control_type':btn.meta.control_type})"
          >
            {{ btn.meta.title }}
          </el-button>
        </el-button-group>
      </template>
    </div>
  </div>

</template>

<script>
import vueBus from '@/utils/vueBus'
import { dataInitFn, childrenInitFn } from '@/utils/tool'
export default {
  name: 'EmButtonGroup',
  components: {},
  props: {
    data: {
      type: Object,
      default: () => {
        return { }
      }
    }
  },
  data() {
    return {
      id: '',
      set: {
        groupType: 'default',
        class: ''
      },
      children: {
        buttonGroup: []
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
    fn(_fn, _obj) {
      const _controlType = _obj.control_type ? _obj.control_type : ''
      switch (_controlType) {
        case 'tree':
          console.log('_obj', _obj)
          vueBus.$emit(_obj.btn.meta.control_id, {
            fn: _fn,
            data: _obj.btn
          })
          break
        case 'component':

          break
        case 'router':

          break
        default:
          this[_fn](_obj)
      }
    },
    init() {
      const _meta = this.data.meta
      this.id = _meta.system_id
      this.set = dataInitFn(this.set, _meta)
      // 获取行按钮数据
      this.children = childrenInitFn(this.children, this.data)
    },
    // 路由指向
    routerFn(_obj) {
      this.$router.push(_obj.path)
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "emButton";
</style>
