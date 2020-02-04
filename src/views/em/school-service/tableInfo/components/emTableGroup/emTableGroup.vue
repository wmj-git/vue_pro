<template>
  <div class="emTableGroup-container">
    <el-card :class="set.class" :shadow="set.shadow">
      <div class="emForm">
        <template v-for="(item, index) in children.operateItem">
          <el-col :key="index" class="el-col-48">
            <em-form :data="item" />
          </el-col>
        </template>
      </div>
      <div class="emTable">
        <template v-for="(item, data) in children.dataItem">
          <el-row :key="data">
            <em-table :data="item" />
          </el-row>
        </template>
      </div>
      <div class="emDialog">
        <template v-for="(item, items) in children.formItem">
          <el-col :key="items" :offset="Number(item.meta.offset)" :span="Number(item.meta.span)">
            <em-dialog :data="item" />
          </el-col>
        </template>
      </div>
      <div class="emDrawer">
        <template v-for="(item, items) in children.drawerItem">
          <el-col :key="items" :offset="Number(item.meta.offset)" :span="Number(item.meta.span)">
            <em-drawer :data="item" />
          </el-col>
        </template>
      </div>
      <div class="emTree">
        <template v-for="(item, items) in children.treeItem">
          <el-col :key="items" :offset="Number(item.meta.offset)" :span="Number(item.meta.span)">
            <em-tree :data="item" />
          </el-col>
        </template>
      </div>
      <div class="emTransfer">
        <template v-for="(item, items) in children.transferItem">
          <el-col :key="items" :offset="Number(item.meta.offset)" :span="Number(item.meta.span)">
            <em-transfer :data="item" />
          </el-col>
        </template>
      </div>
      <div class="emCarousel">
        <template v-for="(item, items) in children.carouselItem">
          <el-col :key="items" :offset="Number(item.meta.offset)" :span="Number(item.meta.span)">
            <em-carousel :data="item" />
          </el-col>
        </template>
      </div>
      <div class="emSoleForm">
        <template v-for="(item, items) in children.emSoleFormItem">
          <el-col :key="items" :offset="Number(item.meta.offset)" :span="Number(item.meta.span)">
            <em-sole-form :data="item" />
          </el-col>
        </template>
      </div>
      <div class="emCropper">
        <template v-for="(item, items) in children.cropperItem">
          <el-col :key="items" :offset="Number(item.meta.offset)" :span="Number(item.meta.span)">
            <em-cropper :data="item" />
          </el-col>
        </template>
      </div>
    </el-card>
  </div>
</template>
<script>
import { emMixin } from '@/utils/mixins'
import { dataInitFn, childrenInitFn } from '@/utils/tool'
import EmTable from '@/views/em/school-service/tableInfo/components/emTable/emTable'
import EmDialog from '@/views/em/school-service/tableInfo/components/emDialog/emDialog'
import EmForm from '@/views/em/school-service/tableInfo/components/emButtons/emButtons'
import EmDrawer from '@/views/em/school-service/tableInfo/components/emDrawer/emDrawer'
import EmTree from '@/views/em/school-service/tableInfo/components/emTree/emTree'
import EmTransfer from '@/views/em/school-service/tableInfo/components/emTransfer/emTransfer'
import EmCarousel from '@/views/em/school-service/tableInfo/components/emCarousel/emCarousel'
import EmSoleForm from '@/views/em/school-service/tableInfo/components/emForm/emForm'
import EmCropper from '@/views/em/school-service/tableInfo/components/emCropper/emCropper'
export default {
  name: 'EmTableGroup',
  components: { EmCropper, EmSoleForm, EmCarousel, EmTransfer, EmTree, EmDrawer, EmForm, EmDialog, EmTable },
  mixins: [emMixin],
  data() {
    return {
      set: {
        class: '',
        shadow: 'hover'
      },
      children: {
        operateItem: [], // 表头操作表单
        formItem: [],
        dataItem: [],
        importItem: [], // 导入
        drawerItem: [], // 抽屉
        treeItem: [], // 树
        transferItem: [], // 穿梭框
        carouselItem: [], // 走马灯
        emSoleFormItem: [], // 单独表单
        cropperItem: [] // 裁剪图片
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
    }
  }
}
</script>
<style lang="scss" scoped>
  @import "emTableGroup";
</style>
