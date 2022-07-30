<template>
  <div class="index">
    <HeaderNav></HeaderNav>
    <LeftMenu></LeftMenu>
    <div class="rightContainer">
      <!--当左栏菜单的<router-link> 被点击后,to所指向的页面将会替换此处的 <router-view> -->
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import HeaderNav from "@/components/HeaderNav.vue";
import LeftMenu from "@/components/LeftMenu.vue";
export default {
  name: "home",
  components: {
    HeaderNav,
    LeftMenu,
  },
};
</script>


<style>
.index {
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.rightContainer {
  position: relative;
  margin-left: auto;
  width: 81%; /*设置左侧菜单width为20% */
  height: 100%;
  overflow: visible;
}
</style>