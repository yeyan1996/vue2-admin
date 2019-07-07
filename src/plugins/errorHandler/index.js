import { report } from "./report";
import { isPromise, formatErrorQuery } from "./helper";

let vuexRegistered = false;

// 可以自定义错误逻辑，发送日志等
const errorHandler = (err, vm, info) => {
  // console.error(err);
  // console.error(vm);
  // console.error(info);

  // 同步错误，发送错误的行列以及其他错误信息，用于服务端对 sourcemap 处理
  // 异步错误目前只能返回错误信息，不支持行列
  let { line, column } = formatErrorQuery({ stack: err.stack });
  report({
    name: vm.$route && vm.$route.name,
    err,
    line,
    column,
    info,
    from: "errorHandler",
    message: err.message
  });
};

const handleAsyncFunction = (asyncFunctionObj, vm, info) => {
  Object.keys(asyncFunctionObj).forEach(key => {
    let method = asyncFunctionObj[key];
    asyncFunctionObj[key] = function(...args) {
      let res = method.call(this, ...args);
      return isPromise(res)
        ? res.catch(err => errorHandler(err, vm, `${info} '${key}'`))
        : res;
    };
  });
};

const registerVuex = vm => {
  if (!vm.$store || !vm.$store._actions) return;
  handleAsyncFunction(vm.$store._actions, vm, `vuex action error,action name:`);
  vuexRegistered = true;
};

const registerGlobalErrorCapture = () => {
  window.onerror = function(message, source, line, column, err) {
    if (!err) return false;
    let { name } = formatErrorQuery({
      stack: err.stack,
      name: source
    });
    report({
      name,
      err,
      line,
      column,
      info: message,
      from: "onerror"
    });
    return true;
  };
};

// 捕获 methods 中 async 函数的错误，省去 try/catch
// 同时支持 vuex
export default {
  install(Vue) {
    registerGlobalErrorCapture();
    Vue.config.errorHandler = errorHandler;
    Vue.mixin({
      beforeCreate() {
        if (!vuexRegistered) registerVuex(this);
      }
    });
  }
};
