<template>
  <div>
    <a-cascader
      :field-names="names"
      :options="codeData"
      change-on-select
      :placeholder="place"
      :changeOnSelect="true"
      @change="onChange"
    />
  </div>
</template>
<script>
import { getCode } from "@/api/index";
export default {
  components: {},
  props: {
    place: {
      type: String,
      default: "请选择"
    },
    names: {
      type: Object,
      default: () => {
        return {
          label: "name",
          value: "code",
          children: "children"
        };
      }
    }
  },
  data() {
    return {
      codeData: []
    };
  },
  mounted() {},
  created() {
    this.getDataList();
  },
  watch: {},
  methods: {
    async getDataList() {
      await getCode().then(res => {
        this.codeData = res;
      });
    },
    onChange(val) {
      this.$emit('cityCode',val)
    }
  }
};
</script>

<style scoped lang="less">
/deep/ .ant-input {
  border-radius: 50px;
}
</style>
