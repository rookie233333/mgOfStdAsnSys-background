<template>
    <el-container>
        <el-aside width="250px" style="background-color: rgb(238, 241, 246)">
        <el-menu :router = "true" >
                <!-- <el-menu-item index="evapp?status=edit"><i class="el-icon-edit"></i>待编</el-menu-item> -->
                <el-menu-item index="mgsoc?status=view"><i class="el-icon-time"></i>查看社团列表</el-menu-item>  
                <el-menu-item index="mgsoc?status=create"><i class="el-icon-edit-outline"></i>创建社团</el-menu-item>
                <!-- <el-menu-item index="mgsoc?status=ctapply"><i class="el-icon-circle-check-outline"></i>社团创办申请</el-menu-item> -->
                <!-- <el-menu-item index="mgsoc?status=deapply"><i class="el-icon-message"></i>社团注销申请</el-menu-item> -->
            </el-menu>
        </el-aside>
        <el-main>
            <div class="my-container">
                 <el-table :data="societyData" border height="380" fit v-if="currStatus !== 'create'" :default-sort = "{prop: 'average_score', order: 'descending'}">
                    <el-table-column prop="name" label="名称">
                    </el-table-column>
                    <el-table-column prop="discribe" v-if="currStatus === 'view'" label="社团简介" width="290">
                    </el-table-column>
                    <el-table-column prop="average_score" sortable v-if="currStatus === 'view'" label="总分">
                    </el-table-column>
                    <el-table-column prop="member" v-if="currStatus === 'view'" sortable label="会员人数">
                    </el-table-column>
                    <el-table-column prop="fees" v-if="currStatus === 'view'" sortable label="会费">
                    </el-table-column>
                    <el-table-column prop="activity_num" v-if="currStatus === 'view'" label="举办活动">
                    </el-table-column>
                    <el-table-column prop="content" v-if="currStatus !== 'view'" label="描述">
                    </el-table-column>
                    <el-table-column label="操作">
                      <template slot-scope="scope">
                        <el-button v-if="currStatus !== 'view'" type="text" size="small">同意</el-button>
                        <el-button v-if="currStatus !== 'view'" type="text" size="small">打回</el-button>
                        <el-button v-if="currStatus == 'view'"  type="text" size="small" @click="showDetail(scope.row)">社团详情</el-button>
                        <el-button v-if="currStatus === 'view'" type="text" size="small" @click="deleteItem(scope.row)">删除社团</el-button>
                      </template>
                    </el-table-column>
                </el-table>
                <!-- 创建活动社团 -->
                  <el-form :model="cForm" v-if="currStatus === 'create'">
                    <el-form-item label="社团名称" label-width="100px">
                      <el-input v-model="cForm.name" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="会费" label-width="100px">
                      <el-input v-model="cForm.fees" auto-complete="off"></el-input>
                    </el-form-item>
                    <!-- <el-form-item label="会员人数" prop="people" label-width="100px">
                      <el-input v-model="form.people"></el-input>
                    </el-form-item> -->
                    <el-form-item label="简介"  label-width="100px">
                      <el-input type="textarea" v-model="cForm.discribe" row="5"></el-input>
                    </el-form-item>
                      <el-button type="primary" @click="createSociety()">创 建</el-button>
                  </el-form>
                   <!-- 社团详情dialog -->
                <el-dialog title="社团详情" :visible.sync="showDetailer">
                  <el-form :model="form">
                    <el-form-item label="社团名称" label-width="100px">
                      <span>{{form.name}}</span>
                    </el-form-item>
                     <el-form-item label="社团简介" label-width="100px">
                      <span>{{form.discribe}}</span>
                    </el-form-item>
                    <el-form-item label="会员数" label-width="100px">
                      <span>{{form.member}}</span>
                    </el-form-item>
                    <el-form-item label="会费" prop="site" label-width="100px">
                      <span>{{form.fees}}</span>
                    </el-form-item>
                    <el-form-item label="活动举办数" prop="people" label-width="100px">
                       <span>{{form.activity_num}}</span>
                    </el-form-item>
                    <el-form-item label="平均分" prop="content" label-width="100px">
                       <span>{{form.average_score}}</span>
                    </el-form-item>
                  </el-form>
                  <div slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="showDetailer = false">关 闭</el-button>
                    <!-- <el-button type="primary" v-if="!isedit" @click="create()">确 定</el-button> -->
                  </div>
                </el-dialog>
                <!-- <el-dialog title="提交场地申请" :visible.sync="siteAppli">
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
                    <el-button type="primary" @click="subFin()">确 定</el-button>
                  </div>
                </el-dialog> -->
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
      currStatus: this.$route.query.status,
      // createAct: false,
      form: {
        name: '',
        discribe: '',
        people: '',
        fees: ''
      },
      cForm: {
        name: '',
        discribe: '',
        fees: '',
        group_id: 1,
        average_score: 0
      },
      showDetailer: false
    }
  },
  methods: {
    queryData () {
      axios
        .get('swpu_society', {
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
    showDetail (row) {
      this.form = row
      this.showDetailer = true
    },
    deleteItem (row) {
      this.$confirm('确认删除该社团')
        .then(_ => {
          axios
            .get('swpu_society', {
              params: {
                methodname: 'delete',
                id: row.id
              }
            })
            .then(data => {
              this.$message({
                type: 'success',
                message: '删除社团成功'
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
    createSociety () {
      var params = this.cForm
      params.methodname = 'add'
      axios
        .post('swpu_society', params)
        .then(data => {
          this.$message({
            type: 'success',
            message: '社团创建成功'
          })
          setTimeout(() => {
            this.$router.go(0)
          }, 2000)
        })
        .catch(err => {
          this.$message.error(err.MSG)
        })
    }
  },
  watch: {
    $route (to, from) {
      this.currStatus = to.query.status
      this.queryData()
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