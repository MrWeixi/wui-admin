<template>
  <div>
  <a-button type="" @click="data">弹框</a-button>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {};
  },
  mounted() {},
  watch: {},
  methods: {
    data() {
        this.CompareDate('2020-5-8','2020-5-9')
        console.log(this.CompareDate('2020-5-8','2020-5-9'));
    },
    CompareDate(d1, d2) {
      return new Date(d1.replace(/-/g, "/")) > new Date(d2.replace(/-/g, "/"));
    }
  }
};
</script>

<style scoped lang="less">
</style>
