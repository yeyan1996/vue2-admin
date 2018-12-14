//全局的公共数据

import * as type from '../mutations-type'
import {PAGE_SIZE} from "../../config";

const state = {
    pageSize: PAGE_SIZE
}

const actions = {}

const mutations = {
    [type.SAVE_PAGE_SIZE](state, {pageSize}) {
            state.pageSize = pageSize
    }
}

export default {
    state,
    actions,
    mutations
}