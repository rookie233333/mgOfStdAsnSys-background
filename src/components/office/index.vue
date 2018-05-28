<template>
  <div class="activity-box">
    <!-- 创建活动 -->
    <div class="create-activity" v-if="getCurrModel() == 'ct'">
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <div class="left">
          <el-form-item label="主题" prop="name">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="开始时间" required>
            <el-col :span="11">
              <el-form-item prop="date1">
                <el-date-picker type="date" placeholder="选择日期" v-model="form.date1" style="width: 100%;"></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col class="line" :span="2">-</el-col>
            <el-col :span="11">
              <el-form-item prop="date2">
                <el-time-picker type="fixed-time" placeholder="选择时间" v-model="form.date2" style="width: 100%;"></el-time-picker>
              </el-form-item>
            </el-col>
          </el-form-item>
          <el-form-item label="结束时间" required>
            <el-col :span="11">
              <el-form-item prop="date1">
                <el-date-picker type="date" placeholder="选择日期" v-model="form.date1" style="width: 100%;"></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col class="line" :span="2">-</el-col>
            <el-col :span="11">
              <el-form-item prop="date2">
                <el-time-picker type="fixed-time" placeholder="选择时间" v-model="form.date2" style="width: 100%;"></el-time-picker>
              </el-form-item>
            </el-col>
          </el-form-item>
          <el-form-item label="创建部门" prop="department_id">
            <el-select v-model="form.department_id" placeholder="请选择" style="width:100%;">
              <el-option v-for="item in department_items" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
        </div>
        <div class="right">
          <el-form-item label="模板">
            <el-upload class="upload-demo" action="/upload" :on-preview="handlePreview" :on-remove="handleRemove" :before-remove="beforeRemove" :on-exceed="handleExceed" :file-list="fileList">
              <el-button size="small" type="primary">点击上传</el-button>
              <div slot="tip" class="el-upload__tip">文件大小不超过100M</div>
            </el-upload>
          </el-form-item>
          <el-form-item label="描述" prop="description">
            <el-input type="textarea" v-model="form.description" rows='4'></el-input>
          </el-form-item>
        </div>

        <el-form-item style="clear:both">
          <el-button type="primary" @click="onSubmit('form')">立即创建</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- 管理 -->
    <div class="mg-activity" v-if="getCurrModel() == 'mg'">
      <el-table :data="tableData" height="500" fit border style="width: 100%;text-align:left;">
        <el-table-column type="index" label="序号">
        </el-table-column>
        <el-table-column prop="name" label=" 主题" sortable>
        </el-table-column>
        <el-table-column prop="time" label=" 开始时间" sortable>
        </el-table-column>
        <el-table-column prop="time" label=" 结束时间" sortable>
        </el-table-column>
        </el-table-column>
        <el-table-column prop="department_name" label="发布部门" sortable>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button @click="viewDetail(scope.row)" type="text" size="small">查看详情</el-button>
            <el-button @click="viewDetail(scope.row)" type="text" size="small">删除</el-button>   
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  data () {
    return {
      form: {
        name: '',
        date1: '',
        date2: '',
        date3: '',
        date4: '',
        department_id: 1,
        type: 0,
        description: '',
        content: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入 名称', trigger: 'blur' },
          { min: 3, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur' }
        ],
        site: [{ required: true, message: '请输入 地址', trigger: 'change' }],
        date1: [
          {
            type: 'date',
            required: true,
            message: '请选择日期',
            trigger: 'change'
          }
        ],
        date2: [
          {
            type: 'date',
            required: true,
            message: '请选择时间',
            trigger: 'change'
          }
        ],
        department_id: [
          { required: true, message: '请选择举办部门', trigger: 'change' }
        ],
        type: [
          {
            required: true,
            message: '请选择发布类型',
            trigger: 'change'
          }
        ],
        description: [
          { required: true, message: '请填写摘要', trigger: 'blur' },
          {
            min: 10,
            max: 50,
            message: '长度在 10 到 50 个字符',
            trigger: 'blur'
          }
        ],
        content: [
          { required: true, message: '请输入内容', trigger: 'blur' },
          { min: 100, message: '字数不少于100个字', trigger: 'blur' }
        ]
      },
      currModel: this.$parent.$route.query.opt,
      department_items: [],
      tableData: []
    }
  },
  methods: {
    onSubmit (formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          axios
            .post('/swpu_activity', {
              methodname: 'addActivity',
              Pubuser_id: 1,
              name: this.form.name,
              site: this.form.site,
              time:
                this.getstrDate1(this.form.date1) +
                this.getstrDate2(this.form.date2),
              department_id: this.form.department_id,
              type: this.form.type,
              description: this.form.description
            })
            .then(data => {
              console.log(data)
              this.$alert(data.data.MSG, '操作提示', {
                confirmButtonText: '确定',
                callback: action => {
                  this.$message({
                    type: 'success',
                    message: '创建活动/新闻成功'
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
    getstrDate1 (time) {
      var date = new Date(time)
      var Str =
        date.getFullYear() +
        '-' +
        (date.getMonth() + 1) +
        '-' +
        date.getDate() +
        ' '
      return Str
    },
    getstrDate2 (time) {
      var date = new Date(time)
      var str =
        date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds()
      return str
    },
    queryDepartment () {
      axios
        .get('/swpu_department', {
          params: {
            methodname: 'queryDepartName'
          }
        })
        .then(data => {
          // debugger
          this.department_items = data.data.DATA
        })
        .catch(err => {
          this.$message.error(err.MSG)
        })
    },
    queryActivity () {
      // 查询活动列表

      axios
        .get('/swpu_activity', {
          params: {
            methodname: 'queryList'
          }
        })
        .then(data => {
          this.tableData = data.data.DATA
        })
        .catch(err => {
          this.$message.error(err.MSG)
        })
    },
    formatStatus (row, column) {
      return row.status === -1
        ? '发布失败'
        : row.status === 0 ? '未发布' : row.status === 1 ? '已发布' : '已删除'
    },
    formatDescribe (row) {
      return row.type === 0 ? '活动' : '新闻'
    }
  },
  created () {
    this.queryDepartment()
    this.queryActivity()
  }
}
</script>
<style lang="less">
@import '../activity/activity.less';
</style>
