// 可以自定义错误逻辑，发送日志等
const errorHandler = (err, vm, info) => {
  console.error(err);
  console.error(vm);
  console.error(info);
};

const isPromise = promise =>
  Object.prototype.toString.call(promise) === "[object Promise]";

let isRegistered = false;

const registerVue = vm => {
  if (isRegistered) return;
  let methods = vm.$options.methods || {};
  Object.keys(methods).forEach(key => {
    let method = methods[key];
    methods[key] = function(...args) {
      let res = method.call(vm, ...args);
      return isPromise(res)
        ? res.catch(err =>
            errorHandler(
              err,
              vm,
              `promise method error,method name:'${method.name}'`
            )
          )
        : res;
    };
  });
};

const registerVuex = vm => {
  if (isRegistered) return;
  if (!vm.$store || !vm.$store._actions) return;
  Object.keys(vm.$store._actions).forEach(key => {
    vm.$store._actions[key] = vm.$store._actions[key].map(func => (...args) => {
      let res = func.call(vm.$store, ...args);
      return isPromise(res)
        ? res.catch(err =>
            errorHandler(
              err,
              vm.$store,
              `vuex action error,action name:'${key}'`
            )
          )
        : res;
    });
  });
};

// 捕获 methods 中 async 函数的错误，省去 try/catch
// 同时支持 vuex
export default {
  install(Vue) {
    Vue.config.errorHandler = errorHandler;
    Vue.mixin({
      beforeCreate() {
        registerVuex(this);
        registerVue(this);
        // 防止多次注册导致性能问题
        isRegistered = true;
      }
    });
  }
};
