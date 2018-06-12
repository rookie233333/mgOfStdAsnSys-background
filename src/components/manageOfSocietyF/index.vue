<template>
    <el-container>
        <el-main>
            <div class="my-container">
                 <el-table :data="societyData" border height="380" fit :default-sort = "{prop: 'fees', order: 'descending'}">
                    <el-table-column prop="name" label="名称">
                    </el-table-column>
                    <el-table-column prop="discribe" label="社团简介" width="290">
                    </el-table-column>
                    <el-table-column prop="average_score"  label="总分">
                    </el-table-column>
                    <el-table-column prop="member" label="会员人数">
                    </el-table-column>
                    <el-table-column prop="fees" sortable label="会费">
                    </el-table-column>
                    <el-table-column label="操作">
                      <template slot-scope="scope">
                        <el-button  type="text" size="small" @click="changeFin(scope.row)">收入</el-button>
                        <el-button type="text" size="small" @click="changeFin1(scope.row)">支出</el-button>
                      </template>
                    </el-table-column>
                </el-table>

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
                </el-dialog> -->

                <el-dialog :title="atitle" :visible.sync="finAppli">
                  <el-form :model="finform">
                     <el-form-item label="价格" label-width="100px">
                      <el-input v-model="finform.price" auto-complete="off">
                        <template slot="append">元</template>
                      </el-input>
                    </el-form-item>
                    <el-form-item label="明细" label-width="100px">
                      <el-input type="textarea" v-model="finform.content" row="5" auto-complete="off"></el-input>
                    </el-form-item>
                  </el-form>
                  <div slot="footer" class="dialog-footer">
                    <el-button @click="finAppli = false">取 消</el-button>
                    <el-button type="primary" @click="subFin()">确 定</el-button>
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
      currStatus: this.$route.query.status,
      // createAct: false,
      form: {
        name: '',
        discribe: '',
        people: '',
        fees: ''
      },
      finform: {
        price: ''
      },
      finAppli: false,
      tHead: '',
      row: {},
      atitle: ''
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
    changeFin (row) {
      this.row = row
      this.tHead = 'in'
      this.finAppli = true
      this.atitle = '收入'
    },
    changeFin1 (row) {
      this.row = row
      this.tHead = 'out'
      this.finAppli = true
      this.atitle = '支出'
    },
    subFin () {
      var r = this.tHead === 'in' ? (this.row.fees + +this.finform.price) : (this.row.fees - +this.finform.price)
      axios
        .get('swpu_society', {
          params: {
            methodname: 'updataFees',
            fees: r,
            id: this.row.id
          }
        })
        .then(data => {
          this.$message({
            type: 'success',
            message: '更新会费成功'
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