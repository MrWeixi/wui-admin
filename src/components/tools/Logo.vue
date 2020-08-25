<template>
  <div class="logo">
    <router-link :to="{ path: '/' }">
      <LogoSvg alt="logo" />
    </router-link>
    <h2>{{ title }}</h2>
  </div>
</template>

<script>
import LogoSvg from "@/assets/logo.svg?inline";

export default {
  name: "Logo",
  components: {
    LogoSvg
  },
  props: {
    title: {
      type: String,
      default: "前端圈",
      required: false
    },
    showTitle: {
      type: Boolean,
      default: true,
      required: false
    }
  }
};
</script>
<style lang="less">
.logo {
  display: flex;
  h2 {
    color: #fff;
    margin-left: 25px;
  }
}
</style>
