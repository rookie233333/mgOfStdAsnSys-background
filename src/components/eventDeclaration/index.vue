<template>
    <el-container>
        <el-aside width="250px" style="background-color: rgb(238, 241, 246)">
        <el-menu :router = "true" >
                <!-- <el-menu-item index="evdec?status=edit"><i class="el-icon-edit"></i>待编</el-menu-item> -->
                <el-menu-item index="evdec?status=pending"><i class="el-icon-time"></i>待审</el-menu-item>  
                <el-menu-item index="evdec?status=upcoming"><i class="el-icon-edit-outline"></i>待举办</el-menu-item>
                <!-- <el-menu-item index="evdec?status=approved"><i class="el-icon-circle-check-outline
"></i>已批准</el-menu-item> -->
                <el-menu-item index="evdec?status=completed"><i class="el-icon-message"></i>已完成</el-menu-item>
                <el-menu-item index="evdec?status=approved"><i class="el-icon-circle-close-outline"></i>未通过</el-menu-item>
            </el-menu>
        </el-aside>
        <el-main>
            <div class="my-container">
                <div class="opt-box">
                    <el-button  @click="createAct=true" type="primary" v-if="currStatus==='pending'">创建活动</el-button>
                    <!-- <el-button  @click="subApplication()" type="warning" v-if="currStatus==='edit'" :disabled='selectedArr.length===0'>提交申请</el-button> -->
                    <el-button  @click="deleteAct()" type="danger" v-if="currStatus!=='completed'&&currStatus!=='approved'" :disabled='selectedArr.length===0'>取消活动</el-button>
                    <el-button  @click="editAct()" type="success" v-if="currStatus==='edit'" :disabled='selectedArr.length===0'>编辑活动</el-button>
                    <el-button  @click="endActivity()" type="success" v-if="currStatus==='upcoming'" :disabled='selectedArr.length===0'>结束活动</el-button>
                    <!-- <el-button  @click="finAppli=true" type="success" v-if="currStatus==='approved'" :disabled='selectedArr.length===0'>提交报账申请</el-button> -->
                </div>
                 <el-table :data="activityData" border height="380" fit  @selection-change="handleSelectionChange">
                    <el-table-column type="selection" width="55">
                    </el-table-column>
                    <el-table-column prop="name" label="名称" width="140">
                    </el-table-column>
                    <el-table-column prop="society_name" label="举办社团" width="120">
                    </el-table-column>
                    <el-table-column prop="time" label="时间">
                    </el-table-column>
                    <el-table-column prop="site" label="地点">
                    </el-table-column>
                    <el-table-column prop="status" label="状态" :formatter="formatStatus">
                    </el-table-column>
                     <el-table-column prop="people" label="人数">
                    </el-table-column>
                     <el-table-column prop="score" v-if="currStatus==='completed'" label="分数">
                    </el-table-column>
                </el-table>
                <!-- 创建活动dialog -->
                <el-dialog title="创建活动" :visible.sync="createAct">
                  <el-form :model="form" :rules="rules" ref="form">
                    <el-form-item label="活动名称" label-width="100px" prop="name">
                      <el-input v-model="form.name" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="活动时间" label-width="100px" required>
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
                    <el-form-item label="活动地点" prop="site" label-width="100px">
                      <el-input v-model="form.site" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="参与人数" prop="people" label-width="100px">
                      <el-input v-model="form.people">
                        <template slot="append">人</template>
                      </el-input>
                    </el-form-item>
                    <el-form-item label="申请费用" prop="price" label-width="100px">
                      <el-input v-model="form.price">
                        <template slot="append">元</template>
                      </el-input>
                    </el-form-item>
                    <el-form-item label="主要内容" prop="content" label-width="100px">
                      <el-input type="textarea" v-model="form.content" row="5"></el-input>
                    </el-form-item>
                  </el-form>
                  <div slot="footer" class="dialog-footer">
                    <el-button @click="createAct = false">取 消</el-button>
                    <el-button type="primary" v-if="!isedit" @click="create('form')">确 定</el-button>
                    <el-button type="primary" v-if="isedit" @click="editConfirm('form')">确 定</el-button>
                  </div>
                </el-dialog>

                <el-dialog title="提交场地申请" :visible.sync="siteAppli">
                  <el-form :model="siteform">
                    <el-form-item label="举办时间" label-width="100px">
                       <el-col :span="11">
                        <el-form-item>
                          <el-date-picker type="date" placeholder="选择日期" v-model="date3" style="width: 100%;"></el-date-picker>
                        </el-form-item>
                      </el-col>
                      <el-col class="line" :span="2">-</el-col>
                      <el-col :span="11">
                        <el-form-item>
                          <el-time-picker type="fixed-time" placeholder="选择时间" v-model="date4" style="width: 100%;"></el-time-picker>
                        </el-form-item>
                      </el-col>
                    </el-form-item>
                    <el-form-item label="举办地点" label-width="100px">
                      <el-input v-model="siteform.site" auto-complete="off"></el-input>
                    </el-form-item>
                  </el-form>
                  <div slot="footer" class="dialog-footer">
                    <el-button @click="siteAppli = false">取 消</el-button>
                    <el-button type="primary" @click="subSite()">确 定</el-button>
                  </div>
                </el-dialog>

                <el-dialog title="提交财务报账" :visible.sync="finAppli">
                  <el-form :model="finform">
                     <el-form-item label="报账总价" label-width="100px">
                      <el-input v-model="finform.price" auto-complete="off">
                        <template slot="append">元</template>
                      </el-input>
                    </el-form-item>
                    <el-form-item label="清单" label-width="100px">
                      <el-input type="textarea" v-model="finform.price" row="5" auto-complete="off"></el-input>
                    </el-form-item>
                  </el-form>
                  <div slot="footer" class="dialog-footer">
                    <el-button @click="finAppli = false">取 消</el-button>
                    <el-button type="primary" @click="subFin()">确定并结束活动</el-button>
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
      currStatus: this.$route.query.status,
      selectedArr: [],
      userInfo: JSON.parse(window.localStorage.getItem('userInfo')),
      activityData: [],
      society_name: '',
      date3: '',
      date4: '',
      createAct: false,
      siteAppli: false,
      finAppli: false,
      form: {
        name: '',
        status: 0,
        society_id: '',
        site: '',
        people: '',
        time: '',
        score: 0,
        society: '',
        content: '',
        date1: '',
        date2: ''
      },
      siteform: {
        site: '',
        time: this.getstrDate1(this.date3) + this.getstrDate2(this.date4),
        society_id: '',
        activity_id: ''
      },
      finform: {
        price: '',
        list: '',
        society_id: '',
        activity_id: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入名称', trigger: 'blur' },
          { min: 3, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur' }
        ],
        site: [
          { required: true, message: '请输入地址', trigger: 'change' }
        ],
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
        people: [
          { required: true, message: '请输入人数', trigger: 'change' }
        ],
        price: [
          {
            required: true,
            message: '请输入价格',
            trigger: 'change'
          }
        ],
        content: [
          {required: true, message: '请输入内容', trigger: 'blur'}
        ]
      },
      isedit: false // 是否编辑
    }
  },
  watch: {
    $route (to, from) {
      this.currStatus = to.query.status
      this.queryData()
    }
  },
  methods: {
    handleSelectionChange (val) {
      this.selectedArr = val
    },
    queryData () {
      axios
        .get('swpu_act', {
          params: {
            methodname: 'queryBystatus',
            society_id: this.userInfo.society_id,
            status: this.statusHash()[this.currStatus]
          }
        })
        .then(data => {
          this.activityData = data.data.DATA
        })
        .catch(err => {
          this.$message.error(err.MSG)
        })
    },
    querysociety () {
      axios
        .get('swpu_society', {
          params: {
            methodname: 'query',
            id: this.userInfo.society_id
          }
        })
        .then(data => {
          this.society_name = data.data.DATA.name
        })
    },
    statusHash () {
      return {
        'pending': '0',
        'upcoming': '1',
        'completed': '2',
        'approved': '-1'// 未通过
      }
    },
    create (formName) {
      // 创建活动
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.form.time = this.getstrDate1(this.form.date1) + this.getstrDate2(this.form.date2)
          var params = this.form
          params.methodname = 'add'
          axios
            .post('swpu_act', params)
            .then(data => {
              this.$message({
                type: 'success',
                message: '创建活动成功，等待审批'
              })
              this.finAppli = false
              setTimeout(() => {
                this.$router.go(0)
              }, 2000)
            })
            .catch(err => {
              this.$message.error(err.MSG)
            })
        }
      })
    },
    updataStatus (status) {
      // 提交申请
      axios
        .get('swpu_act', {
          params: {
            methodname: 'updataStatus',
            status: status,
            id: this.selectedArr[0].id
          }
        })
        .then(data => {
          this.$message({
            type: 'success',
            message: data.data.MSG
          })
          setTimeout(_ => {
            this.$router.go(0)
          }, 2000)
        })
        .catch(err => {
          this.$message.error(err.MSG)
        })
    },
    deleteAct () {
      // 删除活动
      this.$confirm('确认取消活动？')
        .then(_ => {
          axios
            .get('swpu_act', {
              params: {
                methodname: 'delete',
                id: this.selectedArr[0].id
              }
            })
            .then(data => {
              this.$message({
                type: 'success',
                message: data.data.MSG
              })
              this.$router.go(0)
            })
            .catch(err => {
              this.$message.error(err.MSG)
            })
        })
        .catch(_ => {})
    },
    editAct () {
      // 编辑活动
      this.createAct = true
      this.isedit = true
      this.form = this.selectedArr[0]
    },
    editConfirm () {
      var params = this.form
      params.id = this.selectedArr[0].id
      params.methodname = 'updata'
      axios
        .post('swpu_act', params)
        .then(data => {
          this.$message({
            type: 'success',
            message: data.data.MSG
          })
          this.$router.go(0)
        })
        .catch(err => {
          this.$message.error(err.MSG)
        })
    },
    subSite () {
      // 提交场地表
      this.siteform.time = this.getstrDate1(this.date3) + this.getstrDate2(this.date4)
      var params = this.siteform
      params.methodname = 'add'
      params.activity_id = this.selectedArr[0].id
      axios
        .get('swpu_appli', {
          params: params
        })
        .then(data => {
          this.$message({
            type: 'success',
            message: data.data.MSG
          })
          this.$router.go(0)
        })
        .catch(err => {
          this.$message.error(err.MSG)
        })
    },
    subFin () {
      // 提交报账
      var params = this.finform
      params.methodname = 'subfinappli'
      axios
        .get('swpu_act', {
          params: params
        })
        .then(data => {
          this.$message({
            type: 'success',
            message: data.data.MSG
          })
          this.$router.go(0)
        })
        .catch(err => {
          this.$message.error(err.MSG)
        })
    },
    initData () {
      this.form.society_id = this.userInfo.society_id
      this.form.society = this.society_name
      this.siteform.society_id = this.userInfo.society_id
      this.finform.society_id = this.userInfo.society_id
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
    formatStatus (row) {
      return row.status === 0 ? '待审中' : row.status === 1 ? '待举办' : row.status === 2 ? '已完成' : '未通过'
    },
    endActivity () {
      this.$confirm('确认结束活动？')
        .then(_ => {
          this.updataStatus(this.statusHash()['completed'])
        })
        .catch(_ => {})
    }
  },
  created () {
    this.queryData()
    this.querysociety()
    this.initData()
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

