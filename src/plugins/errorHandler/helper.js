export const formatErrorQuery = ({ stack, name }) => {
  const DEFAULT = {
    line: null,
    column: null,
    name
  };

  try {
    const firstLineReg = /\n(.*)/; // 找到第一行
    const reg = /\/(.*):(\d+):(\d+)/; // 找到行列和文件名

    let firstLine = stack.match(firstLineReg)[1] || "";
    let index = firstLine.lastIndexOf("/");
    let filePath = firstLine.slice(index);
    let matchResult = filePath.match(reg);
    let line = matchResult[2] || "";
    let column = matchResult[3] || "";
    if (name) {
      // window.onerror
      // 获得最后一个 / 后面的内容
      name = name.match(/[^/]+(?!.*\/)/g)[0];
    } else {
      // Vuex errorHandler
      name = matchResult[1] || "";
    }

    return {
      line,
      column,
      name
    };
  } catch (e) {
    return DEFAULT;
  }
};

export const isPromise = promise =>
  Object.prototype.toString.call(promise) === "[object Promise]";
