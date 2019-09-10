import Vue from 'vue';
import VueAnime from 'vue-animejs';

Vue.use(VueAnime);
const anime = Vue.prototype.$anime;

// 主页动画
function homeAnimationCreator(selector, color) {
    /* 变量定义 */
    const animeTime = 1000;

    /* 动画制作 */
    // anime.remove(selector);
    const animation = anime
        .timeline({
            easing: 'easeInOutQuad'
            // loop: true,
            // autoplay: false,
            // delay: 3000,
            // direction: 'alternate'
        })
        .add({
            targets: selector,
            background: { value: color, duration: animeTime },
            rotate: [
                { value: 180, duration: animeTime },
                { value: 0, duration: animeTime }
            ],
            scale: [
                { value: 0.1, duration: animeTime },
                { value: 1, duration: animeTime }
            ],
            borderRadius: [
                { value: '50%', duration: animeTime },
                { value: '0', duration: animeTime }
            ]
            // endDelay: 3000
        });
    return animation;
}

export { homeAnimationCreator };
