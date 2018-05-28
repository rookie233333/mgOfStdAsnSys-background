<template>
    <el-container>
        <a href="/#/home/index" class="logo">
            <img src="../../common/images/swpu_logo.png" title="西南石油大学">
        </a>
        <el-header>
            <div class="header-center">
                <el-menu class="el-menu-demo" :default-active="activeIndex" mode="horizontal" background-color="#165f97" text-color="#fff" active-text-color="#ffd04b" @select="handleSelect">
                    <el-menu-item index="/home/index">首页</el-menu-item>
                    <el-menu-item index="/home/dynamic">最新动态</el-menu-item>
                    <el-menu-item index="/home/work">业务办理</el-menu-item>
                    <el-menu-item index="/home/mark?deptid=1">评分系统</el-menu-item>
                    <el-menu-item index="/home/message">留言中心</el-menu-item>
                </el-menu>
            </div>
        </el-header>
        <!-- <div class="marquee">
            <el-carousel :interval="4000" type="card" height="200px">
                <el-carousel-item v-for="item in 6" :key="item">
                </el-carousel-item>
            </el-carousel>
        </div> -->
        <!-- 主要内容 -->
        <el-main>
            <router-view></router-view>
        </el-main>
    </el-container>
</template>
<script>
export default {
  name: 'home',
  data () {
    return {
      activeIndex: this.$route.path
    }
  },
  methods: {
    handleSelect (key, keyPath) {
      console.log(key, keyPath)
      this.$router.push({
        path: key
      })
    }
  },
  watch: {
    $route (to, form) {
      this.activeIndex = to.path
    }
  }
}
</script>
<style lang="less" scoped>
@import 'home.less';
</style>


