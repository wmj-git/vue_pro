<template>
  <el-card style="margin-bottom:20px;">
    <div slot="header" class="clearfix">
      <span>About me</span>
    </div>

    <div class="user-profile">
      <div class="box-center">
        <pan-thumb :image="user.avatar" :height="'100px'" :width="'100px'" :hoverable="false">
          <div>Hello</div>
          {{ user.role.description }}
        </pan-thumb>
      </div>
      <div class="box-center">
        <div class="user-name text-center">{{ user.name }}</div>
        <div class="user-role text-center text-muted">
          <el-select v-model="set.changeRole" placeholder="请选择" @change="changeRolesFn">
            <el-option
              v-for="item in user.roles"
              :key="item.id"
              :label="item.description"
              :value="item.id"
            />
          </el-select>
        </div>
      </div>
    </div>

    <div class="user-bio">
      <div class="user-education user-bio-section">
        <div class="user-bio-section-header"><svg-icon icon-class="education" /><span>显示模式</span></div>
        <div class="user-bio-section-body">
          <div class="text-muted">
            <el-select v-model="set.modeValue" placeholder="请选择" @change="displayModeFn">
              <el-option
                v-for="item in set.modeOption"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </div>
        </div>
      </div>

      <div class="user-skills user-bio-section">
        <div class="user-bio-section-header"><svg-icon icon-class="skill" /><span>Skills</span></div>
        <div class="user-bio-section-body">
          <div class="progress-item">
            <span>Vue:</span>
            <span>{{ user.role.id }}</span>
          </div>
          <div class="progress-item">
            <span>JavaScript</span>
            <el-progress :percentage="18" />
          </div>
          <div class="progress-item">
            <span>Css</span>
            <el-progress :percentage="12" />
          </div>
          <div class="progress-item">
            <span>ESLint</span>
            <el-progress :percentage="100" status="success" />
          </div>
        </div>
      </div>
    </div>
  </el-card>
</template>

<script>
import PanThumb from '@/components/PanThumb'

export default {
  components: { PanThumb },
  props: {
    user: {
      type: Object,
      default: () => {
        return {
          name: '',
          email: '',
          avatar: '',
          roles: '',
          role: ''
        }
      }
    }
  },
  data() {
    return {
      set: {
        changeRole: '',
        modeValue: 'default',
        modeOption: [
          {
            label: '默认',
            value: 'default'
          },
          {
            label: '管理模式',
            value: 'admin'
          },
          {
            label: '开发模式',
            value: 'developer'
          }
        ]
      }
    }
  },
  created() {
    this.init()
  },
  mounted() {
  },
  methods: {
    init() {
      this.set.changeRole = this.user.role.id
    },
    changeRolesFn() {
      this.$store.dispatch('user/changeRoles', this.set.changeRole)
    },
    displayModeFn() {
      this.$store.dispatch('permission/generateRoutes', [this.set.modeValue]).then(() => {
        this.$store.commit('user/SET_DisplayMode', [this.set.modeValue])
      })
    }
  }
}
</script>

<style lang="scss" scoped>
 .box-center {
   margin: 0 auto;
   display: table;
 }

 .text-muted {
   color: #777;
 }

 .user-profile {
   .user-name {
     font-weight: bold;
   }

   .box-center {
     padding-top: 10px;
   }

   .user-role {
     padding-top: 10px;
     font-weight: 400;
     font-size: 14px;
   }

   .box-social {
     padding-top: 30px;

     .el-table {
       border-top: 1px solid #dfe6ec;
     }
   }

   .user-follow {
     padding-top: 20px;
   }
 }

 .user-bio {
   margin-top: 20px;
   color: #606266;

   span {
     padding-left: 4px;
   }

   .user-bio-section {
     font-size: 14px;
     padding: 15px 0;
     color: #fff;

     .user-bio-section-header {
       border-bottom: 1px solid rgba(255, 255, 255, 0.3);
       padding-bottom: 10px;
       margin-bottom: 10px;
       font-weight: bold;
       color: #fff;
     }
   }
 }
</style>
