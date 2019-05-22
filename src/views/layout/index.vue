<!--首页布局组件-->
<template>
  <article id="layout">
    <the-head></the-head>
    <router-view></router-view>
  </article>
</template>

<script>
import TheHead from "@/components/TheHead";

export default {
  name: "layout",
  components: {
    TheHead
  }
};
</script>
