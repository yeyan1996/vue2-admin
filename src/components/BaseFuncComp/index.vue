<!--<template functional>-->
<!--<div>kakakak</div>-->
<!--</template>-->

<script>
export default {
  name: "base-func-comp",
  functional: true,
  render(createElement, ctx) {
    console.log(ctx);
    return ctx.children;
  }
};
</script>

<style lang="scss" scoped></style>
