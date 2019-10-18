<template>
    <div class="container">
        <div class="items">
            <div v-for="(item, index) in divNames" :key="index" class="item">
                {{ item }}
            </div>
        </div>
        <div class="container-button">
            <el-button @click="randomScroll">滚动</el-button>
            <span class="tip">{{ tip }}</span>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ScrollAnimation',
    data() {
        return {
            divNames: [
                '第1个div',
                '第2个div',
                '第3个div',
                '第4个div',
                '第5个div',
                '第6个div',
                '第7个div',
                '第8个div',
                '第9个div',
                '第10个div',
                '第11个div',
                '第12个div'
            ],
            tip: ''
        };
    },
    methods: {
        randomScroll() {
            let target = document.getElementsByClassName('items')[0];
            let scrollEnd =
                (target.scrollWidth - target.clientWidth) * Math.random();
            this.tip = `${target.scrollLeft} -> ${scrollEnd}`;
            this.scrollTo(target, scrollEnd, 'strongEaseOut', 300);
            // target.scrollLeft = scrollEnd;
        },
        scrollTo(target, scrollEnd, easing = 'easeIn', time = 300) {
            const tween = {
                linear: function(t, b, c, d) {
                    return (c * t) / d + b;
                },
                easeIn: function(t, b, c, d) {
                    return c * (t /= d) * t + b;
                },
                strongEaseIn: function(t, b, c, d) {
                    return c * (t /= d) * t * t * t * t + b;
                },
                strongEaseOut: function(t, b, c, d) {
                    return c * ((t = t / d - 1) * t * t * t * t + 1) + b;
                },
                sineaseIn: function(t, b, c, d) {
                    return c * (t /= d) * t * t + b;
                },
                sineaseOut: function(t, b, c, d) {
                    return c * ((t = t / d - 1) * t * t + 1) + b;
                }
            };
            const scrollStart = target.scrollLeft;
            let start = null;
            const step = timestamp => {
                if (!start) {
                    start = timestamp;
                }
                let stepScroll = tween[easing](
                    timestamp - start,
                    scrollStart,
                    scrollEnd - scrollStart,
                    time
                );
                target.scrollLeft = stepScroll;
                console.log(target.scrollLeft);
                if (
                    (scrollStart > scrollEnd &&
                        target.scrollLeft > scrollEnd) ||
                    (scrollStart < scrollEnd && target.scrollLeft < scrollEnd)
                ) {
                    requestAnimationFrame(step);
                }
            };
            requestAnimationFrame(step);
        }
    }
};
</script>

<style lang="less">
.container {
    .items {
        display: flex;
        width: 500px;
        overflow-x: scroll;
        margin: 10px 0;
        border: 1px solid chocolate;
        .item {
            width: 60px;
            height: 60px;
            margin: 10px;
            color: #fff;
            font-size: 12px;
            text-align: center;
            line-height: 60px;
            background-color: chocolate;
            flex-shrink: 0;
        }
    }
    .container-button {
        width: 500px;
        .tip {
            color: chocolate;
            margin-left: 10px;
        }
    }
}
</style>
