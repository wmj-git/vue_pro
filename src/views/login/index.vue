<template>
  <div class="login-container">
    <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" autocomplete="on" label-position="left">

      <div class="title-container">
        <h3 class="title">智慧校园</h3>
      </div>
      <el-form-item prop="username">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input
          ref="username"
          v-model="loginForm.username"
          oninput="if(value.length>13)value=value.slice(0,13)"
          placeholder="输入手机账号"
          name="username"
          type="text"
          tabindex="1"
          autocomplete="on"
          @input="handlerPhone"
        />
      </el-form-item>

      <el-tooltip v-model="capsTooltip" content="Caps lock is On" placement="right" manual>
        <el-form-item prop="password">
          <span class="svg-container">
            <svg-icon icon-class="password" />
          </span>
          <el-input
            :key="passwordType"
            ref="password"
            v-model="loginForm.password"
            :type="passwordType"
            placeholder="输入密码"
            name="password"
            tabindex="2"
            autocomplete="on"
            @keyup.native="checkCapslock"
            @blur="capsTooltip = false"
            @keyup.enter.native="handleLogin"
          />
          <span class="show-pwd" @click="showPwd">
            <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
          </span>
        </el-form-item>
      </el-tooltip>
      <el-button type="primary" class="loginOperate-btn" style="width:48%;margin-bottom:30px;" @click.native.prevent="handleRegister">注册</el-button>
      <el-button type="primary" class="loginOperate-btn" style="width:48%;margin-bottom:30px;" @click.native.prevent="handleLogin">登录</el-button>
    </el-form>
    <el-dialog
      title="请选择登录角色"
      :visible.sync="dialogVisible"
      width="30%"
    >
      <!--  <el-radio-group v-model="radio" @change="onRadioChange">
        <el-radio :label="item.zhName" :key="item.value" v-for="item in options">{{item.label}}</el-radio>
      </el-radio-group>-->
      <el-select v-model="value" placeholder="请选择" style="width: 100%;color: #2d2f33">
        <el-option
          v-for="item in options"
          :key="item.id"
          :label="item.zhName"
          :value="item.id"
        />
      </el-select>
      <span slot="footer" class="dialog-footer">
        <el-button size="mini" class="table_inLine_btn" icon="el-icon-cancel" @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" size="mini" class="table_inLine_btn" icon="el-icon-submit" @click="handleGenerateAuth">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { isSpacePhone } from '@/utils/validate'

export default {
  name: 'Login',
  components: {},
  data() {
    return {
      loginForm: {
        username: '',
        password: ''
      },
      loginRules: {
        username: [
          { required: true, trigger: 'blur', validator: isSpacePhone }
        ],
        password: [{ required: true, min: 6, message: '长度大于6位', trigger: 'blur' }]
      },
      passwordType: 'password',
      capsTooltip: false,
      loading: false,
      redirect: undefined,
      otherQuery: {},
      dialogVisible: false,
      options: [],
      value: [],
      radio: [], // 角色
      uuid: ''
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        const query = route.query
        if (query) {
          this.redirect = query.redirect
          this.otherQuery = this.getOtherQuery(query)
        }
      },
      immediate: true
    }
  },
  created() {
  },
  mounted() {
    if (this.loginForm.username === '') {
      this.$refs.username.focus()
    } else if (this.loginForm.password === '') {
      this.$refs.password.focus()
    }
  },
  destroyed() {
    // window.removeEventListener('storage', this.afterQRScan)
  },
  methods: {
    // 电话输入时就开始判断加上空格
    handlerPhone(val) {
      if (val.length <= 13) {
        if (val.length > 3 && val.length < 7) {
          val = val.replace(/\D/g, '').replace(/(\d{3})(?=\d)/g, '$1 ')
        } else if (val.length >= 7) {
          val = val.replace(/\s/g, '-').replace(/[^\d]/g, ' ').replace(/(\d{4})(?=\d)/g, '$1 ')
        }
        this.$set(this.loginForm, 'username', val)
      }
    },
    checkCapslock({ shiftKey, key } = {}) {
      if (key && key.length === 1) {
        if (shiftKey && (key >= 'a' && key <= 'z') || !shiftKey && (key >= 'A' && key <= 'Z')) {
          this.capsTooltip = true
        } else {
          this.capsTooltip = false
        }
      }
      if (key === 'CapsLock' && this.capsTooltip === true) {
        this.capsTooltip = false
      }
    },
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    handleLogin() {
      this.loginForm['username'] = this.loginForm['username'].replace(/\s/g, '')
      console.log('user', this.loginForm['username'])
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('user/login', this.loginForm)
            .then((res) => {
              console.log('login', res)
              if (res.user && res.user.roleList && res.user.roleList.length === 1) {
                const _role = res.user.roleList
                this.$store.commit('user/SET_CURRENTROLE', _role[0])
                this.$store.dispatch('user/changeRoles', _role[0].id)
                this.$router.push({ path: this.redirect || '/' })
                this.loading = false
              } else if (res.user && res.user.roleList && res.user.roleList.length > 1) {
                this.dialogVisible = true
                this.options = []
                this.options = this.options.concat(res.user.roleList)
                console.log(res.user.roleList)
                this.uuid = res.uuid
              }
            })
            .catch(() => {
              this.loading = false
            })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    handleGenerateAuth() {
      const _this = this
      this.$store.dispatch('user/generateAuth', {
        username: this.loginForm.username,
        roleId: this.value,
        uuid: this.uuid
      })
        .then((res) => {
          res.user.roleList.forEach((role) => {
            if (role.id === _this.value) {
              this.$store.commit('user/SET_CURRENTROLE', role)
              this.$store.dispatch('user/changeRoles', role.id)
            }
          })
          _this.dialogVisible = false
          _this.$router.push({ path: this.redirect || '/' })
          _this.loading = false
        })
        .catch(() => {
          _this.loading = false
        })
    },
    handleRegister() {
      this.$router.push('/register')
    },
    getOtherQuery(query) {
      return Object.keys(query).reduce((acc, cur) => {
        if (cur !== 'redirect') {
          acc[cur] = query[cur]
        }
        return acc
      }, {})
    }
  }
}
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg:#283443;
$light_gray: #c6c6c6;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  .el-select .el-input{
    width: 100%;
  }
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style lang="scss" scoped>
$bg:#2d3a4b;
$dark_gray:#889aa4;
$light_gray:#eee;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }

  .thirdparty-button {
    position: absolute;
    right: 0;
    bottom: 6px;
  }

  @media only screen and (max-width: 470px) {
    .thirdparty-button {
      display: none;
    }
  }
}
</style>
