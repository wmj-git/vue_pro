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
        :limit="1"
        name="file"
        accept=".xlsx "
        :on-error="uploadFileError"
        :on-success="uploadFileSuccess"
        :auto-upload="false"
        :http-request="uploadFile"
        :on-change="fileChange"
      >
        <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
        <el-button style="margin-left: 10px;" size="small" type="success" @click="downloadModel">下载模板</el-button>
        <div slot="tip" class="el-upload__tip">请先下载模板，且只能上传csv文件！</div>
      </el-upload>
      <div slot="footer" class="dialog-footer">
        <el-button class="em-button" @click="cancelUpload">取 消</el-button>
        <el-button type="primary" class="em-button" @click="submitUpload">提交</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
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
        importUrl: ''
      },
      fileList: [], // 文件列表
      children: {
        importItem: []
      },
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
    uploadFileError(err, file, fileList) {
      console.log(err)
      this.$message.error('文件导入失败')
    },
    uploadFileSuccess(response, file, fileList) {
      console.log(response.data.jsonmsg.ERRORMSG)
      if (response.data.jsonmsg.ERRORMSG === '') {
        this.$message({
          message: '恭喜你，导入成功',
          type: 'success'
        })
        this.init()
        this.dialogFormVisible = false
      } else {
        this.$message({
          message: response.data.jsonmsg.ERRORMSG.slice(response.data.jsonmsg.ERRORMSG.indexOf('=') + 1),
          type: 'error'
        })
      }
    },
    downloadModel() { // 下载导出需要的模板
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
        const fileObj = params.file
        const formData = new FormData()
        this.files = params.file
        console.log(225, this.files)
        formData.append('files', this.files[0])
        console.log('form数据', formData)
        uploadFile({
          url: process.env.VUE_APP_BASE_API + this.set.importUrl,
          params: formData
        }).then(response => {
          console.log(response)
          this.$message.info('文件：' + fileObj.name + '上传成功')
        })
      }
    },
    submitUpload(event) {
      this.$refs[this.system_id].submit()
    },
    cancelUpload() {
      this.dialogFormVisible = false
      this.$message.info('已取消上传')
    }
  }
}
</script>
<style lang="scss" scoped>
  @import "emImport";
</style>
