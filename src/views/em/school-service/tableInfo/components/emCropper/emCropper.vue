<template>
  <div class="emCropper-container">
    <el-upload
      class="upload-demo"
      action="action"
      drag
      :headers="headers"
      name="files"
      :file-list="fileList"
      :auto-upload="false"
      :show-file-list="true"
      :on-change="changeUpload"
    >
      <i class="el-icon-upload" />
      <div class="el-upload__text">点击上传</div>
      <div class="el-upload__tip">支持绝大多数图片格式，单张图片最大支持5MB</div>
    </el-upload>
    <el-dialog title="图片剪裁" :visible.sync="dialogVisible" append-to-body>
      <div class="cropper-content">
        <div class="cropper" style="text-align:center">
          <vueCropper
            ref="cropper"
            :img="option.img"
            :output-size="option.size"
            :output-type="option.outputType"
            :info="true"
            :full="option.full"
            :can-move="option.canMove"
            :can-move-box="option.canMoveBox"
            :original="option.original"
            :auto-crop="option.autoCrop"
            :fixed="option.fixed"
            :fixed-number="option.fixedNumber"
            :center-box="option.centerBox"
            :info-true="option.infoTrue"
            :fixed-box="option.fixedBox"
          />
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" :loading="loading" @click="onsubmit">确认上传</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { client } from '@/api/schoolService/tableInfo.js'
import { emMixin } from '@/utils/mixins'
import { dataInitFn, childrenInitFn } from '@/utils/tool'
export default {
  name: 'EmCropper',
  mixins: [emMixin],
  data() {
    return {
      fileList: [],
      dialogVisible: false,
      // 裁剪组件的基础配置option
      set: {
        uploadUrl: ''
      },
      option: {
        canMove: true,
        img: '', // 裁剪图片的地址
        info: true, // 裁剪框的大小信息
        outputSize: 0.8, // 裁剪生成图片的质量
        outputType: 'jpeg', // 裁剪生成图片的格式
        canScale: false, // 图片是否允许滚轮缩放
        autoCrop: true, // 是否默认生成截图框
        autoCropWidth: 300, // 默认生成截图框宽度
        autoCropHeight: 200, // 默认生成截图框高度
        fixedBox: true, // 固定截图框大小 不允许改变
        fixed: true, // 是否开启截图框宽高固定比例
        fixedNumber: [16, 9], // 截图框的宽高比例
        full: true, // 是否输出原图比例的截图
        canMoveBox: true, // 截图框能否拖动
        original: false, // 上传图片按照原始比例渲染
        centerBox: false, // 截图框是否被限制在图片里面
        infoTrue: true // true 为展示真实输出图片宽高 false 展示看到的截图框宽高
      },
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      action: '',
      fileinfo: {},
      uploadFile: [], // 页面显示的数组
      // 防止重复提交
      loading: false
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
    // 上传按钮   限制图片大小
    changeUpload(files, fileList) {
      const isLt5M = files.size / 1024 / 1024 < 5
      if (!isLt5M) {
        this.$message.error('上传文件大小不能超过 5MB!')
        return false
      }
      this.fileinfo = files
      console.log('files', this.fileinfo, fileList)
      // 上传成功后将图片地址赋值给裁剪框显示图片
      this.$nextTick(() => {
        this.option.img = URL.createObjectURL(files.raw)
        console.log(222, this.option.img)
        this.dialogVisible = true
      })
    },
    // 点击裁剪，这一步是可以拿到处理后的地址
    onsubmit() {
      this.$refs.cropper.getCropBlob(() => {
        this.loading = true
        const formData = new FormData()
        console.log('raw', this.fileinfo.raw)
        formData.append('file', this.fileinfo.raw)
        // 上传阿里云服务器
        client({
          url: process.env.VUE_APP_BASE_API + this.set.uploadUrl,
          params: formData
        }).then(result => {
          console.log(256, result)
          this.dialogVisible = false
        }).catch(err => {
          console.log(err)
          this.loading = false
        })
      })
    }
  }
}
</script>
<style lang="scss" scoped>
  @import "emCropper";
</style>
