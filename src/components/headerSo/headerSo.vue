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
                        <router-link :class="{'active':currModule=='evdec'}" to='/evdec?status=pending'>
                            <span class="icon-activity">活动申办</span>
                        </router-link>
                    <li>
                        <router-link :class="{'active':currModule=='news'}" to='/news?opt=mg'>
                            <span class="icon-work">新闻中心</span>
                        </router-link>
                    </li>
                    <li>
                        <router-link :class="{'active':currModule=='mgmem'}" to='/mgmem'>
                            <span class="icon-mark">会员管理</span>
                        </router-link>
                    </li>
                    <!-- <li>
                        <router-link :class="{'active':currModule=='manage'}" to='/manage'>
                            <span class="icon-manage">管理中心</span>
                        </router-link>
                    </li> -->
                    <li>
                        <router-link :class="{'active':currModule=='more'}" to='/more'>
                            <span class="icon-message">更多</span>
                        </router-link>
                    </li>
                     <!-- <li>
                        <router-link :class="{'active':currModule=='notic'}" to='/notic'>
                            <span class="icon-notic">社团中心</span>
                        </router-link>
                    </li> -->
                </ul>
          </div>
  </div>
</div>
  
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      currModule: this.$route.path.split('/')[0],
      userName: ''
    }
  },
  methods: {
    queryUserName () {
      var userInfo = JSON.parse(window.localStorage.getItem('userInfo'))
      axios.get('swpu_society', {
        params: {
          methodname: 'query',
          id: userInfo.society_id
        }
      })
        .then(data => {
          this.userName = data.data.DATA[0].name
        })
    },
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
  created () {
    this.queryUserName()
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
