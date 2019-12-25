<template>
  <div class="emTransfer_container">
    <el-dialog
      title="分配班级"
      :modal-append-to-body="false"
      :visible.sync="dialogFormVisible"
    >
      <el-transfer
        v-model="value"
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
    /* const generateData = async _ => {
      await this.getList()
      console.log('classData:', this.classData)
      return this.classData
    }
    console.log('generateData', generateData())*/
    const generateData = async _ => {
      const data = []
      await fetchList({ // 未分配班级信息
        url: '/school/class/queryAllByPage'
      }).then(response => {
        console.log('结果：', response)
        response.data.list.forEach((val) => {
          data.push({
            label: val.name,
            key: val.id
          })
        })
      })
      console.log(11, data)
      return data
    }
    console.log(222, generateData())
    return {
      transfer_data: generateData(),
      value: [],
      dialogFormVisible: false,
      children: {
        formBtn: []
      },
      set: {
        queryUrl: '' // 未分配班级
      },
      classData: []
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
    async getList() {
      await fetchList({ // 未分配班级信息
        url: '/school/class/queryAllByPage'
      }).then(response => {
        response.data.list.forEach((val) => {
          this.classData.push({
            label: val.name,
            key: val.id
          })
        })
      })
    },
    filterMethod(query, item) {
    },
    changeDialogHidden() {
      this.dialogFormVisible = false
    },
    connectToClass() {
      this.dialogFormVisible = true
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
