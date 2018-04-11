<template>
      <div class="header-bar row">
          <div class="logo-box col-md-4">
              SWPU学生社团管理系统
          </div>
          <div class="nav-bar-box col-md-6 col-md-offset-2">
                <ul class="nav-bar">
                    <li class="active">
                        <span class="icon-activity">活动大厅</span>
                        </li>
                    <li>
                        <span class="icon-work">办事大厅</span>
                    </li>
                    <li>
                        <span class="icon-mark">打分系统</span>
                    </li>
                    <li>
                        <span class="icon-manage">管理中心</span>
                    </li>
                </ul>
              <div class="header-rt">
                  <i class="icon-personal"></i>
                  <span>个人中心</span>
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
// @import "../common.css";
@import "header.less";
</style>
