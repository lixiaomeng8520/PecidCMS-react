import { message } from 'antd';
import axios from 'axios';

function api(method, url, data, callback, history) {
    const token = window.localStorage.getItem('token');

    let headers = {};
    if (token !== null) {
        headers.Authorization = 'Bearer ' + JSON.parse(token);
    }

    axios({
        method,
        url,
        data,
        headers: headers,
    })
        .then(function (response) {
            if (response.data.code === 0) {
                message.error(response.data.msg);
            } else if (response.data.code === 2) {
                history.push('/login');
                return;
            }
            callback !== undefined && callback(response.data);
        })
        .catch(function (error) {});
}

export function get(url, data, callback, history) {
    api('get', url, data, callback, history);
}

export function post(url, data, callback, history) {
    api('post', url, data, callback, history);
}
