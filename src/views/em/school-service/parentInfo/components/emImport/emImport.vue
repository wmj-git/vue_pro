<template>
  <div class="emImport_container">
  <el-dialog :title="meta.title" :visible.sync="dialogFormVisible" :modal-append-to-body="false">
    <el-upload
      :ref="system_id"
      class="upload-demo"
      :action="meta.action"
      :on-preview="handlePreview"
      :on-remove="handleRemove"
      :file-list="fileList"
      :headers="headers"
      :limit="1"
      name="upfile"
      accept=".csv "
      :on-error="uploadFileError"
      :on-success="uploadFileSuccess"
      :auto-upload="false"
    >
      <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
      <el-button style="margin-left: 10px;" size="small" type="success" @click="downloadModel">下载模板</el-button>
      <div slot="tip" class="el-upload__tip">只能上传csv文件</div>
    </el-upload>
    <div slot="footer" class="dialog-footer">
      <el-button class="em-button" @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" class="em-button" @click="submitUpload">确 定</el-button>
    </div>
  </el-dialog>
  </div>
</template>
<script>
import { emMixin } from '@/utils/mixins'
import { uploadFile } from '@/api/schoolService/parentInfo'
import { dataInitFn, childrenInitFn } from '@/utils/tool'
import { getToken } from '@/utils/auth'
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
        'Authorization': getToken()
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
    fn(_fn, _obj) {
      const _controlType = _obj.control_type ? _obj.control_type : ''
      // const _controlId = _obj.item.meta.control_id
      switch (_controlType) {
        case 'default':
          this[_fn](_obj.meta)
          break
        default:
          this.$message({
            message: '(control_type)参数无效',
            type: 'error'
          })
      }
    },
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handlePreview(file) {
      console.log(file)
    },
    uploadFileError(err, file, fileList) {
      console.log(err)
      this.$message.error('错了哦，这是一条错误消息')
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
    import(obj) {
      this.dialogFormVisible = true
      console.log('obj', obj)
      this.action = process.env.VUE_APP_BASE_API + this.set.importUrl
     /* uploadFile({
        url: process.env.VUE_APP_BASE_API + this.set.importUrl,
      }).then(val => {
        console.log(22, val)
        this.action = val
        console.log('action', this.action)
      })*/
    },
    submitUpload() {
      this.$refs[this.system_id].submit()
    }
  }
}
</script>
<style lang="scss" scoped>
  @import "emImport";
</style>
