import axios from 'util/axios'

export function fetchList(query) {
    return axios({
        url: '/article/list',
        method: 'get',
        params: query
    })
}

export function createArticle(query) {
    return axios({
        url: '/article/create',
        method: 'post',
        data:query
    })
}