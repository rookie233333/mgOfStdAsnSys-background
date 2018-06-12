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
                    <el-table-column prop="society_name" label="管理的社团" width="290">
                    </el-table-column>
                    <el-table-column label="操作">
                      <template slot-scope="scope">
                        <el-button type="text" size="small" @click="showPassword(scope.row)">查看密码</el-button>
                        <el-button type="text" size="small" @click="warinUser(scope.row)">禁用账号</el-button>
                        <el-button type="text" size="small" @click="deleteSociety(scope.row)">删除</el-button>
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
                    <el-form-item label="管理社团" prop="society_id" label-width="100px">
                      <el-input v-model="form.society"></el-input>
                    </el-form-item>
                      <el-button type="primary"  >创 建</el-button>
                      <el-button >取 消</el-button>
                  </el-form>
                  </el-dialog>
            </div>
        </el-main>
    </el-container>
</template>
<script>
import axios from 'axios'
export default {
  data () {
    return {
      societyData: [],
      createManager: false,
      form: {
        name: '',
        password: '',
        society: ''
      }
    }
  },
  methods: {
    queryData () {
      axios
        .get('swpu_stmg', {
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
    deleteSociety (row) {
      this.$confirm('是否删除该管理员账号？')
        .then(_ => {
          axios
            .get('swpu_user', {
              params: {
                methodname: 'updatadp',
                id: row.id,
                department_id: 0
              }
            })
            .then(data => {
              this.$message({
                type: 'success',
                message: '用户' + row.name + '已被移除社团'
              })
              this.$router.go(0)
            })
            .catch(err => {
              this.$message.error(err.MSG)
            })
        })
        .catch(_ => {})
    }
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