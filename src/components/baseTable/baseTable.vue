<template>
  <div>
    <div class="operate">
      <em-select :options="options" @emEvent="selectOption" />
    </div>
    <el-table
      :data="tableDataEnd"
      style="width: 100%"
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
      <el-table-column label="操作" fixed="right" width="auto">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            @click="handleEdit(scope.row)"
          >编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import EmSelect from '@/components/emSelect/emSelect'
export default {
  name: 'BaseTable',
  components: { EmSelect },
  data() {
    return {
      tableDataEnd: '',
      tableHeader: [
        {
          label: 'name',
          key: 'name'
        },
        {
          label: 'sex',
          key: 'sex'
        },
        {
          label: 'age',
          key: 'age'
        },
        {
          label: 'address',
          key: 'address'
        }
      ],
      options: [
        {
          value: 0,
          label: '选项一'
        },
        {
          value: 1,
          label: '选项二'
        }
      ]
    }
  },
  methods: {
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    handleEdit() {},
    selectOption(val) {
      console.log(val)
    }
  }
}
</script>
