<template>
  <el-select v-bind="$attrs" :value="value" v-on="$listeners">
    <el-option
      v-for="item in $attrs.options"
      :key="item.value"
      :label="item.label"
      :value="item.value"
    >
    </el-option>
  </el-select>
</template>
<script>
export default {
  name: "base-select",
  props: {
    value: {
      default: ""
    }
  }
};
</script>
