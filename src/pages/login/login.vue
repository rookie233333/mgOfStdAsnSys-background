<template>
  <div class="login">
      <div class="login-form-area">
        <h3>欢迎注册</h3>
        <div class="form-col">
          <input type="text" name="name" v-model="name" placeholder="用户名">
        </div>
        <div class="form-col">
           <input type="password" name="password" v-model="password" placeholder="密码" >
        </div>
        <button type="button">登录</button>
      </div>
  </div>
</template>

<script>
export default {
  name: 'login',
  data () {
    return {
      name: '',
      password: ''
    }
  }
}
</script>
<style lang="less">
@import 'login.less';
</style>

