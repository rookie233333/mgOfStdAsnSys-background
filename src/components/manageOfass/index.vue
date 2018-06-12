<template>
    <el-container>
        <el-main>
            <div class="my-container">
                <div class="opt-box">
                    <el-button  @click="createManager = true" type="success">新建账号</el-button>
                </div>
                 <el-table :data="societyData" border height="380" fit :default-sort = "{prop: 'average_score', order: 'descending'}">
                    <el-table-column prop="name" label="昵称">
                    </el-table-column>
                    <el-table-column prop="role_auth" label="权限模块" width="290">
                    </el-table-column>
                    <el-table-column label="操作">
                      <template slot-scope="scope">
                        <el-button type="text" size="small" @click="showPassword(scope.row)">查看密码</el-button>
                        <el-button type="text" size="small" >更改权限</el-button>
                        <el-button type="text" size="small" @click="deleteUser(scope.row)">删除</el-button>
                      </template>
                    </el-table-column>
                </el-table>
                <!-- 创建活管理员 -->
                <el-dialog title="创建管理员账号" :visible.sync="createManager">
                  <el-form :model="form">
                    <el-form-item label="昵称" label-width="100px">
                      <el-input v-model="form.name" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="密码" prop="discribe" label-width="100px">
                      <el-input v-model="form.password" type="password" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="权限模块" prop="society_id" label-width="100px" style="text-align:left;">
                      <template>
                        <!-- <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
                          <div style="margin: 15px 0;"></div>
                          <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
                            <el-checkbox v-for="city in cities" :label="city" :key="city">{{city}}</el-checkbox>
                          </el-checkbox-group> -->
                        <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
                         <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
                            <el-checkbox v-for="city in cities" :label="city.value" :key="city.value">{{city.name}}</el-checkbox>
                          </el-checkbox-group>
                      </template>
                    </el-form-item>
                      <el-button type="primary"  @click="createAccount">创 建</el-button>
                      <el-button @click="createManager = false">取 消</el-button>
                  </el-form>
                  </el-dialog>
            </div>
        </el-main>
    </el-container>
</template>
<script>
import axios from 'axios'
const cityOptions = [{
  name: '活动审批',
  value: 'sp'
}, {
  name: '社团管理',
  value: 'st'
}, {
  name: '财务管理',
  value: 'cw'
}, {
  name: '管理员管理',
  value: 'gl'
}]
export default {
  data () {
    return {
      societyData: [],
      createManager: false,
      form: {
        name: '',
        password: '',
        role_auth: ''
      },
      checkAll: false,
      checkedCities: [],
      cities: cityOptions,
      isIndeterminate: true
    }
  },
  methods: {
    queryData () {
      axios
        .get('swpu_stlmg', {
          params: {
            methodname: 'queryList'
          }
        })
        .then(data => {
          this.societyData = data.data.DATA
        })
        .catch(err => {
          this.$message.error(err.MSG)
        })
    },
    showPassword (row) {
      this.$alert(row.password, '密码', {
        confirmButtonText: '确定',
        type: 'warning'
      })
    },
    warinUser (row) {
      this.$alert('用户' + row.name + '已被禁用', '禁用账号', {
        confirmButtonText: '确定',
        type: 'warning'
      })
    },
    deleteUser (row) {
      this.$confirm('确定要删除管理员账号？')
        .then(_ => {
          axios
            .get('swpu_stlmg', {
              params: {
                methodname: 'delete',
                id: row.id
              }
            })
            .then(data => {
              this.$message({
                type: 'success',
                message: '管理员' + row.name + '已被移除'
              })
              setTimeout(_ => {
                this.$router.go(0)
              }, 2000)
            })
            .catch(err => {
              this.$message.error(err.MSG)
            })
        })
        .catch(_ => {})
    },
    handleCheckAllChange (val) {
      this.checkedCities = val ? cityOptions : []
      this.isIndeterminate = false
    },
    handleCheckedCitiesChange (value) {
      console.log(value)
      let checkedCount = value.length
      this.checkAll = checkedCount === this.cities.length
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length
    },
    createAccount () {
      let params = this.form
      params.role_auth = this.checkedCities.join(',')
      params.methodname = 'addMg'
      axios
        .post('swpu_stlmg', params)
        .then(data => {
          this.$message({
            type: 'success',
            message: '创建社联管理员成功'
          })
          this.createManager = false
          setTimeout(() => {
            this.$router.go(0)
          }, 2000)
        })
        .catch(err => {
          this.$message.error(err.MSG)
        })
    }
    // formatRole (row) {
    //   return row.role_auth === 'sp' ? '活动审批'
    // }
  },
  created () {
    this.queryData()
  }
}
</script>

<style lang="less">
.el-header {
  background-color: #b3c0d1;
  color: #333;
  line-height: 60px;
}

.el-aside {
  color: #333;
}
.el-menu-item-group__title,
.el-menu-item,
.el-submenu__title {
  text-align: left;
}
.my-container {
  margin: 15px 17px;
  padding: 24px;
  border: 1px solid #ebebeb;
  border-radius: 3px;
  transition: 0.2s;
  .opt-box {
    text-align: left;
    margin-bottom: 15px;
  }
}
.el-dialog__header{
  text-align: left;
}
</style>