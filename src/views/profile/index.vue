<template>
  <div class="app-container">
    <div v-if="user">
      <el-row :gutter="20">

        <el-col :span="12" :xs="48">
          <user-card :user="user" />
        </el-col>

        <el-col :span="36" :xs="48">
          <el-card>
            <el-tabs v-model="activeTab">
              <el-tab-pane label="Activity" name="activity">
                <activity />
              </el-tab-pane>
              <el-tab-pane label="Timeline" name="timeline">
                <timeline />
              </el-tab-pane>
              <el-tab-pane label="Account" name="account">
                <account :user="user" />
              </el-tab-pane>
            </el-tabs>
          </el-card>
        </el-col>

      </el-row>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import UserCard from './components/UserCard'
import Activity from './components/Activity'
import Timeline from './components/Timeline'
import Account from './components/Account'

export default {
  name: 'Profile',
  components: { UserCard, Activity, Timeline, Account },
  data() {
    return {
      // user: {},
      activeTab: 'activity'
    }
  },
  computed: {
    ...mapGetters([
      'name',
      'avatar',
      'roles',
      'currentRole'
    ]),
    user() {
      return {
        name: this.name,
        roles: this.roles,
        role: this.currentRole,
        email: 'admin@test.com',
        avatar: this.avatar
      }
    }
  },
  created() {
    console.log('currentRole', this.currentRole)
  },
  methods: {
    init() {
    }
  }
}
</script>
