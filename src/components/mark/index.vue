<template>
  <div class="activity-box">
    <!-- 查看部门 -->
    <!-- <div class="create-activity" v-if="getCurrModel() == 'ct'">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="分数">
          <el-input v-model="form.score"></el-input>
        </el-form-item>
        <el-form-item label="举办部门">
          <el-select v-model="form.department_id" placeholder="请选择" prop="department" style="width:100%;">
            <el-option v-for="item in department_items" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="发布人id">
          <el-input type="text" v-model="form.operate_id" ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit('form')">立即创建</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
    </div> -->
    <!-- 查看社团 -->
    <div class="mg-activity">
      <el-table :data="tableData" height="500" fit border style="width: 100%;text-align:left;">
        <el-table-column type="index" label="排名">
        </el-table-column>
        <el-table-column prop="name" label="部门名称" sortable>
        </el-table-column>
        <el-table-column prop="discribe" label="部门简介">
        </el-table-column>
        <el-table-column prop="average_score" label="分数" sortable>
        </el-table-column>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button @click="viewDetail(scope.row)" type="text" size="small">查看详情</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog :title="department_name" :visible.sync="showScoreWindow">
      <el-table :data="scoreDetail" border>
        <el-table-column property="operate_name" label="评价人" width="150"></el-table-column>
        <el-table-column property="score" label="分数" width="200"></el-table-column>
        <el-table-column property="evaluate" label="评价"></el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  data () {
    return {
      form: {
        department_id: 1,
        operate_id: 1,
        score: 1
      },
      currModel: this.$parent.$route.query.opt,
      department_items: [],
      tableData: [],
      scoreDetail: [],
      department_name: '',
      showScoreWindow: false
    }
  },
  methods: {
    onSubmit (formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          axios
            .post('/swpu_score', {
              methodname: 'addScore',
              department_id: this.form.department_id,
              operate_id: this.form.operate_id,
              score: this.form.score
            })
            .then(data => {
              console.log(data)
              this.$alert(data.data.MSG, '操作提示', {
                confirmButtonText: '确定',
                callback: action => {
                  this.$message({
                    type: 'success',
                    message: '创建活动成功'
                  })
                  setTimeout(() => {
                    this.$router.go(0)
                  }, 2000)
                }
              })
            })
            .catch(err => {
              this.$message.error(err.MSG)
            })
        }
      })
    },
    getCurrModel () {
      return this.$parent.$route.query.opt
    },
    queryDepartment () {
      // 查询活动列表
      axios
        .get('/swpu_department', {
          params: {
            methodname: 'queryAsGroup',
            group_id: this.getCurrModel() === 'ct' ? 1 : 2
          }
        })
        .then(data => {
          this.tableData = data.data.DATA
        })
        .catch(err => {
          this.$message.error(err.MSG)
        })
    },
    viewDetail (row) {
      this.department_name = row.name
      axios
        .get('/swpu_score', {
          params: {
            methodname: 'queryByDepartment',
            department_id: row.id
          }
        })
        .then(data => {
          this.scoreDetail = data.data.DATA
          this.showScoreWindow = true
        })
        .catch(err => {
          this.$message.error(err.MSG)
        })
    }
  },
  created () {
    this.queryDepartment()
  },
  beforeCreate () {
    // this.queryDepartment()
  },
  watch: {
    $route (to, from) {
      this.queryDepartment()
    }
  }
}
</script>
<style lang="less">
@import '../activity/activity.less';
</style>

