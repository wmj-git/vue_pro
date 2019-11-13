<template>
  <el-select
    v-model="value"
    placeholder="请选择"
    @change="handleChange"
  >
    <el-option
      v-for="(item,index) in options"
      :key="index"
      :label="item.label"
      :value="item.value"
    />
  </el-select>
</template>

<script>
export default {
  name: 'EmSelect',
  props: ['options'],
  data() {
    return {
      value: ''
    }
  },
  methods: {
    handleChange(value) {
      this.$emit('emEvent', value)
    }
  }
}
</script>
