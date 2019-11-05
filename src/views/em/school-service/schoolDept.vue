<template>
  <div>
    <el-table
      :data="tableDataEnd"
      style="width: 100%"
    >
      <el-table-column
        type="index"
        width="50"
      />
      <el-table-column
        type="selection"
        width="55"
      />
      <el-table-column
        v-for="info in tableHeader"
        :key="info.key"
        :label="info.label"
      >
        <template slot-scope="scope">
          <span>{{ scope.row[info.key] }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" fixed="right">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            @click="handleEdit(scope.row)"
          >编辑</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index,scope.row)"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />
  </div>
</template>
<script>
export default {
  name: 'SchoolDept',
  data() {
    return {
      tableDataEnd: [],
      tableHeader: [
        {
          label: '学校名称',
          key: 'name'
        },
        {
          label: '学校地址',
          key: 'address'
        },
        {
          label: '学校组织编码',
          key: 'orgCode'
        },
        {
          label: '所属教委id',
          key: 'siEcId'
        },
        {
          label: '学校联系电话',
          key: 'tel'
        }
      ],
      listLoading: true,
      total: 0,
      listQuery: {
        page: 1,
        limit: 20,
        importance: undefined,
        title: undefined,
        type: undefined,
        sort: '+id'
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      /* fetchList(this.listQuery).then(response => {
        this.list = response.data.items
        this.total = response.data.total

        // Just to simulate the time of the request
        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
      })*/
    },
    handleEdit() {},
    handleDelete() {}
  }
}
</script>
