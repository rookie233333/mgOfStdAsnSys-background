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
      if (this.name === '' || this.password === '') {
        this.$message.error('请输入用户名密码')
        return
      }
      axios.get('/swpu_user', {
        params: {
          methodname: 'loginUser',
          name: this.name,
          password: this.password
        }
      }).then(data => {
        if (data.data.ISSUCCESS) {
          this.$message({
            type: 'success',
            message: data.data.MSG
          })
          this.$router.push({
            path: '/activity?opt=mg'
            // params: {
            //   'opt': 'ct'
            // }
          })
        } else {
          this.$alert(data.data.MSG, '登录失败', {
            confirmButtonText: '确定',
            callback: action => {
              // 清空内容
              this.name = ''
              this.password = ''
            }
          })
        }
      }).catch(function (err) {
        this.$message.error(err.MSG)
      })
    }
  }
}
</script>
<style lang="less">
@import 'login.less';
</style>

