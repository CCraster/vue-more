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

// Login面板动画
function loginPanelAnimation(target) {
    const animeTime = 1300;
    anime({
        targets: target,
        easing: 'easeInOutBack',
        duration: animeTime,
        translateX: ['-50%', '-50%'],
        translateY: ['50%', '-50%'],
        opacity: [0, 1]
    });
}

/*
 *   Login面板头像切换动画
 *   selector1: 取消强调效果
 *   selector2: 强调
 */
function loginPortraitAnimation(deHighlightTarget, HighlightTarget, bgTarget) {
    const animeTime = 500;
    const animation = anime
        .timeline({
            easing: 'easeInOutQuad',
            autoplay: false,
            duration: animeTime
        })
        .add({
            targets: deHighlightTarget,
            width: [80, 30],
            translateX: () => {
                return deHighlightTarget === '#portrait-root'
                    ? [-40, -70]
                    : [-40, 40];
            },
            translateY: [-40, -15],
            rotateY: [0, 150]
        })
        .add(
            {
                targets: HighlightTarget,
                width: [30, 80],
                translateX: () => {
                    return deHighlightTarget === '#portrait-root'
                        ? [40, -40]
                        : [-70, -40];
                },
                translateY: [-15, -40],
                rotateY: [150, 0]
            },
            0
        )
        .add(
            {
                targets: bgTarget,
                backgroundColor: () => {
                    return deHighlightTarget === '#portrait-root'
                        ? [
                              'rgba(123, 195, 253, 0.745)',
                              'rgba(246, 117, 5, 0.745)'
                          ]
                        : [
                              'rgba(246, 117, 5, 0.745)',
                              'rgba(123, 195, 253, 0.745)'
                          ];
                }
            },
            0
        );
    return animation;
}

export { homeAnimationCreator, loginPortraitAnimation, loginPanelAnimation };
