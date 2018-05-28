<template>
<div style="width:100%">
    <div class="header-bar row">
        <div class="logo-box col-md-4">
            <router-link to='/activity'>
                SWPU学生社团管理系统
            </router-link>
          </div>
          <div class="nav-bar-box col-md-8">
              <div class="header-rt">
                    <router-link to='/personal'>
                        <i class="icon-personal"></i>
                        <span>超级管理员</span>
                    </router-link>
              </div>
                <ul class="nav-bar">
                    <li>
                        <router-link :class="{'active':currModule=='activity'}" to='/activity'>
                            <span class="icon-activity">活动中心</span>
                        </router-link>
                    <li>
                        <router-link :class="{'active':currModule=='office'}" to='/office'>
                            <span class="icon-work">办事大厅</span>
                        </router-link>
                    </li>
                    <li>
                        <router-link :class="{'active':currModule=='mark'}" to='/mark'>
                            <span class="icon-mark">评分系统</span>
                        </router-link>
                    </li>
                    <li>
                        <router-link :class="{'active':currModule=='manage'}" to='/manage'>
                            <span class="icon-manage">管理中心</span>
                        </router-link>
                    </li>
                    <li>
                        <router-link :class="{'active':currModule=='message'}" to='/message'>
                            <span class="icon-message">留言中心</span>
                        </router-link>
                    </li>
                     <li>
                        <router-link :class="{'active':currModule=='notic'}" to='/notic'>
                            <span class="icon-notic">公告</span>
                        </router-link>
                    </li>
                </ul>
          </div>
  </div>
</div>
  
</template>

<script>
export default {
  data () {
    return {
      currModule: this.$route.path.split('/')[0]
    }
  },
  method: {
    show () {
      debugger
      alert(this.$route)
    }
  }
}
</script>

<style lang="less" scoped>
@import "header.less";
</style>
