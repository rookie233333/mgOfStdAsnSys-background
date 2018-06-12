<template>
  <div class="body">
    <el-form ref="form" :model="form" :rules="rules" class="login-form-area">
        <h2 class="login-title">学生社团管理系统</h2>
        <el-form-item class="form-col" prop="name">
          <el-input type="text" name="name" v-model="form.name" placeholder="用户名"></el-input>
        </el-form-item>
        <el-form-item class="form-col" prop="password">
          <el-input type="password" name="password" v-model="form.password" placeholder="密码" ></el-input>
        </el-form-item>
        <el-form-item class="form-col">
          <el-radio v-model="userType" label="1">社团</el-radio>
          <el-radio v-model="userType" label="2">社团联</el-radio>
          <el-radio v-model="userType" label="3">超级管理</el-radio>
        </el-form-item>
        <div class="form-col">
          <input type="button" value="登  录" @click="login('form')">
        </div>
      </el-form>
  </div>     
</template>

<script>
import axios from 'axios'
export default {
  name: 'login',
  data () {
    return {
      userType: '1', // 1社团2社团联
      form: {
        name: '',
        password: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 21, message: '长度在 6 到 21 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    login (formName) {
      this.$refs[formName].validate(valid => {
        if (valid && this.userType !== '3') {
          axios
            .get(this.userType === '1' ? 'swpu_stmg' : '/swpu_stlmg', {
              params: {
                methodname: 'loginMg',
                name: this.form.name,
                password: this.form.password
              }
            })
            .then(data => {
              if (data.data.ISSUCCESS) {
                // 用户信息存储
                var userInfo = data.data.DATA[0]
                userInfo.userType = this.userType
                window.localStorage.setItem('userInfo', JSON.stringify(userInfo))
                this.$message({
                  type: 'success',
                  message: data.data.MSG
                })
                this.$router.push({
                  path: this.userType === '1' ? '/evdec?status=pending' : 'evapp?status=pending'
                })
              } else {
                this.$alert(data.data.MSG, '登录失败', {
                  confirmButtonText: '确定',
                  callback: action => {
                    // 清空内容
                    this.$refs[formName].resetFields()
                  }
                })
              }
            })
            .catch(err => {
              this.$message.error(err.MSG)
            })
        } else if (valid && this.userType === '3') {
          if (this.form.name === 'admin' && this.form.password === '666666') {
            var userInfo = {}
            userInfo.userType = this.userType
            window.localStorage.setItem('userInfo', JSON.stringify(userInfo))
            this.$router.push({
              path: '/mgass'
            })
          } else {
            this.$message.error('错误，登录失败')
          }
        }
      })
    }
  }
}
</script>
<style lang="less">
@import "login.less";
</style>

