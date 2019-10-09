<template>
    <el-dialog
        class="add-tag-dialog"
        :title="options.title"
        :visible="visible"
        width="380px"
        @update:visible="updateVisible"
    >
        <div class="add-tag-nameContainer">
            <span>Todolist名称：</span>
            <el-input
                v-model="options.todolistName"
                placeholder="请输入todolist名称"
                maxlength="8"
                size="small"
                class="add-tag-nameContainer-nameInput"
                show-word-limit
            ></el-input>
        </div>
        <div class="add-tag-colorContainer">
            <span>颜色标志：</span>
            <el-color-picker
                v-model="options.todolistColor"
                size="small"
                :predefine="predefineColors"
                show-alpha
            ></el-color-picker>
        </div>
        <div class="add-tag-buttonsContainer">
            <el-button size="small" @click="updateVisible(false)"
                >取消</el-button
            >
            <el-button size="small" @click="confirmAddTodolist">确认</el-button>
        </div>
    </el-dialog>
</template>

<script>
// import { EVENT_ADD_TODOLIST } from '@/constants/';
export default {
    name: 'AddTagDialog',
    props: {
        visible: {
            type: Boolean,
            default: false
        },
        options: {
            type: Object,
            default: () => {}
        }
    },
    data() {
        return {
            // todolistName: '',
            // todolistColor: 'rgba(0, 122, 221, 0.8)',
            predefineColors: [
                '#ff4500',
                '#ff8c00',
                '#ffd700',
                '#90ee90',
                '#00ced1',
                '#1e90ff',
                '#c71585',
                'rgba(255, 69, 0, 0.68)',
                'rgb(255, 120, 0)',
                'hsv(51, 100, 98)',
                'hsva(120, 40, 94, 0.5)',
                'hsl(181, 100%, 37%)',
                'hsla(209, 100%, 56%, 0.73)',
                '#c7158577'
            ]
        };
    },
    computed: {
        todolistData() {
            return {
                oldFileName:
                    this.options.type === 'create'
                        ? this.options.todolistName
                        : this.options.oldTodolistName,
                fileName: this.options.todolistName,
                todolistColor: this.options.todolistColor,
                todolistContent: this.options.todolistContent
            };
        }
    },
    methods: {
        /* 借助.sync实现父子组件「数据绑定」 */
        updateVisible(v) {
            this.$emit('update:visible', v);
        },
        confirmAddTodolist() {
            if (this.options.todolistName === '') {
                this.$message({
                    message: '请输入Todolist名称！',
                    type: 'error'
                });
                return;
            }
            this.$emit('add-todolist', this.todolistData);
            this.updateVisible(false);
        }
    }
};
</script>

<style lang="less">
.add-tag-tipSpan-mixin() {
    & > span {
        height: 32px;
        display: inline-block;
        line-height: 32px;
        text-align-last: justify;
        width: 95px;
    }
}
.add-tag-dialog {
    .add-tag-nameContainer {
        height: 32px;
        margin-bottom: 10px;
        padding-left: 20px;
        .add-tag-tipSpan-mixin();
        .add-tag-nameContainer-nameInput {
            width: 200px;
        }
    }
    .add-tag-colorContainer {
        height: 32px;
        display: flex; // 不用的话，span位置会超出div？？？
        margin-bottom: 10px;
        padding-left: 20px;
        .add-tag-tipSpan-mixin();
        .add-tag-colorContainer-colorPicker {
        }
    }
    .add-tag-buttonsContainer {
        display: flex;
        justify-content: center;
    }
}
</style>
