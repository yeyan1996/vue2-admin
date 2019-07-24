//自动注册路由
const files = require.context(".", false, /\.js$/);

let configRoutes = [];
/**
 * inject routers
 */
files
  .keys()
  .filter(key => key !== "./index.js")
  .forEach(key => {
    configRoutes = configRoutes
      .concat(files(key).default)
      .sort((a, b) => (a.sort ? a.sort - b.sort : -1)); // 读取出文件中的default模块
  });

export default configRoutes; // 抛出一个Vue-router期待的结构的数组
