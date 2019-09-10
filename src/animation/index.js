import Vue from 'vue';
import VueAnime from 'vue-animejs';

Vue.use(VueAnime);
const anime = Vue.prototype.$anime;

// 主页动画
function homeAnimation(selector) {
    /* 变量定义 */
    // const colorArray = ['#123456', '#343232', '#a7d898', '#987763'];
    // const colorArray = ['#123456', '#343232'];
    const colorArray = ['#123456'];
    const animeElement = document.querySelector(selector);
    const fragment = document.createDocumentFragment();
    const grid = [20, 30],
        row = grid[0],
        col = grid[1],
        totalElements = row * col,
        divWidth = animeElement.offsetWidth / col,
        divHight = animeElement.offsetHeight / row;

    /* 插入动画div */
    for (let i = 0; i < totalElements; i++) {
        let div = document.createElement('div');
        div.id = `homeAnimeDiv_${i}`;
        div.style.width = `${divWidth}px`;
        div.style.height = `${divHight}px`;
        div.className = 'home-anime-div';
        fragment.appendChild(div);
    }
    animeElement.appendChild(fragment);

    /* 动画制作 */
    const animation = anime.timeline({
        easing: 'easeInOutQuad',
        // duration: 1000,
        loop: true,
        delay: 1000,
        direction: 'alternate'
    });
    colorArray.forEach(color => {
        animation.add({
            targets: '.home-anime-div',
            background: { value: color, duration: 1000 },
            // borderWidth: [
            //     { value: 10, duration: 1000 },
            //     { value: 0, duration: 1000 }
            // ],
            scale: [
                { value: 0.1, duration: 1000 },
                { value: 1, duration: 1000 }
            ],
            borderRadius: [
                { value: '50%', duration: 1000 },
                { value: '0', duration: 1000 }
            ],
            // delay: anime.stagger(100, {
            //     grid: [grid[1], grid[0]],
            //     from: 'center'
            // }),
            endDelay: 1000
        });
        // .add({
        //     targets: '.home-anime-div',
        //     background: { value: color, duration: 1000 },
        //     borderWidth: [
        //         { value: 1, duration: 1000 },
        //         { value: 0, duration: 1000 }
        //     ]
        // });
    });
    return animation;
}

export { homeAnimation };
