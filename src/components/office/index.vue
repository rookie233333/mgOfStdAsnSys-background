<template>
  <div class="activity-box">
    <div class="create-activity" v-if="getCurrModel() == 'ct'">
      创建
    </div>
    <div class="mg-activity" v-if="getCurrModel() == 'mg'">
      管理
    </div>
  </div>
</el-form>
</template>
<script>
  export default {
    data () {
      return {
        currModel: this.$parent.$route.query.opt
      }
    },
    methods: {
      getCurrModel () {
        return this.$parent.$route.query.opt
      }
    }
  }
</script>
<style lang="less">
@import '../activity/activity.less';
</style>
