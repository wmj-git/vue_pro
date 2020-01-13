<template>
  <div :id="id" :ref="id" :action="url" class="dropzone">
    <input type="file" name="file">
  </div>
</template>

<script>
import { getToken } from '@/utils/auth'
import Dropzone from 'dropzone'
import 'dropzone/dist/dropzone.css'
// import { getToken } from 'api/qiniu';

Dropzone.autoDiscover = false

export default {
  props: {
    item: {
      type: Object,
      required: true
    },
    id: {
      type: String,
      required: true
    },
    url: {
      type: String,
      required: true
    },
    clickable: {
      type: Boolean,
      default: true
    },
    defaultMsg: {
      type: String,
      default: '上传图片'
    },
    acceptedFiles: {
      type: String,
      default: ''
    },
    thumbnailHeight: {
      type: Number,
      default: 80
    },
    thumbnailWidth: {
      type: Number,
      default: 80
    },
    showRemoveLink: {
      type: Boolean,
      default: true
    },
    maxFilesize: {
      type: Number,
      default: 1
    },
    maxFiles: {
      type: Number,
      default: 1
    },
    autoProcessQueue: {
      type: Boolean,
      default: true
    },
    useCustomDropzoneOptions: {
      type: Boolean,
      default: false
    },
    defaultImg: {
      default: '',
      type: [String, Array]
    },
    couldPaste: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      dropzone: '',
      initOnce: false
    }
  },
  watch: {
    defaultImg(val) {
      if (val.length === 0) {
        this.initOnce = false
        return
      }
      if (!this.initOnce) return
      this.initImages(val)
      this.initOnce = false
    }
  },
  mounted() {
    const element = document.getElementById(this.id)
    const vm = this
    /*  var myDropzone = new Dropzone("#dropz", {
      url: "/upload", // 文件提交地址
      method: "post",  // 也可用put
      paramName: "file", // 默认为file
      maxFiles: 1,// 一次性上传的文件数量上限
      maxFilesize: 2, // 文件大小，单位：MB
      acceptedFiles: ".jpg,.gif,.png,.jpeg", // 上传的类型
      addRemoveLinks: true, // 默认 false。如果设为 true，则会给文件添加一个删除链接
      parallelUploads: 1,// 一次上传的文件数量
      //previewsContainer:"#preview", // 上传图片的预览窗口
      dictDefaultMessage: '拖动文件至此或者点击上传',
      dictMaxFilesExceeded: "您最多只能上传1个文件！",
      dictResponseError: '文件上传失败!',
      dictInvalidFileType: "文件类型只能是*.jpg,*.gif,*.png,*.jpeg。",
      dictFallbackMessage: "浏览器不受支持",
      dictFileTooBig: "文件过大上传文件最大支持.",
      dictRemoveLinks: "删除",
      dictCancelUpload: "取消",
      init: function () {
        this.on("addedfile", function (file) {
          // 上传文件时触发的事件
        });
        this.on("success", function (file, data) {
          // 上传成功触发的事件
        });
        this.on("error", function (file, data) {
          // 上传失败触发的事件
        });
        this.on("removedfile", function (file) {
          // 删除文件时触发的方法
        });
      }
    })*/
    this.dropzone = new Dropzone(element, {
      clickable: this.clickable,
      thumbnailWidth: this.thumbnailWidth,
      thumbnailHeight: this.thumbnailHeight,
      maxFiles: this.maxFiles,
      maxFilesize: this.maxFilesize,
      dictRemoveFile: 'Remove',
      addRemoveLinks: this.showRemoveLink,
      uploadMultiple: false,
      acceptedFiles: this.acceptedFiles,
      autoProcessQueue: this.autoProcessQueue,
      dictDefaultMessage: '<i style="margin-top: 3em;display: inline-block" class="material-icons">' + this.defaultMsg + '</i><br>Drop files here to upload',
      dictMaxFilesExceeded: '只能一个图',
      previewTemplate: '<div class="dz-preview dz-file-preview">  <div class="dz-image" style="width:' + this.thumbnailWidth + 'px;height:' + this.thumbnailHeight + 'px" ><img style="width:' + this.thumbnailWidth + 'px;height:' + this.thumbnailHeight + 'px" data-dz-thumbnail /></div>  <div class="dz-details"><div class="dz-size"><span data-dz-size></span></div> <div class="dz-progress"><span class="dz-upload" data-dz-uploadprogress></span></div>  <div class="dz-error-message"><span data-dz-errormessage></span></div>  <div class="dz-success-mark"> <i class="material-icons">done</i> </div>  <div class="dz-error-mark"><i class="material-icons">error</i></div></div>',
      init() {
        this.on('addedfile', function(file) {
          // 上传文件时触发的事件
        })
        this.on('error', function(file, data) {
          // 上传失败触发的事件
        })
        const val = vm.defaultImg
        if (!val) return
        if (Array.isArray(val)) {
          if (val.length === 0) return
          val.map((v, i) => {
            const mockFile = { name: 'name' + i, size: 12345, url: v }
            this.options.addedfile.call(this, mockFile)
            this.options.thumbnail.call(this, mockFile, v)
            mockFile.previewElement.classList.add('dz-success')
            mockFile.previewElement.classList.add('dz-complete')
            vm.initOnce = false
            return true
          })
        } else {
          const mockFile = { name: 'name', size: 12345, url: val }
          this.options.addedfile.call(this, mockFile)
          this.options.thumbnail.call(this, mockFile, val)
          mockFile.previewElement.classList.add('dz-success')
          mockFile.previewElement.classList.add('dz-complete')
          vm.initOnce = false
        }
      },
      accept: (file, done) => {
        /* 七牛*/
        // const token = this.$store.getters.token;
        // getToken(token).then(response => {
        //   file.token = response.data.qiniu_token;
        //   file.key = response.data.qiniu_key;
        //   file.url = response.data.qiniu_url;
        //   done();
        // })
        done()
      },
      sending: (file, xhr, formData) => {
        xhr.setRequestHeader('Authorization', getToken())
        // formData.append('token', file.token);
        // formData.append('key', file.key);
        vm.initOnce = false
      }
    })

    if (this.couldPaste) {
      document.addEventListener('paste', this.pasteImg)
    }

    this.dropzone.on('success', file => {
      vm.$emit('dropzone-success', file, vm.dropzone.element, this.item)
      this.removeAllFiles()
    })
    this.dropzone.on('addedfile', file => {
      vm.$emit('dropzone-fileAdded', file)
    })
    this.dropzone.on('removedfile', file => {
      vm.$emit('dropzone-removedFile', file)
    })
    this.dropzone.on('error', (file, error, xhr) => {
      vm.$emit('dropzone-error', file, error, xhr)
    })
    this.dropzone.on('successmultiple', (file, error, xhr) => {
      vm.$emit('dropzone-successmultiple', file, error, xhr)
    })
  },
  destroyed() {
    document.removeEventListener('paste', this.pasteImg)
    this.dropzone.destroy()
  },
  methods: {
    removeAllFiles() {
      this.dropzone.removeAllFiles(true)
    },
    processQueue() {
      this.dropzone.processQueue()
    },
    pasteImg(event) {
      const items = (event.clipboardData || event.originalEvent.clipboardData).items
      if (items[0].kind === 'file') {
        this.dropzone.addFile(items[0].getAsFile())
      }
    },
    initImages(val) {
      if (!val) return
      if (Array.isArray(val)) {
        val.map((v, i) => {
          const mockFile = { name: 'name' + i, size: 12345, url: v }
          this.dropzone.options.addedfile.call(this.dropzone, mockFile)
          this.dropzone.options.thumbnail.call(this.dropzone, mockFile, v)
          mockFile.previewElement.classList.add('dz-success')
          mockFile.previewElement.classList.add('dz-complete')
          return true
        })
      } else {
        const mockFile = { name: 'name', size: 12345, url: val }
        this.dropzone.options.addedfile.call(this.dropzone, mockFile)
        this.dropzone.options.thumbnail.call(this.dropzone, mockFile, val)
        mockFile.previewElement.classList.add('dz-success')
        mockFile.previewElement.classList.add('dz-complete')
      }
    }

  }
}
</script>

