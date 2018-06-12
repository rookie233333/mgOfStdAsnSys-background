<template>
    <el-container>
        <el-aside width="250px" style="background-color: rgb(238, 241, 246)">
        <el-menu :router = "true" >
                <!-- <el-menu-item index="evapp?status=edit"><i class="el-icon-edit"></i>待编</el-menu-item> -->
                <el-menu-item index="evapp?status=pending"><i class="el-icon-time"></i>待审</el-menu-item>  
                <el-menu-item index="evapp?status=upcoming"><i class="el-icon-edit-outline"></i>待举办</el-menu-item>
                <!-- <el-menu-item index="evapp?status=approved"><i class="el-icon-circle-check-outline
"></i>已批准</el-menu-item> -->
                <el-menu-item index="evapp?status=completed"><i class="el-icon-message"></i>已完成</el-menu-item>
                   <el-menu-item index="evapp?status=approved"><i class="el-icon-circle-close-outline"></i>未通过</el-menu-item>
            </el-menu>
        </el-aside>
        <el-main>
            <div class="my-container">
                <div class="opt-box">
                    <!-- <el-button  @click="createAct=true" type="primary" v-if="currStatus==='edit'">创建活动</el-button> -->
                    <!-- <el-button  @click="createAct=true" type="primary">查看详情</el-button> -->
                    <el-button  @click="subApplication(1)" type="success" v-if="currStatus==='pending'" :disabled='selectedArr.length===0'>审核通过</el-button>
                    <el-button  @click="subApplication(-1)" type="warning" v-if="currStatus==='pending'" :disabled='selectedArr.length===0'>审核不通过</el-button>
                     <!-- <el-button  @click="showSite()" type="primary" v-if="currStatus==='upcoming'" :disabled='selectedArr.length===0'>查看场地申请</el-button>
                     <el-button  @click="finAppli=true" type="primary" v-if="currStatus==='approved'" :disabled='selectedArr.length===0'>查看报账申请</el-button> -->
                    <el-button  @click="remark = true" type="success" v-if="currStatus==='completed'" :disabled='selectedArr.length===0'>评分</el-button>
                    
                </div>
                 <el-table :data="activityData" border height="380" fit  @selection-change="handleSelectionChange" :default-sort = "{prop: 'score', order: 'descending'}">
                    <el-table-column type="selection" width="55">
                    </el-table-column>
                    <el-table-column prop="name" label="活动名称" width="140" sortable>
                    </el-table-column>
                    <el-table-column prop="society" label="举办社团" width="120" sortable>
                    </el-table-column>
                    <el-table-column prop="time" label="举办时间" sortable>
                    </el-table-column>
                    <el-table-column prop="site" label="举办地点">
                    </el-table-column>
                    <el-table-column prop="status" label="状态" :formatter="formatStatus">
                    </el-table-column>
                     <el-table-column prop="people" label="参加人数" sortable>
                    </el-table-column>
                     <el-table-column prop="score" v-if="currStatus==='completed'" label="活动评分" sortable>
                    </el-table-column>
                     <el-table-column label=操作>
                       <template slot-scope="scope">
                        <el-button  @click="showDetail(scope.row)" type="text" size="small">查看详情</el-button>
                       </template>
                    </el-table-column>
                </el-table>
                <!-- 活动详情dialog -->
                <el-dialog title="活动详情" :visible.sync="showDetailer">
                  <el-form :model="form">
                    <el-form-item label="活动名称" label-width="100px">
                      <span>{{form.name}}</span>
                    </el-form-item>
                     <el-form-item label="举办社团" label-width="100px">
                      <span>{{form.society}}</span>
                    </el-form-item>
                    <el-form-item label="时间" label-width="100px">
                      <span>{{form.time}}</span>
                    </el-form-item>
                    <el-form-item label="地址" prop="site" label-width="100px">
                      <span>{{form.site}}</span>
                    </el-form-item>
                    <el-form-item label="参与人数" prop="people" label-width="100px">
                       <span>{{form.people}}</span>
                    </el-form-item>
                    <el-form-item label="主要内容" prop="content" label-width="100px">
                       <span>{{form.content}}</span>
                    </el-form-item>
                  </el-form>
                  <div slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="showDetailer = false">关 闭</el-button>
                    <!-- <el-button type="primary" v-if="!isedit" @click="create()">确 定</el-button> -->
                  </div>
                </el-dialog>

                <el-dialog title="场地申请" :visible.sync="siteAppli">
                  <el-form :model="siteform">
                    <el-form-item label="举办时间" label-width="100px">
                          <span>{{siteform.time}}</span>
                        </el-form-item>
                    <el-form-item label="举办地点" label-width="100px">
                      <span>{{siteform.site}}</span>
                    </el-form-item>
                  </el-form>
                  <div slot="footer" class="dialog-footer">
                    <el-button @click="siteAppli = false">取 消</el-button>
                    <el-button type="primary" @click="subSite()">确 定</el-button>
                  </div>
                </el-dialog>

                <el-dialog title="账单详情" :visible.sync="finAppli">
                  <el-form :model="finform">
                     <el-form-item label="报账总价" label-width="100px">
                      540 元
                    </el-form-item>
                    <el-form-item label="清单" label-width="100px">
                      宣传海报：20x10、 奖品：340
                    </el-form-item>
                  </el-form>
                  <div slot="footer" class="dialog-footer">
                    <el-button @click="finAppli = false">不通过</el-button>
                    <el-button type="primary" @click="subFin()">通过报账</el-button>
                  </div>
                </el-dialog>

                <el-dialog title="评分" :visible.sync="remark">
                  <el-form :model="markform">
                     <el-form-item label="分数" label-width="100px">
                      <el-input v-model="markform.score" auto-complete="off">
                        <template slot="append">分</template>
                      </el-input>
                    </el-form-item>
                  </el-form>
                  <div slot="footer" class="dialog-footer">
                    <el-button @click="remark = false">取 消</el-button>
                    <el-button type="primary" @click="mark()">确 定</el-button>
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
      date1: '',
      date2: '',
      date3: '',
      date4: '',
      showDetailer: false,
      siteAppli: false,
      finAppli: false,
      remark: false,
      form: {
        name: '电脑义诊',
        status: 0,
        society_id: '',
        site: '10栋楼下',
        people: '500',
        time: '2018-7-11 10:00',
        score: '',
        society: '计算机协会',
        content: '电脑义诊是我们计算机协会举办的标志性活动，每个月定期举办一次为同学们的电脑免费做保养，广受同学的喜爱'
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
      isedit: false, // 是否编辑
      markform: {
        score: ''
      }
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
            methodname: 'query',
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
    statusHash () {
      return {
        'pending': '0',
        'upcoming': '1',
        'approved': '-1',
        'completed': '2'
      }
    },
    create () {
      // 创建活动
      var params = this.form
      params.methodname = 'add'
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
    subApplication (status) {
      // 提交申请
      var msg = status === 1 ? '确认审核通过活动？' : '确认审核不通过活动？'
      this.$confirm(msg)
        .then(_ => {
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
        })
        .catch(_ => {})
    },
    mark (score) {
      // 评分
      if (this.selectedArr[0].score !== '' && this.selectedArr[0].score !== undefined) {
        this.$message.error('该活动已评分')
        return
      }
      axios
        .get('swpu_act', {
          params: {
            methodname: 'updataScore',
            score: this.markform.score,
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
      var params = this.siteform
      params.methodname = 'add'
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
    showSite () {
      this.siteAppli = true
    },
    formatStatus (row) {
      return row.status === 0 ? '待审核' : row.status === 1 ? '待举办' : row.status === 2 ? '已完成' : '未通过'
    },
    showDetail (row) {
      this.form = row
      this.showDetailer = true
    }
  },
  created () {
    this.queryData()
    // this.querysociety()
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