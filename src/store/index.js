import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
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
