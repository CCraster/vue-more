import Cookie from '@/common/cookie';
import UserApi from '@/apis/user';
// import Message from 'element-ui';
import Vue from 'vue';

const TOKEN_KEY = 'TOKEN_KEY';
export default {
    state: {
        token: Cookie.getAttribute(TOKEN_KEY)
    },
    mutations: {
        SET_TOKEN: (state, value) => {
            state.token = value;
            Cookie.setAttribute(TOKEN_KEY, value, 30);
        },
        REMOVE_TOKEN: state => {
            state.token = null;
            Cookie.remove(TOKEN_KEY);
        }
    },
    actions: {
        Authentication({ commit }, accessToken) {
            UserApi.verifyToken(accessToken)
                .then(response => {
                    let result = response.data;
                    let githubUsername = 'CCraster';
                    // store.state.configuration.githubUsername;
                    if (githubUsername == result['login']) {
                        commit('SET_TOKEN', accessToken);
                        Vue.prototype.$notify({
                            title: '成功',
                            message: 'Token绑定成功',
                            type: 'success'
                        });
                        // Vue.prototype.$message({
                        //     message: 'Token绑定成功',
                        //     type: 'success'
                        // })
                    } else {
                        Vue.prototype.$message({
                            message: 'Token用户不一致',
                            type: 'error'
                        });
                    }
                })
                .catch(() => {});
        },
        Cancellation({ commit }) {
            commit('REMOVE_TOKEN');
            Vue.prototype.$notify({
                title: '成功',
                message: 'Token解绑成功',
                type: 'success'
            });
        }
    }
};
