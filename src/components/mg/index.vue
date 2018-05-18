<template>
  <div class="activity-box">
    <div class="create-activity" v-if="getCurrModel() == 'ct'">
      <el-table :data="tableData" height="500" fit border style="width: 100%;text-align:left;">
        <el-table-column type="index" label="序号">
        </el-table-column>
        <el-table-column prop="name" label="部门名称" sortable>
        </el-table-column>
        <el-table-column prop="discribe" label="部门简介">
        </el-table-column>
        <el-table-column prop="average_score" label="分数" sortable>
        </el-table-column>
        </el-table-column>
        <el-table-column prop="department_name" label="操作">
        </el-table-column>
      </el-table>
    </div>
    <div class="mg-actixity" v-if="getCurrModel() == 'mg'">

    </div>
  </div>
</template>
<script>
export default {
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

