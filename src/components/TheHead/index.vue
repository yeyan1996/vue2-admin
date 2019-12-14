<template>
  <header id="the-head">
    <span>这是一个标题</span>
  </header>
</template>

<script>
export default {
  name: "the-head"
};
</script>

<style lang="scss" scoped>
#the-head {
  background: #409eff;
  height: $height-head;
  line-height: $height-head;
  color: white;
  padding-left: 30px;
}
</style>
