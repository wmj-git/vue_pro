<template>
  <div class="emTabs">
    <el-tabs v-model="editableTabsValue" closable :tab-position="tabPosition" @tab-remove="removeTab">
      <el-tab-pane
        v-for="(item) in editableTabs"
        :key="item.name"
        :label="item.title"
        :name="item.name"
      >
        <span slot="label">{{ item.title }}</span>
        <component :is="item.component" :data="item.component_data" />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  name: 'EmTabs',
  data() {
    return {
      id: '',
      tabPosition: 'left',
      editableTabsValue: '2',
      editableTabs: [],
      tabIndex: 2
    }
  },
  methods: {
    removeTab() {}
  }
}
</script>

<style scoped lang="scss">
  @import "emTabs";
</style>
