import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        isRootUserLogin: false
    },
    getters: {
        currentPageColor: state => {
            return state.pageColor[state.currentPageColorIndex];
        }
    },
    mutations: {
        setIsRootUserLogin(state) {
            state.isRootUserLogin = true;
        }
    },
    actions: {}
});
