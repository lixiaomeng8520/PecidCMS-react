import { message } from 'antd';
import axios from 'axios';

function api(method, url, data, callback) {
    axios({
        method,
        url,
        data,
    })
        .then(function (response) {
            if (response.data.code === 0) {
                message.error(response.data.msg);
            }
            callback !== undefined && callback(response.data);
        })
        .catch(function (error) {});
}

export function get(url, data, callback) {
    api('get', url, data, callback);
}

export function post(url, data, callback) {
    api('post', url, data, callback);
}
