<template>
  <div class="main-box">
    <div class="left">
      <ul class="left-list">
        <li v-for="item in menu_items" class="list-item">
          <router-link :class="{active:currOpt==item.opt}" :to= "{path:currMenu,query:{opt:item.opt}}">
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
      currMenu: this.$route.path.split('/')[0],
      currOpt: this.$route.query.opt,
      menu_items: [
        {
          name: '创建活动',
          herf: this.$route.path.split('/')[1] + '/ct',
          opt: 'ct'
        },
        {
          name: '管理活动',
          herf: this.$route.path.split('/')[1] + '/mg',
          opt: 'mg'
        }
      ]
    }
  },
  watch: {
    '$route' (to, from) {
      this.currMenu = to.path
    },
    currMenu: function (to, from) {
      this.menu_items[0].herf = this.currMenu + '/ct'
      this.menu_items[1].herf = this.currMenu + '/mg'
    }
  }
}
</script>

<style lang="less" scoped>
@import 'mainPart.less';
</style>
