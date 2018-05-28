<template>
    <el-container>
        <el-header height="95px">
            <a href="javascript:;" class="logo">
                <img src="../../common/images/swpu_logo.png" title="西南石油大学">
            </a>
        </el-header>
        <el-main>
            <div class="article-title">
                <h3>{{docData.name}}</h3>
                <div class="detail">
                    <div>
                        <span>举办部门：{{docData.department_name}}</span>
                    </div>
                    <div>
                        <span>发布人：{{docData.user_name}}</span>
                    </div>
                </div>
            </div>
            <div class="article">
                <p class="abstract">【摘要】{{docData.description}}</p>
                <P>{{docData.content}}</P>
            </div>
            <div class="info">
                <div>
                    <span>地址：{{docData.site}}</span>
                </div>
                <div>
                    <span>时间：{{docData.time}}</span>
                </div>
            </div>
        </el-main>
    </el-container>
</template>
<script>
import axios from 'axios'
export default {
  data () {
    return {
      docData: {}
    }
  },
  methods: {
    queryDocById (id) {
      axios
        .get('swpu_activity', {
          params: {
            methodname: 'queryList',
            id: id
          }
        })
        .then(data => {
          this.docData = data.data.DATA[0]
        })
        .catch(err => {
          this.$message.error(err.MSG)
        })
    }
  },
  watch: {
    $route (to, from) {
      this.queryDocById(to.query.docid)
    }
  },
  created () {
    this.queryDocById(this.$route.query.docid)
  }
}
</script>

<style lang="less">
@import 'doc.less';
</style>

