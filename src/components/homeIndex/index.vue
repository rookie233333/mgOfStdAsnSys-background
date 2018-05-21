<template>
    <div class="container">
      <div class="left">
        <div class="card" v-for="d in departmentData">
          <el-card class="list-card" shadow="never" :body-style="{padding:'5px'}">
            <div class="score" title="评分">
              <i class="el-icon-star-off"></i>
              <span class="score-number">{{d.average_score}}</span>
            </div>
            <div class="department">
              <div class="title" :title="d.discribe">{{d.discribe}}</div>
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
        <div class="card" v-for="item in cardData">
            <el-card class="box-card" shadow="never" :body-style="{padding:'24px 20px'}">
                <div class="card-header">
                    <a href="www.baidu.com">{{item.name}}</a>
                </div>
                <div class="card-content">
                    {{item.description}}
                </div>
                <div class="card-footer">
                    <i class="el-icon-location-outline"></i>
                    <span class="site">{{item.site}}</span>
                    <i class="el-icon-date"></i>
                    <span class="time">{{item.time}}</span>
                </div>
            </el-card>
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
      cardData: []
    }
  },
  methods: {
    queryData () {
      axios
        .get('swpu_activity', {
          params: {
            methodname: 'queryList'
          }
        })
        .then(data => {
          this.cardData = data.data.DATA
        })
        .catch(err => {
          this.$message.error(err.MSG)
        })
    },
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
    }
  },
  created () {
    this.queryData()
    this.queryDepartment()
  }
}
</script>
<style lang="less" scoped>
@import 'homeIndex.less';
</style>

