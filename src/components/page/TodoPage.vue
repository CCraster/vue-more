<template>
    <div class="container-todoPage">
        <img
            class="img-portrait"
            alt="todo-page-icon"
            src="@/assets/image/img-tip/todo-page-icon.jpg"
        />
        <span>别急，努力搬砖中</span>
    </div>
</template>

<style lang="less" scoped>
.container-todoPage {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    user-select: none;
    & img {
        width: 200px;
        margin-bottom: 5px;
    }
}
</style>
