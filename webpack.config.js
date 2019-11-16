const { resolve } = require("path");

exports.IS_TEST = process.env.VUE_APP_BUILD_ENV === "stage"; // 测试环境
exports.IS_PRODUCTION = process.env.NODE_ENV !== "development"; // 非开发环境
exports.DLL_DIR = resolve(__dirname, ".dll");
