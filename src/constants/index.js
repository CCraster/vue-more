/* gist API地址 */
export const SERVER = 'https://api.github.com';

/* 文件存储gist id */
export const GIST_ROOTUSER = '6f63ac9cf42770a1ab4699b1620a8729';
export const GIST_TODOLIST = '85649915f0fac602008b7e1b3f485337';

/* 触发事件名称 */
export const EVENT_ADD_TODOLIST = 'add-todolist';
export const EVENT_DELETE_TODOLIST = 'delete-todolist';
export const EVENT_ADD_TODOLIST_ITEM = 'add-todolist-item';
export const EVENT_EDIT_ITEM = 'edit-item';
export const EVENT_DELETE_ITEM = 'delete-item';
export const EVENT_DELETE_BLOCK = 'delete-block';

/* 用户菜单 */
export const ROOT_MENU = [
    {
        name: '博客',
        index: 'blog'
    },
    {
        name: 'Todo List',
        index: 'todolist'
    },
    {
        name: '我，这只咸鱼',
        index: 'aboutme'
    }
];
export const GUEST_MENU = [
    {
        name: '博客',
        index: 'blog'
    },
    {
        name: '我，这只咸鱼',
        index: 'aboutme'
    }
];