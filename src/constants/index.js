/* gist API地址 */
export const SERVER = 'https://api.github.com'

/*  */
export const TOKEN_KEY = 'TOKEN_KEY'
export const USER_KEY = 'USER_KEY'
export const USER_TYPE = {
  ROOT: 'ROOT',
  GUEST_ORDINARY: 'GUEST_ORDINARY',
  GUEST_HASSOMETHING: 'GUEST_HASSOMETHING'
}

/* 文件存储gist id */
export const GIST_ROOTUSER = '6f63ac9cf42770a1ab4699b1620a8729'
export const GIST_TODOLIST = '85649915f0fac602008b7e1b3f485337'
export const GIST_BLOG = '27e47198a2e4bf5dd650dc709e8c22cd'

/* 触发事件名称 */
export const EVENT_ADD_TODOLIST = 'add-todolist'
export const EVENT_DELETE_TODOLIST = 'delete-todolist'
export const EVENT_ADD_TODOLIST_ITEM = 'add-todolist-item'
export const EVENT_EDIT_ITEM = 'edit-item'
export const EVENT_DELETE_ITEM = 'delete-item'
export const EVENT_CHANGE_TODOLIST_MODE = 'change-todolist-mode'

/* 用户菜单 */
export const ROOT_MENU = [
  {
    name: '博客后台',
    path: '/home/blog-manage'
  },
  {
    name: '博客',
    path: '/home/blog'
  },
  {
    name: 'Todo List',
    path: '/home/todolist'
  },
  {
    name: '实验室🧪',
    path: '/home/lab'
  },
  {
    name: '我，这只咸鱼',
    path: 'https://ccraster.github.io/vue-more/#/home/blog'
  }
]
export const GUEST_MENU = [
  {
    name: '博客',
    path: '/home/blog'
  },
  {
    name: '我，这只咸鱼',
    path: '/home/aboutme'
  }
]
