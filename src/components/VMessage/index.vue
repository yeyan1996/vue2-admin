<template>
  <transition name="fadeDown" @after-leave="handleAfterLeave">
    <p class="message" v-if="value">{{ value }}</p>
  </transition>
</template>

<script>
export default {
  name: "v-message",
  data() {
    return {
      value: "",
      duration: 3000,
      timer: null //后续可以取消定时器
    };
  },
  methods: {
    close() {
      this.value = "";
    },
    startTimer() {
      this.timer = setTimeout(() => {
        this.close();
      }, Number(this.duration));
    },
    handleAfterLeave() {
      // 监听动画结束事件，删除空注释节点
      this.$el.parentNode.removeChild(this.$el);
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
