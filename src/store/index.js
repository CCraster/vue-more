import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        homeFirstAnimeFinished: false,
        pageColor: ['rgba( 123, 12, 211, 1)'],
        currentPageColorIndex: 0
    },
    getters: {
        currentPageColor: state => {
            return state.pageColor[state.currentPageColorIndex];
        }
    },
    mutations: {
        updateHomeFirstAnimeFinished: state => {
            state.homeFirstAnimeFinished = true;
        },
        updateCurrentPageColorIndex: state => {
            state.currentPageColorIndex =
                ++state.currentPageColorIndex % state.pageColor.length;
        }
    },
    actions: {}
});
