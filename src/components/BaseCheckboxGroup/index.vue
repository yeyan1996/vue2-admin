<template>
  <el-checkbox-group v-bind="$attrs" :value="value" v-on="$listeners">
    <el-checkbox
      v-for="item in $attrs.options"
      :key="item.value || item.label"
      :disabled="item.disabled"
      :label="item.value || item.label"
    >
      {{ item.label }}
    </el-checkbox>
  </el-checkbox-group>
</template>
<script>
export default {
  name: "base-checkbox-group",
  data() {
    return {};
  },
  props: {
    value: {
      default: () => []
    }
  }
};
</script>
