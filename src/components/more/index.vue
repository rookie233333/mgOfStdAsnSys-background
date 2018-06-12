<template>
    <div class="container">
        <div class="center">
            <el-button size="medium" type="primary" @click="notic = true">发布公告</el-button>
            <el-button size="medium" type="success" @click="goToAhead()">前台快速导航</el-button>
        </div>
        <el-dialog title="发布公告" :visible.sync="notic">
                  <el-form :model="form">
                     <el-form-item label="公告标题" label-width="100px">
                      <el-input v-model="form.price" auto-complete="off">
                      </el-input>
                    </el-form-item>
                    <el-form-item label="内容" label-width="100px">
                      <el-input type="textarea" v-model="form.price" row="10" auto-complete="off"></el-input>
                    </el-form-item>
                  </el-form>
                  <div slot="footer" class="dialog-footer">
                    <el-button @click="notic = false">取 消</el-button>
                    <el-button type="primary" @click="subFin()">发布</el-button>
                  </div>
                </el-dialog>
    </div>
</template>
<script>
export default {
  data () {
    return {
      form: {
        title: '',
        content: ''
      },
      notic: false
    }
  },
  methods: {
    goToAhead () {
      var routeData = this.$router.resolve({path: '/home/index'})
      window.open(routeData.href, '_blank')
    }
  }
}
</script>

<style lang="less" scoped>
.container {
  .center {
    width: 300px;
    height: 140px;
    border: 1px solid #ccc;
    margin: 200px auto;
    line-height: 140px;
    border-radius: 5px;
    box-shadow: 10px 20px;
  }
}
</style>

