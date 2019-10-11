import Vue from 'vue';
import Vuex from 'vuex';
import token from './modules/token';

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        token
    },
    state: {
        isRootUserLogin: false,
        selectedTodolistName: '',
        selectedBlockName: ''
    },
    getters: {},
    mutations: {
        setIsRootUserLogin(state) {
            state.isRootUserLogin = true;
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
