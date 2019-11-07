<template>
  <div class="schoolBanner-container">
    <div class="upload-container">
      <el-button :style="{background:color,borderColor:color}" icon="el-icon-upload" size="mini" type="primary" @click=" dialogVisible=true">
        上传
      </el-button>
      <el-dialog :visible.sync="dialogVisible">
        <el-upload
          :multiple="true"
          name="files"
          :file-list="fileList"
          :show-file-list="true"
          :on-remove="handleRemove"
          :on-success="handleSuccess"
          :before-upload="beforeUpload"
          :headers="headers"
          class="slide-upload"
          action="http://192.168.20.18:9002/api/v1/school/banner/addAndUpload"
          list-type="picture-card"
        >
          <el-button size="small" type="primary">
            点击上传
          </el-button>
        </el-upload>
        <el-button @click="dialogVisible = false">
          取消
        </el-button>
        <el-button type="primary" @click="handleSubmit">
          确认
        </el-button>
      </el-dialog>
    </div>
    <div>
      <el-table
        :data="tableDataEnd"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column
          type="index"
          width="50"
        />
        <el-table-column
          type="selection"
          width="55"
        />
        <el-table-column
          v-for="info in tableHeader"
          :key="info.key"
          :label="info.label"
        >
          <template slot-scope="scope">
            <span>{{ scope.row[info.key] }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" fixed="right" width="auto">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              @click="handleEdit(scope.row)"
            >编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { getToken } from '@/utils/auth'

export default {
  name: 'SchoolBanner',
  props: {
    color: {
      type: String,
      default: '#1890ff'
    }
  },
  data() {
    return {
      dialogVisible: false,
      listObj: {},
      fileList: [],
      headers: {
        Authorization: getToken()
      },
      tableDataEnd: [],
      tableHeader: [
        {
          label: '文件名',
          value: 'fileName'
        },
        {
          label: '网络图片路径',
          value: 'imagesUrl'
        },
        {
          label: '学校组织编码',
          value: 'siOrgCode'
        }
      ]
    }
  },
  methods: {
    checkAllSuccess() {
      return Object.keys(this.listObj).every(item => this.listObj[item].hasSuccess)
    },
    handleSubmit() {
      const arr = Object.keys(this.listObj).map(v => this.listObj[v])
      if (!this.checkAllSuccess()) {
        this.$message('请等待所有图片上传成功')
        return
      }
      this.$emit('successCBK', arr)
      this.listObj = {}
      this.fileList = []
      this.dialogVisible = false
    },
    handleSuccess(response, file) {
      const uid = file.uid
      const objKeyArr = Object.keys(this.listObj)
      for (let i = 0, len = objKeyArr.length; i < len; i++) {
        if (this.listObj[objKeyArr[i]].uid === uid) {
          console.log(response)
          this.listObj[objKeyArr[i]].url = response.data[0].fileName
          this.listObj[objKeyArr[i]].hasSuccess = true
          console.log(this.listObj)
          return
        }
      }
    },
    handleRemove(file) {
      const uid = file.uid
      const objKeyArr = Object.keys(this.listObj)
      for (let i = 0, len = objKeyArr.length; i < len; i++) {
        if (this.listObj[objKeyArr[i]].uid === uid) {
          delete this.listObj[objKeyArr[i]]
          return
        }
      }
    },
    beforeUpload(file) {
      const _self = this
      const _URL = window.URL || window.webkitURL
      const fileName = file.uid
      this.listObj[fileName] = {}
      return new Promise((resolve, reject) => {
        const img = new Image()
        img.src = _URL.createObjectURL(file)
        img.onload = function() {
          _self.listObj[fileName] = { hasSuccess: false, uid: file.uid, width: this.width, height: this.height }
        }
        resolve(true)
      })
    },
    handleSelectionChange(val) {
      console.log(val)
    }
  }
}
</script>

<style lang="scss" scoped>
  .schoolBanner-container{
    .upload-container{
      margin: 10px;
      .slide-upload {
        margin-bottom: 20px;
        /deep/ .el-upload--picture-card {
          width: 100%;
        }
      }
    }
  }
</style>
