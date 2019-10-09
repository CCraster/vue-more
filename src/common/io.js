/**
 * @author: Craster
 * @date: 20190917
 * @description: 通用io函数
 */
import axios from 'axios';
import { Message } from 'element-ui';

axios.defaults.headers.common['Authorization'] =
    'token ba3a1e6ed492de21ee63de53400f8ccf2a08663e';

/* 通用fetch函数 */
export function fetch({ url, data, method }) {
    // let headers = {
    //     token: '7edb10d69ef025d34c31a067176b58a3d4e4251c'
    // };
    return axios[method || 'post'](url, data)
        .then(res => {
            console.log(res);
            return res;
        })
        .catch(err => {
            Message.error(err);
            console.log(err);
        });
}
