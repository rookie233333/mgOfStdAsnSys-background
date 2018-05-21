<template>
  <div class="activity-box">
    <div class="create-activity">
      <el-table :data="tableData" height="500" fit border style="width: 100%;text-align:left;">
        <el-table-column type="index" label="序号">
        </el-table-column>
        <el-table-column prop="name" label="昵称" sortable>
        </el-table-column>
         <el-table-column prop="department_name" label="所属部门" sortable>
        </el-table-column>
        <el-table-column prop="sex" label="性别" :formatter="formatSex">
        </el-table-column>
        <el-table-column prop="birthday" label="生日" sortable>
        </el-table-column>
        </el-table-column>
        <el-table-column prop="phone" label="电话">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button @click="deleteUser(scope.row)" type="text">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- <div class="mg-activity" v-if="getCurrModel() == 'mg'">
      <el-table :data="tableData2" height="500" fit border style="width: 100%;text-align:left;">
        <el-table-column type="index" label="序号">
        </el-table-column>
        <el-table-column prop="name" label="昵称" sortable>
        </el-table-column>
         <el-table-column prop="department_name" label="所属部门">
        </el-table-column>
        <el-table-column prop="discribe" label="性别">
        </el-table-column>
        <el-table-column prop="average_score" label="生日" sortable>
        </el-table-column>
        </el-table-column>
        <el-table-column prop="department_name" label="电话">
        </el-table-column>
      </el-table>
    </div> -->
  </div>
</template>
<script>
import axios from 'axios'
export default {
  data () {
    return {
      tableData: []
    }
  },
  methods: {
    getCurrModel () {
      return this.$parent.$route.query.opt
    },
    queryUserList () {
      axios
        .get('/swpu_user', {
          params: {
            methodname: 'query',
            level: this.getCurrModel() === 'ct' ? 0 : 1
          }
        })
        .then(data => {
          this.tableData = data.data.DATA
        })
        .catch(err => {
          this.$message.error(err.MSG)
        })
    },
    deleteUser (row) {
      this.$alert('是否确认删除用户', '操作提示', {
        confirmButtonText: '确定',
        callback: action => {
          axios
            .get('swpu_user', {
              params: {
                methodname: 'delete',
                id: row.id
              }
            })
            .then(data => {
              this.$message({
                type: 'success',
                message: data.data.MSG
              })
              // 刷新数据
              this.queryUserList()
            })
            .catch(err => {
              this.$message.error(err.MSG)
            })
        }
      })
    },
    formatSex (row) {
      return row.sex === 'M' ? '男' : '女'
    }
  },
  created () {
    this.queryUserList()
  },
  watch: {
    $route (to, from) {
      this.queryUserList()
    }
  }
}
</script>
<style lang="less">
@import '../activity/activity.less';
</style>

