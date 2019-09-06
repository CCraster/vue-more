import Vue from 'vue';
import VueAnime from 'vue-animejs';

Vue.use(VueAnime);
const anime = Vue.prototype.$anime;

// 主页动画
function homeAnimation(selector) {
    const colorArray = ['#123456', '#343232', '#a7d898', '#987763'];
    const animation = anime.timeline({
        easing: 'linear',
        duration: 2000,
        loop: true,
        direction: 'alternate'
    });
    colorArray.forEach(color => {
        animation.add({ targets: selector, background: color });
    });
    return animation;
}

export { homeAnimation };
