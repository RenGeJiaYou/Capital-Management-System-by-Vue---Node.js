<template>
  <div>
    <HeaderNav></HeaderNav>
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