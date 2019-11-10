<template>
    <div class="container-footer">
        <div class="div-hidden">
            <div></div>
            <div></div>
            <div></div>
        </div>
        <div class="div-show">
            <span>Today is little, tomorrow will more.</span>
            <span>Copyright© 2019</span>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Footer'
};
</script>

<style lang="less" scoped>
.container-footer {
    // height: 100%;
    height: 8px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    transition: height 0.3s ease;
    & > div:last-child {
        display: none;
    }
    &:hover {
        height: 60px;
        & > div:first-child {
            display: none;
        }
        & > div:last-child {
            display: block;
        }
    }
    .div-hidden {
        height: 100%;
        & div {
            width: 30px;
            height: 1px;
            margin-top: 1px;
            background-color: white;
        }
    }
    .div-show {
        color: white;
        & span {
            display: block;
            text-align: center;
        }
    }
}
</style>
