<template>
  <div>
    <el-dialog title="导入" :visible.sync="dialogVisible" :modal-append-to-body="false">
      <el-upload
        ref="upload"
        class="upload-demo"
        :action="action"
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :file-list="fileList"
        :limit="1"
        :headers="headers"
        name="upfile"
        accept=".csv "
        :on-error="uploadFileErro"
        :on-success="uploadFileSuccess"
        :auto-upload="false"
      >
        <el-button slot="trigger" size="small" type="primary" class="em-btn-border">选取文件</el-button>
        <el-button style="margin-left: 10px;" size="small" type="success" class="em-btn-border" @click="downloadModel">
          下载模板
        </el-button>
        <div slot="tip" class="el-upload__tip">只能上传csv文件</div>
      </el-upload>
      <div slot="footer" class="dialog-footer">
        <el-button class="em-button" @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" class="em-button" @click="submitUpload">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { getToken } from '@/utils/auth'
import { downloadExcel } from '@/utils/mUtils.js'
import { downModel } from '@/api/schoolService/studentInfo'
export default {
  name: 'EmDialog',
  data() {
    return {
      headers: {
        'Authorization': getToken()
      }, // 请求头
      fileList: [], // 文件列表
      action: '',
      dialogVisible: false,
      url: ''
    }
  },
  created() {
    this.$emit('dialogVisible', true)
  },
  methods: {
    submitUpload() {
      this.dialogVisible = false
    },
    handleRemove(file, fileList) {},
    handlePreview(file) {},
    uploadFileErro() {},
    uploadFileSuccess(response, file, fileList) {},
    downloadModel() {
      downModel({
        responseType: 'blob'
      }).then((res) => {
        console.log(12)
        downloadExcel(res.data)
      })
    },
    changeDialogVisible() {
      this.dialogVisible = true
    }
  }
}
</script>
