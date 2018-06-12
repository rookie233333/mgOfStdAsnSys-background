<template>
<div style='width:100%'>
    <div class='header-bar row'>
        <div class='logo-box col-md-4'>
            <router-link to='/evapp?status=pending'>
                SWPU学生社团管理系统
            </router-link>
          </div>
          <div class='nav-bar-box col-md-8'>
              <div class='header-rt'>
                    <router-link to='/personal'>
                        <i class='icon-personal'></i>
                        <span style='font-size:12px;'>{{userName}}</span>
                    </router-link>
                     <div class="menu">
                        <p>修改资料</p>
                        <p>重置密码</p>
                        <p @click="loginOut()">退出登录</p>
                    </div>
              </div>
                <ul class='nav-bar'>
                    <li v-if="role_auth.indexOf('sp') > -1">
                        <router-link :class="{'active':currModule=='evapp'}" to='/evapp?status=pending'>
                            <span class='icon-activity'>活动审批</span>
                        </router-link>
                    <li v-if="role_auth.indexOf('st') > -1">
                        <router-link :class="{'active':currModule=='mgsoc'}" to='/mgsoc?status=view'>
                            <span class='icon-work'>社团管理</span>
                        </router-link>
                    </li>
                    <li v-if="role_auth.indexOf('cw') > -1">
                        <router-link :class="{'active':currModule=='mgsocf'}" to='/mgsocf'>
                            <span class='icon-mark'>财务管理</span>
                        </router-link>
                    </li>
                    <li v-if="role_auth.indexOf('gl') > -1">
                        <router-link :class="{'active':currModule=='mgsocu?status=manage'}" to='/mgsocu'>
                            <span class='icon-manage'>管理员管理</span>
                        </router-link>
                    </li>
                    <li>
                        <router-link :class="{'active':currModule=='more'}" to='/more'>
                            <span class='icon-message'>更多</span>
                        </router-link>
                    </li>
                     <!-- <li>
                        <router-link :class='{'active':currModule=='notic'}' to='/notic'>
                            <span class='icon-notic'>公告</span>
                        </router-link>
                    </li> -->
                </ul>
          </div>
  </div>
</div>
  
</template>

<script>
import axios from 'axios'
let userInfo = JSON.parse(window.localStorage.getItem('userInfo'))
let modelHash = {
  sp: 'evapp',
  st: 'mgsoc',
  cw: 'mgsof',
  gl: 'gl'
}
export default {
  data () {
    return {
      currModule: this.$route.path.split('/')[0],
      userName: JSON.parse(window.localStorage.getItem('userInfo')).name,
      role_auth: ''
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
    },
    queryAuth () {
      axios
        .get('swpu_stlmg', {
          params: {
            methodname: 'query',
            id: userInfo.id
          }
        })
        .then(data => {
        //   debugger
          this.role_auth = data.data.DATA[0].role_auth
          // this.checkModels(this.role_auth.split(',')[0])
        })
    },
    checkModels (firstModel) {
    //   let currModule = this.$route.path.split('/')[0]
      if (this.currModule !== modelHash[firstModel]) {
        this.$router.push({path: modelHash[firstModel]})
      }
    }
  },
  watch: {
    $route (to, from) {
      this.checkLogin()
    }
  },
  created () {
    this.queryAuth()
  }
}
</script>

<style lang='less' scoped>
@import 'header.less';
</style>
