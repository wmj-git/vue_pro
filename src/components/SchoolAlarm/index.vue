<template>
  <div v-if="messageCount>0" class="em-alarm">
    <el-tooltip
      class="item"
      effect="dark"
      :content="content"
      placement="top-start"
    >
      <el-badge
        class="alarm-badge"
        type="danger"
        :value="messageCount"
        style="line-height: 25px;margin-top: -5px;"
        @click.native="dialogTableVisible=true"
      >
        <el-button
          style="padding: 8px 10px;"
          size="small"
          type="danger"
          class="em-alarm-btn">
          <svg-icon icon-class="alarm" class-name="alarm-icon" />
        </el-button>
      </el-badge>
    </el-tooltip>
    <el-dialog :visible.sync="dialogTableVisible" title="消息详情" width="40%" append-to-body>
      <el-table :data="messageData" border empty-text="暂无数据" height="260" @row-dblclick="showDrawer">
        <el-table-column
          type="index"
          width="50"
          :index="tableIndex"
        />
        <el-table-column
          v-for="info in tableHeader"
          :key="info.key"
          :label="info.label"
          :prop="info.key"
          :formatter="formatterFn"
        >
        </el-table-column>
      </el-table>
        <Pagination
          :total="total"
          :page.sync="listQuery.page"
          :limit.sync="listQuery.limit"
          :hide-on-single-page="pageOne"
          @pagination="handlePaginationChange"
          @current-change="handleCurrentChange"
        />
    </el-dialog>
    <el-drawer
      v-if="drawer"
      :visible.sync="set.drawerVisible"
      direction="rtl"
      :modal="set.modal"
      :append-to-body="set.appendToBody"
      :show-close="true"
      :destroy-on-close="true"
      :size="set.size"
    >
      <el-form label-position="left" class="demo-table-expand">
        <el-form-item :label="item.name" v-for="(item,index) in drawerItem" :key="index">
          <span>{{item.value}}</span>
        </el-form-item>
      </el-form>
    </el-drawer>
  </div>
</template>

<script>
import { messageCount, messageDetails } from '@/api/schoolService/tableInfo'
import { staticFormatterMap } from '@/utils/formatterMap'
import vueBus from '@/utils/vueBus'
export default {
  name: 'SchoolAlarm',
  data() {
    return {
      drawer: true,
      dialogTableVisible: false,
      BASE_API: process.env.VUE_APP_BASE_API,
      messageCount: '', // sos校内报警
      messageData: [], // 详情列表
      content: '', // 提示消息
      formatterMap: {},
      drawerItem: [], // 抽屉显示项
      set: {
        drawerVisible: false,
        modal: true, // 是否添加遮罩
        appendToBody: true,
        visible: false,
        size: '20%'
      },
      tableHeader: [
        {
          label: '消息标题',
          key: 'msgTitle'
        },
        {
          label: '消息类型',
          key: 'messageType'
        },
        {
          label: '消息详情',
          key: 'describeStr'
        }
      ],
      pageOne: false,
      total: 0,
      listQuery: {
        limit: 10,
        page: 1
      }
    }
  },
  created() {
    this.init()
    this.getList()
    const token = this.$store.getters.token
    // ws：neinx那边加的，要是没有ws则会自动加上一个info,通道没法连接上
    // access_token: //后端的名字
    // sockets: 接口基本地址必须带的
    const url = this.BASE_API + '/ws/sockets?access_token=' + token
    this.socketApi.initWebSocket(url)
    this.socketApi.proxyFunction(5, (res) => {
      if (res) {
        this.init() // 校徽传递通知消息后继续获取数量
      }
    })
  },
  methods: {
    init() {
      const _param = {
        messageType: 5
      }
      messageCount({
        url: '/sockets/push/queryCountAllByPageParams',
        params: _param
      }).then(response => {
        this.content = '校内SOS报警'
        this.messageCount = response.data // 校内sos报警消息
      })
    },
    tableIndex(index) { // 第二页开始表格数据行号不从1开始
      return (this.listQuery.page - 1) * this.listQuery.limit + index + 1
    },
    // 分页改变:改变条数和分页
    handlePaginationChange(res) {
      this.listQuery = res
      this.getList()
    },
    // 获取详情列表数据
    getList() {
      const _params = {
        pageSize: this.listQuery.limit,
        pageNum: this.listQuery.page,
        messageType: 5
      }
      messageDetails({
        url: '/sockets/push/queryNoContentAllByPageParams',
        params: _params
      }).then(res => {
        if (res.statusCode === 200) {
          this.messageData = res.data.list
          this.total = res.data.total
        } else if (res.statusCode === 503) {
          this.$message({
            showClose: true,
            message: '没有指定消息内容哦！',
            type: 'info',
            duration: 1000
          })
        }
      })
    },
    handleCurrentChange(val) {
    },
    // 过滤字段
    formatterFn(row, column) {
      let _val = ''
      const _formatterMap = Object.assign({}, this.formatterMap, staticFormatterMap) // 动态和静态数据求交集
      if (column.property in _formatterMap) {
        _val = _formatterMap[column.property].get(row[column.property])
      } else {
        _val = row[column.property]
      }
      return _val
    },
    showDrawer(row) {
      this.set.drawerVisible = true
      this.drawerItem = []
      const tableItem = { row: row, label: this.tableHeader }
      tableItem.label.forEach(val => {
        for (const i in tableItem.row) {
          if (i === val.key) {
            this.drawerItem.push({ name: val.label, value: tableItem.row[i] })
          }
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">
  .em-alarm /deep/{
  }
.message-title {
  font-size: 16px;
  color: #333;
  font-weight: bold;
  padding-right: 8px;
}
.alarm-icon{
    cursor: pointer;
    font-size: 20px;
    vertical-align: middle;
    color: darken(#fff ,20%);
}
  .el-button--danger.em-alarm-btn{
    border-radius: 0px 60% 0 60%;
    background: linear-gradient(rgba(255, 0, 0, 0.4),#0d1430);
    border-color: rgba(255, 0, 0, 0.35);
  }
</style>
