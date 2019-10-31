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
        <div class="add-tag-typeContainer">
            <span>Todolist类型：</span>
            <el-select
                v-model="options.todolistType"
                :disabled="!(options.type === 'create')"
                placeholder="请选择todolist类型"
                size="small"
                class="add-tag-typeContainer-typeSelect"
            >
                <el-option
                    v-for="type in todolistTypes"
                    :key="type.value"
                    :label="type.label"
                    :value="type.value"
                >
                    <span style="float: left">{{ type.label }}</span>
                    <span
                        style="float: right; color: #8492a6; font-size: 13px"
                        >{{ type.value }}</span
                    >
                </el-option>
            </el-select>
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
            todolistTypes: [
                {
                    value: 'todolist',
                    label: 'todo清单'
                },
                {
                    value: 'report',
                    label: '报告类'
                },
                {
                    value: 'record',
                    label: '日常记录'
                }
            ],
            predefineColors: [
                'rgba(0, 122, 221, 1)',
                '#ff4500',
                '#ffd700',
                '#90ee90',
                '#00ced1',
                'rgb(255, 120, 0)',
                'hsl(181, 100%, 37%)'
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
                todolistType: this.options.todolistType,
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
.add-tag-container-mixin() {
    height: 32px;
    margin-bottom: 10px;
    padding-left: 20px;
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
        .add-tag-container-mixin();
        .add-tag-nameContainer-nameInput {
            width: 200px;
        }
    }
    .add-tag-typeContainer {
        .add-tag-container-mixin();
        .add-tag-typeContainer-typeSelect {
            width: 200px;
        }
    }
    .add-tag-colorContainer {
        display: flex; // 不用的话，span位置会超出div？？？
        .add-tag-container-mixin();
        .add-tag-colorContainer-colorPicker {
        }
    }
    .add-tag-buttonsContainer {
        display: flex;
        justify-content: center;
    }
}
</style>
