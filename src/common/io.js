/**
 * @author: Craster
 * @date: 20190917
 * @description: 通用io函数
 */
import axios from 'axios';

/* 通用fetch函数 */
export function fetch({ url, data, method }) {
    return axios[method || 'post'](url, data)
        .then(res => {
            return res;
        })
        .catch(err => {
            console.log(err);
        });
}
