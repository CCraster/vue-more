<template>
    <div class="home">
        <!-- <div id="nav">
            <router-link to="/">Home</router-link>|
            <router-link to="/about">About</router-link>
        </div>-->
        <!-- <HelloWorld msg="Hello Craster!" /> -->
        <div class="anime-div"></div>
        <div class="login-component" v-show="homeFirstAnimeFinished">
            <router-link to="/about">About</router-link>
        </div>
    </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue';
import { mapState, mapGetters, mapMutations } from 'vuex';
import { homeAnimationCreator } from '@/animation';
import { setInterval } from 'timers';

export default {
    name: 'Home',
    components: {
        // HelloWorld
    },
    data() {
        return {
            homeAnimation: {},
            animeDivClass: '.home-anime-div'
        };
    },
    mounted() {
        this.animeDivCreate('.anime-div');
        this.homeAnimation = homeAnimationCreator(
            this.animeDivClass,
            this.currentPageColor
        );
        this.homeAnimation.finished.then(this.updateHomeFirstAnimeFinished);
        this.changePageColorLoop();
    },
    computed: {
        ...mapState(['homeFirstAnimeFinished']),
        ...mapGetters(['currentPageColor'])
    },
    methods: {
        ...mapMutations([
            'updateHomeFirstAnimeFinished',
            'updateCurrentPageColorIndex'
        ]),

        /* 插入动画div */
        animeDivCreate(target) {
            const animeElement = document.querySelector(target);
            const fragment = document.createDocumentFragment();
            const grid = [20, 30],
                row = grid[0],
                col = grid[1],
                totalElements = row * col,
                divWidth = animeElement.offsetWidth / col,
                divHight = animeElement.offsetHeight / row;

            for (let i = 0; i < totalElements; i++) {
                let div = document.createElement('div');
                div.id = `homeAnimeDiv_${i}`;
                div.style.width = `${divWidth}px`;
                div.style.height = `${divHight}px`;
                div.className = 'home-anime-div';
                fragment.appendChild(div);
            }
            animeElement.appendChild(fragment);
        },

        /* 循环切换主题色 */
        changePageColorLoop() {
            setInterval(() => {
                // this.$anime.remove(this.animeDivClass);
                console.log(this.$anime.running);
                if (this.$anime.running.length) {
                    console.log(typeof this.$anime.running);
                    console.log(this.$anime.running.length);
                    this.$anime.running.pop(); //  ？？强行pop，防止一直创建却不销毁动画
                }
                this.updateCurrentPageColorIndex();
                this.homeAnimation = homeAnimationCreator(
                    this.animeDivClass,
                    this.currentPageColor
                );
            }, 4000);
        }
    }
};
</script>

<style lang="less">
.home {
    height: 100%;
    width: 100%;
    position: relative;
    .anime-div {
        height: 100%;
        width: 100%;
        position: absolute;
        display: flex;
        flex-wrap: wrap;
        .home-anime-div {
            // box-sizing: border-box;
            background: #42b983;
            // border: solid #fff 0px;
        }
    }
    .login-component {
        position: relative;
    }
}
</style>
