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
            :type="btn.meta.buttonType ? btn.meta.buttonType : 'primary'"
            :icon="btn.meta.icon"
            :disabled="btn.meta.disabled"
            :plain="btn.meta.plain ? btn.meta.plain : false "
            :round="btn.meta.round ? btn.meta.round : false "
            :circle="btn.meta.circle ? btn.meta.circle : false "
            :class="btn.meta.class ? btn.meta.class : ''"
            @click="fn(btn, {'btn':btn,'control_type':btn.meta.control_type})"
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
            :type="btn.meta.buttonType ? btn.meta.buttonType : 'primary'"
            :icon="btn.meta.icon"
            :disabled="btn.meta.disabled"
            :plain="btn.meta.plain ? btn.meta.plain : false "
            :round="btn.meta.round ? btn.meta.round : false "
            :circle="btn.meta.circle ? btn.meta.circle : false "
            :class="btn.meta.class ? btn.meta.class : ''"
            @click="fn(btn,{'btn':btn,'control_type':btn.meta.control_type})"
          >
            {{ btn.meta.title }}
          </el-button>
        </el-button-group>
      </template>
    </div>
  </div>

</template>

<script>
import { emMixin } from '@/utils/mixins'
import vueBus from '@/utils/vueBus'
import { dataInitFn, childrenInitFn, TimeFn } from '@/utils/tool'
export default {
  name: 'EmButtonGroup',
  components: {},
  mixins: [emMixin],
  data() {
    return {
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
  },
  mounted() {
  },
  beforeDestroy() {
  },
  methods: {
    fn(_obj, _data) {
      const _controlType = _obj.meta.control_type ? _obj.meta.control_type : ''
      // const _controlId = _obj.meta.control_id
      switch (_controlType) {
        case 'none':
          // console.log(_controlId)
          break
        default:
          this.FN(_obj, _data)
      }
    },
    controlGroupFn(_obj) {
      let tm1 = null
      if ('controlGroup' in _obj.meta) {
        _obj.meta.controlGroup.forEach((_item) => {
          switch (_item.control_type) {
            case 'TimeFn':
              tm1 = new TimeFn('t1', () => {
                vueBus.$emit(_item.control_id, {
                  meta: _item,
                  set: _item.fn_set
                })
              }, () => {
                return false
              }, 200)
              tm1.run()
              break
            default:
              vueBus.$emit(_item.control_id, {
                meta: _item,
                set: _item.fn_set
              })
          }
        })
      }
    },
    init() {
      this.set = dataInitFn(this.set, this.meta)
      this.children = childrenInitFn(this.children, this.componentData)
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "emButton";
</style>
