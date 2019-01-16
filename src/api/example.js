import axios from 'util/axios'

export function testApi(query) {
    return axios({
        url: 'http://localhost:8070/table.json',
        method: 'get',
        params: query
    })
}

export function postForm(query) {
    return axios({
        url: 'http://localhost:8070/table.json',
        method: 'post',
        data:query
    })
}