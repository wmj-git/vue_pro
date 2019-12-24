<template>
  <div class="emTransfer_container">
    <el-dialog
      title="分配班级"
      :modal-append-to-body="false"
      :visible.sync="dialogFormVisible"
    >
      <el-transfer
        v-model="meta.value"
        filterable
        :titles="['未分配班级', '已分配班级']"
        :filter-method="filterMethod"
        filter-placeholder="输入查询关键字"
        :data="list_data"
      />
      <div slot="footer" class="dialog-footer">
        <template v-for="(btn, _index ) in children.formBtn">
          <el-button
            :key="_index"
            :ref="btn.meta.system_id"
            class="em-btn-operation"
            size="mini"
            :type="btn.meta.buttonType ? btn.meta.buttonType : 'primary'"
            @click="fn(btn)"
          >
            {{ btn.meta.title }}
          </el-button>
        </template>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { emMixin } from '@/utils/mixins'
import { dataInitFn, childrenInitFn } from '@/utils/tool'
export default {
  name: 'EmTransfer',
  mixins: [emMixin],
  data() {
    return {
      list_data: [],
      dialogFormVisible: false,
      children: {
        formBtn: []
      },
      filter_placeholder: '',
      value: [],
      filterMethod(query, item) {
        return item.pinyin.indexOf(query) > -1
      }
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      this.set = dataInitFn(this.set, this.meta)
      this.children = childrenInitFn(this.children, this.componentData)
    },
    fn(_obj, _data) {
      console.log('methods', _obj, _data)
      const _controlType = _obj.meta.control_type ? _obj.meta.control_type : ''
      switch (_controlType) {
        default:
          this.FN(_obj, _data)
      }
    },
    changeDialogHidden() {
      this.dialogFormVisible = false
    },
    connectToClass() {
      this.dialogFormVisible = true
      const cities = ['上海', '北京', '广州', '深圳', '南京', '西安', '成都']
      const pinyin = ['shanghai', 'beijing', 'guangzhou', 'shenzhen', 'nanjing', 'xian', 'chengdu']
      cities.forEach((city, index) => {
        this.list_data.push({
          label: city,
          key: index,
          pinyin: pinyin[index]
        })
      })
    },
    connectData() {},
    // 提交表单
    submitFn() {
      this.dialogStatus === 'create' ? this.connectData() : ''
    }
  }
}
</script>
<style lang="scss" scoped>
  @import "emTransfer";
</style>
