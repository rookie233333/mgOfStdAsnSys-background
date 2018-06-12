<template>
    <el-container>
        <el-main>
            <div class="my-container">
                <div class="opt-box">
                    <el-button  @click="createManager = true" type="success">添加会员</el-button>
                </div>
                 <el-table :data="societyData" border height="380" fit>
                     <el-table-column type='index' label="序号"></el-table-column>
                    <el-table-column prop="name" label="昵称">
                    </el-table-column>
                    <el-table-column prop="sex" label="性别" :formatter="formatSex">
                    </el-table-column>
                     <el-table-column prop="birthday" label="生日">
                    </el-table-column>
                    <el-table-column prop="phone" label="电话">
                    </el-table-column>
                    <el-table-column label="操作">
                      <template slot-scope="scope">
                        <!-- <el-button type="text" size="small" @click="showPassword(scope.row)">查看密码</el-button> -->
                        <!-- <el-button type="text" size="small" @click="warinUser(scope.row)">禁用账号</el-button> -->
                        <el-button type="text" size="small" @click="deleteUser(scope.row)">移除会员</el-button>
                      </template>
                    </el-table-column>
                </el-table>
                <!-- 创建活管理员 -->
                <el-dialog title="添加用户" :visible.sync="createManager">
                     <el-table :data="allUserData" border height="280" fit @selection-change="handleSelectionChange">
                     <el-table-column type='selection'></el-table-column>
                    <el-table-column prop="name" label="昵称">
                    </el-table-column>
                    <el-table-column prop="sex" label="性别" :formatter="formatSex">
                    </el-table-column>
                     <el-table-column prop="birthday" label="生日">
                    </el-table-column>
                    <el-table-column prop="phone" label="电话">
                    </el-table-column>
                </el-table>
                <div style="margin-top:20px;">
                    <el-button type="primary" @click="join()">添 加</el-button>
                    <el-button @click="createManager = false">取 消</el-button>
                </div>
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
      },
      selectedArr: [],
      allUserData: [],
      userInfo: JSON.parse(window.localStorage.getItem('userInfo'))
    }
  },
  methods: {
    queryData () {
      axios
        .get('swpu_user', {
          params: {
            methodname: 'query',
            society_id: this.userInfo.society_id
          }
        })
        .then(data => {
          this.societyData = data.data.DATA
        })
        .catch(err => {
          this.$message.error(err.MSG)
        })
    },
    formatSex (row) {
      return row.sex === 'M' ? '男' : '女'
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
      this.$confirm('确定要将该会员移除出社团？')
        .then(_ => {
          axios
            .get('swpu_user', {
              params: {
                methodname: 'updatadp',
                id: row.id,
                society_id: 0
              }
            })
            .then(data => {
              this.$message({
                type: 'success',
                message: '用户' + row.name + '已被移除社团'
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
    initData () {
      this.userInfo = JSON.parse(window.localStorage.getItem('userInfo'))
    },
    join () {
      axios
        .get('swpu_user', {
          params: {
            methodname: 'updatadp',
            id: this.selectedArr[0].id,
            society_id: this.userInfo.society_id
          }
        })
        .then(data => {
          this.createManager = false
          this.$message({
            type: 'success',
            message: '添加用户' + this.selectedArr[0].name + '成功'
          })
          setTimeout(() => {
            this.$router.go(0)
          }, 2000)
        })
        .catch(err => {
          this.$message.error(err.MSG)
        })
    },
    handleSelectionChange (val) {
      this.selectedArr = val
    },
    queryAlluser () {
      axios
        .get('swpu_user', {
          params: {
            methodname: 'querynotid',
            society_id: this.userInfo.society_id
          }
        })
        .then(data => {
          this.allUserData = data.data.DATA
        })
        .catch(err => {
          this.$message.error(err.MSG)
        })
    }
  },
  created () {
    this.initData()
    this.queryData()
    this.queryAlluser()
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