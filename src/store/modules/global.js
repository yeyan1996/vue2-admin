//全局的公共数据

import * as type from "../mutations-type";
const pageSize = require("../../config.json");

const state = {
  pageSize: pageSize
};

const actions = {};

const mutations = {
  [type.SAVE_PAGE_SIZE](state, { pageSize }) {
    state.pageSize = pageSize;
  }
};

export default {
  state,
  actions,
  mutations
};
