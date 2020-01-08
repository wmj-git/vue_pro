<template>
 <!-- <div v-if="errorLogs.length>0">-->
  <div class="em-alarm">
    <el-badge :is-dot="true" style="line-height: 25px;margin-top: -5px;" @click.native="dialogTableVisible=true">
      <el-button style="padding: 8px 10px;" size="small" type="danger" class="em-alarm-btn">
        <svg-icon icon-class="alarm" class-name="alarm-icon" />
      </el-button>
    </el-badge>

    <el-dialog :visible.sync="dialogTableVisible" width="80%" append-to-body>
      <div slot="title">
        <span style="padding-right: 10px;">Error Log</span>
        <el-button size="mini" type="primary" icon="el-icon-delete" @click="clearAll">Clear All</el-button>
      </div>
      <el-table :data="errorLogs" border>
        <el-table-column label="Message">
          <template slot-scope="{row}">
            <div>
              <span class="message-title">Msg:</span>
              <el-tag type="danger">
                {{ row.err.message }}
              </el-tag>
            </div>
            <br>
            <div>
              <span class="message-title" style="padding-right: 10px;">Info: </span>
              <el-tag type="warning">
                {{ row.vm.$vnode.tag }} error in {{ row.info }}
              </el-tag>
            </div>
            <br>
            <div>
              <span class="message-title" style="padding-right: 16px;">Url: </span>
              <el-tag type="success">
                {{ row.url }}
              </el-tag>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="Stack">
          <template slot-scope="scope">
            {{ scope.row.err.stack }}
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
import { messageCount } from '@/api/schoolService/tableInfo'
export default {
  name: 'ErrorLog',
  data() {
    return {
      dialogTableVisible: false,
      BASE_API: process.env.VUE_APP_BASE_API
    }
  },
  created() {
    const token = this.$store.getters.token
    console.log('token', token)
    const url = this.BASE_API + '/ws/sockets?access_token=' + token
    console.log(url)

    this.socketApi.initWebSocket(url)
    this.socketApi.proxyFunction(5, (res) => {
      console.log('proxyFunction', res)
      if (res) {
        messageCount({
          url: '/sockets/push/queryCountAllByPageParams'
        }).then(response => {
          console.log('消息数量', response)
        })
      }
    })
  },
  computed: {
    errorLogs() {
      return this.$store.getters.errorLogs
    }
  },
  methods: {
    init() {
    },
    clearAll() {
      this.dialogTableVisible = false
      this.$store.dispatch('errorLog/clearErrorLog')
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
}
  .el-button--danger.em-alarm-btn{
    border-radius: 50%;
  }
</style>
