<template>
  <div class="account-container">
    <div class="table-operate">
      <el-input v-model="inputFilter" placeholder="输入用户名查询" />
      <el-button class="filter-item" style="margin-left: 10px;" type="primary" size="mini" icon="el-icon-plus" @click="handleCreate">
        添加
      </el-button>
    </div>
    <el-table
      :data="tableDataEnd"
      style="width: 100%"
      :row-class-name="tableRowClassName"
      @select="onTableSelect"
      @selection-change="handleSelectionChange"
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
  </div>
</template>
<script>
export default {
  name: 'permissionsManager',
  data() {
    return {
      inputFilter: '',
      tableDataEnd: [],
      dialogFormVisible: false,
      tableHeader: [
        {
          label: '姓名',
          key: 'name'
        },
        {
          label: '住址',
          key: 'address'
        },
        {
          label: '年龄',
          key: 'age'
        }
      ],
      temp: {
        name: '',
        address: '',
        age: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      dialogStatus: '',
      formLabelWidth: '120px',
      textMap: {
        update: '修改',
        create: '添加'
      },
      statusOptions: [
        '重庆', '上海', '云南', '江苏'
      ],
      checkedRows: [],
      multipleSelection: []
    }
  },
  methods: {
    handleEdit() {},
    handleDelete() {},
    handleCreate() {},
    handleSelectionChange() {},
    tableRowClassName() {},
    onTableSelect() {}
  }
}
</script>
<style lang="scss" scoped>
  .account-container {
    & .table-operate {
      .el-input {
        width: 30%;
      }
    }
  }
</style>
