<template>
  <div class="main-box">
    <div class="left">
      <ul class="left-list">
        <li v-for="item in menu_items" class="list-item">
          <router-link :class="{active:currOpt==item.opt}" :to="{path:currMenu,query:{opt:item.opt}}">
            <span>{{item.name}}</span>
          </router-link>
        </li>
      </ul>
    </div>
    <div class="right">
      <router-view></router-view>
    </div>
  </div>
</template>   

<script>
export default {
  name: 'v-main',
  data () {
    return {
      currMenu: this.$route.path,
      currOpt: this.$route.query.opt,
      menu_items: [
        {
          name: this.modelHash()[this.$route.path][0],
          opt: 'ct'
        },
        {
          name: this.modelHash()[this.$route.path][1],
          opt: 'mg'
        }
      ]
    }
  },
  watch: {
    $route (to, from) {
      this.currMenu = to.path
      this.menu_items[0].name = this.modelHash()[this.$route.path][0]
      this.menu_items[1].name = this.modelHash()[this.$route.path][1]
      if (this.$route.query.opt === undefined) {
        this.$router.push({
          path: this.currMenu,
          query: { opt: this.menu_items[0].opt }
        })
      }
    }
  },
  methods: {
    modelHash () {
      return {
        '/activity': ['创建活动', '管理活动'],
        '/office': ['创建办事流程', '管理办事流程'],
        '/mark': ['查看部门评分', '查看社团评分'],
        '/manage': ['管理会员', '管理管理员']
      }
    }
  }
}
</script>

<style lang="less" scoped>
@import 'mainPart.less';
</style>
