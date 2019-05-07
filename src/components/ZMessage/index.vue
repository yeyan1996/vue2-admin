<template>
  <transition name="fadeDown">
    <p class="message" v-if="value">{{ value }}</p>
  </transition>
</template>

<script>
export default {
  name: "z-message",
  data() {
    return {
      value: ""
    };
  },
  methods: {
    close() {
      this.value = "";
    }
  }
};
</script>

<style lang="scss">
.message {
  position: fixed;
  top: 30px;
  width: 400px;
  height: 50px;
  line-height: 50px;
  background-color: #409eff;
  color: white;
  border-radius: 10px;
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
  font-size: 15px;
}

.fadeDown-enter,
.fadeDown-leave-to {
  opacity: 0;
  top: 0;
}

.fadeDown-enter-to {
  opacity: 1;
}

.fadeDown-enter-active,
.fadeDown-leave-active {
  transition: all 1s;
}
</style>
