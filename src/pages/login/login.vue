<template>
      <div class="login-form-area">
        <h2 class="login-title">学生社团管理系统</h2>
        <div class="form-col">
          <input type="text" name="name" v-model="name" placeholder="用户名">
        </div>
        <div class="form-col">
          <input type="password" name="password" v-model="password" placeholder="密码" >
        </div>
        <div class="form-col">
          <input type="button" value="登  录" @click="login">
        </div>
      </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'login',
  data () {
    return {
      name: '',
      password: ''
    }
  },
  methods: {
    login () {
      // alert('hello')
      // debugger
      axios({
        method: 'get',
        url: '/swpu',
        data: {
          serviceid: 'swpu_user',
          methodname: 'loginUser',
          name: this.name,
          password: this.password
        }
      })
    }
  }
}
</script>
<style lang="less">
@import 'login.less';
</style>

