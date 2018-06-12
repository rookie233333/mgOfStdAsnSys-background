<template>
<div style="width:100%">
    <div class="header-bar row">
        <div class="logo-box col-md-4">
            <router-link to='/evdec?status=edit'>
                SWPU学生社团管理系统
            </router-link>
          </div>
          <div class="nav-bar-box col-md-8">
              <div class="header-rt">
                    <router-link to='/personal'>
                        <i class="icon-personal"></i>
                        <span style="font-size:12px;">{{userName}}</span>
                    </router-link>
                    <div class="menu">
                        <p>修改资料</p>
                        <p>重置密码</p>
                        <p @click="loginOut()">退出登录</p>
                    </div>
              </div>
                <ul class="nav-bar">
                    <li>
                        <router-link style="width:110px;" :class="{'active':currModule=='mgass'}" to='/mgass'>
                            <span class="icon-mark">社联管理员管理</span>
                        </router-link>
                    </li>
                </ul>
          </div>
  </div>
</div>
  
</template>

<script>
// import axios from 'axios'
export default {
  data () {
    return {
      currModule: this.$route.path.split('/')[0],
      userName: '超级管理员'
    }
  },
  methods: {
    loginOut () {
      var userInfo = {}
      window.localStorage.setItem('userInfo', JSON.stringify({userInfo}))
      this.$router.push({ path: '/' })
    },
    checkLogin () {
      var userInfo = JSON.parse(window.localStorage.getItem('userInfo'))
      if (userInfo === null) {
        this.$router.push({ path: '/' })
      }
    }
  },
  watch: {
    $route (to, from) {
      this.checkLogin()
    }
  }
}
</script>

<style lang="less" scoped>
@import "../header/header.less";
</style>
