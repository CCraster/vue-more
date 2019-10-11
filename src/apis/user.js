import request from '@/common/request';
// import store from '@/store/';

export default {
    verifyToken(token) {
        console.log(token);
        return request({
            url: `/user?access_token=${token}`
        });
    }
};
