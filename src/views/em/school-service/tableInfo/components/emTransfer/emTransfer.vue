<template>
  <div class="emTransfer_container">
    <el-dialog
      title="分配班级"
      :modal-append-to-body="false"
      :visible.sync="dialogFormVisible"
    >
      <el-transfer
        v-model="transfer_data"
        filterable
        :titles="['未分配班级', '已分配班级']"
        :filter-method="filterMethod"
        filter-placeholder="输入查询关键字"
        :data="transfer_data"
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
import { fetchList } from '@/api/schoolService/tableInfo'
import { emMixin } from '@/utils/mixins'
import { dataInitFn, childrenInitFn } from '@/utils/tool'
export default {
  name: 'EmTransfer',
  mixins: [emMixin],
  data() {
    return {
      transfer_data: [],
      dialogFormVisible: false,
      children: {
        formBtn: []
      },
      set: {
        queryUrl: '' // 未分配班级
      },
      pinyin: [],
      filter_placeholder: '',
      value: []
    }
  },
  created() {
    this.init()
    console.log('transfer_data', this.transfer_data)
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
    filterMethod(query, item) {
    },
    changeDialogHidden() {
      this.dialogFormVisible = false
    },
    async connectToClass() {
      this.dialogFormVisible = true
      await fetchList({ // 未分配班级信息
        url: this.set.queryUrl
      }).then(response => {
        response.data.list.forEach((val, _index) => {
          this.pinyin.push(val.name)
          this.transfer_data.push({
            label: val.name,
            key: val.id,
            pinyin: this.pinyin[_index]
          })
        })
        return this.transfer_data
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
