<template>
  <div class="emImport_container">
    <el-dialog :title="meta.title" :visible.sync="dialogFormVisible" :modal-append-to-body="false">
      <el-upload
        :ref="system_id"
        v-loading="uploadLoading"
        class="upload-demo"
        :action="action"
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :file-list="fileList"
        :headers="headers"
        name="file"
        accept=".xlsx "
        :auto-upload="false"
        :http-request="uploadFile"
        :on-change="fileChange"
      >
        <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
        <el-button style="margin-left: 10px;" size="small" type="success" @click="downloadModel">下载模板</el-button>
        <div slot="tip" class="el-upload__tip">请先下载模板，再选择文件上传！</div>
      </el-upload>
      <div slot="footer" class="dialog-footer">
        <el-button class="em-button" @click="cancelUpload">取 消</el-button>
        <el-button type="primary" class="em-button" @click="submitUpload">提交</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import vueBus from '@/utils/vueBus'
import { emMixin } from '@/utils/mixins'
import { dataInitFn, childrenInitFn } from '@/utils/tool'
import { uploadFile } from '@/api/schoolService/parentInfo'
export default {
  name: 'EmImport',
  mixins: [emMixin],
  data() {
    return {
      set: {
        downloadUrl: '',
        importUrl: '',
        fn_importQuery: {} // 导入后需要查询数据
      },
      fileList: [], // 文件列表
      dialogFormVisible: false,
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      uploadLoading: '',
      action: '',
      files: [] // 选择文件
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
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handlePreview(file) {
      console.log(file)
    },
    downloadModel() { // 下载导入需要的模板
      window.location.href = process.env.VUE_APP_BASE_API + this.set.downloadUrl
    },
    // 导入csv
    import() {
      this.dialogFormVisible = true
      this.action = process.env.VUE_APP_BASE_API + this.set.importUrl
    },
    fileChange(file) {
      this.files.push(file.raw) // 上传文件变化时将文件对象push进files数组
    },
    // 上传文件
    uploadFile(params) {
      if (this.files) {
        const formData = new FormData()
        this.files = params.file
        formData.append('file', this.files)
        uploadFile({
          url: process.env.VUE_APP_BASE_API + this.set.importUrl,
          params: formData
        }).then(response => {
          if (response.statusCode === 200) {
            this.$notify({
              message: '数据导入成功',
              type: 'success'
            })
            this.dialogFormVisible = false
            vueBus.$emit(this.set.fn_importQuery.control_id, { // 点击楼层查询该楼层已分配设备
              fn: 'getList'
            })
            vueBus.$emit('query')
          } else {
            this.$notify.error('数据导入失败')
          }
        })
      }
    },
    submitUpload(event) {
      this.$refs[this.system_id].submit()
    },
    cancelUpload() {
      this.dialogFormVisible = false
      this.files = null
      this.$message.info('已取消上传')
    }
  }
}
</script>
<style lang="scss" scoped>
  @import "emImport";
</style>
