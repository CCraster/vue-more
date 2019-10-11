import Vue from 'vue';
import Vuex from 'vuex';
import token from './modules/token';
import Cookie from '@/common/cookie';
import { USER_KEY } from '@/constants';

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        token
    },
    state: {
        loginUserType: Cookie.getAttribute(USER_KEY),
        selectedTodolistName: '',
        selectedBlockName: ''
    },
    getters: {},
    mutations: {
        setLoginUserType(state, userType) {
            state.loginUserType = userType;
        },
        setSelectedTodolistName(state, newSelectedTodolistName) {
            state.selectedTodolistName = newSelectedTodolistName;
        },
        setSelectedBlockName(state, newSelectedBlockName) {
            state.selectedBlockName = newSelectedBlockName;
        }
    },
    actions: {}
});
