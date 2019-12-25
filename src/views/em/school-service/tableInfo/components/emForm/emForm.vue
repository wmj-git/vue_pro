<template>
  <div class="emSoleForm_container">
  <el-form
    :ref="system_id"
    :class="set.class"
    :label-position="set.labelPosition"
    :label-width="set.labelWidth"
    :status-icon="set.statusIcon"
    :model="temp"
    :rules="rules"
  >
    <template v-for="(item,index) in children.emSoleFormItem">
      <el-col :key="index" :offset="Number(item.meta.offset)" :span="Number(item.meta.span)">
        <el-form-item v-if="item.meta.itemType==='input'" :label="item.meta.title" :prop="item.meta.valueKey">
          <el-input
            :ref="item.meta.system_id"
            v-model="temp[item.meta.valueKey]"
            clearable
            :disabled="item.meta.disabled"
            :placeholder="item.meta.placeholder ? item.meta.placeholder : '请输入'"
          />
        </el-form-item>
        <el-form-item v-else-if="item.meta.itemType==='selectInput'" :label="item.meta.title" :prop="item.meta.valueKey">
          <el-input
            :ref="item.meta.system_id"
            v-model="temp[item.meta.valueKey]"
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
        <el-form-item v-else-if="item.meta.itemType==='dropzone'" :label="item.meta.title" :prop="item.meta.valueKey">
          <el-row>
            <el-col :span="16">
              <el-image
                :src="temp[item.meta.valueKey]"
                style="max-height: 120px;overflow: hidden"
                fit="fit"
              />
            </el-col>
            <el-col :span="28">
              <dropzone
                :id="item.meta.system_id"
                :url="BASE_API+item.meta.url"
                :item="item"
                @dropzone-removedFile="dropzoneR"
                @dropzone-success="dropzoneS"
              />
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item v-else-if="item.meta.itemType==='textarea'" :label="item.meta.title" :prop="item.meta.valueKey">
          <el-input
            :ref="item.meta.system_id"
            v-model="temp[item.meta.valueKey]"
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
            v-model="temp[item.meta.valueKey]"
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
            v-model="temp[item.meta.valueKey]"
            :disabled="item.meta.disabled"
            :placeholder="item.meta.placeholder ? item.meta.placeholder : '请选择时间'"
            format
          />
        </el-form-item>
        <el-form-item v-else-if="item.meta.itemType==='select'" v-show="item.meta.itemFormVisible" :label="item.meta.title" :prop="item.meta.valueKey">
          <el-select
            :ref="item.meta.system_id"
            v-model="temp[item.meta.valueKey]"
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
          @click="fn(item, Form)"
        >
          {{ item.meta.title }}
        </el-button>
      </el-col>
    </template>
  </el-form>
  </div>
</template>
<script>
import Dropzone from '@/components/Dropzone'
import { emMixin } from '@/utils/mixins'
import { dataInitFn, childrenInitFn } from '@/utils/tool'
export default {
  name: 'EmSoleForm',
  components: { Dropzone },
  mixins: [emMixin],
  data() {
    return {
      temp: {},
      rules: {}, // 验证数据
      children: {
        emSoleFormItem: []
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
    dropzoneS(file, el, item) {
      if (!(file.xhr.status === 200)) {
        return
      }
      const _response = JSON.parse(file.xhr.response)
      const _imgUrl = _response.data[0].networkPath
      this.temp[item.meta.valueKey] = _imgUrl // 后台获取到的url地址赋值给表单
    },
    // 移除图片
    dropzoneR(file) {
    }
  }
}
</script>
<style lang="scss" scoped>
  @import "emForm";
</style>