<style scoped>
    .dropzone {
        border: 2px solid #4a505a;
        font-family: 'Roboto', sans-serif;
        color: #777;
        transition: background-color .2s linear;
        padding: 5px;
        background: #152034;
    }
    .dropzone:hover {
        border-color: #005695;
    }

    i {
        color: #CCC;
    }

    .dropzone .dz-image img {
        width: 100%;
        height: 100%;
    }

    .dropzone input[name='file'] {
        display: none;
    }

    .dropzone .dz-preview .dz-image {
        border-radius: 0px;
    }

    .dropzone .dz-preview:hover .dz-image img {
        transform: none;
        filter: none;
        width: 100%;
        height: 100%;
    }

    .dropzone .dz-preview .dz-details {
        bottom: 0px;
        top: 0px;
        color: white;
        background-color: rgba(33, 150, 243, 0.8);
        transition: opacity .2s linear;
        text-align: left;
    }

    .dropzone .dz-preview .dz-details .dz-filename span, .dropzone .dz-preview .dz-details .dz-size span {
        background-color: transparent;
    }

    .dropzone .dz-preview .dz-details .dz-filename:not(:hover) span {
        border: none;
    }

    .dropzone .dz-preview .dz-details .dz-filename:hover span {
        background-color: transparent;
        border: none;
    }

    .dropzone .dz-preview .dz-remove {
        position: absolute;
        z-index: 30;
        color: white;
        margin-left: 15px;
        padding: 10px;
        top: inherit;
        bottom: 15px;
        border: 2px white solid;
        text-decoration: none;
        text-transform: uppercase;
        font-size: 0.8rem;
        font-weight: 800;
        letter-spacing: 1.1px;
        opacity: 0;
    }

    .dropzone .dz-preview:hover .dz-remove {
        opacity: 1;
    }

    .dropzone .dz-preview .dz-success-mark, .dropzone .dz-preview .dz-error-mark {
        margin-left: -40px;
        margin-top: -50px;
    }

    .dropzone .dz-preview .dz-success-mark i, .dropzone .dz-preview .dz-error-mark i {
        color: white;
        font-size: 5rem;
    }
</style>
