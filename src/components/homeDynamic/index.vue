<template>
    <div class="container">
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
</template>
<script>
import axios from 'axios'
export default {
  data () {
    return {
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
    }
  },
  created () {
    this.queryData()
  }
}
</script>

<style lang="less">
@import '../homeIndex/homeIndex.less';
</style>

