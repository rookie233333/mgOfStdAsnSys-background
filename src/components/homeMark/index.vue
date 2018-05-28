<template>
    <div class="container">
      <div class="left">
        <div  class="card" v-for="d in departmentData">
          <el-card class="list-card" shadow="never" :body-style="{padding:'5px'}">
            <div class="score" title="评分">
              <i class="el-icon-star-off"></i>
              <span class="score-number">{{d.average_score}}</span>
            </div>
            <div class="department">
              <router-link :to="{path:'mark',query:{deptid:d.id}}" class="title" :title="d.discribe">{{d.discribe}}</router-link>
              <div class="tips">
                <i class="el-icon-star-on"></i>
                <span class="class">{{d.group_id === 1 ? '部门' : '社团'}}</span>
                <span class="depart-name">{{d.name}}</span>
              </div>
            </div>
          </el-card>
        </div>
      </div>
      <div class="right">
        <div class="home-container">
          <h2>{{currTitle}}</h2>
          <el-form ref="form" :model="form" :rules="rules" label-width="80px">
            <el-form-item label="评分" prop="grade">
              <div class="block">
                <!-- <span class="demonstration">区分颜色</span> -->
                <el-rate
                  v-model="form.grade"
                  :colors="['#99A9BF', '#F7BA2A', '#FF9900']">
                </el-rate>
              </div>
            </el-form-item>
            <el-form-item label="评价" prop="content">
              <el-input type="textarea" v-model="form.content" rows="5"></el-input>
            </el-form-item>
            <el-form-item style="clear:both">
              <el-button type="primary" @click="onSubmit('form')">提交</el-button>
              <el-button>取消</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
        
    </div>
</template>
<script>
import axios from 'axios'
export default {
  data () {
    return {
      departmentData: [],
      cardData: [],
      form: {
        grade: '',
        content: ''
      },
      rules: {
        grade: [
          { required: true, message: '请添加评分', trigger: 'blur' }
        ],
        content: [
          { required: true, message: '请填写评价', trigger: 'blur' }
        ]
      },
      cuerrId: this.$route.query.deptid,
      currTitle: ''
    }
  },
  methods: {
    queryDepartment () {
      axios
        .get('swpu_department', {
          params: {
            methodname: 'queryDepartName'
          }
        })
        .then(data => {
          this.departmentData = data.data.DATA
        })
        .catch(err => {
          this.$message.error(err.MSG)
        })
    },
    onSubmit (formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          axios
            .post('/swpu_activity', {
              methodname: 'addActivity'
            })
            .then(data => {
              this.$alert(data.data.MSG, '操作提示', {
                confirmButtonText: '确定',
                callback: action => {
                  this.$message({
                    type: 'success',
                    message: '评价成功'
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
    getCuerrTitle () {
      this.departmentData.forEach(item => {
        if (item.id === this.cuerrId) {
          this.currTitle = item.name
        }
      })
    },
    getCuerrId () {
      this.cuerrId = this.$route.query.deptid
    }
  },
  created () {
    this.queryDepartment()
    setTimeout(this.getCuerrTitle, 500)
  },
  watch: {
    $route (to, from) {
      this.getCuerrId()
      this.getCuerrTitle()
    }
  }
}
</script>
<style lang="less" scoped>
@import '../homeIndex/homeIndex.less';
</style>

