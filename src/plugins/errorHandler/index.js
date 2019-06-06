const errorHandler = (vm, info) => err => {
  console.error(err);
  console.error(vm);
  console.error(info);
};

const isPromise = promise =>
  Object.prototype.toString.call(promise) === "[object Promise]";

// 捕获 methods 中 async 函数的错误，省去 try/catch
// 不会捕获生命周期中的 async 函数错误，因为推荐将逻辑都写在 methods 中
export default {
  install(Vue) {
    Vue.config.errorHandler = errorHandler;
    Vue.mixin({
      beforeCreate() {
        let methods = this.$options.methods || {};
        Object.keys(methods).forEach(key => {
          let method = methods[key];
          methods[key] = function(...args) {
            let res = method.call(this, ...args);
            return isPromise(res)
              ? res.catch(
                  errorHandler(
                    this,
                    `promise method error,method name:'${method.name}'`
                  )
                )
              : res;
          };
        });
      }
    });
  }
};
