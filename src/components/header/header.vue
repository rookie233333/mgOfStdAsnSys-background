<template>
      <div class="header-bar row">
          <div class="logo-box col-md-4">
              <router-link to='/swpu/activity'>
                SWPU学生社团管理系统
              </router-link>
          </div>
          <div class="nav-bar-box col-md-6 col-md-offset-2">
                <ul class="nav-bar">
                    <li class="active">
                        <router-link to='/swpu/activity'>
                            <span class="icon-activity">活动大厅</span>
                        </router-link>
                    <li>
                        <router-link to='/swpu/office'>
                            <span class="icon-work">办事大厅</span>
                        </router-link>
                    </li>
                    <li>
                        <router-link to='/swpu/mark'>
                            <span class="icon-mark">打分系统</span>
                        </router-link>
                    </li>
                    <li>
                        <router-link to='/swpu/manage'>                        
                            <span class="icon-manage">管理中心</span>
                        </router-link>
                    </li>
                </ul>
              <div class="header-rt">
                    <router-link to='/swpu/personal'>
                        <i class="icon-personal"></i>
                        <span>个人中心</span>
                    </router-link>
              </div>
          </div>
  </div>
</template>

<script>
// import Vue from "vue";
export default {
  name: 'header'
}
</script>

<style lang="less">
@import "header.less";
</style>
