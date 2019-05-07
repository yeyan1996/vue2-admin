<template>
  <svg class="svg-icon" aria-hidden="true" @click="handleClick">
    <use :xlink:href="iconName" />
  </svg>
</template>

<script>
export default {
  name: "base-icon",
  props: {
    name: {
      type: String,
      required: true
    }
  },
  computed: {
    iconName() {
      return `#icon-${this.name}`;
    }
  },
  methods: {
    handleClick(e) {
      this.$emit("click", e);
    }
  }
};
</script>

<style lang="scss" scoped>
.svg-icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>
