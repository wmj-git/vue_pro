<template>
  <div>tabsTable
    <el-tabs :tab-position="tabPosition">

      <el-tab-pane label="22">
        <base-table />
      </el-tab-pane>
      <el-tab-pane label="ss">
        <base-table />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import BaseTable from '@/components/baseTable/baseTable'
export default {
  name: 'TabsTable',
  components: { BaseTable },
  data() {
    return {
      tabPosition: 'left',
      tables: '',
      table12: ''
    }
  }
}
</script>
