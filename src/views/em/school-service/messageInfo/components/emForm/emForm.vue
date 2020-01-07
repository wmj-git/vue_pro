<template>
  <div class="emSoleForm_container">
  <el-form
    :ref="system_id"
    :class="set.class"
    :label-position="set.labelPosition"
    :label-width="set.labelWidth"
    :status-icon="set.statusIcon"
    :model="form"
    :rules="rules"
  >
    <template v-for="(item,index) in children.emSoleFormItem">
      <el-col :key="index" :offset="Number(item.meta.offset)" :span="Number(item.meta.span)">
        <el-form-item v-if="item.meta.itemType==='input'" :label="item.meta.title" :prop="item.meta.valueKey">
          <el-input
            :ref="item.meta.system_id"
            v-model="form[item.meta.valueKey]"
            clearable
            :disabled="item.meta.disabled"
            :placeholder="item.meta.placeholder ? item.meta.placeholder : '请输入'"
          />
        </el-form-item>
        <el-form-item v-if="item.meta.itemType==='img'" :label="item.meta.title" :prop="item.meta.valueKey">
         <img
              :ref="item.meta.system_id"
               :src="form[item.meta.valueKey]">
        </el-form-item>
        <el-form-item v-else-if="item.meta.itemType==='selectInput'" :label="item.meta.title" :prop="item.meta.valueKey">
          <el-input
            :ref="item.meta.system_id"
            v-model="form[item.meta.valueKey]"
            :disabled="item.meta.disabled"
            :placeholder="item.meta.placeholder ? item.meta.placeholder : '请输入'"
            clearable
          >
            <el-select
              slot="prepend"
              v-model="item.meta.valueKey"
              :style="{width: item.meta.selectWidth}"
              @change="selectInputKey(item.meta.valueKey,item.meta)"
            >
              <template v-for="(option, _index) in item.meta.options_OBJ.data">
                <el-option :key="_index" :label="option.label" :value="option.value" />
              </template>
            </el-select>
          </el-input>
        </el-form-item>
        <el-form-item v-else-if="item.meta.itemType==='textarea'" :label="item.meta.title" :prop="item.meta.valueKey">
          <el-input
            :ref="item.meta.system_id"
            v-model="form[item.meta.valueKey]"
            clearable
            :disabled="item.meta.disabled"
            :placeholder="item.meta.placeholder ? item.meta.placeholder : '请输入'"
            type="textarea"
            :autosize="item.meta.autosize_OBJ ? item.meta.autosize_OBJ : { minRows: 2, maxRows: 4}"
          />
        </el-form-item>
        <el-form-item v-else-if="item.meta.itemType==='selects'" v-show="item.meta.itemFormVisible" :label="item.meta.title" :prop="item.meta.valueKey">
          <el-select
            :ref="item.meta.system_id"
            v-model="form[item.meta.valueKey]"
            :disabled="item.meta.disabled"
            :placeholder="item.meta.placeholder ? item.meta.placeholder : '请选择'"
            multiple
            clearable
          >
            <template v-for="(option, _index) in item.meta.options_OBJ.data">
              <el-option :key="_index" :label="option.label" :value="option.value" />
            </template>
          </el-select>
        </el-form-item>
        <el-form-item v-else-if="item.meta.itemType==='datetime'" :label="item.meta.title" :prop="item.meta.valueKey">
          <el-date-picker
            :ref="item.meta.system_id"
            v-model="form[item.meta.valueKey]"
            :disabled="item.meta.disabled"
            :placeholder="item.meta.placeholder ? item.meta.placeholder : '请选择时间'"
            format
          />
        </el-form-item>
        <el-form-item v-else-if="item.meta.itemType==='select'" v-show="item.meta.itemFormVisible" :label="item.meta.title" :prop="item.meta.valueKey">
          <el-select
            :ref="item.meta.system_id"
            v-model="form[item.meta.valueKey]"
            :disabled="item.meta.disabled"
            clearable
            :placeholder="item.meta.placeholder ? item.meta.placeholder : '请选择'"
          >
            <template v-for="(option, _index) in item.meta.options_OBJ.data">
              <el-option :key="_index" :label="option.label" :value="option.value" />
            </template>
          </el-select>
        </el-form-item>
        <el-button
          v-else-if="item.meta.itemType==='button'"
          :ref="item.meta.system_id"
          :icon="item.meta.icon"
          :class="item.meta.class"
          :disabled="item.meta.disabled"
          :type="item.meta.buttonType ? item.meta.buttonType : 'primary'"
          @click="fn(item, form)"
        >
          {{ item.meta.title }}
        </el-button>
      </el-col>
    </template>
  </el-form>
  </div>
</template>
<script>
import { emMixin } from '@/utils/mixins'
import { dataInitFn, childrenInitFn } from '@/utils/tool'
import vueBus from '@/utils/vueBus'
import { delList } from '@/api/schoolService/tableInfo'
export default {
  name: 'EmSoleForm',
  mixins: [emMixin],
  data() {
    return {
      form: {},
      rules: {}, // 验证数据
      children: {
        emSoleFormItem: []
      },
      set: {
        removeUrl: ''
      },
      ids: [] // 要删除的数组id
    }
  },
  created() {
    this.init()
    vueBus.$on('getCarousel', val => {
      this.form = val
    })
  },
  methods: {
    fn(_obj, _data) {
      console.log('methods', _obj, _data)
      this.$refs[this.system_id].validate((valid) => { // 表单验证
        if (valid) {
          return true
        } else {
          console.log('error submit!!')
          return false
        }
      })
      const _controlType = _obj.meta.control_type ? _obj.meta.control_type : ''
      switch (_controlType) {
        default:
          this.FN(_obj, _data)
      }
    },
    init() {
      this.set = dataInitFn(this.set, this.meta)
      this.children = childrenInitFn(this.children, this.componentData)
    },
    // 删除banner图
    removeImage() {
      this.ids.push(this.form.id)
      console.log('ids', this.ids)
      if (this.ids.length >= 1) {
        this.$confirm('此操作将删除所选项, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          delList({
            url: this.set.removeUrl,
            params: this.ids
          }).then(res => {
            this.ids = []
            if (res.statusCode === 200) {
              this.$notify({
                message: '删除成功',
                type: 'success'
              })
            }
            vueBus.$emit('getBanner')
            this.form = {}
          })
        }).catch(() => {
        })
      } else {
        this.$message({
          showClose: true,
          message: '请先单击复选框选择你要删除的数据行',
          type: 'warning'
        })
      }
    }
  }
}
</script>
<style lang="scss" scoped>
  @import "emForm";
</style>
