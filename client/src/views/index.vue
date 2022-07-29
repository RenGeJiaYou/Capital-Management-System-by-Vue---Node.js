<template>
  <div class="index">
    <HeaderNav></HeaderNav>
    <router-view></router-view>
  </div>
</template>

<script>
// @ is an alias to /src
import HeaderNav from "@/components/HeaderNav.vue";
export default {
  name: "home",
  components: {
    HeaderNav,
  },
};
</script>


<style>
.index {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
</style>