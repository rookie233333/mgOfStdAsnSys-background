<template>
  <div class="index">
    <v-header v-if="role === '2'"></v-header>
    <v-header-so v-if="role === '1'"></v-header-so>
    <v-header-ass v-if="role === '3'"></v-header-ass>
    <v-main-part></v-main-part>
  </div>
</template>

<script>
export default {
  name: 'index',
  data () {
    return {
      role: JSON.parse(window.localStorage.getItem('userInfo')).userType // 1是社团2是社团联3超级
    }
  }
  // methods: {
  //   show () {
  //     console.log(JSON.parse(window.localStorage.getItem('userInfo')))
  //   }
  // }
}
</script>

<style lang="less">
@import 'index.less';
</style>
